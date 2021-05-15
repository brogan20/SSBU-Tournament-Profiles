(function($){
    $(document).on('click','.submit', function(event) {
        event.preventDefault();
        if(!$("#comment").val() || !(typeof $("#comment").val() == "string") || !$("#comment").val().trim()){
            alert("Please fill in the box with a valid comment");
            return;
        }
        let temp = $(location).attr('href').split('/');
        var requestConfig = {
            method: 'POST',
            url: `/${temp[3]}/${temp[4]}`,
            data: {
                comment: $("#comment").val()
            }
        };

        $.ajax(requestConfig).then(function(responseMessage) {
            if(responseMessage.comment){
                alert(responseMessage.comment);
            }
            else{
                $(".matchComments").append(`<dt>${responseMessage.poster}</dt><dd>${responseMessage.content}</dd>`)
            }
        })
    });
})(jQuery)