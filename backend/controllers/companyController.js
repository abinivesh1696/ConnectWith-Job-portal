import Company from '../models/Company.js';

export const createCompany = async (req, res) => {
  try {
    const { name, slug, website, description, location } = req.body;
    const existing = await Company.findOne({ slug });
    if (existing) return res.status(409).json({ message: 'Company slug is already taken' });

    const company = await Company.create({
      name,
      slug,
      website,
      description,
      location,
      owner: req.user._id,
    });

    res.status(201).json(company);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not create company' });
  }
};

export const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find().populate('owner', 'name email');
    res.json(companies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not fetch companies' });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id).populate('owner', 'name email');
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.json(company);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not fetch company' });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ message: 'Company not found' });
    if (!company.owner.equals(req.user._id)) return res.status(403).json({ message: 'Forbidden' });

    Object.assign(company, req.body);
    await company.save();
    res.json(company);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not update company' });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ message: 'Company not found' });
    if (!company.owner.equals(req.user._id)) return res.status(403).json({ message: 'Forbidden' });

    await company.deleteOne();
    res.json({ message: 'Company deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not delete company' });
  }
};
