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
import Task from "../models/task";
import Docs from "../models/docs";

//routes
import Auth from "../routes/auth";
import Protected from "../routes/protected";
import Document from "../routes/documents";
import Admin from "../routes/admin";
import Staff from "../routes/staff";

//utilities
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(
  "mongodb://adarsh:adarsh123@ds343217.mlab.com:43217/backend-service",
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
app.use("/", Document);
app.use("/admin", Admin);
app.use("/staff",Staff);

app.listen(5000, () => {
  console.log("Running on", 5000);
});
