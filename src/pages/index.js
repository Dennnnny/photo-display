import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { BsGrid3X3Gap } from "react-icons/bs";
import { GoRows } from "react-icons/go";


export default function Home() {
  const importAll = (context) => context.keys().map((key) => context(key).default);
  const photos = importAll(require.context('../images/', false, /\.(?:jpg|jpeg|png|gif|webp)$/));

  const [displayThreeInRow, setDisplayThreeInRow] = useState(false);

  return (
    <>
      <Head>
        <title>chunchun</title>
        <meta name="description" content="歡迎下載婚禮照片～" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flexFlow: 'wrap' }}
      >
        {photos.map((img, index) => {
          return (
            <Image
              alt="wedding pictures"
              style={{
                width: displayThreeInRow ? '30%' : '80%',
                height: displayThreeInRow ? '100px' : 'auto',
                margin: '4px'
              }}
              src={img}
              key={index}
              priority
            />)
        })}
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

      </div >
    </>
  );
}
