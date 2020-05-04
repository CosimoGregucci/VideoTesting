// ./server/middleware/auth.js 
const auth = require('basic-auth'); 
const compare = require('tsscmp');
//ricordati di escludere da gitignore 
require('dotenv').config({path:__dirname+'/./../.env'});
const check = (name, pass) => {   
  let valid = true;   // Simple method to prevent short-circuit and use timing-safe compare   
  valid = compare(name, process.env.USER) && valid;   
  valid = compare(pass, process.env.PASSWORD) && valid;   
  return valid; 
};
const basicAuth = (request, response, next) => {   
  const credentials = auth(request);   
  if (credentials && check(credentials.name, credentials.pass)) {     
    return next();   
  }   

  response.set('WWW-Authenticate', 'Basic realm="my website"');   
  return response.status(401).send("Access denied"+process.env.USER+process.env.PASSWORD); 
}; 

module.exports = basicAuth;