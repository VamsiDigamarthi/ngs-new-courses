import mongoose from "mongoose";

export const COURSE_LEVEL = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
};

const InstructorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    profileImage: { type: String },
    designation: { type: String },
    experience: { type: String },
    bio: { type: String },
  },
  { timestamps: true }
);

const RatingSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
  },
  { timestamps: true }
);

const LessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: String },
});

const ModuleSchema = new mongoose.Schema({
  moduleTitle: { type: String, required: true },
  lessons: [LessonSchema],
});

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    thumbnail: { type: String },

    level: {
      type: String,
      enum: Object.values(COURSE_LEVEL),
      required: true,
    },

    rating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },

    totalHours: { type: String },
    studentsEnrolled: { type: Number, default: 0 },

    description: { type: String },
    skills: [{ type: String }],
    requirements: [{ type: String }],

    // Embed instructor & modules directly inside the course
    instructor: InstructorSchema,
    curriculum: [ModuleSchema],

    reviews: [RatingSchema],
  },
  { timestamps: true }
);

const CourseModel = mongoose.model("Course", CourseSchema);
export default CourseModel;
