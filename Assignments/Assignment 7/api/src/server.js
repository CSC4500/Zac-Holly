const express = require("express"),
    app = express(),
    host = "http://127.0.0.1",
    port = process.env.port || 3000;

const cors = require("cors");
app.use(cors());

app.listen(port, () => {
    console.log(`API server listening on: ${host}:${port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let routes = require("./routes/appRoutes.js");
routes(app);
