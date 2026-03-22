const Director = require('../models/Director');
const {request, response} = require('express');

const getDirectores = async (req = request, res = response) => {
    try {
        const directores = await Director.find();
        res.status(200).json(directores);
    } catch (error) {
        console.error('✖️ Error al obtener directores:', error);
        res.status(500).json({msg: 'Ocurrió un error al listar los directores'});
    }
}

const createDirector = async (req = request, res = response) => {
    try {
        const {nombre} = req.body;

        const directorDB = await Director.findOne({nombre});
        if (directorDB) {
            return res.status(400).json({msg: `El director "${nombre}" ya existe.`});
        }

        const director = new Director({nombre});

        await director.save();
        res.status(201).json(director);

    } catch (error) {
        console.error('✖️ Error al crear el director:', error);
        res.status(500).json({msg: 'Ocurrió un error al guardar el director'})
    }
}

// Actualizar Director
const updateDirector = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const data = req.body;

        data.fechaActualizacion = Date.now();

        const director = await Director.findByIdAndUpdate(id, data, { new: true });

        res.status(200).json(director);
    } catch (error) {
        console.error('✖️ Error al actualizar el director:', error);
        res.status(500).json({msg: 'Ocurrió un error al actualizar el director'});
    }
}

// Eliminar Director
const deleteDirector = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        const director = await Director.findByIdAndDelete(id);

        res.status(200).json({
            msg: 'Director eliminado correctamente',
            director
        });
    } catch (error) {
        console.error('✖️ Error al eliminar el director:', error);
        res.status(500).json({msg: 'Ocurrió un error al eliminar el director'});
    }
}

module.exports = {
    getDirectores,
    createDirector,
    updateDirector,
    deleteDirector
}