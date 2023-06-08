const { postTicket } = require("./api");

async function ticketHandler(client, msg) {
	const content = msg.body;
	const contact = await msg.getContact();

	const { command, title, description } = getTicketFromString(content);
	const fromNumber = contact.number;
	const file = await msg.downloadMedia();

	try {
		if (command != "ticket") return;

		const response = await postTicket(title, fromNumber, description, file);
		client.sendMessage(msg.from, response.message);
	} catch (err) {
		console.log(err);
		client.sendMessage(msg.from, err.message);
	}
}

function getTicketFromString(str) {
	const strSplit = str.split("\n");
	const commandMatch = strSplit[0] ? strSplit[0].match(/#(.+)/) : null;
	const command = commandMatch ? commandMatch[1].trim() : "";
	const titleMatch = strSplit[1] ? strSplit[1].match(/Title:\s*(.+)/) : "";
	const title = titleMatch ? titleMatch[1].trim() : "";
	const descriptionMatch = strSplit[2] ? strSplit[2].match(/Description:\s*(.+)/) : "";
	const description = descriptionMatch ? descriptionMatch[1].trim() : "";

	return { command, title, description };
}

module.exports = {
	ticketHandler,
};
