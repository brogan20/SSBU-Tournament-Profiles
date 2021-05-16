(function($){
    $(document).on('click','.submitMatch', function(event) {
        event.preventDefault();
        if(!$("#winner").val() || !(typeof $("#winner").val() == "string") || !$("#winner").val().trim()){
            alert("Please fill in the winner field with a valid term");
            return;
        }
        if(!$("#loser").val() || !(typeof $("#loser").val() == "string") || !$("#loser").val().trim()){
            alert("Please fill in the lose field with a valid term");
            return;
        }
        if(!$("#winnerPlayed").val() || !(typeof $("#winnerPlayed").val() == "string") || !$("#winnerPlayed").val().trim()){
            alert("Please fill in the winner's character field with a valid term");
            return;
        }
        if(!$("#loserPlayed").val() || !(typeof $("#loserPlayed").val() == "string") || !$("#loserPlayed").val().trim()){
            alert("Please fill in the loser's character field with a valid term");
            return;
        }
        let temp = $(location).attr('href').split('/');
        var requestConfig = {
            method: 'POST',
            url: temp[3] == "tournaments" ? `/${temp[3]}/${temp[4]}`: `/${temp[3]}`,
            data: {
                winner: $("#winner").val(),
                loser: $("#loser").val(),
                winnerPlayed: $("#winnerPlayed").val(),
                loserPlayed: $("#loserPlayed").val(),
            }
        };

        $.ajax(requestConfig).then(function(responseMessage) {
            if(responseMessage.comment){
                alert(responseMessage.comment);
            }
            else{
                let htmlString = `
                <tr class="match">
                    <td class="Winner">
                        <a href="../users/${responseMessage.winner}">${responseMessage.winner}</a>
                        (<a href="../characters/${responseMessage.winnerPlayed}">${responseMessage.winnerPlayedDisplay}</a>)
                    </td>
                    <td class="Loser">
                        <a href="../users/${responseMessage.loser}">${responseMessage.loser}</a>
                        (<a href="../characters/${responseMessage.loserPlayed}">${responseMessage.loserPlayedDisplay}</a>)
                    </td>
                    ${temp[3] == "matches" ? "<td class='Tournament'><p>N/A</p></td>" : ""}
                    <td class="link excludeFromSearch"><a href="../matches/${responseMessage._id}">Go to Match</a></td>
                </tr>    `
                $("#matchTable tr:last").after(htmlString)
                alert("Match reported!, it should be visible at the bottom of the match list")
            }
        })
    });
})(jQuery)