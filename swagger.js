const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
    info: {
        version: "1.0.0",
        title: "API Node.js com express",
        description: "Some description..."
    },
    servers: [
        {
            url: 'http://localhost:3000'
        }
    ]
    
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./src/app.js');           // Your project's root file
});