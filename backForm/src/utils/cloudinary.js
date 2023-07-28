import { v2 as cloudinary } from "cloudinary";

cloudinary.config({ 
    cloud_name: 'dtit8udfs', 
    api_key: '865758869368944', 
    api_secret: 'FnsYA1IrwxDPDjNd_FmsCLfAeT0',
    secure: true
  });

export const uploadImage = async (filePath) => {
    return await cloudinary.uploader.upload(filePath,{folder:"cacaoapp"})
}