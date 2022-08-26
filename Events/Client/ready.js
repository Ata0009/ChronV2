const { loadCommands } = require("../../Handlers/commandHandler");

const mongoose = require("mongoose");
const chalk = require("chalk");

const { mongoURI } = require("../../config.json")

  module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log(`Client Successfully Logged In | ChronV1 Loaded | OK 200`);
    loadCommands(client);
    
    // MongoDB Connection ----------------------------------------------------------------------

    console.log(chalk.yellow(">>> ⏳ Connecting to MongoDB..."))

    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false
    })

    return mongoose
  },
};

mongoose.connection.on("connected", () => {
  console.log(chalk.green(">>> ✅ Connected to MongoDB"))
} )
