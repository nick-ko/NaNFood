require('babel-register')
const {success, error} = require('./functions')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const express = require('express')
const morgan = require('morgan')
const config = require('./config')
const cors = require("cors");

const db = mysql.createConnection({
    host: 'localhost',
    database: 'nanfood',
    user: 'root',
    password: ''
})

db.connect((err) => {

    if (err)
        console.log(err.message)
    else {

        console.log('Connected.')

        const app = express()

        let MembersRouter = express.Router()

        app.use(morgan('dev'))
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cors());

        MembersRouter.route('/:id')

            // Récupère les menus pas restaurants
            .get((req, res) => {

                db.query('SELECT * FROM menu WHERE id_resto = ?', [req.params.id], (err, result) => {
                    if (err) {
                        res.json(error(err.message))
                    } else {

                        res.json(success(result))
                    }
                })

            })
           

             MembersRouter.route('/seul/:id')
            .get((req, res) => {
                db.query('SELECT * FROM restaurant WHERE id_resto = ?', [req.params.id], (err, result) => {
                    if (err) {
                        res.json(error(err.message))
                    } else {
                        res.json(success(result))
                    }
                })

            })

            MembersRouter.route('/commune')
            .get((req, res) => {
                db.query('SELECT DISTINCT commune_resto FROM restaurant', (err, result) => {
                    if (err) {
                        res.json(error(err.message))
                    } else {
                        res.json(success(result))
                    }
                })
            })

            MembersRouter.route('/single/:id')
            .get((req, res) => {
                db.query('SELECT * FROM restaurant WHERE id_resto = ?', [req.params.id], (err, result) => {
                    if (err) {
                        res.json(error(err.message))
                    } else {

                        if (result[0] != undefined) {
                            res.json(success(result[0]))
                        } else {
                            res.json(error('Wrong id'))
                        }

                    }                
                })

            })

            MembersRouter.route('/users')
                // Récupère tous les membres
                .get((req, res) => {
                    db.query('SELECT * FROM users ', (err, result) => {
                        if (err) {
                            res.json(error(err.message))
                        } else {
                            res.json(success({
                                id: result.id,
                                fName: result.fName,
                                lName: result.lName,
                                email: result.email,
                                password: result.password
                            }))
                        }
                    })
                })

        MembersRouter.route('/auth/register')
         // Inscription utilisateur
            .post((req, res) => {
                console.log(req.body)
                if (req.body.email) {
                    db.query('SELECT * FROM users WHERE email = ?', [req.body.email], (err, result) => {
                        if (err) {
                            res.json(error(err.message))
                        } else {

                            if (result[0] != undefined) {
                                res.json(error('email already taken'))
                            } else {
                                db.query('INSERT INTO users(fName,lName,email,password) VALUES(?,?,?,?)', [req.body.fName, req.body.lName, req.body.email, req.body.password], (err, result) => {
                                    if (err) {
                                        res.json(error(err.message))
                                    } else {

                                        db.query('SELECT * FROM users WHERE fName = ?', [req.body.fName], (err, result) => {

                                            if (err) {
                                                res.json(error(err.message))
                                            } else {
                                                res.json(success({
                                                    id: result[0].id,
                                                    fName: result[0].fName,
                                                    lName: result[0].lName,
                                                    email: result[0].email,
                                                    password: result[0].password
                                                }))
                                            }

                                        })

                                    }
                                })

                            }

                        }
                    })

                } else {
                    res.json(error('no name value'))
                }

            })

            MembersRouter.route('/auth/login')
            // login utilisateur
            .post((req, res) => {
                console.log(req.body)
                db.query('SELECT * FROM users WHERE email = ? AND password = ?', [req.body.email,req.body.password], (err, result) => {
                    if (err) {
                        res.json(error(err.message))
                    } else {
                        if (result[0]===result['']) {
                                res.json(error('vous etez pas reconnue '))
                            } else {
                                res.json(success(result))
                            }
                    }
                })

            })


        MembersRouter.route('/')

            // Récupère tous les restaurants
            .get((req, res) => {
                db.query('SELECT * FROM restaurant ORDER BY nom_resto', (err, result) => {
                    if (err) {
                        res.json(error(err.message))
                    } else {
                        res.json(success(result))
                    }
                })
            })

        app.use('/resto', MembersRouter)

        app.listen(config.port, () => console.log('Started on port '+config.port))

    }

})