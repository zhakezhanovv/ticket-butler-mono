const fs = require("fs");
const Ticket = require("../model/ticket");

function ticketService(req, res) {
	const file = req.file;
	const filePath = file?.path;
	const { title, fromNumber, description } = req.body;
	console.log(title, fromNumber, description, file);

	const ticketIsValid = Ticket.isValid(title, fromNumber, description, filePath);
	if (!ticketIsValid) {
		res.send({ message: "Invalid Ticket" });
		return;
	}

	const ticket = new Ticket(title, fromNumber, description, filePath);

	fs.readFile("data.json", "utf8", (err, data) => {
		if (err) {
			res.send({ message: "Ticket save failed" });
			return;
		}

		const tickets = JSON.parse(data);

		tickets.push(ticket);
		const ticketsJson = JSON.stringify(tickets);

		fs.writeFile("data.json", ticketsJson, (err) => {
			if (err) {
				res.send({ message: "Ticket save failed" });
				return;
			} else {
				res.send({ message: "Ticket saved" });
			}
		});
	});
}

module.exports = {
	ticketService,
};
