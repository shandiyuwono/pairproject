function dayCalculation(arrival,checkout) {
    const date1 = new Date(arrival);
    const date2 = new Date(checkout);
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
 
    return diffDays
}

module.exports = dayCalculation