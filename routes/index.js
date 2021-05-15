const userRoutes = require('./users');
const characterRoutes = require('./characters');
const matchRoutes = require('./matches');
const tournamentRoutes = require('./tournaments');
const loginRoutes = require('./login');

const constructorMethod = (app) => {
  app.use('/users', userRoutes);
  app.use('/characters', characterRoutes);
  app.use('/matches', matchRoutes);
  app.use('/tournaments', tournamentRoutes);
  app.use('/login', loginRoutes);

  app.get('/', (req, res) => {
    res.render('others/landing', {pageTitle: 'SSBU Tournament Profiles', landing: true});
  });
  app.use('*', (req, res) => {
    res.render('others/404error', {pageTitle: '404', error: 'This page does not exist'});
  });
};

module.exports = constructorMethod;
