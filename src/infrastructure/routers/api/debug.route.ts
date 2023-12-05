import { Router } from "express";
import { debugController } from "../../controllers/debug.controller";

const testRouter = Router();

testRouter.get("/debug", debugController);

export default testRouter;
