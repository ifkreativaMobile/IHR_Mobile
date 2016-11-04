
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        //alert('bindEvents');
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },



    // Update DOM on a Received Event
    receivedEvent: function (id) {

        console.log('Received Event: ' + id);
        //LoadScripts();
        //callHome();

        document.addEventListener("pause", app.onPause, false);
        document.addEventListener("backbutton", app.onBackKeyDown, false);
        document.addEventListener("menubutton", app.onMenuKeyDown, false);
        document.addEventListener("searchbutton", app.onSearchKeyDown, false);
        document.addEventListener("offline", app.onOffline, false);
        document.addEventListener("online", app.onOnline, false);
        document.addEventListener("resume", app.onResume, false);

        //var pushNotification = window.plugins.pushNotification;
        //pushNotification.register(app.successHandler, app.errorHandler, { "senderID": "744083827880", "ecb": "app.onNotificationGCM" });

    },

    successHandler: function (result) {
        //alert('Callback Success! Result = ' + result)
    },

    errorHandler: function (error) {
        //alert(error);
    },

    onNotificationGCM: function (e) {
        //alert(JSON.stringify(e));
        switch (e.event) {
            case 'registered':
                if (e.regid.length > 0) {
                        localStorage.registerID = e.regid;
                        $("#preloader").addClass("hide");
                        jQuery.ajax({
                            url: "http://wazzzapp.net/Mobile/RegisterDevice?registerID=" + e.regid,
                            type: "GET",
                            dataType: "json",
                            data: { registerID: e.regid },
                            withCredentials: false,
                            success: function (data, status) {
                                //$("#preloader").addClass("hide");
                            },
                            error: function (error) {
                            }
                        });
                    }
                break;

            case 'message':
                //navigator.notification.alert(JSON.stringify(e), function () { }, "WazzzApp Frankfurt", "Ok");
                navigator.notification.alert(e.payload.message, function () { }, e.payload.title, "Ok");
                break;

            case 'error':
                alert('GCM error = ' + e.msg);
                break;

            default:
                alert('An unknown GCM event has occurred');
                break;
        }
    },

    onPause: function () {
        // Handle the back button
    },

    onBackKeyDown: function (e) {
        //e.preventDefault();
        if (localStorage.page) {
            if (localStorage.page == "homepage") {
                if (confirm("Дали сте сигурни дека сакате да ја затворите апликацијата?")) {
                    navigator.app.exitApp();
                }
            }
            else {
                navigator.app.backHistory()
            }
        }
    },

    onMenuKeyDown: function () {
        //Handle the menu key down button
    },

    onSearchKeyDown: function () {
        // Handle the back button
    },

    onOffline: function () {
        alert("You are offline now");
        // Handle the offline event
    },

    onOnline: function () {
        // Handle the online event
        alert("You are online now");
    },

    onResume: function () {
        // Handle resume event
        //$("#preloader").addClass("hide");
    }
};
