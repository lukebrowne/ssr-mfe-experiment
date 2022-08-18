import * as http from 'http';
import Tailor from 'node-tailor';
import queryString from 'query-string';

const tailor = new Tailor({
  templatesPath: __dirname + '/assets',
});

http
  .createServer((req, res) => {
    req.headers['x-request-uri'] = req.url;

    console.log(req.headers);

    tailor.requestHandler(req, res);
  })
  .listen(8080, function () {
    console.log('Tailor server listening on port 8080');
  });
