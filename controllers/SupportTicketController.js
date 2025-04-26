// controllers/SupportTicketController.js
const SupportTicketModel = require('../models/SupportTicket');
const logger = require('../config/logger');

const createTicket = async (req, res) => {
    try {
        const { tenantId, userId, subject, message } = req.body;
        const ticket = new SupportTicketModel({ tenantId, userId, subject, message });
        await ticket.save();
        logger.info(`Support ticket created: ${ticket._id}`);
        res.status(201).json(ticket);
    } catch (error) {
        logger.error(`Error creating support ticket: ${error.message}`);
        res.status(500).json({ message: 'Failed to create ticket' });
    }
};

const getAllTickets = async (req, res) => {
    try {
        const tickets = await SupportTicketModel.find();
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch tickets' });
    }
};

const getTicketById = async (req, res) => {
    try {
        const { tenantId, id } = req.params; // get both tenantId and ticketId
        const ticket = await SupportTicketModel.findOne({ tenantId, _id: id });

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found for this tenant' });
        }

        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch ticket', error: error.message });
    }
};


const updateTicket = async (req, res) => {
    try {
        const { tenantId, id } = req.params; 

        const ticket = await SupportTicketModel.findOneAndUpdate(
            { tenantId, _id: id },
            req.body,
            { new: true }
        );

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found for this tenant' });
        }

        res.status(200).json({ ticket, message: "Ticket updated successfully" });

    } catch (error) {
        res.status(500).json({ message: 'Failed to update ticket', error: error.message });
    }
};


const deleteTicket = async (req, res) => {
    try {
        const { tenantId, id } = req.params;  // Use id, not ticketId

        // Find and delete the ticket by tenantId and id
        const ticket = await SupportTicketModel.findOneAndDelete({ tenantId, _id: id });

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found for this tenant' });
        }

        res.status(200).json({ message: 'Ticket deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete ticket', error: error.message });
    }
};



module.exports = {
    createTicket,
    getAllTickets,
    getTicketById,
    updateTicket,
    deleteTicket,
};
