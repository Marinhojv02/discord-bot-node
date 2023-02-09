const axios = require('axios'); //import axios

class Rank{

    //https://api.kyroskoh.xyz/valorant/v1/mmr/ap/belles/huats?show=combo&display=1
    // https://api.kyroskoh.xyz/valorant/v1/mmr/[region]/[ID]/[Tag]

    async getRank(msg){
        const url = 'https://api.kyroskoh.xyz/valorant/v1/mmr';
        const showId = '?show=combo&display=1';

        let playerData = msg.content.split(' ')
        console.log(playerData)
        if(playerData.length != 5){
            msg.channel.send('Alguma informação foi passada errada')
            msg.channel.send('tente seguir o modelo: regiao nick tag')
        }

        axios.get(`${url}/${`${playerData[2]}`}/${`${playerData[3]}`}/${`${playerData[4]}`}${showId}`)
        .then((response) => {
            console.log(response.data);
            msg.channel.send(`${response.data}`)
        })
        .catch((error) => {
            console.log(error.response.status);
            if (error.response.status === 400) {
                msg.channel.send('não foi possivel encontrar o player')
            }
        });
    }
}
module.exports = new Rank()