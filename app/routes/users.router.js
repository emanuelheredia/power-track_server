const { Router } = require("express");
const { addNewUser } = require("../controllers/users.controller");
const router = Router();

router.post("/add-new-user", addNewUser);
exports.Router = router;
