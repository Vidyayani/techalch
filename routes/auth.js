const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const middleware = require('../middlewares')
const rounds = 10

router.get('/login', (req, res) => {
    if( !req.body.email || !req.body.password) res.status(400).json({ error : "Please provide both email and password"})
    User.getUser(req.body.email)
    .then(user => {
        if(!user) res.status(404).json({error: 'no user with that email found'})
        else {
            bcrypt.compare(req.body.password, user.password, (error, match) => {
                if (error) res.status(500).json(error)
                else if (match) res.status(200).json({token: middleware.generateToken(user)})
                else res.status(403).json({error: 'passwords do not match'})
            })
        }
    })
    .catch(error => {
        res.status(500).json(error)
    })
});

router.post('/signup', (req, res) => {
    bcrypt.hash(req.body.password, rounds, (error, hash) => {
        if (error) res.status(500).json(error)
        else {
            const newUser =  {email: req.body.email, password: hash}
            User.saveUser(newUser)
                .then(users => {
                    if(users)
                    res.status(200).json({token: middleware.generateToken(newUser)})
                })
                .catch(error => {
                    res.status(500).json(error)
                })
        }
    })
});

module.exports = router
