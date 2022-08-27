const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
    .setName("dashboard")
    .setDescription("Here is the dashboard interface! Come here for help."),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    execute(interaction) {
        const testEmbed = new EmbedBuilder()
        .setTitle("☄ Dashboard")
        .setColor("#4169e1")
        .setDescription(`**📋 Changelog** \n\`\`\`[+] Pre-Alpha Release \n[-] Removed Bot Ping On Ping Command \n[+] Added Dashboard Command \n[+] Developers Menu \n[+] Moderation Commands Soon!\`\`\`
        **Welcome!**
        > 🙌 Welcome to the ChronV2 beta release!
        \n> ❓ If you are looking for the commands menu, please select the dropdown menu below!
        \n> 🔄 This dashboard will be updated with the latest changelog when updates are pushed. Please check here for the latest news and changes to accomodate for the least inconveniences.
        `)

        interaction.reply({ embeds: [testEmbed] })
    }
  };
  