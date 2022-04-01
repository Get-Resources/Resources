const fs = require('fs');
const chalk = require('chalk')
const { Client, Collection, MessageEmbed, Intents } = require('discord.js');
const Discord = require('discord.js');
const config = require('./config.json');
const client = new Client({ intents: Object.keys(Discord.Intents.FLAGS).filter(x => ![].includes(x)).map(x => Discord.Intents.FLAGS[x]) });

client.cmds = new Collection();
var commandsData = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (var file of commandFiles) {
    var command = require(`./commands/${file}`);
    client.cmds.set(file.split(".")[0], command);
    commandsData.push(command.data.toJSON());
}

client.once('ready', async () => {
    console.log(`${chalk.red.bold(`[RADIO NAME HERE]`)} ${chalk.greenBright(`${client.user.tag} has now connected to discord`)}`);
    client.user.setActivity(`the bot status`, { type: 'LISTENING' });
    
    (async () => {
        try {
            console.log(`${chalk.red.bold(`[RADIO NAME HERE]`)} ${chalk.yellowBright(`Now loading bot slash commands`)}`);
            
            try {
                if(config.startup.devInstance == false){
                    client.guilds.cache.forEach((guild) => {
                        guild.commands.set(commandsData);
                    })
                    console.log(`${chalk.red.bold(`[RADIO NAME HERE]`)} ${chalk.greenBright(`Loaded slash commands globally`)}`);
                }else if(config.startup.devInstance == true){
                    var devGuild = client.guilds.cache.get(config.developmentInstance.guildId)
                    devGuild.commands.set(commandsData);
                }
                console.log(`${chalk.red.bold(`[RADIO NAME HERE]`)} ${chalk.greenBright(`Loaded slash commands to dev server only`)}`);
            } catch (error){
                console.log(error)
                console.log(`${chalk.red.bold(`[RADIO NAME HERE]`)} ${chalk.greenBright(`There was an issue when loading the slash commands`)}`)
                return
            }

            
    
            
        } catch (error) {
            console.error(error);
        }
    })();
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    

    const command = client.cmds.get(interaction.commandName);

    if (!command) return;
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: `I ran into a error when running this command!`, ephemeral: true });
    }
});

try {
    if(config.startup.devInstance == false){
        client.login(config.productionInstace.token);  
    }else if(config.startup.devInstance == true){
    client.login(config.developmentInstance.token);   
    }
} catch (error){
    console.log(error)
    console.log(`${chalk.red.bold(`[RADIO NAME HERE]`)} ${chalk.greenBright(` The bot couldn't boot because of an issue`)}`)
    
}