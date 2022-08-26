    const { SlashCommandBuilder, ChatInputCommandInteraction, CommandInteraction, PermissionFlagsBits } = require('discord.js')

module.exports = {
    developer: true,    
    data: new SlashCommandBuilder()
        .setName('reboot')
        .setDescription('Reboot the bot (DANGEROUS)'),
        /**
         * @param {ChatInputCommandInteraction} interaction
         */
        async execute(interaction) {
                interaction.reply({
                    content: 'Restarting . . .', ephemeral: true,
                  }).then(() => {
                    process.on('exit', () => {
                      require('child_process').spawn(process.argv.shift(), process.argv, {
                        cwd: process.cwd(),
                        detached: true,
                        stdio: 'inherit'
                      })
                    })
                    process.exit()
                 })
        }
 }
    