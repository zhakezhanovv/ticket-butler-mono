const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

class Ticket {
	static #dataPath = "data.json";
	static #dataType = "utf8";

	constructor(title, fromNumber, description, filePath) {
		this.id = uuidv4();
		this.createdAt = new Date(Date.now()).toISOString();
		this.tel = fromNumber;
		this.msg = title;
		if (description != "") {
			this.description = description;
		}
		if (filePath != "") {
			this.fileUrl = filePath;
		}
	}

	static isValid(title, fromNumber, description, file) {
		if (!title || title == "") {
			return { isValid: false, message: "Invalid title" };
		}
		if (!fromNumber || fromNumber == "") {
			return { isValid: false, message: "Your number is not a valid number" };
		}
		if (!!description && description != "" && description.split(" ").length < 2) {
			return { isValid: false, message: "Invalid description" };
		}
		if (!!file && (!file.filename || file.filename == "" || !file.path)) {
			return { isValid: false, message: "Invalid file" };
		}

		return { isValid: true, message: "" };
	}

	static getMany() {
		return new Promise((resolve, reject) => {
			fs.readFile(this.#dataPath, this.#dataType, (err, data) => {
				if (err) {
					reject(err);
				}

				try {
					const tickets = JSON.parse(data);
					resolve(tickets);
				} catch (err) {
					reject(err);
				}
			});
		});
	}

	static addMany(tickets) {
		return new Promise((resolve, reject) => {
			try {
				const ticketsJson = JSON.stringify(tickets);

				fs.writeFile(this.#dataPath, ticketsJson, (err) => {
					if (err) {
						reject(err);
					}

					resolve();
				});
			} catch (err) {
				reject(err);
			}
		});
	}

	static async addOne(ticket) {
		try {
			const tickets = await Ticket.getMany();
			const findIndex = tickets.findIndex(
				(item) => ticket.msg == item?.msg && ticket.tel == item?.tel
			);
			if (findIndex == -1) {
				tickets.push(ticket);
				await Ticket.addMany(tickets);

				return tickets;
			} else {
				const findTicket = tickets[findIndex];
				const updatedAt = new Date(Date.now()).toISOString();
				tickets[findIndex] = {
					...findTicket,
					description: ticket.description,
					fileUrl: ticket.fileUrl,
					updatedAt,
				};
				await Ticket.addMany(tickets);

				return tickets;
			}
		} catch (err) {
			throw new Error(err);
		}
	}
}

module.exports = Ticket;
