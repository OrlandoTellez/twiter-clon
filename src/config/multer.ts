import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "twitter-clone",
    format: async (req: any, file: any) => "png",
    public_id: (req: any, file: any) => Date.now().toString(),
  } as any,
});

export const upload = multer({ storage });

