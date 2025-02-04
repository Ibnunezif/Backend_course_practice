$("h1").addClass ("big-title margin-50");
// $("h1").html("<em>Nazif<em/>");
// $("button").html("<em>Stop<em/>");
// $("h1").click(function (){
//     $("h1").css("color","red");
// })

$("body").keypress(function (event){
    $("h1").text(event.key);
});
$("h1").on("mouseover",function (){
    $("h1").css("color","purple");
})
$("h1").on("mouseleave",function (){
    $("h1").css("color","red");
})

$("button").click(function (){
    $("h1").toggle();
});
// $("h1").hide();