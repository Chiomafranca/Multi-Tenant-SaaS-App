// controllers/SupportTicketController.js
const SupportTicketModel = require('../models/SupportTicketModel');
const logger = require('../config/logger');

const createTicket = async (req, res) => {
    try {
        const { title, description } = req.body;
        const ticket = new SupportTicketModel({ title, description });
        await ticket.save();
        logger.info(`Support ticket created: ${ticket._id}`);  // Log ticket creation
        res.status(201).json(ticket);
    } catch (error) {
        logger.error(`Error creating support ticket: ${error.message}`);  // Log error
        res.status(500).json({ message: 'Failed to create ticket' });
    }
};

const getAllTickets = async (req, res) => {
    try {
        const tickets = await SupportTicketModel.find();
        logger.info(`Fetched all support tickets`);  // Log fetching tickets
        res.status(200).json(tickets);
    } catch (error) {
        logger.error(`Error fetching support tickets: ${error.message}`);  // Log error
        res.status(500).json({ message: 'Failed to fetch tickets' });
    }
};

const getTicketById = async (req, res) => {
    try {
        const ticket = await SupportTicketModel.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        logger.info(`Fetched ticket: ${ticket._id}`);  // Log fetching specific ticket
        res.status(200).json(ticket);
    } catch (error) {
        logger.error(`Error fetching ticket by ID: ${error.message}`);  // Log error
        res.status(500).json({ message: 'Failed to fetch ticket' });
    }
};

const updateTicket = async (req, res) => {
    try {
        const ticket = await SupportTicketModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        logger.info(`Updated ticket: ${ticket._id}`);  // Log updating ticket
        res.status(200).json(ticket);
    } catch (error) {
        logger.error(`Error updating ticket: ${error.message}`);  // Log error
        res.status(500).json({ message: 'Failed to update ticket' });
    }
};

const deleteTicket = async (req, res) => {
    try {
        const ticket = await SupportTicketModel.findByIdAndDelete(req.params.id);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        logger.info(`Deleted ticket: ${ticket._id}`);  // Log deleting ticket
        res.status(200).json({ message: 'Ticket deleted' });
    } catch (error) {
        logger.error(`Error deleting ticket: ${error.message}`);  // Log error
        res.status(500).json({ message: 'Failed to delete ticket' });
    }
};

module.exports = {
    createTicket,
    getAllTickets,
    getTicketById,
    updateTicket,
    deleteTicket,
};
