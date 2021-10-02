//imports
const express = require('express');

//modules
const User = require('../model/user.js');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const authConfig = require('../config/auth.json')

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    })
}

router.post('/login', async (req, res) => {

    try {

        const { email, password } = req.body

        const user = await User.findOne({
            email
        }).select('+password')

        if (!user)
            return res.status(400).json({ error: "Usuário não encontrado." })

        if (!await bcrypt.compare(password, user.password))
            return res.status(403).json({ error: "email ou senha invalidos" })

        user.password = undefined

        res.json({ message: `Bem vindo de volta, ${user.name}.`, user: user, token: generateToken({ id: user._id }) })

    } catch (err) {
        console.log(err);
    }

});

router.get('/get-user/:_id', async (req, res) => {

    try {
        const { _id } = req.params

        const user = await User.findOne({
            _id
        })

        if (user) {
            user.password = undefined
            res.json({ user })
        } else {
            res.json({ message: "usuário não encontrado" })
        }

    } catch (err) {
        console.log(err);
    }

});

router.post('/register', async (req, res) => {

    try {

        const { name, email, password } = req.body

        if (await User.findOne({ email }))
            return res.status(400).send({ error: "Este email ja foi cadastrado!" })

        const user = await User.create({
            name,
            email,
            password
        })

        user.password = undefined

        res.json({ message: 'Usuario cadastrado com sucesso.', token: generateToken({ id: user._id }) })

    } catch (err) {
        console.log(err);
        return res.status(400).send({
            error: 'Erro ao se cadastrar'
        });
    }

});

router.put('/update-user/:id_user', async (req, res) => {

    try {
        const {
            id_user
        } = req.params

        const {
            favorito
        } = req.body

        const user = await User.findByIdAndUpdate({
            _id: id_user
        }, {

        })

        res.json(user)

    } catch (err) {
        console.log(err);
        return res.status(400).send({
            error: 'Erro ao atualizar perfil.'
        });
    }

});

module.exports = app => app.use('/auth/v1', router);