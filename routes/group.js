const controller = require("../controller/group");
const express = require("express");
const router = express.Router();
const path = require("path");
const userAuthentication = require("../middleware/auth");

router.use(express.static(path.join(__dirname, "views")));
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views"));
});

router.post("/createGroup", userAuthentication.authenticate,controller.createGroup);
router.get( "/getGroup",userAuthentication.authenticate,controller.getGroupDetails);
module.exports = router;
