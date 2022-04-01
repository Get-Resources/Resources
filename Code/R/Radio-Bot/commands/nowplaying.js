const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, InteractionCollector, MessageActionRow, MessageButton } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nowplaying')
        .setDescription('See whats currently playing on the radio'),
    async execute(interaction) {

        const getData = await fetch('https://a.rize.services/api/nowplaying/7');
        const data = await getData.json();

        console.log(data)

        var currentdj
        var dj = `${data.live.streamer_name}`
        if (dj === ""){
            currentdj = "RADIO NAME HERE"
        }else{

        currentdj = `${data.live.streamer_name}`

    }
        const Embed = new MessageEmbed()
        .setColor('BLACK') 
        .setThumbnail(data.now_playing.song.art)
        .setAuthor(`🎙️ ${currentdj} is currently live!`)
        .addField('Now Playing', `${data.now_playing.song.title} by ${data.now_playing.song.artist}`)
        .addField('Listeners', `${data.listeners.total}`, true)

        await interaction.reply({ embeds: [Embed] })
    },
};