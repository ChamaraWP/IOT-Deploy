var gpio = require('onoff').Gpio;
import Web3 from 'web3';


export default (app) => {
    console.log('Led Set Started Wainting for Event');

   
    const web3 = new Web3(new Web3.providers.HttpProvider("http://172.28.4.151:8545"));
    const coinbase = web3.eth.coinbase;
    const balance = web3.eth.getBalance(coinbase);
    const contract = '0xb0a7c05b111d1a1164c66d5debcb8f424f5c9804';
    const ABI = JSON.parse('[{"constant":true,"inputs":[],"name":"getData","outputs":[{"name":"retData","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"inData","type":"uint256"}],"name":"setData","outputs":[],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"msgData","type":"uint256"}],"name":"blinkEvent","type":"event"}]');

    const blinkContract = web3.eth.contract(ABI).at(contract);
    // web3.eth.defaultAccount = web3.eth.accounts[0];

    blinkContract.blinkEvent({}, (error, msg) => {
        if (!error) {
            console.log(msg);
            const obj = msg.args.msgData;
            const numb = Number(obj);
            console.log("Movement Detected I will blink for "+numb+" sec");
            var led07 = new gpio(3, 'out');
            var led08 = new gpio(4, 'out');
            var led09 = new gpio(17, 'out');
            var leds = [led07, led08, led09];

            var counter = 0;
            // console.log(leds.length);
            let timeout = setInterval(function () {
                leds.forEach(function (currentValue) {
                    currentValue.writeSync(0);
                });

                leds[counter].writeSync(1);
                counter++;

                if (counter >= (leds.length)) counter = 0;
                // console.log(counter);
            }, 200);

            setTimeout(() => {
                clearInterval(timeout);
            }, numb*1000);
            
        } else {
            console.log(error);
        }
    });

    return app;
}

