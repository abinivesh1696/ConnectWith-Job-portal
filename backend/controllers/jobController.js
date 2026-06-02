import Job from '../models/Job.js';
import Company from '../models/Company.js';

export const createJob = async (req, res) => {
  try {
    const { title, companyId, location, type, salaryRange, description, requirements } = req.body;
    const company = await Company.findById(companyId);
    if (!company) return res.status(404).json({ message: 'Company not found' });

    const job = await Job.create({
      title,
      company: company._id,
      location,
      type,
      salaryRange,
      description,
      requirements,
      postedBy: req.user._id,
    });

    res.status(201).json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not create job' });
  }
};

export const listJobs = async (req, res) => {
  try {
    const { search, location, type, status, postedBy } = req.query;
    const filter = {};
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    if (location) filter.location = location;
    if (type) filter.type = type;
    if (status) filter.status = status;
    if (postedBy) filter.postedBy = postedBy;

    const jobs = await Job.find(filter).populate('company', 'name slug').populate('postedBy', 'name email');
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not fetch jobs' });
  }
};

export const getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('company', 'name slug website description').populate('postedBy', 'name email');
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not fetch job' });
  }
};

export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (!job.postedBy.equals(req.user._id)) return res.status(403).json({ message: 'Forbidden' });

    Object.assign(job, req.body);
    await job.save();
    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not update job' });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (!job.postedBy.equals(req.user._id)) return res.status(403).json({ message: 'Forbidden' });

    await job.deleteOne();
    res.json({ message: 'Job deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not delete job' });
  }
};
