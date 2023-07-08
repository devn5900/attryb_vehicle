const fs= require("fs");
const cloudinary = require("cloudinary").v2;
const {v4}= require("uuid");

const uploadImageOnCloudinary=async(image,folderName)=>{
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_KEY,
        api_secret: process.env.CLOUD_SECRET,
      });
      try { 
        const isUpload= await cloudinary.uploader.upload(image.tempFilePath, {
          public_id: image.name.split('.')[0]+v4(),
          folder:folderName
        });
        fs.exists(image.tempFilePath, function(isExists) {
          if(isExists) {
              console.log('File exists. Deleting now ...');
              fs.unlinkSync(image.tempFilePath);
              console.log('File Deleted');

          } else {
              console.log('File not found, so not deleting.');
          }
        });
        return isUpload;
      } catch (error) {
        return false;
      }
}


module.exports={
    uploadImageOnCloudinary
}