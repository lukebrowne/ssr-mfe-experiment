import * as http from 'http';
import Tailor from 'node-tailor';

const tailor = new Tailor({
  templatesPath: __dirname + '/assets',
});

http
  .createServer((req, res) => {
    tailor.requestHandler(req, res);
  })
  .listen(8080, function () {
    console.log('Tailor server listening on port 8080');
  });
