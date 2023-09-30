import swaggerAutogen from 'swagger-autogen'

const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/routes/*']

const doc = {
    info: {
      version: '1.0.0',
      title: 'API app PC build',
      description: 'API utilizada pelo app mobile',
    },
    host: '',      // by default: 'localhost:3000'
    basePath: '',  // by default: '/'
    schemes: [],   // by default: ['http']
    consumes: [],  // by default: ['application/json']
    produces: [],  // by default: ['application/json']
    tags: [        // by default: empty Array
      {
        name: '',         // Tag name
        description: '',  // Tag description
      },
      // { ... }
    ],
    securityDefinitions: {
        jwt: {
            type: 'apiKey',
            name: 'tokenjwt',
            in: 'header',
        },
    },
    definitions: {},          // by default: empty object (Swagger 2.0)
    components: {}            // by default: empty object (OpenAPI 3.x)
  };

swaggerAutogen(outputFile, endpointsFiles,doc)