const {Schema, model} = require('mongoose'); // Importamos las funciones que vamos a usar de la Libreria mongoose en base al modelo "commonjs"

const GeneroSchema = Schema({
    nombre: {
        type: String, // El tipo de dato que vamos a guardar
        required: [true, 'El nombre es obligatorio'], // Hace el ingreso obligatorio 
        unique: true, // Validad que no hayan dos registros con el mismo nombre
        trim: true // Elimina los espacios en blanco -- deja solamente el texto
    },

    estado: {
        type: String,
        required: true,
        enum: ['Activo', 'Inactivo'], // Valida que se imgrese solamente los dos valores que puede tener: 'Activo' e 'Inactivo' 
        default: 'Activo' // El valor por defecto va ser 'Activo'
    },

    descripcion: {
        type: String,
        trim: true
    },

    fechaCreacion: {
        type: Date,
        required: true,
        default: Date.now // Asigna automaticamente la fecha y hora del servidor
    },

    fechaActualizacion: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = model('Genero', GeneroSchema);
