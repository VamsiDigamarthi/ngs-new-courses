import CourseModel from "../modals/course.model.js";

export const createCourse = async (req, res) => {
  try {
    const newCourse = await CourseModel.create(req.body);

    return res.status(201).json({
      status: true,
      message: "Course created successfully",
      data: newCourse,
    });
  } catch (error) {
    console.log("Create Course Error:", error);
    return res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};

export const getCourses = async (req, res) => {
  try {
    // page and limit from query params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalCourses = await CourseModel.countDocuments();
    const courses = await CourseModel.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return res.status(200).json({
      status: true,
      page,
      limit,
      totalCourses,
      totalPages: Math.ceil(totalCourses / limit),
      data: courses,
    });
  } catch (error) {
    console.error("Get Courses Error:", error);
    return res.status(500).json({
      status: false,
      message: "Server Error",
    });
  }
};
