const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kicks the target member")
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The member you want to kick.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("The reason for this punishment.")
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client, GuildMember) {
    const user = interaction.options.getUser("target");
    const target = interaction.options.getMember("target");
    let reason = interaction.options.getString("reason");
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);

    if (!reason) reason = "Unspecified reason.";
    if (user.id === client.user.id) {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Yellow")
            .setDescription(
              "Why are you trying to kick me? Thats not very nice!"
            ),
        ],
        ephemeral: true,
      });
      return;
    }
    if (
      target.roles.highest.position >= interaction.member.roles.highest.position
    ) {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setDescription(
              "This member has a higher role than you so I cannot kick them."
            ),
        ],
        ephemeral: true,
      });
      return;
    }
    if (!interaction.guild.members.me.permissions.has("kickMembers")) {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setDescription("I do not have the permission to kick members."),
        ],
        ephemeral: true,
      });
      return;
    }
    if (user.id === interaction.user.id) {
      interaction.reply({
        embeds: [
          embed.setColor("Yellow").setDescription("You cannot kick yourself!"),
        ],
        ephemeral: true,
      });
      return;
    }

    const kickEmbed = new EmbedBuilder()
      .setTitle(`You have been kicked from ${interaction.guild.name}!`)
      .setColor("#e74c3c")
      .setDescription(
        `**Kicked By**\n${interaction.member.user.tag}\n\n**Kick Time** \n${interaction.createdTimestamp}\n\n**Reason**\n\`\`\`${reason}\`\`\``
      );

      await member.kick(reason).catch(console.error)
    
      await user
      .send({
        embeds: [kickEmbed],
      })
      .catch(async (err) => {
        await interaction.followUp({
          embeds: [
            new EmbedBuilder()
              .setColor("Red")
              .setDescription(
                `I could not DM ${user.username} since they don't have dms on.`
              ),
          ],
          ephemeral: true,
        });
      });

    const modkickEmbed = new EmbedBuilder()
      .setTitle(`Kicked ${user.tag}`)
      .setColor("#2ecc71")
      .setThumbnail(target.user.avatarURL({ dynamic: true }))
      .setDescription(
        `**Kicked By**\n${interaction.member.user.tag}\n\n**Kick Time** \n${new Date().toLocaleString()}\n\n**Reason**\n\`\`\`${reason}\`\`\``
      );

    await interaction.reply({
      embeds: [modkickEmbed],
    });
  },
};
