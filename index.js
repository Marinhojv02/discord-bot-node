require('dotenv').config(); //initialize dotenv
const { Client, GatewayIntentBits, Partials } = require('discord.js');

const Discord = require('discord.js'); //import discord.js
const axios = require('axios'); //import axios
const { handleDice } = require('./Functions/Dice');
const { getRankValorant } = require('./Valorant/RankService');
const { getRankLol } = require('./Lol/RankService');


const client = new Discord.Client({
    intents: [
      'GatewayIntentBits.DirectMessages',
      'GatewayIntentBits.Guilds',
      'GatewayIntentBits.GuildBans',
      'GatewayIntentBits.GuildMessages',
      'GatewayIntentBits.MessageContent',
    ],
    partials: ['Partials.Channel']
  });; //create new client

//shows bot is online
client.on('ready', () => {
  console.log(`${client.user.tag} is online!`);
});

async function getMeme(){
    const res = await axios.get('https://meme-api.com/gimme');
    return res.data.url;
}

client.on('message', async (msg) => {

    if(msg.author.bot){//verifica se a mensagem é do bot para não entrar em loop
      return;
    }
    if (!msg.content.startsWith(process.env.PREFIX)){ //verifica se o prefixo do bot é utilizado
      return;
    }

    //funcionalidades
    if (msg.content.startsWith(`!roll dice`)){//gira um dado
      handleDice(msg)
    }
    if (msg.content.startsWith('!valorant rank')){
      getRankValorant(msg)
    }
    if (msg.content.startsWith('!lol rank')){
      getRankLol(msg)
    }
})

//make sure this line is the last line
client.login(process.env.CLIENT_TOKEN); //login bot using token