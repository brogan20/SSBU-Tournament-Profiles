const userRoutes = require('./users');
const characterRoutes = require('./characters');
const matchRoutes = require('./matches');
const tournamentRoutes = require('./tournaments');

const constructorMethod = (app) => {
  app.use('/users', userRoutes);
  app.use('/characters', characterRoutes);
  app.use('/matches', matchRoutes);
  app.use('/tournaments', tournamentRoutes);
  app.get('/login',(req, res) => {
    res.render('others/login', {pageTitle: 'Login'});
  })
  app.get('/', (req, res) => {
    res.render('others/landing', {pageTitle: 'SSBU Tournament Profiles', landing: true});
  });
  app.use('*', (req, res) => {
    res.render('others/404error', {pageTitle: '404', error: 'This page does not exist'});
  });
};

module.exports = constructorMethod;
