const { uploadImageOnCloudinary } = require("../utills/imageUploader");

const uploadImageMiddleware = async (req, res, next) => {
  const { image } = req.body;
  const folderName = "inventry";
  try {
    const isUpload = await uploadImageOnCloudinary(image, folderName);
    if (isUpload) {
      req.body.image = isUpload.secure_url || isUpload.url;
      next();
    } else {
      return res.status(400).json({ msg: "Invalid Image File", status: false });
    }
  } catch (error) {
    return res.status(400).json({ msg: "Invalid Image File", status: false });
  }
};


module.exports={
    uploadImageMiddleware
}