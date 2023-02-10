//https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/Mar%C3%AFnho/s3x

const axios = require('axios'); //import axios

class Rank{

    urls = {
        BaseApiurl :'https://br1.api.riotgames.com', 
        SeachPlayerByUsernameUrl : '/lol/summoner/v4/summoners/by-name/',
        SearchPlayerRankUrl :'/lol/league/v4/entries/by-summoner/'
    }

    getRankLol = async (msg) => {
        
        let playerData = msg.content.split(' ')
        console.log(playerData)
        if(playerData.length != 3){
            msg.channel.send('Alguma informação foi passada errada')
            msg.channel.send('tente seguir o modelo: !lol rank nick')
        }
        
        this.getPlayerData(playerData[2], msg)

    }

    getPlayerData = async (userName, msg) => {
        axios.get(`${this.urls.BaseApiurl}${this.urls.SeachPlayerByUsernameUrl}${`${userName}`}?api_key=${process.env.RIOT_API}`)
        .then((response) => {
            console.log(response.data)
            this.getPlayerRank(response.data.id, msg)
        })
        .catch((error) => {
            console.log(error)
        });
    }

    getPlayerRank = async (id, msg) => {
        axios.get(`${this.urls.BaseApiurl}${this.urls.SearchPlayerRankUrl}${id}?api_key=${process.env.RIOT_API}`)
        .then((response) => {
            res = response.data
            console.log(response.data)
            if((res).length == 0){
                msg.channel.send('Esse player ainda não tem ranque nessa temporada')
            }else if((res).length == 1){
                msg.channel.send(`Player name: ${res[0].summonerName}\n${res[0].queueType}: ${res[0].tier} ${res[0].rank}`)
            }
            else{
                msg.channel.send(`Player name: ${res[0].summonerName}\n${res[0].queueType}: ${res[0].tier} ${res[0].rank}\n${res[1].queueType}: ${res[1].tier} ${res[1].rank}`)
            }
        })
        .catch((error) => {
            console.log(error)
        });
    }
}

module.exports = new Rank()