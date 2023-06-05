const axios = require("axios");
const { Buffer } = require("buffer");
const { getFileBlob } = require("./util");

const API_URL = process.env.API_URL;

const instance = axios.create({
	baseURL: `${API_URL}/api`,
});

async function postTicket(title, fromNumber, description, file) {
	const blob = getFileBlob(file);

	const formData = new FormData();
	if (title) {
		formData.append("title", title);
	}
	if (fromNumber) {
		formData.append("fromNumber", fromNumber);
	}
	if (description) {
		formData.append("description", description);
	}
	if (blob) {
		formData.append("file", blob, file?.filename ?? title);
	}

	const request = await instance.post("/tickets", formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

	return request.data;
}

module.exports = {
	postTicket,
};
