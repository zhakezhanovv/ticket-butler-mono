const TicketService = require("../service/ticket");

class TicketController {
	static async addOne(req, res) {
		await TicketService.addOne(req, res);
	}
}

module.exports = TicketController;
