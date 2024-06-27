const Category = require("../models/category");
const { request, response } = require("express");

const getCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id; // Obtener el id del cuerpo de la solicitud
        const category = await Category.findByPk(categoryId);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'La categoría no fue encontrada'
            });
        }

        res.status(200).json({
            success: true,
            data: category
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: 'Error al obtener la categoría: ' + error.message
        });
    }
}

const deactivateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id; 
        const category = await Category.findByPk(categoryId);

        if (!category) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Categoría no encontrada"
            });
        }

        category.status = false; // Suponiendo que "borrar" es marcar la categoría como inactiva
        await category.save(); // Guardar el cambio en la base de datos

        return res.status(200).json({
            success: true,
            error: false,
            message: "Categoría desactivada con exito"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: "Error al borrar la categoría",
            details: error.message 
        });
    }
};

const activateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id; 
        const category = await Category.findByPk(categoryId);

        if (!category) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Categoría no encontrada"
            });
        }

        category.status = true; // Suponiendo que "borrar" es marcar la categoría como inactiva
        await category.save(); // Guardar el cambio en la base de datos

        return res.status(200).json({
            success: true,
            error: false,
            message: "Categoría activada con exito"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: "Error al borrar la categoría",
            details: error.message 
        });
    }
};

const getCategories = async (req, res) => {
    try{
        const categories = await Category.findAll();
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



const createCategory = async (req, res) => {
    try {
        const { name, description} = req.body;

        const validateCategory = await Category.findOne({ where: { name: name } });
        if (validateCategory) {
            return res.status(400).json({
                sucess:false,
                error: true,
                message: 'La categoria ya existe'
            });
        }
        if (!name || !description) {
            return res.status(400).json({
                sucess:false,
                error: true,
                message: 'Todos los campos son requeridos'
            });
        }
        const category = await Category.create({ name, description});
        res.status(200).json({
            sucess:true,
            data: category,
            error: false,
            message: 'Categoria creada exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            sucess:false,
            error: true,
            message: 'Error al crear la categoria: ' + error.message
        });
    }
}

const updateCategory = async (req, res) => {
    try {
        const { id, name, description } = req.body;

        if (!name || !description) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Todos los campos son requeridos'
            });
        }

        const validateCategory = await Category.findOne({ where: { name } });
        if (validateCategory && validateCategory.id !== id) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Ya existe una categoría con ese nombre'
            });
        }

        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                error: true,
                message: 'Categoría no encontrada'
            });
        }

        category.name = name;
        category.description = description;
        await category.save();

        res.status(200).json({
            success: true,
            data: category,
            error: false,
            message: 'Categoría editada exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: 'Error al editar la categoría: ' + error.message
        });
    }
}

module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    deactivateCategory,
    activateCategory,
    updateCategory
}