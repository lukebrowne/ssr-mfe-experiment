import * as express from 'express';
import { engine } from 'express-handlebars';

const app = express();

app.engine('handlebars', engine({ layoutsDir: __dirname + '/assets' }));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/assets');

app.get('/', (req, res) => {
  console.log(__dirname);
  res.render('main');
});

app.listen(3333);
