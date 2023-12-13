const { Router } = require("express");
const { addNewUser, signInUser } = require("../controllers/users.controller");
const router = Router();

router.post("/add-new-user", addNewUser);
router.post("/sign-in-user", signInUser);

exports.Router = router;
