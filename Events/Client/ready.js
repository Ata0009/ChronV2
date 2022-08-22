const { loadCommands } = require("../../Handlers/commandHandler");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log(`Client Successfully Logged In | ChronV1 Loaded | OK 200`);
  },
};
