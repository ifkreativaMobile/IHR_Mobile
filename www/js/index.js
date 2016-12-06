
function onPushwooshInitialized(pushNotification) {

    //if you need push token at a later time you can always get it from Pushwoosh plugin
    pushNotification.getPushToken(
        function (token) {
            console.info('push token: ' + token);
        }
    );

    //and HWID if you want to communicate with Pushwoosh API
    pushNotification.getPushwooshHWID(
        function (token) {
            console.info('Pushwoosh HWID: ' + token);
        }
    );

    //settings tags
    pushNotification.setTags({
        tagName: "tagValue",
        intTagName: 10
    },
        function (status) {
            console.info('setTags success: ' + JSON.stringify(status));
        },
        function (status) {
            console.warn('setTags failed');
        }
    );

    pushNotification.getTags(
        function (status) {
            console.info('getTags success: ' + JSON.stringify(status));
        },
        function (status) {
            console.warn('getTags failed');
        }
    );

    //start geo tracking.
    //pushNotification.startLocationTracking();
}

function initPushwoosh() {
    var pushNotification = cordova.require("pushwoosh-cordova-plugin.PushNotification");

    //set push notifications handler
    document.addEventListener('push-notification',
        function (event) {
            var message = event.notification.message;
            var userData = event.notification.userdata;

            document.getElementById("pushMessage").innerHTML = message + "<p>";
            document.getElementById("pushData").innerHTML = JSON.stringify(event.notification) + "<p>";

            //dump custom data to the console if it exists
            if (typeof (userData) != "undefined") {
                console.warn('user data: ' + JSON.stringify(userData));
            }
        }
    );

    //initialize Pushwoosh with projectid: "GOOGLE_PROJECT_ID", appid : "PUSHWOOSH_APP_ID". This will trigger all pending push notifications on start.
    //pushNotification.onDeviceReady({
    //    projectid: "60756016005",
    //    appid: "4FC89B6D14A655.46488481",
    //    serviceName: ""
    //});

    pushwoosh.onDeviceReady({
        appid: "1ED35-90D1C",
        projectid: "622748095704",
        serviceName: ""
    });

    //register for push notifications
    pushNotification.registerDevice(
        function (status) {
            document.getElementById("pushToken").innerHTML = status.pushToken + "<p>";
            onPushwooshInitialized(pushNotification);
        },
        function (status) {
            alert("failed to register: " + status);
            console.warn(JSON.stringify(['failed to register ', status]));
        }
    );
}

function Initalize() {
    bindEvents();
}

function bindEvents() {
    document.addEventListener('deviceready', onDeviceReady, false);
}

function onDeviceReady() {
    receivedEvent('deviceready');
    initPushwoosh();
}

function receivedEvent(id) {

    console.log('Received Event: ' + id);
    localStorage.platform = device.platform;

    getContent(window.location.href);
    document.addEventListener("pause", onPause, false);
    document.addEventListener("backbutton", onBackKeyDown, false);
    document.addEventListener("menubutton", onMenuKeyDown, false);
    document.addEventListener("searchbutton", onSearchKeyDown, false);
    document.addEventListener("offline", onOffline, false);
    document.addEventListener("online", onOnline, false);
    document.addEventListener("resume", onResume, false);
}


function onNotificationGCM(e) {
    //alert(JSON.stringify(e));
    //switch (e.event) {
    //    case 'registered':
    //        if (e.regid.length > 0) {
    //                localStorage.registerID = e.regid;
    //                $("#preloader").addClass("hide");
    //                jQuery.ajax({
    //                    url: "http://wazzzapp.net/Mobile/RegisterDevice?registerID=" + e.regid,
    //                    type: "GET",
    //                    dataType: "json",
    //                    data: { registerID: e.regid },
    //                    withCredentials: false,
    //                    success: function (data, status) {
    //                        //$("#preloader").addClass("hide");
    //                    },
    //                    error: function (error) {
    //                    }
    //                });
    //            }
    //        break;

    //    case 'message':
    //        //navigator.notification.alert(JSON.stringify(e), function () { }, "WazzzApp Frankfurt", "Ok");
    //        navigator.notification.alert(e.payload.message, function () { }, e.payload.title, "Ok");
    //        break;

    //    case 'error':
    //        alert('GCM error = ' + e.msg);
    //        break;

    //    default:
    //        alert('An unknown GCM event has occurred');
    //        break;
    //}
}

function onPause() {
    // Handle the back button
}

function onBackKeyDown(e) {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (localStorage.page) {
        if (localStorage.page == "homepage") {
            if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {

            }
            else if (confirm("Дали сте сигурни дека сакате да ја затворите апликацијата?")) {
                navigator.app.exitApp();
            }
        }
        else {
            if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
                // IOS DEVICE
                history.go(-2);
            } else if (userAgent.match(/Android/i)) {
                // ANDROID DEVICE
                history.go(-1);
                navigator.app.backHistory();
            } else {
                // EVERY OTHER DEVICE
                history.go(-1);
                history.go(-1);
            }
        }
    }
    else {

    }
}

function onMenuKeyDown() {
    //Handle the menu key down button
}

function onSearchKeyDown() {
    // Handle the back button
}

function onOffline() {
    //alert("You are offline now");
    // Handle the offline event
}

function onOnline() {
    // Handle the online event
    //alert("You are online now");
}

function onResume() {
    // Handle resume event
    //$("#preloader").addClass("hide");
}

//function initPushwoosh() {
//    var pushwoosh = cordova.require("pushwoosh-cordova-plugin.PushNotification");

//    // Should be called before pushwoosh.onDeviceReady
//    document.addEventListener('push-notification', function (event) {
//        var notification = event.notification;
//        // handle push open here
//    });

//    // Initialize Pushwoosh. This will trigger all pending push notifications on start.
//    pushwoosh.onDeviceReady({
//        appid: "1ED35-90D1C",
//        projectid: "1:622748095704:android:1300ad8e1fffc1ce",
//        serviceName: "PushWoosh"
//    });
//}








