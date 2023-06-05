const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.get("/api/health", (req, res) => {
	res.send("App is running");
});

app.listen(PORT, () => {
	console.log(`App is listening on port ${PORT}`);
});
