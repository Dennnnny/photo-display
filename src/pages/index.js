import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { BsGrid3X3Gap } from "react-icons/bs";
import { GoRows, GoDownload } from "react-icons/go";
import { FaCheck } from "react-icons/fa";
import { BiSelectMultiple } from "react-icons/bi";
import { IoBackspaceOutline, IoCloudDownloadOutline } from "react-icons/io5";
import JSZip from "jszip";
import { isMobile, isIOS, isSafari } from 'react-device-detect';

// import { useLongPress } from "@uidotdev/usehooks";

import InfiniteScroll from "react-infinite-scroll-component";

const importAll = (context) => context.keys().map((key) => context(key).default);

export default function Home() {
  const [displayThreeInRow, setDisplayThreeInRow] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const DEFAULT_DISPLAY_NUMBERS = 30;
  const [currentLoadTimes, setCurrentLoadTimes] = useState(1);
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const allPhotos = importAll(require.context("../blur/", false, /\.(?:jpg)$/i));
  const [photo, setPhoto] = useState(() => allPhotos.slice(0, DEFAULT_DISPLAY_NUMBERS));
  const MAX_DOWNLOAD_NUMBER = 20


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
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setPhoto((prevPhotos) => ([...prevPhotos, ...allPhotos.slice(currentLoadTimes * DEFAULT_DISPLAY_NUMBERS, (currentLoadTimes + 1) * DEFAULT_DISPLAY_NUMBERS)]));
    }, 500);
    setCurrentLoadTimes(num => num + 1);
  }

  async function downloadImages(images) {
    setIsLoading(true);
    await fetch("api/download-pictures", { method: "post", body: JSON.stringify(images) }).then(res => res.json()).then(async (res) => {
      const bufferArray = res.buffer;
      if (isIOS && isMobile || isSafari) {
        const zip = new JSZip();

        await Promise.all(bufferArray.map(async (buffer) => {
          const arrayBuffer = Buffer.from(buffer[0]);
          zip.file(`${new Date().getTime()}.jpg`, arrayBuffer);
        }));

        const zipped = await zip.generateAsync({ type: "arraybuffer" });
        const filesZipped = Buffer.from(zipped)

        const blob = new Blob([filesZipped], { type: 'application/zip' });
        let a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `chun's婚禮回憶.zip`;
        a.click();

      } else {

        for (let i = 0; i < bufferArray.length; i++) {
          setTimeout(() => {
            const buffer = Buffer.from(bufferArray[i][0]);
            const blob = new Blob([buffer]);

            let url = window.URL.createObjectURL(blob);
            let a = document.createElement("a");
            a.href = url;
            a.download = `${new Date().getTime()}${i}.jpg`;
            a.click();
            window.URL.revokeObjectURL(url);
          }, i * 500)
        }
      }

      setIsLoading(false);
      setSelectedPhotos([]);

    })
  }

  function getFileOriginName(input) {
    const match = input.match(/\/([^\/]+\.jpg)$/i);
    const fileNames = match[1].split(".");
    const output = `${fileNames[0]}.${fileNames[2]}`;
    return output;
  }

  return (
    <>
      <Head>
        <title>chunchun</title>
        <meta name="description" content="歡迎下載婚禮照片～" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          display: isLoading ? "flex" : "none",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: 0,
          zIndex: 10,
          background: isLoading ? "transparent" : "rgba(0, 0, 0, 0.35)",
          backdropFilter: isLoading ? "blur(2px)" : "none",
          WebkitBackdropFilter: isLoading ? "blur(2px)" : "none",
          animationName: "updown",
          animationDuration: "0.5s",
          animationIterationCount: "infinite",
          animationDirection: "alternate",
          color: "#22aeef"
        }}
      >
        <IoCloudDownloadOutline size={100} />
        <p
          style={{
            margin: 4,
            transform: "translateY(2px)",
            animationName: "downup",
            animationDuration: "0.5s",
            animationIterationCount: "infinite",
            animationDirection: "alternate",
            fontSize: 24,
            fontWeight: 600
          }}
        >下載中...</p>
      </div >
      <InfiniteScroll
        dataLength={photo.length}
        next={getMorePhoto}
        hasMore={hasMore}
        loader={<p style={{ textAlign: "center" }}>Loading...</p>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>#end</b>
          </p>
        }
      >
        <div
          style={{
            display: "grid",
            gap: "8px",
            maxWidth: 500,
            margin: "auto",
            gridTemplateColumns: displayThreeInRow ? "repeat(auto-fit, minmax(30%, 1fr))" : "1fr",
            overflow: "hidden",
          }}
        >
          {photo.map((img, index) => {
            const fileNameSelected = getFileOriginName(img.src);
            return (<div
              onContextMenu={(e) => e.preventDefault()}
              key={index}
              // {...attrs}
              style={{
                gridRow: img.height > 2200 ? "span 2" : "auto",
                position: "relative"
              }}
            >

              {isMultiSelectMode && <>
                <input
                  className="check"
                  type="checkbox"
                  checked={selectedPhotos.includes(fileNameSelected)}
                  style={{
                    position: "absolute",
                    left: 0,
                    width: "1rem",
                    height: "1rem",
                    background: "white",
                    margin: "4px 24px 24px 4px",
                    textAlign: "center",
                    boxSizing: "content-box",
                    accentColor: "white",
                    appearance: "none"
                  }}
                  onClick={async () => {
                    if (selectedPhotos.includes(fileNameSelected)) {
                      setSelectedPhotos((prevSelected) => (prevSelected.filter(selected => fileNameSelected != selected)));
                    } else {
                      if (selectedPhotos.length >= MAX_DOWNLOAD_NUMBER) return;
                      setSelectedPhotos((prevSelected) => ([...prevSelected, fileNameSelected]));
                    }
                  }}
                />
                <FaCheck
                  className="checkedMark"
                  style={{
                    position: "absolute",
                    left: 0,
                    width: "1rem",
                    height: "1rem",
                    margin: "4px 24px 24px 4px",
                    pointerEvents: "none"
                  }}
                  color="#22aeef"
                />
              </>}
              <Image
                alt="wedding pictures"
                style={{
                  width: "100%",
                  height: "100%",
                  userSelect: "none",
                  WebkitTouchCallout: "none"
                }}
                src={img}
                quality={100}
                width={displayThreeInRow ? 120 : 360}
                height={displayThreeInRow ? 80 : 240}
                loading="lazy"
              /></div>)
          })}
        </div >

        <button
          style={{
            position: "fixed",
            right: "1rem",
            bottom: "1rem",
            width: "3rem",
            height: "3rem",
            borderRadius: "50%",
            border: "2px solid #030303",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fill: "red"
          }}
          onClick={() => {
            setDisplayThreeInRow(t => !t);
          }}
        >
          {displayThreeInRow ? <GoRows color="#030303" size={100} /> : <BsGrid3X3Gap color="#030303" size={100} />}
        </button>

        {isMultiSelectMode && <div
          style={{
            position: "fixed",
            right: "5rem",
            bottom: "1rem",
            width: "3rem",
            height: "3rem",
            borderRadius: "50%",
            border: `2px solid ${selectedPhotos.length >= MAX_DOWNLOAD_NUMBER ? "red" : "#303030"}`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "sans-serif",
            background: "rgba(255,255,255,0.7)",
            color: selectedPhotos.length >= MAX_DOWNLOAD_NUMBER ? "red" : "#303030"
          }}
        >
          <p>{selectedPhotos.length}/{MAX_DOWNLOAD_NUMBER}</p>
        </div>}

        <button
          style={{
            position: "fixed",
            left: "1rem",
            bottom: "1rem",
            width: "3rem",
            height: "3rem",
            borderRadius: "50%",
            border: "2px solid #030303",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fill: "red"
          }}
          onClick={() => {
            if (isMultiSelectMode) {
              setIsMultiSelectMode(false);
              setSelectedPhotos([]);
            } else {
              setIsMultiSelectMode(true);
            }
          }}
        >
          {isMultiSelectMode ? <IoBackspaceOutline color="#030303" size={100} /> : <BiSelectMultiple color="#030303" size={100} />}
        </button>

        {selectedPhotos.length > 0 && <button
          style={{
            position: "fixed",
            left: "5rem",
            bottom: "1rem",
            width: "3rem",
            height: "3rem",
            borderRadius: "50%",
            border: "2px solid #030303",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fill: "red"
          }}
          onClick={() => {
            downloadImages(selectedPhotos);
          }}
        >
          <GoDownload color="#030303" size={100} />
        </button>}
      </InfiniteScroll >
    </>
  );
}
