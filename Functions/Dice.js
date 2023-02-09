class dice{
    handleDice(msg){
        let message = msg.content.split(' ')

        if(message[2] === undefined){
            msg.channel.send(`está faltando um valor para o numero de lados do dado`)
            return;
        }
        if(isNaN(message[2]) || !Number.isInteger(Number(message[2]))){
            msg.channel.send(`você está passando um valor que não é um numero inteiro, tente novamente com um numero inteiro`)
            return;
        }
        let valor = Math.floor(Math.random() * message[2]);
        msg.channel.send(`você rolou um ${valor} de ${message[2]}`)
    }
}
module.exports = new dice