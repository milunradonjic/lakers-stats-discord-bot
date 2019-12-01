const axios = require('axios');

// send request to get game data
function getGame(date, teamId) { 
    return axios({
        "method":"GET",
        "url":`https://free-nba.p.rapidapi.com/games?dates[]=${date}&team_ids[]=${teamId}`,
        "headers":{
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"free-nba.p.rapidapi.com",
        "x-rapidapi-key":"25adb44705mshc9d1d243031f52ap17ef65jsna7da15d00878"
        },"params":{
        "page":"0",
        "per_page":"25"
        }
    })
    .then((response)=>{
        const game = response.data.data[0]; // there can be only one game
        return game;
    })
    .catch((error)=>{
        console.log(error)
    });
}


// get stats from the game
function getStats(gameId) {
    return  axios({
        "method":"GET",
        "url":`https://free-nba.p.rapidapi.com/stats?game_ids[]=${gameId}`,
        "headers":{
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"free-nba.p.rapidapi.com",
        "x-rapidapi-key":"25adb44705mshc9d1d243031f52ap17ef65jsna7da15d00878"
        },"params":{
        "page":"0",
        "per_page":"25"
        }
    })
    .then((response)=>{
        const stats = response.data.data;
        return stats;
    })
    .catch((error)=>{
        console.log(error)
    });
}


module.exports = {
    getGame: getGame,
    getStats: getStats
}