const express = require(`express`)
const routes = express.Router()

const OngsController = require(`./controllers/OngController`)
const IncidentsController = require(`./controllers/IncidentsController`)
const SessionController = require(`./controllers/SessionController`)


routes.post('/ongs', OngsController.create)
routes.get('/ongs', OngsController.list)

routes.get('/incidents', IncidentsController.list)
routes.post('/incidents', IncidentsController.create)
routes.delete('/incidents/:id', IncidentsController.delete)
routes.get('/profile', IncidentsController.listByOng)

routes.post('/login', SessionController.create)

module.exports = routes