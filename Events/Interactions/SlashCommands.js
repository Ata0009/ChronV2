const { ChatInputCommandInteraction } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command)
      return interaction.reply({
        content:
          "This Command Is Unsupported, Please Contact A Developer If You Think This Is An Issue.",
        ephemeral: true,
      });

    if (command.developer && interaction.user.id !== "590474389569404929")
      return interaction.reply({
        content: "This command is only avalible to developers!",
        ephemeral: true,
      });

    command.execute(interaction, client);
  },
};
