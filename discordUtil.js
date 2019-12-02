require('dotenv').config();
const Discord = require('discord.js');
const dateUtil = require('./dateUtil');


const bot = new Discord.Client();

const TOKEN = process.env.TOKEN;
const GUILD_ID = process.env.GUILD_ID;
const CHANNEL_ID = process.env.CHANNEL_ID;
const NO_GAME_MESSAGE = 'No game!';

async function deleteMessages(messages) {
    // delete messages older then 7 days
    console.log('Deleting messages older then 7 days...');
    await Promise.all(messages.forEach(async message => {
        if (dateUtil.getNumberOfDaysBetweenTwoDates(dateUtil.getToday(), message.createdAt) >= 7) {
            await message.delete();
        }
    }));
    bot.destroy();
}

const deleteMessagesFromChannel = channel => channel.fetchMessages().then(messages => deleteMessages(messages));

const sendMessages = (result, homeStats, visitorStats) => {
    console.log('login...');
    bot.login(TOKEN).then(() => {
        console.log("I am ready");
        const guild = bot.guilds.get(GUILD_ID);
        if(guild && guild.channels.get(CHANNEL_ID)){
            const channel = guild.channels.get(CHANNEL_ID);
            if (result !== NO_GAME_MESSAGE) {
                channel.send(result)
                .then(() => channel.send(homeStats))
                .then(() => channel.send(visitorStats))
                .then(() => deleteMessagesFromChannel(channel));
                // .then(() => bot.destroy());
            } else {
                channel.send(result)
                // .then(() => deleteMessagesFromChannel(channel));
                .then(() => bot.destroy());
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