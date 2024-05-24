const swaggerJsDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "this is document for simple show api",
    version: "1.0.0",
    description: "Swagger very useful for developing",
  },

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "apiKey",
        scheme: "bearer",
        bearerFormat: "JWT",
        in: "header",
        name: "x-access-token",
        description: "Access Token",
      },
    },
  },
  security: [{ bearerAuth: [] }],
};

const option = {
  swaggerDefinition,
  apis: ["./docs-api/*.js"],
};

const swaggerDoc = swaggerJsDoc(option);

module.exports = swaggerDoc;
