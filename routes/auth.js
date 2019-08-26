import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import User from "../models/user";

const secret = '7x0jhxt"9(thpX6';
const router = Router();

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({ error: "Invalid Credentials" });
    }
    if (user) {
      const token = jwt.sign({ id: user._id, username: user.username }, secret);
      return res.json({ token });
    }
  })(req, res, next);
});

router.post("/register", (req, res) => {
  User.register(
    new User({
      username: req.body.username,
      email: req.body.email,
      name: req.body.name,
      DOB: req.body.dob
    }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.json(err);
      }
      res.json(user);
    }
  );
});

export default router;
