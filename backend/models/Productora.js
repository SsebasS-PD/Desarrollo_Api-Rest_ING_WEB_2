const {Schema, model} = require('mongoose');

const ProductoraSchema = Schema ({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true,
        trim: true
    },

    estado: {
        type: String,
        required: true,
        enum: ['Activo', 'Inactivo'], 
        default: 'Activo'
    },

    fechaCreacion: {
        type: Date,
        required: true,
        default: Date.now
    },

    fechaActualizacion: {
        type: Date,
        required: true,
        default: Date.now
    },

    slogan: {
        type: String,
        required: [true, 'El slogan es obligatorio'],
        trim: true
    },

    descripcion: {
        type: String,
        trim: true
    },
});

module.exports = model('Productora', ProductoraSchema);
