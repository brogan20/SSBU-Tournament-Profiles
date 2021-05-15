const startUpDocs = require('./config/seed');
//const session = require('express-session');
async function main() {
  const startUp = await startUpDocs.runSetup();
}
main();

const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');

const configRoutes = require('./routes');
const exphbs = require('express-handlebars');

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
app.use(
  session({
    name: 'SmashUltimateApp',
    secret: 'This is a secret',
    saveUnitialized: true,
    resave: false,
    cookie: {maxAge: 60000}
  })
);
*/

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});