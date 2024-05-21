const { Router } = require("express");

const { validateFields } = require("../middlewares/validate-fields");
const { validateArchiveUpload } = require("../middlewares/validate-archive");

const { updateImageCloudinary } = require("../controllers/uploadController");
const { uploadProductImagesCloudinary } = require("../controllers/uploadController");
const { getImagesByProductId } = require("../controllers/uploadController");


const router = Router();

router.put('/:collection/:id', [
    validateArchiveUpload,
    validateFields
], updateImageCloudinary);

router.put('/products/:id/images', [
    validateArchiveUpload,
    validateFields
], uploadProductImagesCloudinary);

router.get('/products/:productId/images', getImagesByProductId);

module.exports = router;