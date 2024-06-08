const Invoice = require('../models/invoices');

// Get all invoices
exports.getAllInvoices = async (req, res) => {
    try {
        const libraryId = req.headers.libraryid;
        if (!libraryId) {
            return res.status(400).json({ error: 'LibraryId not provided in headers' });
        }
        const invoices = await Invoice.find({ libraryId: libraryId });
        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json({ message: "Error fetching invoices", error });
    }
};

// Get a single invoice by ID
exports.getInvoiceById = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }
        res.status(200).json(invoice);
    } catch (error) {
        res.status(500).json({ message: "Error fetching invoice", error });
    }
};

exports.revenueGenerated = async (req, res) => {
    try {
        const libraryId = req.headers.libraryid;
        if (!libraryId) {
            return res.status(400).json({ error: 'LibraryId not provided in headers' });
        }
        const invoices = await Invoice.find({ type: 'profit', libraryId: libraryId });
        const totalRevenue = invoices.reduce((total, invoice) => total + invoice.amount, 0);
        res.status(200).json({ totalRevenue });
    } catch (error) {
        console.error("Error fetching revenue:", error);
        res.status(500).json({ message: "Error fetching revenue", error });
    }
};

exports.profitGenerated = async (req, res) => {
    try {
        const libraryId = req.headers.libraryid;
        if (!libraryId) {
            return res.status(400).json({ error: 'LibraryId not provided in headers' });
        }
        const invoices = await Invoice.find({ libraryId: libraryId });
        const { totalRevenue, totalExpenses } = calculateTotalRevenueAndExpenses(invoices);
        const totalProfit = totalRevenue - totalExpenses;
        res.json({ totalProfit });
    } catch (error) {
        console.error("Error fetching profit:", error);
        res.status(500).json({ message: "Error fetching profit", error });
    }
};

// Helper function to calculate total revenue and expenses
const calculateTotalRevenueAndExpenses = (invoices) => {
    const totalRevenue = invoices
        .filter(invoice => invoice.type === 'profit')
        .reduce((total, invoice) => total + invoice.amount, 0);
    
    const totalExpenses = invoices
        .filter(invoice => invoice.type === 'expense')
        .reduce((total, invoice) => total + invoice.amount, 0);

    return { totalRevenue, totalExpenses };
};

// Create a new invoice
exports.createInvoice = async (req, res) => {
    try {
        const libraryId = req.headers.libraryid;
        if (!libraryId) {
            return res.status(400).json({ error: 'LibraryId not provided in headers' });
        }
        const newInvoice = new Invoice({ ...req.body, libraryId: libraryId });
        const savedInvoice = await newInvoice.save();
        res.status(201).json(savedInvoice);
    } catch (error) {
        res.status(400).json({ message: "Error creating invoice", error });
    }
};

// Update an existing invoice
exports.updateInvoice = async (req, res) => {
    try {
        const updatedInvoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedInvoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }
        res.status(200).json(updatedInvoice);
    } catch (error) {
        res.status(400).json({ message: "Error updating invoice", error });
    }
};

// Delete an invoice
exports.deleteInvoice = async (req, res) => {
    try {
        const deletedInvoice = await Invoice.findByIdAndDelete(req.params.id);
        if (!deletedInvoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }
        res.status(200).json({ message: "Invoice deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting invoice", error });
    }
};
