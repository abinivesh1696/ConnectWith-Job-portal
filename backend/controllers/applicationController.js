import Application from '../models/Application.js';
import Job from '../models/Job.js';

export const applyToJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    const existing = await Application.findOne({ job: job._id, applicant: req.user._id });
    if (existing) return res.status(409).json({ message: 'You have already applied for this job' });

    const application = await Application.create({
      job: job._id,
      applicant: req.user._id,
      coverLetter: req.body.coverLetter,
      resumeUrl: req.body.resumeUrl,
    });

    res.status(201).json(application);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not submit application' });
  }
};

export const getUserApplications = async (req, res) => {
  try {
    if (req.user.role !== 'recruiter' && !req.user._id.equals(req.params.id)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const applications = await Application.find({ applicant: req.params.id })
      .populate('job', 'title location type')
      .populate('applicant', 'name email');
    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not fetch your applications' });
  }
};

export const getJobApplicants = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (!job.postedBy.equals(req.user._id)) return res.status(403).json({ message: 'Forbidden' });

    const applicants = await Application.find({ job: job._id }).populate('applicant', 'name email profile');
    res.json(applicants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not fetch applicants' });
  }
};
