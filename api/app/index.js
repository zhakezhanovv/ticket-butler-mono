const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const multer = require("multer");
const { ticketController } = require("../controller/ticket");

const PORT = process.env.PORT || 8000;

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/");
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage });

const app = express();

app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.post("/api/tickets", upload.single("file"), (req, res) => {
	ticketController(req, res);
});

app.get("/api/health", (req, res) => {
	res.send("App is running");
});

app.listen(PORT, () => {
	console.log(`App is listening on port ${PORT}`);
});
