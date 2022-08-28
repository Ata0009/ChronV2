const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  PermissionFlagsBits,
  Client,
  EmbedBuilder,
} = require("discord.js");
const { loadCommands } = require("../../Handlers/commandHandler");
const { loadEvents } = require("../../Handlers/eventHandler");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("Reloads current interactions. (DEV)")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((options) =>
      options.setName("events").setDescription("Refresh events handler.")
    )
    .addSubcommand((options) =>
      options.setName("commands").setDescription("Refresh command handler.")
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  execute(interaction, client) {
    const subCommand = interaction.options.getSubcommand();
    const eventsEmbed = new EmbedBuilder()
      .setTitle("Refresh Events")
      .setDescription(`\`\`\`✅ Successfully Reloaded Events\`\`\``)
      .setTimestamp()
      .setFooter({ text: `${interaction.member.user.tag}` });
    const commandsEmbed = new EmbedBuilder()
      .setTitle("Refresh ( / ) Commands")
      .setDescription(`\`\`\`✅ Successfully Reloaded (/) Commands\`\`\``)
      .setTimestamp()
      .setFooter({ text: `${interaction.member.user.tag}` });

    switch (subCommand) {
      case "events":
        {
          for (const [key, value] of client.events)
            client.removeListener(`${key}`, value, true);
          loadEvents(client);
          interaction.reply({ embeds: [eventsEmbed] });
        }
        break;
      case "commands":
        {
          loadCommands(client);
          interaction.reply({ embeds: [commandsEmbed] });
        }
        break;
    }
  },
};
