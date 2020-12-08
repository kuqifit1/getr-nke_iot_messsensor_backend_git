var rootUrl = window.location.origin; // get the root URL, e.g. https://example.herokuapp.com

var app = new Vue({
    el: "#app",
    data: {
        bottle2: "unknown", // the state of the button on device 0
        buttonState3: "unknown",
        buttonState4: "unknown",
        buttonState5: "unknown",
        buttonState6: "unknown",
        buttonState7: "unknown",  // the state of the button on device 1
        buttonPressCounter: 0,    // how many times the buttons were pressed
        buttonsSync: false,       // true if the buttons were pressed within 1 second
        state_0: 0,
        state_1: 0,
        state_2: 0,
        state_3: 0,
        state_4: 0,
        state_5: 0,

        total: "0",        // true if device 0 is blinking.
        blinking_1: false, 
        // add your own variables here ...
    },
    // This function is executed once when the page is loaded.
    mounted: function () {
        this.initSse();
    },
    methods: {
        // Initialise the Event Stream (Server Sent Events)
        // You don't have to change this function
        initSse: function () {
            if (typeof (EventSource) !== "undefined") {
                var url = rootUrl + "/api/events";
                var source = new EventSource(url);
                source.onmessage = (event) => {
                    this.updateVariables(JSON.parse(event.data));
                };
            } else {
                this.message = "Your browser does not support server-sent events.";
            }
        },
        // react on events: update the variables to be displayed
        updateVariables(ev) {
            // Event "buttonStateChanged"
            if (ev.eventName === "buttonStateChanged2") {
                if (ev.eventData.message === "pressed") {
                    this.state_0 = 1;

                }else if (ev.eventData.message === "released"){

                    this.state_0 = 0;
                }
            }else if (ev.eventName === "buttonStateChanged3"){

                if (ev.eventData.message === "pressed") {
                    this.state_1 = 1;

                }else if (ev.eventData.message === "released"){

                    this.state_1 = 0;
                }

            }else if (ev.eventName === "buttonStateChanged4"){

                if (ev.eventData.message === "pressed") {
                    this.state_2 = 1;

                }else if (ev.eventData.message === "released"){

                    this.state_2 = 0;
                }

            }else if (ev.eventName === "buttonStateChanged5"){

                if (ev.eventData.message === "pressed") {
                    this.state_3 = 1;

                }else if (ev.eventData.message === "released"){

                    this.state_3 = 0;
                }

            }else if (ev.eventName === "buttonStateChanged6"){

                if (ev.eventData.message === "pressed") {
                    this.state_4 = 1;

                }else if (ev.eventData.message === "released"){

                    this.state_4 = 0;
                }

            }else if (ev.eventName === "buttonStateChanged7"){

                if (ev.eventData.message === "pressed") {
                    this.state_5 = 1;

                }else if (ev.eventData.message === "released"){

                    this.state_5 = 0;
                }

            }

          if (ev.eventName === "total") {
                
                    this.total = total;
              
                }  




            
            // Event "blinkingStateChanged"
/*             else if (ev.eventName === "blinkingStateChanged") {
                if (ev.eventData.message === "started blinking") {
                    if (ev.deviceNumber === 0) {
                        this.blinking_0 = true;
                    }
                    else if (ev.deviceNumber === 1) {
                        this.blinking_1 = true;
                    }
                }
                if (ev.eventData.message === "stopped blinking") {
                    if (ev.deviceNumber === 0) {
                        this.blinking_0 = false;
                    }
                    else if (ev.deviceNumber === 1) {
                        this.blinking_1 = false;
                    }
                }
            } */
        },
        // call the function "blinkRed" in your backend
        blinkRed: function (nr) {
            var duration = 2000; // blinking duration in milliseconds
            axios.post(rootUrl + "/api/device/" + nr + "/function/blinkRed", { arg: duration })
                .then(response => {
                    // Handle the response from the server
                    console.log(response.data); // we could to something meaningful with the return value here ... 
                })
                .catch(error => {
                    alert("Could not call the function 'blinkRed' of device number " + nr + ".\n\n" + error)
                })
        },
        // get the value of the variable "buttonState" on the device with number "nr" from your backend
        getButtonState: function (nr) {
            axios.get(rootUrl + "/api/device/" + nr + "/variable/total")
                .then(response => {
                    // Handle the response from the server
                    var total = response.data.result;
                    var bottleL;
                    // this.buttonState2 = buttonState2;

                    if (bottle2 == 1 ){

                        this.bottle2 = 0;

                    } else if ( bottle2 == 0){

                        this.bottle2 = 1; 

                     } else {
                        console.log("unknown device number: " + nr);
                    } 
                   // if (nr === 0) {
                    //}
                    /* else if (nr === 1) {
                        this.buttonState_1 = buttonState;
                    } */
/*                     else {
                        console.log("unknown device number: " + nr);
                    } */
                })
                .catch(error => {
                    alert("Could not read the button state of device number " + nr + ".\n\n" + error)
                })
        },

        getTotal: function (nr) {
            axios.get(rootUrl + "/api/device/" + nr + "/variable/total")
                .then(response => {
                    // Handle the response from the server
                    var total = response.data.result;
                    
                     this.total = total

                
                })
                .catch(error => {
                    alert("Could not read the button state of device number " + nr + ".\n\n" + error)
                })
        }
    }
})
