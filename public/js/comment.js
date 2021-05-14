(function($){
    $(document).on('click','.submit', function(event) {
        event.preventDefault();
        let temp = $(location).attr('href').split('/');
        var requestConfig = {
            method: 'POST',
            url: `${temp[3]}/${temp[4]}`
        };

        $.ajax(requestConfig).then(function(responseMessage) {
            var newElement = $(responseMessage);
            console.log(newElement);
        })
    });
})(jQuery)