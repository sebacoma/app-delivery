const { response, request } = require("express");
const User = require("../models/user");
const cloudinary = require('cloudinary').v2;


const updateImageCloudinary = async (req = request, res = response) => {
    try {
        const { collection, id } = req.params;
        let model;
        console.log("1")
        switch (collection) {
            case 'users':
                model = await User.findByPk(id);
                console.log("2")
                if (!model) {
                    return res.status(400).json({
                        success: false,
                        message: 'User not exist'
                    });
                }
                break;
            default:
                return res.status(400).json({
                    success: false,
                    message: 'The option is not valid'
                });
        }

        // Clean previous image
        if (model.image) {
            console.log("3")
            const nameImageArray = model.image.split('/');

            const nameImage = nameImageArray[nameImageArray.length - 1];
            const [public_image_id] = nameImage.split('.');
            console.log(public_image_id);
            cloudinary.uploader.destroy(`AppDelivery365/${collection}/${public_image_id}`);
            console.log("4")
        }

        // Extract temporal image
        console.log("5")
        const { tempFilePath } = req.files.archive;
        console.log(tempFilePath);
        console.log("6")
        // upload to cloudinary
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath, {
            folder: `AppDelivery365/${collection}`
        });
        console.log("7")

        // Update image to user
        model.image = secure_url;
        await model.save();
        console.log("8")
        res.status(201).json({
            success: true,
            data: model.image
        });
    } catch (error) {
        console.error("Error occurred:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}





module.exports = {
    updateImageCloudinary
}