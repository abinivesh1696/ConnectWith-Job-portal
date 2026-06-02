import User from '../models/User.js';

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not fetch profile' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (!user._id.equals(req.user._id)) return res.status(403).json({ message: 'Forbidden' });

    const updates = req.body;
    if (updates.password) {
      delete updates.password;
    }

    Object.assign(user, updates);
    await user.save();

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profile: user.profile,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not update user' });
  }
};
