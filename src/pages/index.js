import Head from "next/head";
import Image from "next/image";


export default function Home() {
  const importAll = (context) => context.keys().map((key) => context(key).default);
  const photos = importAll(require.context('../images/', false, /\.(?:jpg|jpeg|png|gif|webp)$/));

  return (
    <>
      <Head>
        <title>chunchun</title>
        <meta name="description" content="歡迎下載婚禮照片～" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        {photos.map((img, index) => {
          return (
            <Image
              style={{ width: '80%', height: 'auto', margin: '4px' }}
              src={img}
              key={index}
            />)
        })}
      </div>
    </>
  );
}
