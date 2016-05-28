$(document).ready(function(){
    $(".big-blue").on("click",function(){
        $(this).attr("placeholder","");
    });

var typingTimer;                //timer identifier
var doneTypingInterval = 300;  //time in ms, 5 second for example
var $input = $('#input-to');
//on keyup, start the countdown
$input.on('keyup', function () {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(doneTyping, doneTypingInterval);
});

//on keydown, clear the countdown 
$input.on('keydown', function () {
  clearTimeout(typingTimer);
});

//user is "finished typing," do something
function doneTyping () {
  $("#go-btn").removeClass("hide-below"); 
}

    $("#go-btn").on("click", function(e){
        $(this).remove();
        $("#title1").hide();
        $("#input-from").addClass("hide-left");
        $("#input-to").addClass("hide-right");
        $("#title2").removeClass("hide-flip").queue(function(){
            $("ul.cities").remove();
        });
        var travIcons = $("ul.vertical").children("li");
        travIcons.each(function(i){
            var t = $(this);
            setTimeout(function(){
                t.removeClass("hide-below");
            },i*200);
        }).queue(function(){
            setTimeout(function(){
                $(".load , #title2").hide();
                $("ul.vertical").css("width","500px").queue(function(){
                    $(".cost").each(function(){
                        var ldc = $(this).parent().attr("data-cost");
                        $(this).html("<h3>" + ldc + "&#8364;</h3>");
                    });
                    $(".bar").each(function(i){
                        var t = $(this), tD = t.attr("data"), tF = tD.replace('.','h ');
                            t.delay(100*(i+5)).animate({"width": tD + "%"},250*(i+7),'easeOutExpo');
                            t.after("<h3 class='time show-flip'>" + tF + "m</h3>");
                    }).queue(function(){
                        $("#title3").removeClass("hide-flip");
                    });
                });
            },2000);
        });
    });


   
});//end doc ready
