// swagger.js
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const isProduction = process.env.NODE_ENV === 'Prod';
const baseUrl = isProduction ? process.env.URL_PROD : process.env.URL_DEV; // URL selon l'environnement

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API MSPR Pandémie',
      version: '1.0.0',
      description: 'Documentation complète de l\'API REST pour la gestion des pandémies',
    },
    servers: [
      {
        url: baseUrl,
      },
    ],
  },
  apis: ['./swagger-docs.js'], // Les fichiers contenant les commentaires Swagger
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
