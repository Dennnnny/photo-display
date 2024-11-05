// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { Storage, TransferManager } = require('@google-cloud/storage');

export default async function handler(req, res) {

  const images = JSON.parse(req.body);

  const storage = new Storage({
    projectId: process.env.GOOGLE_PROJECT_NAME,
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY
    }
  });

  const bucketName = process.env.GOOGLE_BUCKET_NAME

  // // Creates a transfer manager client
  const transferManager = new TransferManager(storage.bucket(bucketName));

  const array = await transferManager.downloadManyFiles(images).catch(console.error);

  res.status(200).json({ buffer: array })
}
