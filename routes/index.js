const userRoutes = require('./users')
const characterRoutes = require('./characters')

const constructorMethod = (app) => {
  app.use('/users', userRoutes);
  app.use('/characters', characterRoutes);
  app.get('/', (req, res) => {
    res.render('others/landing', {pageTitle: 'SSBU Tournament Profiles'});
  });
  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;