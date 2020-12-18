var rootUrl = window.location.origin; // get the root URL, e.g. https://example.herokuapp.com

var app = new Vue({
    el: "#app",
    data: {
 
        
        // true if the buttons were pressed within 1 second
        state_0: 0,
        state_1: 0,
        state_2: 0,
        state_3: 0,
        state_4: 0,
        state_5: 0,

        total: 0,  
        
        counter: 0,

        meldebestand: 0,

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
            console.log(ev)
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
        },
        // call the function "blinkRed" in your backend
        setCounter: function (nr) {
            var set = 0; // blinking duration in millisecond
            axios.post(rootUrl + "/api/device/" + nr + "/function/setCounter", { arg: 0 })
                .then(response => {
                    // Handle the response from the server
                    console.log(response.data); // we could to something meaningful with the return value here ...
                    
                    
                })
                .catch(error => {
                    alert("Could not call the function 'blinkRed' of device number " + nr + ".\n\n" + error)
                })
        },


        getMeldebestand: function (nr) {
            var set = 0; // blinking duration in milliseconds

            axios.get(rootUrl + "/api/device/" + nr + "/variable/meldebestand")
                .then(response => {
                    var meldebestand = response.data.result;
                    
                     this.meldebestand = meldebestand  // we could to something meaningful with the return value here ... 
                })
                .catch(error => {
                    alert("Could not call the function 'blinkRed' of device number " + nr + ".\n\n" + error)
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
        },


        getCounter: function (nr) {
            axios.get(rootUrl + "/api/device/" + nr + "/variable/counter")
                .then(response => {
                    // Handle the response from the server
                    var counter = response.data.result;
                    
                     this.counter = counter / 1000

                
                })
                .catch(error => {
                    alert("Could not read the button state of device number " + nr + ".\n\n" + error)
                })
        }
    }
})
