const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("ping").setDescription("Pong!"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction, client) {
    const PingEmbed = new EmbedBuilder()
      .setColor("#00A86B")
      .setTitle("🏓 Pong!")
      .setDescription(`⌛ **Api Latency:** \`${Math.round(client.ws.ping)}ms\``)
      .setTimestamp();
    //Seperator ---------------------------------------------------------------------------
    interaction.reply({ embeds: [PingEmbed] });
  },
};
