import passport from "passport";

const isLoggedIn = (req, res, next) => {
  passport.authenticate("jwt", (err, user, info) => {
    if (err) {
      res.json(err);
    }
    if (!user) {
      res.json({ error: "Invalid Credentials" });
    }
    if (user) {
      next();
    }
  })(req, res, next);
};

export default isLoggedIn;
