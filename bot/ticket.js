const { postTicket } = require("./api");

async function ticketHandler(client, msg) {
	const content = msg.body;
	const contentSplit = content.split("\n");
	const contact = await msg.getContact();
	console.log(content);

	const title = contentSplit[0];
	const fromNumber = contact.number;
	const description = contentSplit[1];
	const file = await msg.downloadMedia();

	try {
		const response = await postTicket(title, fromNumber, description, file);

		client.sendMessage(msg.from, response.message);
	} catch (err) {
		console.log(err);
		client.sendMessage(msg.from, err.message);
	}
}

module.exports = {
	ticketHandler,
};
