const express = require('express')
const app = express()
const swaggerUi = require('swagger-ui-express')//library
const airports = require('./airports.json')
// load yaml file to json object
const YAML = require('yamljs')
const docs = YAML.load('./airports-config.yaml')
const swaggerDocs = require('swagger-jsdoc')({
    swaggerDefinition: docs,
    apis: ['./server.js', './Airport.js']// reference the file of your schema
})

//end-point
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {explorer: true}))

/**
 * @swagger
 * /airports:
 *   get:
 *     summary: returns an array of airports
 *     responses:
 *       200:
 *         description: all the airports
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Airport'             
 */
app.get('/airports', (req, res) => {
    req.query;
    res.send(airports)
})


/**
 * @swagger
 * /airports:
 *   post:
 *     summary: Create a new airport
 *     description: Add to the list of airports using this route
 *     requestBody:
 *       content:
 *         'application/json':
 *           schema:
 *              $ref: '#/components/schemas/Airport'
 *     responses:
 *       201:
 *         description: Resource created successfully
 *         content:
 *           'application/json': {}
 *       415:
 *         description: Unsupported Media Type
 *         content:
 *           'application/json': {}
 *       400:
 *         description: Bad request
 *         content:
 *           'application/json': {}
 *       409:
 *         description: Conflict - an airport with that icao already exists
 *         content:
 *           'application/json': {}
 * */
app.post('/airports', (req, res) => {
    airports.push(req.body)
    res.send(airports)
})


/**
 * @swagger
 * /airports/{icao}:  
 *   put:
 *     summary: Replace a current airport with new data
 *     description: Replace the current airport
 *     requestBody:
 *       content:
 *         'application/json':
 *           schema:
 *              $ref: '#/components/schemas/Airport'
 *     responses:
 *       201:
 *         description: Resource updated successfully
 *         content:
 *           'application/json': {}
 *       415:
 *         description: Unsupported Media Type
 *         content:
 *           'application/json': {}
 *       400:
 *         description: Bad request
 *         content:
 *           'application/json': {}  
 * */

 app.put('/airports/{icao}', (req, res) => {
     let index = airports.findIndex(obj => obj.icao === req.params.icao)
     airports[index] = req.body
     res.send(airports)

    })

 /**
 * @swagger
 * /airports/{icao}:  
 *    delete:
 *     summary: Delete the current airport
 *     description: Delete the current airport
 *     responses:
 *       204:
 *         description: Resource deleted successfully
 *         content:
 *           'application/json': {}
 *       415:
 *         description: Unsupported Media Type
 *         content:
 *           'application/json': {}
 *       400:
 *         description: Bad request
 *         content:
 *           'application/json': {}
 * */
app.delete('airports/{icao}', (req, res) => {
    let index = airports.findIndex(obj => obj.icao === req.params.icao);
    airports.splice(req.params.index, 1)
    res.send(airports)

})



app.listen(3000, () => console.log("Airport API ready. Documents at http://localhost:3000/api-docs"))