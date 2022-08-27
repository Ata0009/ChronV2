const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bans the target member")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The member you want to ban.")
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
    if (user.id === interaction.user.id) {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Yellow")
            .setDescription("You cannot ban yourself!"),
        ],
        ephemeral: true,
      });
      return;
    }
    if (user.id === client.user.id) {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Yellow")
            .setDescription(
              "Why are you trying to ban me? Thats not very nice!"
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
              "This member has a higher role than you so I cannot ban them."
            ),
        ],
        ephemeral: true,
      });
      return;
    }
    if (!interaction.guild.members.me.permissions.has("BanMembers")) {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setDescription("I do not have the permission to ban members."),
        ],
        ephemeral: true,
      });
      return;
    }

    const banEmbed = new EmbedBuilder()
      .setTitle(`You have been banned from ${interaction.guild.name}!`)
      .setColor("#e74c3c")
      .setDescription(
        `**Banned By**\n${interaction.member.user.tag}\n\n**Ban Time** \n${new Date().toLocaleString()}\n\n**Reason**\n\`\`\`${reason}\`\`\``
      );

    await target
      .send({
        embeds: [banEmbed],
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


    await member
      .ban({
        days: 1,
        reason: reason,
      })
      .catch(console.error);

    const modbanEmbed = new EmbedBuilder()
      .setTitle(`Banned ${user.tag}`)
      .setColor("#2ecc71")
      .setDescription(
        `**Banned By**\n${interaction.member.user.tag}\n\n**Ban Time** \n${new Date().toLocaleString()}\n\n**Reason**\n\`\`\`${reason}\`\`\``
      );

    await interaction.reply({
      embeds: [modbanEmbed],
    });
  },
};
