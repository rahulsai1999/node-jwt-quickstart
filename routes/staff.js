import { Router } from "express";
import Task from "../models/task";
import isLoggedIn from "../src/isLoggedIn";
import extractid from "../src/extract";

const router = Router();

router.get("/", isLoggedIn, (req, res) => {
  let x = extractid(req.headers);
  Task.find({ salesID: x.body.username }, (err, found) => {
    if (!err) return res.json(found);
    else console.log(err);
  });
});

export default router;
