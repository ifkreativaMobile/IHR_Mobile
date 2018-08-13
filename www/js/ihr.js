var domain = "http://ihr.ifkreativa.com";

function DownloadAndUpdateHit(guid, link)
{
    window.open(link, '_system');
    var uuid = device.uuid;
    $.ajax({
        //url: domain + "/api/updateHits",
        //data: JSON.stringify({ guid: guid, uuid: device.uuid}),
        url: domain + "/api/updateHits?guid=" + guid + "&uuid=" + uuid,
        type: "POST",
        dataType: "jsonp",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data == "success")
                UpdateNumber(guid);
            //if (data["status"] == "fail")
            //    alert("Превземањето не е евидентирано.");
            //else if (data["status"] == "success")
            //    alert("Презвемањето е евидентирано.");
        },
        error: function (e) {
            alert(e.responseText);
        }
    })
}

function getBrief() {
    $(".loading-wrap").removeClass("hidden");
    var take = 3;
    var skipCount = getSkipCount();
    $.ajax({
        url: domain + "/api/getBrief?lang=mk&skip=" + skipCount + "&take=" + take + "",
        type: "GET",
        dataType: "jsonp",
        success: function (data) {
            if (data["status"] == "OK") {
                var html = "";
                $.each(data["messages"], function (index, el) {
                    html += "<div class='page-blog-list'>"
                        + "<div class='page-blog-tags'><i class='ion-calendar date-icon'></i> Објавено на: " + el.publishDate + "</div><h4 class='page-blog-title'>" + el.title + "</h4>"
                        + "<div class='page-blog-content'><p>" + el.description + "</p>"
                        + "</div><div class='clear'></div>"
                            + "</div><div class='decoration'></div>";

                });
                $(".blog-posts").append(html);
                $(".loading-wrap").addClass("hidden");
                if (!data["hasMore"])
                    $(".btn-get-events").hide();
            }
            else
            {
                var html = "";
                $(".loading-wrap").addClass("hidden");
                html += "Во моментов нема бриф информации за приказ";
                $(".blog-posts").append(html);
                $(".btn-get-events").hide();
            }
        },
        error: function (error) {
            showNoNetwork();
        }

    })
}

function getEvents() {
    $(".loading-wrap").removeClass("hidden");
    var take = 3;
    var skipCount = getSkipCount();
    $.ajax({
        url: domain + "/api/getMessages?lang=mk&skip=" + skipCount + "&take=" + take + "",
        type: "GET",
        dataType: "jsonp",
        success: function (data) {
            if (data["status"] == "OK") {
                var html = "";
                $.each(data["messages"], function (index, el) {
                    html += "<div class='page-blog-list'>"
                        + "<div class='page-blog-tags'><i class='ion-calendar date-icon'></i> Објавено на: " + el.publishDate + "</div><h4 class='page-blog-title'>" + el.title + "</h4>"
                        + "<div class='page-blog-content'><p>" + el.description + "</p>"
                        + "</div><div class='clear'></div>"
                            + "</div><div class='decoration'></div>";

                });
                $(".blog-posts").append(html);
                $(".loading-wrap").addClass("hidden");
                if (!data["hasMore"])
                    $(".btn-get-events").hide();
            }
        },
        error: function (error)
        {
            showNoNetwork();
        }

    })
}

function getDocuments(_type) {
    $(".loading-wrap").removeClass("hidden");
    var take = 3;
    var skipCount = getSkipCount();
    var apiAction = _type == "povrzani-dokumenti" ? "getDocuments" : "getReports";
   
    $.ajax({
        url: domain + "/api/" +  apiAction + "?skip=" + skipCount + "&take=" + take + "",
        type: "GET",
        dataType: "jsonp",
        success: function (data) {
            if (data["status"] == "OK") {
                var html = "";
                $.each(data["documents"], function (index, el) {
                    html += '<div class="page-blog-list">' +
                                '<div class="page-blog-tags"><i class="ion-calendar date-icon"></i> Објавено на: ' + el.publishDate + '</div>' +
                                '<h4 class="page-blog-title">' + el.name + '</h4>' +
                                '<div class="page-blog-list-by">' +
                                    '<a class="button btn-download" onClick="DownloadAndUpdateHit(\'' + el.guid + '\',\'' + domain + el.link + '\')"><i class="ion-ios-download date-icon"></i> Превземи</a>' +
                                '</div>' +
                                '<div class="clear"></div>' +
                                //'<div class="">вкупно превземања: <span class="doc-' + el.guid + '">' + el.hits + '</span></div>' +
                            '</div>' +
                            '<div class="decoration"></div>';

                });
                $(".loading-wrap").addClass("hidden");
                $(".blog-posts").append(html);

                if (!data["HasMore"])
                    $(".btn-get-events").hide();
            }
        },
        error: function (error) {
            showNoNetwork();
        }
    });
    
}

function getSkipCount() {
    return $(".page-blog-list").length > 0 ? $(".page-blog-list").length : 0;
}

function getContent(location) {
    if (location.includes("kvartalni.html")) {
        localStorage.page = "kvartalni";
        getDocuments('kvartalni-izvestai');
    }
    else if (location.includes("dokumenti.html")) {
        localStorage.page = "povrzani-dokumenti";
        getDocuments('povrzani-dokumenti');
    }
    else if (location.includes("events.html")) {
        //localStorage.page = "homepage";
        localStorage.page = "events";
        getEvents();
    }
    else
    {
        getBrief();
        localStorage.page = "homepage";
    }
}

function showNoNetwork() {
    navigator.notification.alert(
        'Во моментов немате активна интернет конекција. Вклучете интернет и стиснете ок.',  // message
        onNoNetworkConfirm,              // callback to invoke with index of button pressed
        'Порака',            // title
        'ОК'          // buttonLabels
    );
}

function onNoNetworkConfirm() {
    getContent(window.location.href);
}

function UpdateNumber(guid)
{
    var number = parseInt($(".doc-" + guid).text());
    number = number + 1;
    $(".doc-" + guid).text(number);
}