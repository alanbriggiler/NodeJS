const passport = require("passport");
const passportJwt = require("passport-jwt");
const JWTStrategy = passportJwt.Strategy;
const ExtractJWT = passportJwt.ExtractJwt;
const secret = "claveSecretaQueSoloConoceElServer";

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    },
    (jwtPayload, done) => {
      const user = jwtPayload;
      return done(null, user);
    }
  )
);

const authMiddleware = passport.authenticate("jwt", { session: false });

const authIsAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === "Admin") {
    return next();
  }
  res.status(401).json({ error: "Usuario no es Admin" });
};

module.exports = { secret, authMiddleware, authIsAdmin };
