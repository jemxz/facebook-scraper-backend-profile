const express = require("express");
const router = express.Router();

const Credentials = require("../model/credentials-model");

async function getCredentials() {
  const collection = await Credentials.find();
  return collection.groups;
}

router.get("/credentials", async function (req, res) {
  const credentials = await getCredentials();
  if (!credentials) res.status(404).send("It doesnt exist");
  res.send(credentials);
});

router.post("/getCredentials", function (req, res) {
  var newCredentials = new Credentials();
  newCredentials.email = req.body.email;
  newCredentials.password = req.body.password;

  newCredentials.save(function (err, data) {
    if (err) {
      console.log(error);
    } else {
      res.send("Data inserted");
    }
  });
});
router.post("/updateEmail", function (req, res) {
  console.log(req.body);
  const id = req.body.id;
  Credentials.findByIdAndUpdate(
    id,
    { email: req.body.email },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
        console.log("Data updated!");
      }
    }
  );
});
router.post("/updatePassword", function (req, res) {
  Credentials.findByIdAndUpdate(
    req.body.id,
    { password: req.body.password },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
        console.log("Data updated!");
      }
    }
  );
});
router.get("/delete", function (req, res) {
  Credentials.findByIdAndDelete(req.body.id, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
      console.log("Deleted : ", docs);
    }
  });
});

module.exports = router;
