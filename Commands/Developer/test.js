const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
    .setName("test-embeds")
    .setDescription("tests an embed"),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    execute(interaction) {
        const testEmbed = new EmbedBuilder()
        .setTitle("📈 Embed Testing")
        .setDescription(`[+] Added (added asset) \n[+] Added ok \n[-] LOL`)
        .setTimestamp()

        interaction.reply({ embeds: [testEmbed] })
    }
  };
  