// remember the last event so that we can check if two buttons were pressed within 1 second
var lastButtonPressEvent = {
    deviceId: "",
    timestamp: 0
}

// remember how many times the buttons were pressed
var buttonPressCounter = 0;



function handleChange2 (event) {
        // read variables from the event
        let ev = JSON.parse(event.data);
        let evData = ev.data; // the data from the argon event: "pressed" or "released"
        let evDeviceId = ev.coreid; // the device id
        let evTimestamp = Date.parse(ev.published_at); // the timestamp of the event
    
        // helper variables that we need to build the message to be sent to the clients
        let msg = "";
    
        if (evData === "pressed") {

            msg = "pressed";
    
/*             // check if the last two button press events were whithin 1 second
            if (evTimestamp - lastButtonPressEvent.timestamp < 1000) {
                if (evDeviceId !== lastButtonPressEvent.deviceId) {
                    sync = true;
                }
            }
    
            lastButtonPressEvent.timestamp = evTimestamp;
            lastButtonPressEvent.deviceId = evDeviceId; */
        } 
        else if (evData === "released") {
            msg = "released";
        }
        else {
            msg = "unknown state";
        }
    
        // the data we want to send to the clients
        let data = {
            message: msg,

        }
    
        // send data to all connected clients
        sendData("buttonStateChanged2", data );
    }


    function handleChange3 (event) {
        // read variables from the event
        let ev = JSON.parse(event.data);
        let evData = ev.data; // the data from the argon event: "pressed" or "released"
        let evDeviceId = ev.coreid; // the device id
        let evTimestamp = Date.parse(ev.published_at); // the timestamp of the event
    
        // helper variables that we need to build the message to be sent to the clients
        let msg = "";
    
        if (evData === "pressed") {

            msg = "pressed";
        } 
        else if (evData === "released") {
            msg = "released";
        }
        else {
            msg = "unknown state";
        }
    
        // the data we want to send to the clients
        let data = {
            message: msg,
/*             counter: buttonPressCounter,
            pressedSync: sync */
        }
    
        // send data to all connected clients
        sendData("buttonStateChanged3", data );
    }


    function handleChange4 (event) {
        // read variables from the event
        let ev = JSON.parse(event.data);
        let evData = ev.data; // the data from the argon event: "pressed" or "released"
        let evDeviceId = ev.coreid; // the device id
        let evTimestamp = Date.parse(ev.published_at); // the timestamp of the event
    
        // helper variables that we need to build the message to be sent to the clients
        let msg = "";
    
        if (evData === "pressed") {

            msg = "pressed";
    
        } 
        else if (evData === "released") {
            msg = "released";
        }
        else {
            msg = "unknown state";
        }
    

        let data = {
            message: msg,

        }
    
        // send data to all connected clients
        sendData("buttonStateChanged4", data );
    }

    function handleChange5 (event) {
        // read variables from the event
        let ev = JSON.parse(event.data);
        let evData = ev.data; // the data from the argon event: "pressed" or "released"
        let evDeviceId = ev.coreid; // the device id
        let evTimestamp = Date.parse(ev.published_at); // the timestamp of the event
    
        // helper variables that we need to build the message to be sent to the clients
        let msg = "";
    
        if (evData === "pressed") {

            msg = "pressed";
    
        } 
        else if (evData === "released") {
            msg = "released";
        }
        else {
            msg = "unknown state";
        }
    
        // the data we want to send to the clients
        let data = {
            message: msg,
        }
    
        // send data to all connected clients
        sendData("buttonStateChanged5", data );
    }

    function handleChange6 (event) {
        // read variables from the event
        let ev = JSON.parse(event.data);
        let evData = ev.data; // the data from the argon event: "pressed" or "released"
        let evDeviceId = ev.coreid; // the device id
        let evTimestamp = Date.parse(ev.published_at); // the timestamp of the event
    
        // helper variables that we need to build the message to be sent to the clients
        let msg = "";
    
        if (evData === "pressed") {

            msg = "pressed";
    
        } 
        else if (evData === "released") {
            msg = "released";
        }
        else {
            msg = "unknown state";
        }
    
        // the data we want to send to the clients
        let data = {
            message: msg,
        }
    
        // send data to all connected clients
        sendData("buttonStateChanged6", data );
    }

    function handleChange7 (event) {
        // read variables from the event
        let ev = JSON.parse(event.data);
        let evData = ev.data; // the data from the argon event: "pressed" or "released"
        let evDeviceId = ev.coreid; // the device id
        let evTimestamp = Date.parse(ev.published_at); // the timestamp of the event
    
        // helper variables that we need to build the message to be sent to the clients
        let msg = "";
    
        if (evData === "pressed") {

            msg = "pressed";
        } 
        else if (evData === "released") {
            msg = "released";
        }
        else {
            msg = "unknown state";
        }
    
        // the data we want to send to the clients
        let data = {
            message: msg,
        }
    
        // send data to all connected clients
        sendData("buttonStateChanged7", data );
    }



// react on the "buttonStateChanged" Event
function handleButtonStateChanged (event) {
    // read variables from the event
    let ev = JSON.parse(event.data);
    let evData = ev.data; // the data from the argon event: "pressed" or "released"
    let evDeviceId = ev.coreid; // the device id
    let evTimestamp = Date.parse(ev.published_at); // the timestamp of the event

    // helper variables that we need to build the message to be sent to the clients
    let sync = false;
    let msg = "";

    if (evData === "pressed") {
        buttonPressCounter++; // increase the buttonPressCounter by 1
        msg = "pressed";

        // check if the last two button press events were whithin 1 second
        if (evTimestamp - lastButtonPressEvent.timestamp < 1000) {
            if (evDeviceId !== lastButtonPressEvent.deviceId) {
                sync = true;
            }
        }

        lastButtonPressEvent.timestamp = evTimestamp;
        lastButtonPressEvent.deviceId = evDeviceId;
    } 
    else if (evData === "released") {
        msg = "released";
    }
    else {
        msg = "unknown state";
    }

    // the data we want to send to the clients
    let data = {
        message: msg,
        counter: buttonPressCounter,
        pressedSync: sync
    }

    // send data to all connected clients
    sendData("buttonStateChanged", data, evDeviceId, evTimestamp );
}

// send data to the clients.
// You don't have to change this function
function sendData(evName, evData, evDeviceId, evTimestamp ) {
    
    // map device id to device nr
    let nr = exports.deviceIds.indexOf(evDeviceId)

    // the message that we send to the client
    let data = {
        eventName: evName,
        eventData: evData,
        deviceNumber: nr,
        timestamp: evTimestamp,
    };

    // send the data to all connected clients
    exports.sse.send(data)
}

exports.deviceIds = [];
exports.sse = null;

// export your own functions here as well
//exports.handleBlinkingStateChanged = handleBlinkingStateChanged;
exports.handleButtonStateChanged = handleButtonStateChanged;
exports.handleChange2 = handleChange2;
exports.handleChange3 = handleChange3;
exports.handleChange4 = handleChange4;
exports.handleChange5 = handleChange5;
exports.handleChange6 = handleChange6;
exports.handleChange7 = handleChange7;
