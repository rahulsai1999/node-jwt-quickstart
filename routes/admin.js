import { Router } from "express";
import Task from "../models/task";
import Doc from "../models/docs";

const router = Router();

router.get("/docs", (req, res) => {
  Doc.find({}, (err, found) => {
    if (!err) return res.json(found);
    else console.log(err);
  });
});

router.get("/docs/:id", (req, res) => {
  Task.find({ docname: req.params.id }, (err, found) => {
    if (!err) return res.json(found);
    else console.log(err);
  });
});

export default router;
