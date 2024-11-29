import Resource from "./../Modals/resource.js";
import mongoose from "mongoose";
import cloudinary from "../cloudconfig.js";

export const uploadResource = async (req, res) => {
    try {
        const { Category, link } = req.body;
        const { fileLink } = req.files || {}; 
        console.log(fileLink);
        console.log(Category);
        let fileUrl;
        if (fileLink) {
            if (fileLink.tempFilePath) {
                const uploadResult = await cloudinary.uploader.upload(fileLink.tempFilePath, {
                folder: 'resorces',
                resource_type: 'raw',
                // format: 'pdf',
                });
                fileUrl = uploadResult.secure_url;
            } else {
                throw new Error('No temporary file path available');
            }
        }
        const viewableUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=true`;
        const newResource = new Resource({ Category: Category, fileLink: viewableUrl, link: link });
        console.log(newResource);
        await newResource.save();
        return res
        .status(200)
        .json({ message: "Resource uploaded"});
    } catch (error) {
      return res.status(500).json({ message: "Error during upload", error });
    }
};

export const getAllResources = async (req, res) => {
    try {
      const resourceList = await Resource.find({});
      return res.status(200).json({ message: "Resources found", resourceList });
    } catch (error) {
      return res.status(500).json({ message: "Failed to retrieve users", error: error.message });
    }
};
  