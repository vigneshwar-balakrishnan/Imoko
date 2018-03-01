$(document).ready(function(){
    //modal display
    $('.upload').click(function(){
        $(".modal").css("display","block");
    })
    //close 
    $('.close').click(function(){
        $(".modal").hide();//also can use hide 
    })
    //window click close
    $('.modal').click(function(){
        $('.modal, .inner').hide(); // .modal-content should work but not working
   });  
   //to stop the modal content from disappering when clicked on it                                   
   $('.modal-content').click(function(e){
      e.stopPropagation();
   }); 
    
    
 })
 