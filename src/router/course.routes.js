import express from "express";
import { createCourse, getCourses } from "../controllers/course.controller.js";
import { createCourseValidation } from "../validations/course.validation.js";
import { validate } from "../Middlewares/validate.js";

const router = express.Router();

router.post("/create", createCourseValidation, validate, createCourse);
router.get("/", getCourses);
export default router;
