import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import dotenv from "dotenv"

dotenv.config()

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

export const uploadOnCloudinary = async (localFilePath) => {
    // console.log(process.env.CLOUDINARY_CLOUD_NAME, process.env.CLOUDINARY_API_KEY, process.env.CLOUDINARY_API_SECRET)
    // localFilePath = 'C:\\Users\\ASUS\\OneDrive\\Desktop\\Eventrix\\backend\\public\\temp\\certificate.png'
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

export const deleteFromCloudinary = async (public_id) => {
    try {
        if (!public_id) return null
        //delete the file from cloudinary
        const response = await cloudinary.uploader.destroy(public_id)
        // file has been deleted successfull
        console.log("file is deleted from cloudinary ", response.result);
        return response;
    } catch (error) {
        return null;
    }
}
