module.exports = {
  name: "ready",
  once: true,
  execute() {
    console.log(`Client Successfully Logged In | ChronV1 Loaded | OK 200`);
        const activities = [
      "with the &help command.",
      "with the developers console.",
      "with some code.",
      "with JavaScript."
    ];

    bot.on("ready", () => {
      // run every 10 seconds
      setInterval(() => {
        // generate random number between 1 and list length.
        const randomIndex = Math.floor(Math.random() * (activities.length - 1) + 1);
        const newActivity = activities[randomIndex];

        bot.user.setActivity(newActivity);
      }, 10000);
    });
  },
};
