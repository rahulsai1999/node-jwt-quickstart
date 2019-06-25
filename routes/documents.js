import { Router } from "express";
import multer from "multer";
import node_xj from "xls-to-json";
import fs from "fs-extra";
import Task from '../models/task';
import Document from '../models/docs';

//util
const upload = multer({ dest: "temp/" });
const router = Router();

const validator = result => {
  let OGarr = [];
  let count = 0;
  result.some((row, i) => {
    if (row["CIF"] == "") return true;
    OGarr.push(row);
  });
  OGarr.map(row => {
    if (
      row["Email id"].match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    ) {
      if (row["phone no."].length == 10) {
        if (row.salespersonID.match(/^[a-z0-9]+$/i)) count = count + 1;
      }
    }
  });
  if (count == OGarr.length){
      // store the document here
     
    return true;
  }
  else return false;
};

//routes

router.post("/validate", upload.single("avatar"), (req, res) => {
  const file = req.file;
  node_xj(
    {
      input: file.path,
      output: "output.json",
      sheet: "Sheet1"
    },
    (err, result) => {
      if (err) console.log(err);
      else {
        //validate and upload
        const x = validator(result);
        console.log(x);
        if (x) return res.json("Valid");
        else return res.json("Invalid");
      }
    }
  );
  fs.remove(file.path);
  fs.remove("output.json");
});

export default router;
