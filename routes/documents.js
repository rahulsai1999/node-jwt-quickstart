import { Router } from "express";
import multer from "multer";
import node_xj from "xls-to-json";
import fs from "fs-extra";
import Task from "../models/task";
import Document from "../models/docs";
import shortid from "shortid";

//util
const upload = multer({ dest: "temp/" });
const router = Router();

//main function
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

  if (count == OGarr.length) {
    // store the document here

    Document.create(
      {
        name: shortid.generate().slice(0, 7),
        datemod: new Date()
      },
      (err, doc) => {
        OGarr.map(row => {
          Task.create(
            {
              docname: doc.name,
              firstname: row["first name"],
              lastname: row["last name"],
              phoneNumber: row["phone no."],
              CIF: row.CIF,
              address1: row["Address 1"],
              address2: row["Address 2"],
              email: row["Email id"],
              salesID: row.salespersonID
            },
            (err, task) => {
              if (err) console.log(err);
            }
          );
        });
      }
    );

    return true;
  } else return false;
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
        fs.remove(file.path);
        fs.remove("output.json");
        //validate and upload
        if (validator(result)) return res.json("Valid");
        else return res.json("Invalid");
      }
    }
  );
});

export default router;
