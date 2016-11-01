function getEvents() {
    var take = 3;
    var skipCount = getSkipCount();
    $.ajax({
        url: "http://demo3.ifkreativa.com/api/getMessages?lang=mk&skip=" + skipCount + "&take=" + take + "",
        type: "GET",
        dataType: "jsonp",
        success: function (data) {
            if(data["status"] == "OK")
            var html = "";
            $.each(data["messages"], function (index, el) {
                html += "<div class='page-blog-list'>"
                    + "<h4 class='page-blog-title'>" + el.title + "</h4><strong class='page-blog-tags'>Објавено на: " + el.publishDate + "</strong>"
                    + "<div class='page-blog-content'><p>" + el.description + "</p>"
                + "</div><div class='clear'></div>"
                        + "</div><div class='decoration'></div>";
                        
            });
            $(".blog-posts").append(html);
            if (!data["hasMore"])
                $(".btn-get-events").hide();
        }
    })
}

function getDocuments(type) {
    var take = 3;
    var skipCount = getSkipCount();
    var apiAction = type == "povrzani-dokumenti" ? "getDocuments" : "getReports";
   
    $.ajax({
        url: "http://demo3.ifkreativa.com/api/" + apiAction + "?skip=" + skipCount + "&take=" + take + "",
        type: "GET",
        dataType: "jsonp",
        success: function (data) {
            if (data["status"] == "OK")
                var html = "";
            $.each(data["documents"], function (index, el) {
                html += "<div class='page-blog-list'>"
                    + "<h4 class='page-blog-title'>" + el.name + "</h4><strong class='page-blog-tags'>Објавено на: " + el.publishDate + "</strong>"
                    + " <div class='page-blog-list-by'> "
                              + "<a href='http://demo3.ifkreativa.com" + el.link + "' class='button button-light button-xs'>Превземи</a>"
                          + "</div><div class='clear'></div>"
                        + "</div><div class='decoration'></div>";

            });
            $(".blog-posts").append(html);
            if (!data["hasMore"])
                $(".btn-get-events").hide();
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