import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "twitter-clone",
    format: async (req, file) => "png",
    public_id: (req, file) => Date.now(), 
  },
});

export const upload = multer({ storage });

