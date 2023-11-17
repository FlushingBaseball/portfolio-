passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({
    where: { username },
    attributes : ['id', 'username', 'email', 'hash', 'firstname', 'lastname', 'currency']
  })
  .then((user) =>{
    if (!user){
      return done(null, false, {failReason : "Incorrect username."});
    }

    bcrypt.compare(password, user.hash)
    .then((match)=> {
      // User successfully authenticated
      if (match){
        return done(null, user);
      }
      // Password hash doesn't match
      else{
        return done(null, false, {failReason : 'Incorrect password.'});
      }
    })
    .catch(error => {
      console.error('bcrypt compare error:', error.message);
      return done(error);
    });
  })
    .catch((error) => {
      console.error('Sequelize username query (auth) error', error.message);
      return done(error);
    });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then(user => done(null,user))
    .catch(error => done(error, null));
});

module.exports = passport; 