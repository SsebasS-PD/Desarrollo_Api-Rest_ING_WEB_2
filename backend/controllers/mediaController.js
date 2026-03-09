const Media = require('../models/Media');
const { request, response } = require('express');

// Consultamos todas las medias
const getMedias = async (req = request, res = response) => {
    try {

        const medias = await Media.find()
            .populate('genero')
            .populate('director')
            .populate('productora')
            .populate('tipo');

        res.status(200).json(medias);

    } catch (error) {

        console.error('✖️ Error al obtener medias:', error);

        res.status(500).json({
            msg: 'Ocurrió un error al listar las medias'
        });

    }
};

// Crear media

const createMedia = async (req = request, res = response) => {
    try {

        const {serial, titulo, sinopsis, url, imagen, anioEstreno, genero, director, productora, tipo} = req.body;

        const mediaDB = await Media.findOne({ serial });

        if (mediaDB) {
            return res.status(400).json({
                msg: `La media con serial "${serial}" ya existe`
            });
        }

        const media = new Media({serial, titulo, sinopsis, url, imagen, anioEstreno, genero, director, productora, tipo});

        await media.save();

        res.status(201).json(media);

    } catch (error) {

        console.error('✖️ Error al crear media:', error);

        res.status(500).json({
            msg: 'Ocurrió un error al guardar la media'
        });

    }
};


// Actualizar Media

const updateMedia = async (req = request, res = response) => {

    try {

        const { id } = req.params;

        const data = req.body;

        data.fechaActualizacion = Date.now();

        const media = await Media.findByIdAndUpdate(id, data, { new: true })
            .populate('genero')
            .populate('director')
            .populate('productora')
            .populate('tipo');

        res.status(200).json(media);

    } catch (error) {

        console.error('✖️ Error al actualizar media:', error);

        res.status(500).json({
            msg: 'Ocurrió un error al actualizar la media'
        });

    }

};

// Eliminar Media
const deleteMedia = async (req = request, res = response) => {

    try {

        const { id } = req.params;

        const media = await Media.findByIdAndDelete(id);

        res.status(200).json({
            msg: 'Media eliminada correctamente',
            media
        });

    } catch (error) {

        console.error('✖️ Error al eliminar media:', error);
        res.status(500).json({
            msg: 'Ocurrió un error al eliminar la media'
        });

    }

};

module.exports = {
    getMedias,
    createMedia,
    updateMedia,
    deleteMedia
};