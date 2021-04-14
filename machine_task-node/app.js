const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const users = require("./routes/users");
const auth = require("./routes/auth");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.DATABASE_ACCESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to MongoDB...."))
  .catch((error) => console.error("Could not Connect to MongoDB...", error));

app.use("/api/users", users);
app.use("/api/login", auth);

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

const port = process.env.PORT || 3500;
app.listen(port, () => console.log(`Listening on the port ${port}....`));
