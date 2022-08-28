const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Sends the target member to the naughty corner!")
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The member you want to kick.")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("time")
        .setDescription(
          "The amount of time you want to send this user to the naughty corner for."
        )
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
    const time = interaction.options.getInteger("time");
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);

    if (!reason) reason = "Unspecified reason.";
    if (user.id === client.user.id) {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Yellow")
            .setDescription("You cannot timeout me!"),
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
              "This member has a higher role than you so I cannot timeout them."
            ),
        ],
        ephemeral: true,
      });
      return;
    }
    if (!interaction.guild.members.me.permissions.has("ModerateMembers")) {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setDescription("I do not have the permission to timeout members."),
        ],
        ephemeral: true,
      });
      return;
    }
    if (user.id === interaction.user.id) {
      interaction.reply({
        embeds: [
          embed
            .setColor("Yellow")
            .setDescription("You cannot timeout yourself!"),
        ],
        ephemeral: true,
      });
      return;
    }

    const timeout = new EmbedBuilder()
      .setTitle(`You have been timed out in ${interaction.guild.name}!`)
      .setColor("#e74c3c")
      .setDescription(
        `**Timed Out By**\n${interaction.member.user.tag}\n\n**Timeout Time** \n${interaction.createdTimestamp}\n\n**Reason**\n\`\`\`${reason}\`\`\``
      );

      await member.timeout(time * 60 * 1000, reason).catch(console.error);
    
      await user
      .send({
        embeds: [timeout],
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

    const timeoutResponse = new EmbedBuilder()
      .setTitle(`Sent ${user.tag} to the naughty corner!`)
      .setColor("#2ecc71")
      .setDescription(
        `**Timed Out By**\n${
          interaction.member.user.tag
        }\n\n**Timeout Time** \n${new Date().toLocaleString()}\n\n**Reason**\n\`\`\`${reason}\`\`\``
      );

    await interaction.reply({
      embeds: [timeoutResponse],
    });
  },
};
