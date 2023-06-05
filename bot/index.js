const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const dotenv = require("dotenv");
dotenv.config();
const { ticketHandler } = require("./ticket");

const client = new Client({
	authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
	qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
	console.log("client is ready");
});

client.on("message", async (msg) => {
	await ticketHandler(client, msg);
});

client.initialize();
