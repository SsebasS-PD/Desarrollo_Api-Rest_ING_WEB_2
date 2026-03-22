const Tipo = require('../models/Tipo');
const {request, response} = require('express');

const getTipos = async (req = request, res = response) => {
    try {
        const tipos = await Tipo.find();
        res.status(200).json(tipos);
    } catch (error) {
        console.error('✖️ Error al obtener tipos:', error);
        res.status(500).json({msg: 'Ocurrió un error al listar los tipos'});
    }
}

const createTipo = async (req = request, res = response) => {
    try {
        const {nombre, descripcion} = req.body;

        const tipoDB = await Tipo.findOne({nombre});
        if (tipoDB) {
            return res.status(400).json({msg: `El tipo "${nombre}" ya existe.`});
        }

        const tipo = new Tipo({nombre, descripcion});

        await tipo.save();
        res.status(201).json(tipo);

    } catch (error) {
        console.error('✖️ Error al crear tipo:', error);
        res.status(500).json({msg: 'Ocurrió un error al guardar el tipo'});
    }
}

// Actualizar Tipo
const updateTipo = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const data = req.body;

        data.fechaActualizacion = Date.now();

        const tipo = await Tipo.findByIdAndUpdate(id, data, { new: true });

        res.status(200).json(tipo);
    } catch (error) {
        console.error('✖️ Error al actualizar el tipo:', error);
        res.status(500).json({msg: 'Ocurrió un error al actualizar el tipo'});
    }
}

// Eliminar Tipo
const deleteTipo = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        const tipo = await Tipo.findByIdAndDelete(id);

        res.status(200).json({
            msg: 'Tipo eliminado correctamente',
            tipo
        });
    } catch (error) {
        console.error('✖️ Error al eliminar el tipo:', error);
        res.status(500).json({msg: 'Ocurrió un error al eliminar el tipo'});
    }
}

module.exports = {
    getTipos,
    createTipo,
    updateTipo,
    deleteTipo
}