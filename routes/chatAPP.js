const controller = require("../controller/chatApp");
const express = require("express");
const router = express.Router();
const path = require("path");
const userAuthentication = require("../middleware/auth");
router.use(express.static(path.join(__dirname,"..","views")));
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views"));
});

router.post("/chat",userAuthentication.authenticate,controller.postChat);
router.get("/chat/",userAuthentication.authenticate,controller.getChat);
router.get("/chat-msg/:from/:to", controller.getMyMessages);

module.exports = router;
