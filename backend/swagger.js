const swaggerAutogen = require("swagger-autogen")();
const path = require('path');

const outputFile = path.resolve(__dirname, 'swagger-output.json');
const endpointsFiles = ["./server.js"];

const doc = {
  info: {
    version: "1.0.0",
    title: "Your API Documentation",
    description: "API Documentation for your project",
  },
  host: "localhost:4000", // Update with your actual host and port
  basePath: "/",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  paths: {}, // Leave this empty; it will be filled by swagger-autogen
  definitions: {}, // Leave this empty; it will be filled by swagger-autogen
};

swaggerAutogen(outputFile, endpointsFiles, doc);
