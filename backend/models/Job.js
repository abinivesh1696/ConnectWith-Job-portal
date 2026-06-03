import mongoose from 'mongoose';

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
    salaryRange: {
      type: mongoose.Schema.Types.Mixed,
      get: (value) => {
        if (typeof value === 'object' && value !== null) {
          const parts = [];
          if (value.min != null) parts.push(`$${value.min}`);
          if (value.max != null) parts.push(`$${value.max}`);
          return parts.join(' - ') || undefined;
        }
        return value;
      },
    },
    description: { type: String },
    requirements: [{ type: String }],
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: ['open', 'closed'],
      default: 'open',
    },
  },
  { timestamps: true, toJSON: { getters: true }, toObject: { getters: true } }
);

const Job = mongoose.model('Job', jobSchema);
export default Job;
