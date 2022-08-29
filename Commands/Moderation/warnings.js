const {
  Client,
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
  PermissionFlagsBits,
  GuildMember,
} = require("discord.js");
const db = require("../../Schemas/warningDB");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("warnings")
    .setDescription("The heart of the warning system.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addSubcommand((options) =>
      options
        .setName("add")
        .setDescription("Adds a warning to the target user.")
        .addUserOption((options) =>
          options
            .setName("target")
            .setDescription("The user you want to add the warning to.")
            .setRequired(true)
        )
        .addUserOption((options) =>
          options
            .setName("reason")
            .setDescription("The reason why you want to add this warning.")
        )
    )
    .addSubcommand((options) =>
      options
        .setName("check")
        .setDescription("Checks valid warnings for the target user.")
        .addUserOption((options) =>
          options
            .setName("target")
            .setDescription("The user you want to add the warning to.")
            .setRequired(true)
        )
    )
    .addSubcommand((options) =>
      options
        .setName("remove")
        .setDescription("Removes the selected warning from the target user.")
        .addUserOption((options) =>
          options
            .setName("target")
            .setDescription("The user you want to add the warning to.")
            .setRequired(true)
        )
        .addIntegerOption((options) =>
          options
            .setName("warnid")
            .setDescription("The ID of the warning you want to remove.")
            .setRequired(true)
        )
    )
    .addSubcommand((options) =>
      options
        .setName("clear")
        .setDescription("Removes all warnings from the target user.")
        .addUserOption((options) =>
          options
            .setName("target")
            .setDescription("The user you want to add the warning to.")
            .setRequired(true)
        )
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   * @param {GuildMember} GuildMember
   */
  async execute(interaction, client, GuildMember) {
    const sub = interaction.options.getSubcommand([
      "add",
      "check",
      "remove",
      "clear",
    ]);
    const target = interaction.options.getMember("target");
    const reason =
      interaction.options.getString("reason") || "Unspecified Reason";
    const warnID = interaction.options.getInteger("warnid") + 1;
    const warnDate = new Date(interaction.createdTimestamp.toLocaleString());

    if (sub === "add") {
      db.findOne(
        {
          GuildID: interaction.guildId,
          UserID: target.id,
          UserTag: target.user.tag,
        },
        async (err, data) => {
          if (err) throw err;
          if (!data) {
            data = new db({
              GuildID: interaction.guildId,
              UserID: target.id,
              UserTag: target.user.tag,
              Content: [
                {
                  ExecuterID: interaction.member.user.id,
                  ExecuterTag: interaction.member.user.tag,
                  Reason: reason,
                  Date: warnDate,
                },
              ],
            });
          } else {
            const obj = {
              ExecuterID: interaction.member.user.id,
              ExecuterTag: interaction.member.user.tag,
              Reason: reason,
              Date: warnDate,
            };
            data.Content.push(obj);
          }
          data.save();
        }
      );

      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("Added Warning")
            .setColor("Blurple")
            .setDescription(
              `**Warning Details** \n\n**Warning Date**\n${
                new Date().toLocaleDateString
              }\n\n**Target Details**\n${target.user.tag} | ||${
                target.user.id
              }|| \n\n**WarningID**\n${warnID}\n\n**Reason**\n\`\`\`${reason}\`\`\``
            ),
        ],
      });
    } else if (sub === "check") {
      db.findOne(
        {
          GuildID: interaction.guildId,
          UserID: target.id,
          UserTag: target.user.tag,
        },
        async (err, data) => {
          if (err) throw err;
          if (data) {
            interaction.reply({
              embeds: [
                new EmbedBuilder()
                  .setTitle("Check Warnings")
                  .setColor("Blurple")
                  .setDescription(
                    `${data.Content.map(
                      (w, i) => `**Warning ID:** \`${
                        i + 1
                      }\`\n**Moderator:** \`${
                        w.ExecuterTag
                      }\`\n**Warning Date** \`${w.Date}\n**Reason** \n\`\`\`${
                        w.Reason
                      }\`\`\`
                    \n`
                    ).Join("  ")}`
                  ),
              ],
            });
          } else {
            interaction.reply({
              embeds: new EmbedBuilder()
                .setTitle("Check Warnings")
                .setDescription("No Recorded Warnings Found")
                .setTimestamp()
            });
          }
        }
      );
    } else if (sub === "remove") {
      
    } else if (sub === "clear") {
    }
  },
};
