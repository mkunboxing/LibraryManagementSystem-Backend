const mongoose = require("mongoose");
const user = require("./user");

const StudentSchema = new mongoose.Schema(
  {
    registrationNumber: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
      unique: true,
    },
    guardianPhoneNo: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    preparationType: {
      type: String,
    },
    fee: {
      type: Number,
      required: true,
    },
    shiftTime: {
      type: String,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    libraryId: {
        type: String,
        required: true,
        index: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", StudentSchema);
