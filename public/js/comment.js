(function($){
    $(document).on('click','.submit', function(event) {
        event.preventDefault();
        //Checks if the comment field is present and non-empty
        if(!$("#comment").val() || !(typeof $("#comment").val() == "string") || !$("#comment").val().trim()){
            alert("Please fill in the box with a valid comment");
            return;
        }

        //finds the proper URL to make a POST request to
        let temp = $(location).attr('href').split('/');
        var requestConfig = {
            method: 'POST',
            url: `/${temp[3]}/${temp[4]}`,
            data: {
                comment: $("#comment").val()
            }
        };

        $.ajax(requestConfig).then(function(responseMessage) {
            //Alerts the user of an error if the POST request returns one
            if(responseMessage.comment){
                alert(responseMessage.comment);
            }
            else{
                //Otherwise adds it to the comments list
                $(".matchComments").append(`<dt>${responseMessage.poster}</dt><dd>${responseMessage.content}</dd>`)
            }
        })
    });
})(jQuery)