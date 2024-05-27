// routes/students.js
const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
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
  const student = new Student({
    registrationNumber: req.body.registrationNumber,
    name: req.body.name,
    age: req.body.age,
    phoneNo: req.body.phoneNo,
    email: req.body.email,
    address: req.body.address,
    preparationType: req.body.preparationType,
    fee: req.body.fee,
    time: req.body.time,
    status: req.body.status,
  });

  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
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
