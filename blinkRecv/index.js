var gpio = require('onoff').Gpio;
import Web3 from 'web3';


export default (app) => {

    const _deviceAdd = '0x504A7321B0ce05a8d83F806fF149ceDa1D730169'
    console.log('Led Set Started Wainting for Event');
    const contract = '0x6df11d7aa894df04338eb3252b3247a8b488d922';
    const owner = '0xa6D5DDDC4E38Ff2851501FE80042355b3e5E67c4';
    const ABI = JSON.parse('[{"constant":false,"inputs":[{"name":"usersAddr","type":"address"},{"name":"deviceAddr","type":"address"},{"name":"write","type":"bool"}],"name":"addUserToDevice","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"usersAddr","type":"address"},{"name":"deviceAddr","type":"address"},{"name":"write","type":"bool"}],"name":"changePermission","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"deviceAddr","type":"address"}],"name":"addOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"deviceAddr","type":"address"},{"name":"Dtype","type":"string"},{"name":"model","type":"string"}],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"deviceAddr","type":"address"},{"name":"data","type":"string"}],"name":"sendDataToDevice","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"manifacturer","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"deviceAddr","type":"address"}],"name":"viewUsersOfDevice","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"deviceAddr","type":"address"}],"name":"getDataFromDevice","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"deviceAddr","type":"address"}],"name":"readDeviceOutupt","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"viewAllDevicesOfUser","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"deviceAddr","type":"address"}],"name":"viewDeviceDetails","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"address"},{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"viewOwnedDevicesOfUser","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"usersAddr","type":"address"},{"name":"deviceAddr","type":"address"}],"name":"viewPermission","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"message","type":"string"}],"name":"sendDataToUsers","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_input","type":"string"},{"indexed":true,"name":"_to","type":"address"}],"name":"dataRecievedToDevice","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_output","type":"string"},{"indexed":true,"name":"_to","type":"address"}],"name":"dataSentToUsers","type":"event"}]');
    var status = false;
    var bulb="";
    var action="";
    var leds;
    var led07;
    var led08;
    var led09;
    var led10;
    const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws'));


    const jcs = web3.currentProvider;

    const blinkContract = new web3.eth.Contract(ABI, contract);

    //blinkContract.methods.viewDeviceDetails(_deviceAdd).call({ from: owner }).then(console.log);

    console.log("Device Status : Off");
    blinkContract.events.dataRecievedToDevice({ _to: _deviceAdd }, (err, res) => {
        console.log(res);
        

        try {
            action = res.returnValues[0];
             console.log(action);
        } catch (error) {
             console.log(error);
        }
        
        console.log(action);


        if (action === "on" && !status) {
            status = true;
            led07 = new gpio(3, 'out');
            led08 = new gpio(4, 'out');
            led09 = new gpio(17, 'out');
            led10 = new gpio(27, 'out');
            let interval = setInterval(function () { deviceOn(led08) }, 150);
            setTimeout(function () { deviceOff(led08, interval) }, 3000);
            console.log("Device Status : On");

        }
        else if (action === "off") {
            status = false;
            led07.unexport();
            led08.unexport();
            led09.unexport();
            led10.unexport();
            console.log("Device Status : Off");
            

        }
        
        })

        blinkContract.events.dataSentToUsers({ _to: _deviceAdd }, (err, res) => {
            try {
                bulb = res.returnValues[0];
                console.log(res);
            } catch (error) {
               console.log(error); 

            }
           
           if (bulb === "green" && status) {
                console.log("inside green");
                let counter = 0;
                leds = [led07, led09];
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
                    led07.writeSync(0);
                    led09.writeSync(0);
                }, 5000);

            }
            else if (bulb === "red" && status) {

                let counter = 0;
                leds = [led08, led10];
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
                    led08.writeSync(0);
                    led10.writeSync(0);
                }, 5000);

            }
        })
    

    function blinkLeds(ledArry) {

        let counter = 0;
        // leds = [led08];
        let timeout = setInterval(function () {
            ledArry.forEach(function (currentValue) {
                currentValue.writeSync(0);
            });

            ledArry[counter].writeSync(1);
            counter++;

            if (counter >= (ledArry.length)) counter = 0;
            console.log(counter);
        }, 200);

        setTimeout(() => {
            clearInterval(timeout);
        }, 5000);

    }

    function deviceOn(LED) {
        if (LED.readSync() === 0) { //check the pin state, if the state is 0 (or off)
            LED.writeSync(1); //set pin state to 1 (turn LED on)
        } else {
            LED.writeSync(0); //set pin state to 0 (turn LED off)
        }
    }

    function deviceOff(LED, interval) {
        //function to stop blinking
        clearInterval(interval); // Stop blink intervals
        LED.writeSync(0); // Turn LED off
        //LED.unexport(); // Unexport GPIO to free resources

    }

    return app;
}

