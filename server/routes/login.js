const express = require("express");
const router = express.Router();
const UserData = require("../model/login");


// --------------post----------------
router.post("/", (req, res) => {
  data = new UserData({
    name: req.body.name,
    mobile: req.body.mobile,
    email: req.body.email,
  });
  data.save().then((data) => {
      res.send(data);
    })
    .catch((error) => {                  
      res.status(500).send("Invalid: ");
    });
});


// ----------------get---------------
router.get("/", (req, res) => {
  UserData.find().then((data) => res.send(data))
    .catch((error) => {
      res.send(500).send("Something went Error");
    });
});

// ---------------getByid---------------
router.get("/:userId", (req, res) => {
  UserData.findById(req.params.userId)
    .then((data) => {
      if (data) res.send(data);
      res.status(404).send(error.message);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

// -----------update---------------
router.put("/:userId", (req, res) => {
  UserData.findByIdAndUpdate(
    req.params.userId,
    {
      name: req.body.name,
      mobile: req.body.mobile,
      email: req.body.email,
    },
    { new: true }
  )
    .then((updateUser) => {
      if (!updateUser) res.status(404).send("Invalid");
      res.send(updateUser);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

// -----------delete--------------
router.delete("/:userId", (req, res) => {
  UserData.findByIdAndDelete(req.params.userId)
    .then((data) => {
      if (!data) res.status(404).send("Invalid");
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

module.exports = router;
