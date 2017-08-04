$(".live-pages").each(function(){

    var el = $(this)
    el.find("textarea").on("input", function(){
        var page = el.data("page")
        var files = {}

        el.find(".files section").each(function(){
            var name = $.trim($(this).find("h5").html())
            var contents = $(this).find("textarea").val()
            files[name] = contents
        })

        var request = { files: files, page: page }

        $.ajax({
            type: "POST",
            url: "/pages/eval",
            data: JSON.stringify(request),
            contentType: "application/json",
            dataType: "html"
        }).done(function(data){
            el.find(".output").html(data);
        }).fail(function(){
            el.addClass("error");
        });
    })
    .trigger("input")

})

$(".live-template").each(function(){

    var el = $(this)
    el.find("textarea").on("input", function(){

        var request = { template: el.find("textarea").val() }

        $.ajax({
            type: "POST",
            url: "/template/eval",
            data: JSON.stringify(request),
            contentType: "application/json",
            dataType: "html"
        }).done(function(data){
            el.find(".output").html(data);
        }).fail(function(){
            el.addClass("error");
        });
    })
    .trigger("input")

})

$(".linq-preview").each(function(){
    var files = {}

    var el = $(this)
    el.find("textarea").on("input", function(){
        var files = {}

        el.find(".files section").each(function(){
            var name = $.trim($(this).find("h5").html())
            var contents = $(this).find("textarea").val()
            files[name] = contents
        })

        var request = { template: el.find(".template textarea").val(), files: files }

        $.ajax({
            type: "POST",
            url: "/linq/eval",
            data: JSON.stringify(request),
            contentType: "application/json",
            dataType: "html"
        }).done(function(data){
            el.find(".output").html(data);
        }).fail(function(){
            el.addClass("error");
        });
    })
    .trigger("input")

})

$("h2,h3,h4,h5").each(function(){
    var el = $(this);

    var text = el.html();
    if (text.indexOf("<") >= 0) return;

    if (!el.attr('id')) {
        var safeName = text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-zA-Z0-9_-]+/g,"");
        el.attr('id', safeName);
    }

    el.on('click', function(){
        var id = el.attr('id');
        location.href = "#" + id;
    });
})