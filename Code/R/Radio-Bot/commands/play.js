const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    MessageEmbed,
    InteractionCollector,
    MessageActionRow,
    MessageButton
} = require('discord.js');
const fetch = require('node-fetch')
const { joinVoiceChannel, createAudioPlayer, createAudioResource, createReadStream } = require('@discordjs/voice')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays the radio in your voice channel'),
    async execute(interaction) {
        if(!interaction.member.voice.channelId) {
            return interaction.reply({content: `Please join a voice channel before adding me`, ephemeral: true})
        }
        connection = joinVoiceChannel({
            channelId: interaction.member.voice.channelId,
            guildId: interaction.guildId,
            adapterCreator: interaction.member.voice.channel.guild.voiceAdapterCreator,
        });
        
        
        let stream = createAudioResource(('RADIO STREAM HERE'), { inlineVolume: true });
        stream.volume.setVolume(1);
        
        const audio = createAudioPlayer();

        connection.subscribe(audio);
        audio.play(stream)

        await interaction.reply({ content: `RADIO NAME is now playing in your voice channel`, ephemeral: true});
    },
};