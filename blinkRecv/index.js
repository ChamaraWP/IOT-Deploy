var gpio = require('onoff').Gpio;
import Web3 from 'web3';


export default (app) => {

    const _deviceAdd = '0x4b632886aa9aD78Bc3d60b1899CDd28B9b7f9389'
    console.log('Led Set Started Wainting for Event');
    const contract = '0xd1550ea1eae8a64e347c26fe73c9338da1c39425';
    const owner = '0x91a341b9b62aeaa849f86142bfc796622d49ba53';
    const ABI = JSON.parse('[{"constant":false,"inputs":[{"name":"usersAddr","type":"address"},{"name":"deviceAddr","type":"address"},{"name":"write","type":"bool"}],"name":"addUserToDevice","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"usersAddr","type":"address"},{"name":"deviceAddr","type":"address"},{"name":"write","type":"bool"}],"name":"changePermission","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"deviceAddr","type":"address"}],"name":"addOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"deviceAddr","type":"address"},{"name":"Dtype","type":"string"},{"name":"model","type":"string"}],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"deviceAddr","type":"address"},{"name":"data","type":"string"}],"name":"sendDataToDevice","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"manifacturer","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"deviceAddr","type":"address"}],"name":"viewUsersOfDevice","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"deviceAddr","type":"address"}],"name":"getDataFromDevice","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"deviceAddr","type":"address"}],"name":"readDeviceOutupt","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"viewAllDevicesOfUser","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"deviceAddr","type":"address"}],"name":"viewDeviceDetails","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"address"},{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"viewOwnedDevicesOfUser","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"usersAddr","type":"address"},{"name":"deviceAddr","type":"address"}],"name":"viewPermission","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"message","type":"string"}],"name":"sendDataToUsers","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_input","type":"string"},{"indexed":true,"name":"_to","type":"address"}],"name":"dataRecievedToDevice","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_output","type":"string"},{"indexed":true,"name":"_to","type":"address"}],"name":"dataSentToUsers","type":"event"}]');


    const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws'));


    const jcs = web3.currentProvider;

    const blinkContract = new web3.eth.Contract(ABI, contract);

    blinkContract.methods.viewDeviceDetails(_deviceAdd).call({ from: owner }).then(console.log);

    blinkContract.events.dataRecievedToDevice({_to:_deviceAdd},(res,err)=>{
        console.log(res);
        console.log(err);

        //  if (!error) {
        //     console.log(msg);
        //     const obj = msg.args.msgData;
        //     const numb = Number(obj);
        //     console.log("Movement Detected I will blink for "+numb+" sec");
        //     var led07 = new gpio(3, 'out');
        //     var led08 = new gpio(4, 'out');
        //     var led09 = new gpio(17, 'out');
        //     var leds = [led07, led08, led09];

        //     var counter = 0;
        //     // console.log(leds.length);
        //     let timeout = setInterval(function () {
        //         leds.forEach(function (currentValue) {
        //             currentValue.writeSync(0);
        //         });

        //         leds[counter].writeSync(1);
        //         counter++;

        //         if (counter >= (leds.length)) counter = 0;
        //         // console.log(counter);
        //     }, 200);

        //     setTimeout(() => {
        //         clearInterval(timeout);
        //     }, numb*1000);
            
        // } else {
        //     console.log(error);
        // }


    })

    return app;
}

