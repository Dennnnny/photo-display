import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { BsGrid3X3Gap } from "react-icons/bs";
import { GoRows, GoDownload } from "react-icons/go";
import { FaCheck } from "react-icons/fa";
import { BiSelectMultiple } from "react-icons/bi";
import { IoBackspaceOutline } from "react-icons/io5";
// import { useLongPress } from "@uidotdev/usehooks";

import InfiniteScroll from 'react-infinite-scroll-component';

const importAll = (context) => context.keys().map((key) => context(key).default);

export default function Home() {
  const [displayThreeInRow, setDisplayThreeInRow] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const DEFAULT_DISPLAY_NUMBERS = 25
  const [currentLoadTimes, setCurrentLoadTimes] = useState(1);
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const allPhotos = importAll(require.context('../blur/', false, /\.(?:jpg|jpeg|png|gif|webp)$/));
  const [photo, setPhoto] = useState(() => allPhotos.slice(0, DEFAULT_DISPLAY_NUMBERS));


  //// long press function here
  // const attrs = useLongPress(
  //   () => {
  //     // setIsMultiSelectMode(true);
  //   },
  //   {
  //     threshold: 500,
  //   }
  // );



  function getMorePhoto() {
    if (photo.length >= allPhotos.length) {
      setHasMore(false)
      return
    }
    setTimeout(() => {
      setPhoto((prevPhotos) => ([...prevPhotos, ...allPhotos.slice(currentLoadTimes * DEFAULT_DISPLAY_NUMBERS, (currentLoadTimes + 1) * DEFAULT_DISPLAY_NUMBERS)]))
    }, 500)
    setCurrentLoadTimes(num => num + 1)
  }

  async function downloadImages(images) {
    for (let i = 0; i < images.length; i++) {
      const response = await fetch(images[i]);
      response.blob().then(blob => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = `${new Date().getTime()}${i}.jpg`;
        a.click();
      });
    }
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
      >
        <div
          style={{
            display: 'grid',
            gap: '8px',
            maxWidth: 500,
            margin: 'auto',
            gridTemplateColumns: displayThreeInRow ? 'repeat(auto-fit, minmax(30%, 1fr))' : '1fr',
            overflow: 'hidden',
          }}
        >
          {photo.map((img, index) => {
            return (<div
              onContextMenu={(e) => e.preventDefault()}
              key={index}
              // {...attrs}
              style={{
                gridRow: img.height > 2200 ? 'span 2' : 'auto',
                position: 'relative'
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
                  // console.log(selectedPhotos)
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
                  height: '100%',
                }}
                src={img}
                quality={20}
                loading="eager"
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
          onClick={() => {
            setDisplayThreeInRow(t => !t)
          }}
        >
          {displayThreeInRow ? <GoRows color="#030303" size={100} /> : <BsGrid3X3Gap color="#030303" size={100} />}
        </button>

        <button
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
            if (isMultiSelectMode) {
              setIsMultiSelectMode(false)
              setSelectedPhotos([])
            } else {
              setIsMultiSelectMode(true)
            }
          }}
        >
          {isMultiSelectMode ? <IoBackspaceOutline color="#030303" size={100} /> : <BiSelectMultiple color="#030303" size={100} />}
        </button>

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
            downloadImages(selectedPhotos)
          }}
        >
          <GoDownload color="#030303" size={100} />
        </button>}
      </InfiniteScroll >
    </>
  );
}
