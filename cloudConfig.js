const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const os = require('os');
const path = require('path');
const fs = require('fs');

const isVercel = process.env.VERCEL === '1' || process.env.VERCEL === 'true';
const useCloudinary =
  process.env.CLOUD_NAME && process.env.CLOUD_API_KEY && process.env.CLOUD_API_SECRET;

let storage;
let uploadDir = null;

if (useCloudinary) {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });

  const { CloudinaryStorage } = require('multer-storage-cloudinary');
  storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: 'StayNest_DEV',
      allowed_formats: ['jpeg', 'png', 'jpg', 'webp'],
    },
  });
} else {
  uploadDir = isVercel ? path.join(os.tmpdir(), 'uploads') : path.join(__dirname, 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, uploadDir);
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
      cb(null, name);
    },
  });
}

module.exports = {
  cloudinary,
  storage,
  uploadDir,
};
