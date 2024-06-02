const StaffList = require('../models/staffList');

// Get all staff members
exports.getAllStaff = async (req, res) => {
  try {
    const staff = await StaffList.find({libraryId: req.user._json.email});
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single staff member by ID
exports.getStaffById = async (req, res) => {
  try {
    const staff = await StaffList.findById(req.params.id);
    if (!staff) return res.status(404).json({ message: 'Staff member not found' });
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new staff member
exports.createStaff = async (req, res) => {
  const { name, age, email, phoneNo, address, salary } = req.body;

  const newStaff = new StaffList({
    name,
    age,
    email,
    phoneNo,
    address,
    salary,
    libraryId: req.user._json.email,
  });

  try {
    const savedStaff = await newStaff.save();
    res.status(201).json(savedStaff);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a staff member by ID
exports.updateStaff = async (req, res) => {
  try {
    const updatedStaff = await StaffList.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedStaff) return res.status(404).json({ message: 'Staff member not found' });
    res.status(200).json(updatedStaff);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a staff member by ID
exports.deleteStaff = async (req, res) => {
  try {
    const deletedStaff = await StaffList.findByIdAndDelete(req.params.id);
    if (!deletedStaff) return res.status(404).json({ message: 'Staff member not found' });
    res.status(200).json({ message: 'Staff member deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
