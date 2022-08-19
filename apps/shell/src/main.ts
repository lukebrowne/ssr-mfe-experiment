import * as http from 'http';
import Tailor from 'node-tailor';

/**
 * Filter the request headers that are passed to fragment request.
 * @callback filterHeaders
 *
 * @param {Object} attributes - Attributes object of the fragment node
 * @param {string} attributes.public - Denotes the public fragment.
 * @param {Object} request - HTTP Request object
 * @param {Object} request.headers - request header object
 * @returns {Object} New filtered header object
 */
const filterRequestHeaders = (attributes, request) => {
  const ACCEPT_HEADERS = [
    'accept-language',
    'referer',
    'user-agent',
    'x-request-uri',
    'x-request-host',
    'cookie',
  ];

  const { public: isPublic } = attributes;
  const { headers = {} } = request;

  console.log(headers);

  // Headers are not forwarded to public fragment for security reasons
  return isPublic
    ? {}
    : ACCEPT_HEADERS.reduce((newHeaders, key) => {
        headers[key] && (newHeaders[key] = headers[key]);
        return newHeaders;
      }, {});
};

const tailor = new Tailor({
  templatesPath: __dirname + '/assets',
  filterRequestHeaders,
});

http
  .createServer((req, res) => {
    req.headers['x-request-uri'] = req.url;

    tailor.requestHandler(req, res);
  })
  .listen(8080, function () {
    console.log('Tailor server listening on port 8080');
  });
