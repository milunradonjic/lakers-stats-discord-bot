function finalScore(homeScore, homeName, visitorScore, visitorName) {
    let res = '```';
    res = res.concat(`${homeName.padEnd(10)}: ${homeScore}\n`);
    res = res.concat(`${visitorName.padEnd(10)}: ${visitorScore}\n`);
    res = res.concat('```');
    return res;
}


function row(stats) {
    return `${stats.name.padEnd(25)} | ${stats.pos.padEnd(4)} | ${stats.min.padEnd(5)} | ${stats.pts.padEnd(3)} | ${stats.reb.padEnd(3)} | ${stats.ast.padEnd(3)} | ${stats.stl.padEnd(3)} | ${stats.blk.padEnd(3)} | ${stats.fgm.padEnd(3)} | ${stats.fga.padEnd(3)} | ${stats.fg_pct.padEnd(5)} | ${stats.fg3m.padEnd(3)} | ${stats.fg3a.padEnd(3)} | ${stats.fg3_pct.padEnd(5)} | ${stats.ftm.padEnd(3)} | ${stats.fta.padEnd(3)} | ${stats.ft_pct.padEnd(5)} |\n`;
}


function printStatsHeader() {
    const stats = {
        name: 'PLAYER', 
        pos: 'POS',
        min:  'MIN',
        pts: 'PTS',
        reb: 'REB',
        ast: 'AST',
        stl: 'STL',
        blk: 'BLK',
        fgm: 'FGM',
        fga: 'FGA',
        fg_pct: 'FG%',
        fg3m: '3PM',
        fg3a: '3PA',
        fg3_pct: '3P%',
        ftm: 'FTM',
        fta: 'FTA',
        ft_pct: 'FT%'
    }

    return row(stats);
}


function onePlayerStats(stat) {
    const statFormated = {
        name: `${stat.player.first_name} ${stat.player.last_name}`, 
        pos: stat.player.position,
        min:  stat.min,
        pts: stat.pts.toString(),
        reb: stat.reb.toString(),
        ast: stat.ast.toString(),
        stl: stat.stl.toString(),
        blk: stat.blk.toString(),
        fgm: stat.fgm.toString(),
        fga: stat.fga.toString(),
        fg_pct: stat.fg_pct.toString(),
        fg3m: stat.fg3m.toString(),
        fg3a: stat.fg3a.toString(),
        fg3_pct: stat.fg3_pct.toString(),
        ftm: stat.ftm.toString(),
        fta: stat.fta.toString(),
        ft_pct: stat.ft_pct.toString()
    }
  

    return row(statFormated);
}


function multiplePlayerStats(playerList) {
    let res = '```';
    res = res.concat(printStatsHeader());
    playerList.forEach(player => res = res.concat(onePlayerStats(player)));
    res = res.concat('```');
    return res;
}




module.exports = {
    finalScore: finalScore,
    multiplePlayerStats: multiplePlayerStats
}
