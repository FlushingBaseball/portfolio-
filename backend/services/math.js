const functions ={};

functions.round2Dec = (num) => Math.round(num * 100) / 100;
functions.round4Dec = (num) => Math.round(num * 1000) / 1000;

module.exports = functions;