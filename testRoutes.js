import express from "express";
import testPostController from '../controllers/testcontroller.js'


const router = express.Router()

router.post('/test-post', testPostController);


export default router;
