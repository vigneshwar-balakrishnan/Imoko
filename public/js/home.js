$(document).ready(function () {
    //modal display
    $('.upload').click(function () {
        $(".modal").css("display", "block");
    })
    //close 
    $('.close').click(function () {
        $(".modal").hide();//also can use hide 
    })
    //window click close
    $('.modal').click(function () {
        $('.modal, .inner').hide(); // .modal-content should work but not working
    });
    //to stop the modal content from disappering when clicked on it                                   
    $('.modal-content').click(function (e) {
        e.stopPropagation();
    });

    document.getElementById('files-button').addEventListener('change', function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        var data = new FormData();
        var imageFile = document.getElementById('files-button');
        console.log(imageFile);
        console.log(imageFile.files)
        data.append('image', imageFile.files[0]);

        fetch('/upload', {
            method: 'POST',
            body: data,
            headers: {
                "Accept": "application/json"
            }
        }).then(function (response) {
            return response.json();
        }).then((data) => {
            console.log(data);
            window.location.replace("/a/" + data.postSlug);
        })
    }, false);

})
