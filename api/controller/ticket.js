const TicketService = require("../service/ticket");

class TicketController {
	static async addOne(req, res) {
		await TicketService.addOne(req, res);
	}

	static async getMany(req, res) {
		await TicketService.getMany(req, res);
	}
}

module.exports = TicketController;
