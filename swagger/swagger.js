const { required } = require('joi');


const swaggerAutogen = require('swagger-autogen')({
    openapi:"3.0.0",
    autoHeaders:false
});

const doc = {
  info: {
    title: 'Circle',
    description: 'Circle API Documentation'
  },
  components: {
    '@schemas': {
        CreateThreadDTO: {
            type:'object',
            properties: {
                title: {
                    type:'string'
                },
                content: {
                    type:'string'
                },
                image: {
                    type:'string',
                    format:'binary'
                },

            },
            required:['content','image'],
        },
        UpdateThreadDTO: {
            type:'object',
            properties:{
                content: {
                    type: 'string',
                },
                image: {
                    type:'string',
                }
            },
            required:['content','image']
        },
        LoginDTO: {
            Type:'object',
            properties: {
            email: {
                type:'string',
                format:'email',
            },
            password: {
                type:'string',
                format:'password'
            },
            
        },
        required:['email','password'],
        
    },
    RegisterDTO: {
        type:'object',
        properties: {
            fullName:{
                type:'string',
            },
            email: {
                type:'string',
                format:'email'
            },
            password: {
                type:'string',
                format:'password'
            }
        },
        required:['fullName','email','password']
       
    },

    },
    securitySchemes: {
        bearerAuth: {
            type:'http',
            scheme:'bearer',
        }
    },
},
host: 'localhost:5000'
};
const outputFile = './swagger-output.json';
const routes = ['./src/index.ts'];  //arahkan ke file utama

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);