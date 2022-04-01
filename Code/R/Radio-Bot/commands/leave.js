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
        .setName('leave')
        .setDescription('Stops playing the radio in your voice channel'),
    async execute(interaction) {
        if(interaction.member.voice.channelId && interaction.guild.me.voice.channelId) {
            await interaction.guild.me.voice?.disconnect(); 
            await interaction.reply({content: `Thanks for tuning into RADIO NAME HERE`, ephemeral: true})
        }else {
            if(interaction.member.voice.channelId) {
                await interaction.reply({content: `This bot is already in a voice channel`, ephemeral: true})
            }
            else {
            await interaction.reply({content: `Please join a voice channel before trying to add me`, ephemeral: true})
            }
        }
    },
};