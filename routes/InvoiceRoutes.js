const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

// Get all invoices
router.get('/', invoiceController.getAllInvoices);

// Get a single invoice by ID
router.get('/:id', invoiceController.getInvoiceById);

// Create a new invoice
router.post('/', invoiceController.createInvoice);

// Update an existing invoice
router.put('/:id', invoiceController.updateInvoice);

// Delete an invoice
router.delete('/:id', invoiceController.deleteInvoice);

module.exports = router;
