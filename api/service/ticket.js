const fs = require("fs");
const Ticket = require("../model/ticket");

class TicketService {
  static async addOne(req, res) {
    const file = req.file;
    const filePath = file?.path;
    const { title, fromNumber, description } = req.body;

    const ticketIsValid = Ticket.isValid(
      title,
      fromNumber,
      description,
      filePath
    );
    if (!ticketIsValid) {
      res.status(400).send({ message: "Invalid Ticket" });
      return;
    }

    const ticket = new Ticket(title, fromNumber, description, filePath);

    try {
      const tickets = await Ticket.getMany();

      tickets.push(ticket);
      console.log(tickets);

      await Ticket.addMany(tickets);

      res.status(200).send({ message: "Ticket saved" });
    } catch (err) {
      res.status(500).send({ message: "Ticket save failed" });
    }
  }

  static async getMany(req, res) {
    const tickets = await Ticket.getMany();
    res.status(200).send({ data: tickets });
  }
}

module.exports = TicketService;
