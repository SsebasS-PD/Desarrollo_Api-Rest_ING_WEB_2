const Productora = require('../models/Productora');
const {request, response} = require('express');

const getProductoras = async (req = request, res = response) => {
    try {
        const productoras = await Productora.find();
        res.status(200).json(productoras);
    } catch (error) {
        console.error('✖️Error al obtener productoras:', error);
        res.status(500).json({msg: 'Ocurrió un error al listar las productoras'});
    }
}

const createProductora = async (req = request, res = response) => {
    try {
        const {nombre, slogan, descripcion} = req.body;

        const productoraDB = await Productora.findOne({nombre});
        if (productoraDB) {
            return res.status(400).json({msg: `La productora "${nombre}" ya existe.`});
        }

        const productora = new Productora({nombre, slogan, descripcion});

        await productora.save();
        res.status(201).json(productora);

    } catch (error) {
        console.error('✖️ Error al crear la productora:', error);
        res.status(500).json({msg: 'Ocurrió un error al guardar la productora'})
    }
}

// Actualizar Productora
const updateProductora = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const data = req.body;

        data.fechaActualizacion = Date.now();

        const productora = await Productora.findByIdAndUpdate(id, data, { new: true });

        res.status(200).json(productora);
    } catch (error) {
        console.error('✖️ Error al actualizar la productora:', error);
        res.status(500).json({msg: 'Ocurrió un error al actualizar la productora'});
    }
}

// Eliminar Productora
const deleteProductora = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        const productora = await Productora.findByIdAndDelete(id);

        res.status(200).json({
            msg: 'Productora eliminada correctamente',
            productora
        });
    } catch (error) {
        console.error('✖️ Error al eliminar la productora:', error);
        res.status(500).json({msg: 'Ocurrió un error al eliminar la productora'});
    }
}

module.exports = {
    getProductoras,
    createProductora,
    updateProductora,
    deleteProductora
}