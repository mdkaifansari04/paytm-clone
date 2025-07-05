import { Router } from "express";
import * as User from "../../controller/user.controller";
import { userInputValidation } from "../../../../validation/user-input-validatoion";

const router = Router();

router.get("/", User.getAll);
router.post("/", userInputValidation, User.create);
router.post("/login", userInputValidation, User.login);
router.put("/:id", userInputValidation, User.update);


export default router;
