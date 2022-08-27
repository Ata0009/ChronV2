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
  async execute(interaction, client) {
      
    await interaction.reply({embeds: [new EmbedBuilder().setColor("#00A86B").setDescription(`🔍   Pinging`)]})
    const pingedEmbed = new EmbedBuilder()
      .setTitle("🏓 Pong")
      .setColor("#00A86B")
      .setDescription(
        `**🤖 Bot Latency:** \`${interaction.createdTimestamp - Date.now()}ms\`\n\n⌛ **Api Latency:** \`${Math.round(client.ws.ping)}ms\``
      )
      .setTimestamp()
      interaction.editReply({ embeds: [pingedEmbed] })
  },
};
