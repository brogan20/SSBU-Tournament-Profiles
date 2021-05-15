(function($){
    $(document).on('click','.submit', function(event) {
        event.preventDefault();
        let temp = $(location).attr('href').split('/');
        var requestConfig = {
            method: 'POST',
            url: `/${temp[3]}/${temp[4]}`,
            data: {
                poster: $("#poster").val(),
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