const fs = require("fs");
const Ticket = require("../model/ticket");

class TicketService {
	static async addOne(req, res) {
		const file = req.file;
		const { title, fromNumber, description } = req.body;

		const { isValid, message } = Ticket.isValid(title, fromNumber, description, file);
		if (!isValid) {
			res.send({ message });
			return;
		}

		const ticket = new Ticket(title, fromNumber, description, file?.path);

		try {
			await Ticket.addOne(ticket);
			res.send({ message: "Ticket saved" });
		} catch (err) {
			res.send({ message: "Ticket save failed" });
		}
	}

	static async getMany(req, res) {
		const tickets = await Ticket.getMany();
		res.send({ data: tickets });
	}
}

module.exports = TicketService;
