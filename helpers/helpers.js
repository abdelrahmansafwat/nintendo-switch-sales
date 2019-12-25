require('dotenv').config();
const Twit = require('twit');
const moment = require('moment');
const mongoose = require("mongoose");
const Sale = require("../models/Sale");

let Twitter = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

function searchForScheduled(){
  Sale.findOneAndUpdate({ posted: false }, { posted: true }).sort({ schedule: 1 }).exec((err, data) => {
    if(err) return console.error(err);
    if(data) schedule(data);
  });
}

function schedule(sale){
  let currentTime = moment();
  let scheduledTime = moment(sale.schedule);
  console.log(sale);
  setTimeout(function(){
    post(sale.sales);
    searchForScheduled();
  }, scheduledTime.diff(currentTime));

}

/*
function post(sales){
  console.log(
    `
    JUST WENT ON SALE (${moment().format("MMM.DD")})\n
    #NintendoSwitch\n\n
    ${sales.map(sale => {
        return `${sale.game} - $${sale.price} (${sale.discount}% off/${moment(sale.expiration).format("MMM.DD")})\n\n`;
    })}
    `
  );
}
*/

function post(sales){
    console.log('Posting Tweet...');
  
    Twitter.post('statuses/update', {
        status: 
        `
        JUST WENT ON SALE (${moment().format("MMM.DD")})\n
        #NintendoSwitch\n\n
        ${sales.map(sale => {
            return `${sale.game} - $${sale.price} (${sale.discount}% off/${moment(sale.expiration).format("MMM.DD")})\n\n`;
        })}
        `
      },
        function(err, data, response) {
          if (err){
            console.log('ERROR:');
            console.log(err);
          }
          else{
            console.log('Posted Tweet successfully!');
          }
        }
    );
}

module.exports.searchForScheduled = searchForScheduled;