const Category = require("../models/category");
const { request, response } = require("express");


const getCategories = async (req = request, res = response) => {
    try{
        const categories = await Category.findAll({where: {status: true}});
        res.status(200).json({
            data: categories
        });
    }catch(error){
        res.status(500).json({
            error: true,
            message: 'Error al obtener las categorias: ' + error.message
        });
    }
}


const createCategory = async (req = request, res = response) => {
    try {
        const { name, description, image } = req.body;

        const validateCategory = await Category.findOne({ where: { name: name } });
        if (validateCategory) {
            return res.status(400).json({
                error: true,
                message: 'La categoria ya existe'
            });
        }
        if (!name || !description || !image) {
            return res.status(400).json({
                error: true,
                message: 'Todos los campos son requeridos'
            });
        }
        const category = await Category.create({ name, description, image});
        res.status(200).json({
            data: category,
            error: false,
            message: 'Categoria creada exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'Error al crear la categoria: ' + error.message
        });
    }
}

module.exports = {
    createCategory,
    getCategories,
}





