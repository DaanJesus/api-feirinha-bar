const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger.json'
const endpointsFiles = [/* './app/controller/trad-controller.js',  */'./app/controller/user-controller.js']

swaggerAutogen(outputFile, endpointsFiles).then(() => {
    require('./index.js')
})