// controllers/SupportTicketController.js
const SupportTicketModel = require('../models/SupportTicket');
const logger = require('../config/logger');
const { default: mongoose } = require('mongoose');

const createTicket = async (req, res) => {
  try {
    const { tenantId } = req.params;

    const { subject, message } = req.body;

    const ticket = new SupportTicketModel({
      tenantId,
      userId: req.user._id,
      subject,
      message,
    });
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
    const { id } = req.params; // get both tenantId and ticketId
    const ticket = await SupportTicketModel.findById(id);

    if (!ticket) {
      return res
        .status(404)
        .json({ message: 'Ticket not found for this tenant' });
    }

    res.status(200).json(ticket);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to fetch ticket', error: error.message });
  }
};

// const updateTicket = async (req, res) => {
//   try {
//     const { id } = req.params;

//     console.log(req.body);

//     const ticket = await SupportTicketModel.findOneAndUpdate(
//       { _id: id },
//       req.body
//     );

//     if (!ticket) {
//       return res
//         .status(404)
//         .json({ message: 'Ticket not found for this tenant' });
//     }

//     res.status(200).json({ ticket, message: 'Ticket updated successfully' });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: 'Failed to update ticket', error: error.message });
//   }
// };

const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Validate the ID format if needed (example for MongoDB ObjectId)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ticket ID format' });
    }

    const updatedTicket = await SupportTicketModel.findOneAndUpdate(
      { _id: id },
      updateData,
      {
        new: true, // Return the updated document
        runValidators: true, // Run model validators on update
      }
    ).lean();

    if (!updatedTicket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.status(200).json({
      ticket: updatedTicket,
      message: 'Ticket updated successfully',
    });
  } catch (error) {
    console.error('Error updating ticket:', error);
    res.status(500).json({
      message: 'Failed to update ticket',
      error:
        process.env.NODE_ENV === 'development'
          ? error.message
          : 'Internal server error',
    });
  }
};

const deleteTicket = async (req, res) => {
  try {
    const { tenantId, id } = req.params; // Use id, not ticketId

    // Find and delete the ticket by tenantId and id
    const ticket = await SupportTicketModel.findOneAndDelete({
      tenantId,
      _id: id,
    });

    if (!ticket) {
      return res
        .status(404)
        .json({ message: 'Ticket not found for this tenant' });
    }

    res.status(200).json({ message: 'Ticket deleted' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to delete ticket', error: error.message });
  }
};

module.exports = {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
};
