function getFileBlob(file) {
	if (!file) {
		return null;
	}
	const byteCharacters = Buffer.from(file.data, "base64").toString("binary");
	const byteArrays = [];

	for (let offset = 0; offset < byteCharacters.length; offset += 512) {
		const slice = byteCharacters.slice(offset, offset + 512);

		const byteNumbers = new Array(slice.length);
		for (let i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i);
		}

		const byteArray = new Uint8Array(byteNumbers);
		byteArrays.push(byteArray);
	}

	const blob = new Blob(byteArrays, { type: file.mimetype });
	return blob;
}

module.exports = {
	getFileBlob,
};
