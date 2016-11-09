
function Initalize()
{
    bindEvents();
}

function bindEvents()
{
    document.addEventListener('deviceready', onDeviceReady, false);
}

function onDeviceReady()
{
    receivedEvent('deviceready');
}

function receivedEvent(id)
{
    console.log('Received Event: ' + id);
    
    //callHome();
    getContent(window.location.href);
    document.addEventListener("pause", onPause, false);
    document.addEventListener("backbutton", onBackKeyDown, false);
    document.addEventListener("menubutton", onMenuKeyDown, false);
    document.addEventListener("searchbutton", onSearchKeyDown, false);
    //document.addEventListener("offline", onOffline, false);
    //document.addEventListener("online", onOnline, false);
    document.addEventListener("resume", onResume, false);

    //var pushNotification = window.plugins.pushNotification;
    //pushNotification.register(app.successHandler, app.errorHandler, { "senderID": "744083827880", "ecb": "app.onNotificationGCM" });
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
    //e.preventDefault();
    if (localStorage.page) {
        if (localStorage.page == "homepage") {
            //navigator.notification.alert("Active page is: " + localStorage.page, function () { }, "Порака", "Ok");
            if (confirm("Дали сте сигурни дека сакате да ја затворите апликацијата?")) {
                navigator.app.exitApp();
            }
        }
        else {
            //alert("Local storage page is homepage " + localStorage.page);
            //navigator.notification.alert("Active page is: " + localStorage.page + ". User will be redirected one page back", function () { }, "Порака", "Ok");
            history.go(-1);
            navigator.app.backHistory();
        }
    }
    else
    {

        alert("No local storage");
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










