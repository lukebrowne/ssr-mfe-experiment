import express from 'express';
import { engine } from 'express-handlebars';
import queryString from 'query-string';

const app = express();

app.engine('handlebars', engine({ layoutsDir: __dirname + '/assets' }));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/assets');

app.get('/', (req, res) => {
  const {
    query: { query },
  } = queryString.parseUrl(req.headers['x-request-uri'] as string);
  res.render('main', { query });
});
app.listen(3333);
