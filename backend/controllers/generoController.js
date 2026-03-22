const Genero = require('../models/Genero'); // Importamos el modelo para ser usada en el controlador
const {request, response} = require('express'); // Nos va permiter obtener peticiones (req) y enviar respuetas (res) cliente - servidor

const getGeneros = async (req = request, res = response) => {
    try {
        const generos = await Genero.find();
        res.status(200).json(generos);
    } catch (error) {
        console.error('📉 Error al obtener géneros:', error);
        res.status(500).json({msg: 'Ocurrio un error al listar los géneros'})
    }
}

const createGenero = async (req = request, res = response) => {
    try {
        const {nombre, descripcion} = req.body;

        const generoDB = await Genero.findOne({nombre});
        if (generoDB) {
            return res.status(400).json({msg: `El género "${nombre}" ya existe.`});
        }

        const genero = new Genero({nombre, descripcion});

        await genero.save();
        res.status(201).json(genero);

    } catch (error) {
        console.error('✖️ Error al crear el género:', error);
        res.status(500).json({msg: 'Ocurrio un error al guardar el género'});
    }
}

// Actualizar Genero
const updateGenero = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const data = req.body;

        data.fechaActualizacion = Date.now();

        const genero = await Genero.findByIdAndUpdate(id, data, { new: true });

        res.status(200).json(genero);
    } catch (error) {
        console.error('✖️ Error al actualizar el género:', error);
        res.status(500).json({msg: 'Ocurrió un error al actualizar el género'});
    }
}

// Eliminar Genero
const deleteGenero = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        const genero = await Genero.findByIdAndDelete(id);

        res.status(200).json({
            msg: 'Género eliminado correctamente',
            genero
        });
    } catch (error) {
        console.error('✖️ Error al eliminar el género:', error);
        res.status(500).json({msg: 'Ocurrió un error al eliminar el género'});
    }
}

module.exports = {
    getGeneros,
    createGenero,
    updateGenero,
    deleteGenero
}