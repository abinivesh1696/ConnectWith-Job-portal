import mongoose from 'mongoose';

const salarySchema = new mongoose.Schema(
  {
    min: { type: Number },
    max: { type: Number },
  },
  { _id: false }
);

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    location: { type: String, trim: true },
    type: {
      type: String,
      enum: ['full-time', 'part-time', 'contract', 'internship'],
      default: 'full-time',
    },
    salaryRange: salarySchema,
    description: { type: String },
    requirements: [{ type: String }],
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: ['open', 'closed'],
      default: 'open',
    },
  },
  { timestamps: true }
);

const Job = mongoose.model('Job', jobSchema);
export default Job;
