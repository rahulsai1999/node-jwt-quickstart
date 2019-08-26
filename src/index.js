//libraries
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import mongoose from "mongoose";

//models
import User from "../models/user";

//routes
import Auth from "../routes/auth";
import Protected from "../routes/protected";

//utilities
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(
  "mongodb://noneuser2183:qwerty1@ds213178.mlab.com:13178/stockr-backend",
  { useNewUrlParser: true },
  err => {
    err ? console.log(err) : console.log("Connected to Database");
  }
);

//auth requirements
let options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
  secretOrKey: '7x0jhxt"9(thpX6'
};
app.use(passport.initialize());
passport.use("local", new LocalStrategy(User.authenticate()));
passport.use(
  "jwt",
  new JwtStrategy(options, (jwt_payload, done) => {
    User.findOne(
      {
        _id: jwt_payload.id
      },
      (err, user) => {
        if (err) {
          console.log(err);
        }
        if (user) {
          done(null, user);
        } else {
          done(null, false);
          console.log("Okay");
        }
      }
    );
  })
);

//routes
app.get("/", (req, res) => {
  res.send("Hello from the server side");
});

app.use("/", Auth);
app.use("/", Protected);

app.listen(5000, () => {
  console.log("Running on", 5000);
});
