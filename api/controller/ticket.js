const { ticketService } = require("../service/ticket");

function ticketController(req, res) {
	ticketService(req, res);
}

module.exports = {
	ticketController,
};
