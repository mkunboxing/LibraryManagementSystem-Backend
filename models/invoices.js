const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    phoneNo: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    libraryId: {
        type: String,
        required: true,
        index: true,
    }
});

module.exports = mongoose.model('Invoice', InvoiceSchema)