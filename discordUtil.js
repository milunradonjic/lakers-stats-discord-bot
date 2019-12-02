require('dotenv').config();
const Discord = require('discord.js');
const dateUtil = require('./dateUtil');


const bot = new Discord.Client();

const TOKEN = process.env.TOKEN;
const GUILD_ID = process.env.GUILD_ID;
const CHANNEL_ID = process.env.CHANNEL_ID;
const NO_GAME_MESSAGE = 'No game!';

async function deleteMessage(message) {
    if (dateUtil.getNumberOfDaysBetweenTwoDates(dateUtil.getToday(), message.createdAt) >= 0) {
        await message.delete();
    }
}

async function deleteMessages(messages) {
    // delete messages older then 7 days
    console.log('Deleting messages older then 7 days...');
    let promises = messages.map(deleteMessage);
    await Promise.all(promises);
    bot.destroy();
}

const deleteMessagesFromChannel = channel => channel.fetchMessages().then(messages => deleteMessages(messages));

const sendMessages = (result, homeStats, visitorStats) => {
    console.log('login...');
    bot.login(TOKEN).then(async () => {
        console.log("I am ready");
        const guild = bot.guilds.get(GUILD_ID);
        if(guild && guild.channels.get(CHANNEL_ID)){
            const channel = guild.channels.get(CHANNEL_ID);
            if (result !== NO_GAME_MESSAGE) {
                // channel.send(result)
                // .then(() => channel.send(homeStats))
                // .then(() => channel.send(visitorStats))
                // .then(() => deleteMessagesFromChannel(channel));
                await channel.send(result)
                await channel.send(homeStats)
                await channel.send(visitorStats)
                deleteMessagesFromChannel(channel);
            } else {
                await channel.send(result);
                deleteMessagesFromChannel(channel);
            }
        } else {
            console.log("nope");
            bot.destroy();
        }
    });
}


module.exports = {
    sendMessages: sendMessages
}