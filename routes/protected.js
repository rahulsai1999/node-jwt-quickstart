import { Router } from "express";
import isLoggedIn from "../src/isLoggedIn";
import extractid from "../src/extract";
import User from "../models/user";

const router = Router();

router.get("/current", isLoggedIn, (req, res, next) => {
  const x = extractid(req.headers);
  User.findById(x.body.id).exec((err, found) => {
    if (err) {
      console.log(err);
    } else {
      res.json(found);
    }
  });
});

export default router;
