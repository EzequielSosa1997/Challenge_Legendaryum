import swaggerJSDoc from "swagger-jsdoc";
const option = {
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      title: `BACK END LEGENDARYUM CHALLENGE`,
      version: "1.0.0",
      description: "API DOCUMENTATION",
    },
  },
  apis: [
    "./api/doc/swagger/schema/*",
    "./dist/api/doc/swagger/schema/*",
    "./api/doc/swagger/result/*",
    "./dist/api/doc/swagger/result/*",
    "./api/doc/swagger/endpoints/*",
    "./dist/api/doc/swagger/endpoints/*",
  ],
};
const parseSwaggerToJs = swaggerJSDoc(option);


export default parseSwaggerToJs;
