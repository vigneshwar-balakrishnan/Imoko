$(document).ready(function(){
    //modal display
    $('.upload').click(function(){
        $(".modal").css("display","block");
    })
    //close 
    $('.close').click(function(){
        $(".modal").hide();//also can use hide 
    })
    //window not working please check !!!
    $(window).click(function(e){
        if (e.target == $("modal")) {
        $(".modal").css("display","none");
        }
    })
    
 })
 