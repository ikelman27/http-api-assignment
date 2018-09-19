// function to respond with a json object
// takes request, response, status code and object to send
const respondJSON = (request, response, status, object) => {
  // object for our headers
  // Content-Type for json
  const headers = {
    'Content-Type': 'application/json',
  };


  // send response with json object
  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

const respondXML = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'text/xml',
  };


  let responseXML = '<response>';
  responseXML = `${responseXML} <message>${object.message}</message>`;
  if (object.id != null) {
    responseXML = `${responseXML} <id>${object.id}</id>`;
  }
  responseXML = `${responseXML} </response>`;


  response.writeHead(status, headers);
  response.write(responseXML);
  response.end();
};


const sucess = (request, response, type) => {
  const responseJSON = {
    message: 'this is a successfull Response',
  };


  console.log(type);
  if (type[0] === 'application/json') {
    return respondJSON(request, response, 200, responseJSON);
  }
  return respondXML(request, response, 200, responseJSON);
};


const badRequest = (request, response, params, type) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  let responseCode = 200;

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'badRequest';
    responseCode = 400;
  }

  if (type[0] === 'application/json') {
    return respondJSON(request, response, responseCode, responseJSON);
  }
  return respondXML(request, response, responseCode, responseJSON);
};

const unauthorized = (request, response, params, type) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  let responseCode = 200;

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseJSON.message = 'Missing loggedin query parameter set to yes';
    responseJSON.id = 'badRequest';
    responseCode = 401;
  }
  if (type[0] === 'application/json') {
    return respondJSON(request, response, responseCode, responseJSON);
  }
  return respondXML(request, response, responseCode, responseJSON);
};

const forbiden = (request, response, type) => {
  const responseJSON = {
    message: 'You do not hav access to this content',
    id: 'Forbidden',
  };


  if (type[0] === 'application/json') {
    return respondJSON(request, response, 403, responseJSON);
  }
  return respondXML(request, response, 403, responseJSON);
};

const internalError = (request, response, type) => {
  const responseJSON = {
    message: 'Internal Server Error',
    id: 'Forbidden',
  };


  if (type[0] === 'application/json') {
    return respondJSON(request, response, 500, responseJSON);
  }
  return respondXML(request, response, 500, responseJSON);
};

const notImplemented = (request, response, type) => {
  const responseJSON = {
    message: 'A request for this page hase not been implamented',
    id: 'notImplemented',
  };

  if (type[0] === 'application/json') {
    return respondJSON(request, response, 501, responseJSON);
  }
  return respondXML(request, response, 501, responseJSON);
};

// function for 404 not found requests with message
const notFound = (request, response, type) => {
  // create error message for response
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  if (type[0] === 'application/json') {
    return respondJSON(request, response, 404, responseJSON);
  }
  return respondXML(request, response, 404, responseJSON);
};


// set public modules
module.exports = {
  sucess,
  badRequest,
  notFound,
  unauthorized,
  forbiden,
  internalError,
  notImplemented,
};
