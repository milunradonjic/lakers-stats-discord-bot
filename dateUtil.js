
const getToday = () => new Date();

const getYesterday = () => {
    const today = new Date();
    let yesterday = new Date();
    yesterday.setDate(today.getDate() - 1 );
    yesterday = yesterday.toISOString().slice(0, 10);
    return yesterday;
}

const getNumberOfDaysBetweenTwoDates = function(date1, date2) {
    // To calculate the time difference of two dates 
    const differenceInTime = date1.getTime() - date2.getTime(); 
    // To calculate the no. of days between two dates 
    const differenceInDays = differenceInTime / (1000 * 3600 * 24); 
    return Math.floor(differenceInDays);
}

module.exports = {
    getToday: getToday,
    getYesterday: getYesterday,
    getNumberOfDaysBetweenTwoDates: getNumberOfDaysBetweenTwoDates
}