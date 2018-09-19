const http = require('http'); // http module
const url = require('url'); // url module
const query = require('querystring');

const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// function to handle requests
const onRequest = (request, response) => {
  // parse url into individual parts
  // returns an object of url parts by name
  const parsedUrl = url.parse(request.url);

  const params = query.parse(parsedUrl.query);

  const acceptedTypes = request.headers.accept.split(',');

  // console.log(acceptedTypes);


  // check the request method (get, head, post, etc)

  if (parsedUrl.pathname === '/') {
    // if homepage, send index
    htmlHandler.getIndex(request, response);
  } else if (parsedUrl.pathname === '/style.css') {
    // if stylesheet, send stylesheet
    htmlHandler.getCSS(request, response);
  } else if (parsedUrl.pathname === '/success') {
    jsonHandler.sucess(request, response, acceptedTypes);
  } else if (parsedUrl.pathname === '/badRequest') {
    jsonHandler.badRequest(request, response, params, acceptedTypes);
  } else if (parsedUrl.pathname === '/unauthorized') {
    jsonHandler.unauthorized(request, response, params, acceptedTypes);
  } else if (parsedUrl.pathname === '/forbidden') {
    jsonHandler.forbiden(request, response, acceptedTypes);
  } else if (parsedUrl.pathname === '/internal') {
    jsonHandler.internalError(request, response, acceptedTypes);
  } else if (parsedUrl.pathname === '/notImplemented') {
    jsonHandler.notImplemented(request, response, acceptedTypes);
  } else {
    // if not found, send 404 message
    jsonHandler.notFound(request, response, acceptedTypes);
  }
};

// start server
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
