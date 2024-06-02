// routes/students.js
const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// Route to get the total number of students
router.get('/count', async (req, res) => {
  try {
    const count = await Student.countDocuments({libraryId: req.user._json.email});
    res.json({ count });
  } catch (error) {
    console.error("Error fetching total students:", error);
    res.status(500).json({ error: "Error fetching total students" });
  }
});

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find({libraryId: req.user._json.email});
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a student by ID
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new student

router.post('/', async (req, res) => {
  try {
    const newStudent = new Student({
      registrationNumber: req.body.registrationNumber,
      name: req.body.name,
      fatherName: req.body.fatherName,
      gender: req.body.gender,
      dob: req.body.dob,
      phoneNo: req.body.phoneNo,
      guardianPhoneNo: req.body.guardianPhoneNo,
      email: req.body.email,
      address: req.body.address,
      qualification: req.body.qualification,
      preparationType: req.body.preparationType,
      fee: req.body.fee,
      shiftTime: req.body.shiftTime,
      pinCode: req.body.pinCode,
      district: req.body.district,
      status: req.body.status,
      libraryId: req.user._json.email,
    });

    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({ message: "Error creating student", error: error.message });
  }
});

// Update a student by ID

router.put('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) {
      return res.status(404).send({ message: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// router.patch('/:id', async (req, res) => {
//   try {
//     const student = await Student.findById(req.params.id);
//     if (!student) return res.status(404).json({ message: 'Student not found' });

//     Object.keys(req.body).forEach(key => {
//       student[key] = req.body[key];
//     });

//     const updatedStudent = await student.save();
//     res.json(updatedStudent);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });


// Delete a student by ID
router.delete('/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
