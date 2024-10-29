import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsGrid3X3Gap } from "react-icons/bs";
import { GoRows, GoDownload } from "react-icons/go";
import { FaCheck } from "react-icons/fa";
import { IoBackspaceOutline } from "react-icons/io5";
import { useLongPress } from "@uidotdev/usehooks";

import InfiniteScroll from 'react-infinite-scroll-component';

const importAll = (context) => context.keys().map((key) => context(key).default);

export default function Home() {
  const [displayThreeInRow, setDisplayThreeInRow] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [defaultNumber, setDefaultNumber] = useState(displayThreeInRow ? 24 : 10);
  const [currentLoadTimes, setCurrentLoadTimes] = useState(1);
  const [photo, setPhoto] = useState([]);
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const allPhotos = importAll(require.context('../images/', false, /\.(?:jpg|jpeg|png|gif|webp)$/));

  const attrs = useLongPress(
    () => {
      setIsMultiSelectMode(true);
    },
    {
      threshold: 500,
    }
  );

  useEffect(() => {
    window.scrollTo({ top: 0 })
    setHasMore(true)
    setDefaultNumber(displayThreeInRow ? 24 : 10)
    setCurrentLoadTimes(1)
  }, [displayThreeInRow])

  useEffect(() => {
    setPhoto(allPhotos.slice(0, defaultNumber)) // array stay same
  }, [defaultNumber])


  function getMorePhoto() {
    if (photo.length >= allPhotos.length) {
      setHasMore(false)
      return
    }
    setTimeout(() => {
      setPhoto((prevPhotos) => ([...prevPhotos, ...allPhotos.slice(currentLoadTimes * defaultNumber, (currentLoadTimes + 1) * defaultNumber)]))
    }, 500)
    setCurrentLoadTimes(num => num + 1)
  }

  return (
    <>
      <Head>
        <title>chunchun</title>
        <meta name="description" content="歡迎下載婚禮照片～" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <InfiniteScroll
        dataLength={photo.length}
        next={getMorePhoto}
        hasMore={hasMore}
        loader={<p style={{ textAlign: 'center' }}>Loading...</p>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>#end</b>
          </p>
        }
        onScroll={() => { console.log("scrolling...", photo.length) }}
      >
        <div
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flexFlow: 'wrap' }}
        >
          {photo.map((img, index) => {
            return (<div
              onContextMenu={(e) => e.preventDefault()}
              key={index}
              {...attrs}
              style={{
                width: displayThreeInRow ? '30%' : '80%',
                height: displayThreeInRow ? '100px' : 'auto',
                margin: '4px',
                position: 'relative'
              }}
              onKeyDown={() => {
                console.log("keydown")
              }}
            >
              {isMultiSelectMode && <span
                style={{
                  position: 'absolute',
                  left: 0,
                  width: '1rem',
                  height: '1rem',
                  background: 'white',
                  margin: '4px 24px 24px 4px',
                  textAlign: 'center',
                  border: '1px solid #22aeef55',
                  boxSizing: 'content-box'
                }}
                onClick={() => {
                  if (selectedPhotos.includes(img.src)) {
                    setSelectedPhotos((prevSelected) => (prevSelected.filter(selected => img.src != selected)))
                  } else {
                    setSelectedPhotos((prevSelected) => ([...prevSelected, img.src]))
                  }
                }}
              >
                {selectedPhotos.includes(img.src) && < FaCheck color="#22aeef" />}
              </span>}
              <Image
                alt="wedding pictures"
                style={{
                  width: '100%',
                  height: displayThreeInRow ? '100px' : 'auto',
                }}
                src={img}
                priority
              /></div>)
          })}


        </div >


        <button
          style={{
            position: 'fixed',
            right: '1rem',
            bottom: '1rem',
            width: '3rem',
            height: '3rem',
            borderRadius: '50%',
            border: `2px solid #030303`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fill: 'red'
          }}
          onClick={() => setDisplayThreeInRow(t => !t)}
        >
          {displayThreeInRow ? <GoRows size={100} /> : <BsGrid3X3Gap size={100} />}
        </button>

        {isMultiSelectMode && <button
          style={{
            position: 'fixed',
            left: '1rem',
            bottom: '1rem',
            width: '3rem',
            height: '3rem',
            borderRadius: '50%',
            border: `2px solid #030303`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fill: 'red'
          }}
          onClick={() => {
            setIsMultiSelectMode(false)
            setSelectedPhotos([])
          }}
        >
          <IoBackspaceOutline size={100} />
        </button>}

        {selectedPhotos.length > 0 && <button
          style={{
            position: 'fixed',
            left: '5rem',
            bottom: '1rem',
            width: '3rem',
            height: '3rem',
            borderRadius: '50%',
            border: `2px solid #030303`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fill: 'red'
          }}
          onClick={() => {

          }}
        >
          <GoDownload size={100} />
        </button>}
      </InfiniteScroll >
    </>
  );
}
