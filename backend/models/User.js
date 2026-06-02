import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    location: { type: String },
    description: { type: String },
  },
  { _id: false }
);

const profileSchema = new mongoose.Schema(
  {
    headline: { type: String },
    bio: { type: String },
    location: { type: String },
    website: { type: String },
    skills: [{ type: String }],
    resumeUrl: { type: String },
    experience: [experienceSchema],
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['jobseeker', 'recruiter', 'admin'],
      default: 'jobseeker',
    },
    profile: {
      type: profileSchema,
      default: {},
    },
    // Optional reference for recruiter users who manage a company.
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
export default User;
