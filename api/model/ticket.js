class Ticket {
	constructor(title, fromNumber, description, filePath, createdAt) {
		this.createdAt = new Date(Date.now()).toString();
		this.tel = fromNumber;
		this.msg = title;
		this.description = description;
		this.fileUrl = filePath;
	}

	static isValid(title, fromNumber, description, filePath) {
		if (!title || title == "" || !fromNumber || fromNumber == "") {
			return false;
		}

		return true;
	}
}

module.exports = Ticket;
