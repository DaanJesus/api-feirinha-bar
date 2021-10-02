const mongoose = require('mongoose');
require('dotenv').config();
const bcrypt = require('bcryptjs')
const Double = require('@mongoosejs/double');

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        uppercase: true
    },
    password: {
        type: String,
        required: true,
        selecet: false
    },
    data_admissao: {
        type: Date,
        default: new Date(),
        required: true
    },
    cpf: {
        type: String,
        default: '111.111.111-11',
        required: true
    },
    cargo: {
        type: String,
        default: 'Cozinheiro 1',
        required: true
    },
    vr: {
        type: String,
        default: "170,00",
        required: true
    },
    vt: {
        type: String,
        default: "440,00",
        required: true
    },
    salario_base: {
        type: String,
        default: "1.000,00",
        required: true
    },
    gorjeta: {
        type: Array,
        default: [
            { data: "2021-09-30", value: "148.20" },
            { data: "2021-09-30", value: "148.20" },
            { data: "2021-09-30", value: "148.20" },
            { data: "2021-09-30", value: "148.20" },
        ]
    },
    feriado_trabalhado: {
        type: Number,
        default: 0,
        required: false
    },
    faltas: {
        type: Number,
        default: 0,
        required: false
    },
    folgas: {
        type: Number,
        default: 0,
        required: false
    },
    performance: {
        ponto: {
            type: Number,
            default: Number(0)
        },
        check_list_abertura: {
            type: Number,
            default: Number(0)
        },
        check_list_fechamento: {
            type: Number,
            default: Number(0)
        },
        nutricionista: {
            type: Number,
            default: Number(0)
        },
        destaques: {
            type: Number,
            default: Number(0)
        },
        nutricionista: {
            type: Number,
            default: Number(0)
        },
        conf_estoque: {
            type: Number,
            default: Number(0)
        },
        cumpriu_horario: {
            type: Number,
            default: Number(0)
        },
        perdas: {
            type: Number,
            default: Number(0)
        },
    },
    observacao: [{
        data_avaliacao: {
            type: Date
        },
        avaliacao: {
            type: String
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }

});

UserSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
})

const User = mongoose.model('User', UserSchema);

module.exports = User;