var domain = "http://demo3.ifkreativa.com";

function getEvents() {
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
                if (!data["hasMore"])
                    $(".btn-get-events").hide();
            }
        },
        error: function (error)
        {
            alert("Greska pri citanje od server");
        }

    })
}

function getDocuments(_type) {
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
                    html += "<div class='page-blog-list'>"
                        + "<div class='page-blog-tags'><i class='ion-calendar date-icon'></i> Објавено на: " + el.publishDate + "</div><h4 class='page-blog-title'>" + el.name + "</h4>"
                        + " <div class='page-blog-list-by'> "
                                  + "<a href='http://localhost:51766" + el.link + "' class='button btn-download'><i class='ion-ios-download date-icon'></i> Превземи</a>"
                              + "</div><div class='clear'></div>"
                            + "</div><div class='decoration'></div>";

                });
                $(".blog-posts").append(html);
                if (!data["HasMore"])
                    $(".btn-get-events").hide();
            }
        }

    });
    
}


function getSkipCount() {

    return $(".page-blog-list").length > 0 ? $(".page-blog-list").length : 0;
}


function getContent(location) {
    if (location.includes("kvartalni.html"))
        getDocuments('kvartalni-izvestai');
    else if (location.includes("dokumenti.html"))
        getDocuments('povrzani-dokumenti');
    else
        getEvents();
}