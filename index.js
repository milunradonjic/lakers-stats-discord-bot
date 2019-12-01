require('dotenv').config();
const api = require('./api');
const dateUtil = require('./dateUtil');
const discordUtil = require('./discordUtil');
const print = require('./print');
// Connect to bot

const LAKER_ID = process.env.LAKERS_ID;

const NO_GAME_MESSAGE = 'No game!';

api.getGame(dateUtil.getYesterday(), LAKER_ID).then((game) => { 
    let result = '';
    let homeStats = '';
    let visitorStats = '';

    if (!game) {
        result = NO_GAME_MESSAGE;
        discordUtil.sendMessages(result);
    } else {
        const gameId = game.id;

        const homeScore = game.home_team_score;
        const homeName = game.home_team.name;

        const visitorScore = game.visitor_team_score
        const visitorName = game.visitor_team.name;

        result = print.finalScore(homeScore, homeName, visitorScore, visitorName);

        api.getStats(gameId).then(stats => {
            const homeTeamPlayersStats = stats.filter(stat => stat.team.id === game.home_team.id);
            const visitorTeamPlayersStats = stats.filter(stat => stat.team.id === game.visitor_team.id);

            homeStats = print.multiplePlayerStats(homeTeamPlayersStats);
            visitorStats = print.multiplePlayerStats(visitorTeamPlayersStats);

            discordUtil.sendMessages(result, homeStats, visitorStats);
        });
    }
}); 



