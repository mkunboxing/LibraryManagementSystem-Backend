const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// Route to get the total number of students for the logged-in user
router.get('/count', async (req, res) => {
  try {
    const libraryId = req.headers.libraryid; // Extract libraryId from request headers
    if (!libraryId) {
      return res.status(400).json({ error: 'LibraryId not provided in headers' });
    }
    const count = await Student.countDocuments({ libraryId: libraryId });
    res.json({ count });
  } catch (error) {
    console.error("Error fetching total students:", error);
    res.status(500).json({ error: "Error fetching total students" });
  }
});

// Get all students for the logged-in user
router.get('/', async (req, res) => {
  try {
    const libraryId = req.headers.libraryid; // Extract libraryId from request headers
    if (!libraryId) {
      return res.status(400).json({ error: 'LibraryId not provided in headers' });
    }

    // Find students with the given libraryId
    const students = await Student.find({ libraryId: libraryId });

    // Return the found students
    res.json(students);
  } catch (error) {
    console.error('Error fetching students by libraryId:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a student by ID for the logged-in user
router.get('/:id', async (req, res) => {
  try {
    const libraryId = req.headers.libraryid; // Extract libraryId from request headers
    if (!libraryId) {
      return res.status(400).json({ error: 'LibraryId not provided in headers' });
    }

    const student = await Student.findOne({ _id: req.params.id, libraryId: libraryId }); // Use libraryId from headers
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new student for the logged-in user
router.post('/', async (req, res) => {
  try {
    const libraryId = req.headers.libraryid; // Extract libraryId from request headers
    if (!libraryId) {
      return res.status(400).json({ error: 'LibraryId not provided in headers' });
    }

    const newStudent = new Student({
      ...req.body,
      libraryId: libraryId, // Use libraryId from headers
    });

    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({ message: "Error creating student", error: error.message });
  }
});

// Update a student by ID for the logged-in user
router.put('/:id', async (req, res) => {
  try {
    const libraryId = req.headers.libraryid; // Extract libraryId from request headers
    if (!libraryId) {
      return res.status(400).json({ error: 'LibraryId not provided in headers' });
    }

    const student = await Student.findOneAndUpdate(
      { _id: req.params.id, libraryId: libraryId }, // Use libraryId from headers
      req.body,
      { new: true }
    );
    if (!student) {
      return res.status(404).send({ message: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a student by ID for the logged-in user
router.delete('/:id', async (req, res) => {
  try {
    const libraryId = req.headers.libraryid; // Extract libraryId from request headers
    if (!libraryId) {
      return res.status(400).json({ error: 'LibraryId not provided in headers' });
    }

    await Student.findOneAndDelete({ _id: req.params.id, libraryId: libraryId }); // Use libraryId from headers
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
