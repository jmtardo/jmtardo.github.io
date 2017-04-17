/* global $ _ opspark */
$(document).ready(function() {
    $.getJSON('data.json', function(data) {
            // YOUR CODE BELOW HERE //
            $("body").css("background-color", "#E8940C");
             $(".heading-article").css("color","#E8940C" );
            $("#section-quotes").css("font-style", "italic");
            $("nav").css("background-color", "#0C7FE8").css("border-radius", "20PX").css("color", "white").css("padding", "10PX");
            $("main").css("background-color", "#B0F2FF").css("border-radius", "20PX").css("color", "white").css("padding", "10PX");
            $("section").css("background-color", "#0B98B2").css("border-radius", "40PX").css("color", "white").css("padding", "20PX");
           
            
            // uncomment this to inspect all available data; delete when done //
            // console.log(data);


            //top-rated 

            let topRated = data.discography.topRated;
            let listTopRatedItems = _.map(topRated, function(recording) {
                return $('<li>')
                    .append($('<div>').text('Title: ' + recording.title).addClass('title-top-rated')) 
                    .append($('<div>').text('Artist: ' + recording.artist).addClass('artist-top-rated'))
                    .append($('<div>').text('Release: ' + recording.release).addClass('release-top-rated'))
                    .append($('<div>').text('Year: ' + recording.year).addClass('year-top-rated'))
                    
                        .attr('art', recording.art);
            });
            $('#list-top-rated').append(listTopRatedItems).css('padding', 5);


            //id-section recordings 


            $('#sidebar').append($('<section>').attr('id', 'section-recordings'));
            $('#section-recordings').append($('<header>')
                .attr('id', 'header-recordings').attr('class', 'header')
                .text('Other Recordings'));
            $('#section-recordings').append($('<ul>').attr('id', 'list-recordings'));

            var otherRecordings = data.discography.recordings;

            let listRecordings = _.map(otherRecordings, function(recording) {
                return $('<li>')
                    .append($('<div>').text('Title: ' + recording.title).addClass('section-recordings')
                    .append($('<div>').text('Artist: ' + recording.artist).addClass('artist-section-recordings'))
                    .append($('<div>').text('Release: ' + recording.release).addClass('release-section-recordings'))
                    .append($('<div>').text('Year: ' + recording.year).addClass('year-section-recordings'))
                        .attr('art', recording.art));
            });
            $('#section-recordings').append(listRecordings).css('padding', '20px').css("background-color", "#0B98B2").css("border-radius", "40PX").css("color", "white");
          
          
            //  photos 



            $("#list-top-rated").prepend('<img class="header-top-rated" src="images/album/voice-in-the-night.jpg">')

            $("#list-recordings").prepend('<img class="header-recordings" src="images/album/eastern-rebellion.jpg">')

            // loop click photos billy 
           
               
            var billyImages = data.images.billy;
            var i = 0
         
            
            $('#image-container-billy').click(function() {

                $(this).fadeOut('slow', function() {

                    $('#image-billy').attr('src', billyImages[i])
                    $(this).fadeIn('slow');
                    i++;
                    if (i >= billyImages.length) {
                        i = 0;
                    }

                });
            });

// top- rated photo selectors  
    $(".title-top-rated").click(function() {
        let topArt = $(event.currentTarget).parent();
        $(".header-top-rated").attr('src', topArt.attr('art'));
    });

    //list- recording photo selectors 

    $(".section-recordings").click(function() {
        let recordingArt = $(event.currentTarget);
        $(".header-recordings").attr('src', recordingArt.attr('art'));
    });
    
    
    //rider
    
    var createTable = function(people){
    var createRow = function(person){
        var $row = $("<tr>");
        var $type = $("<td>").text(person.type);
        var $desc = $("<td>").text(person.desc);
        $row.append($type);
        $row.append($desc);
        return $row;
    }
  
    var $table = $("<table>");
    var $rows = people.map(createRow);
    $table.append($rows);
    return $table;
};
      var people = data.rider;
      let $riderTableSection = $("<section>").attr("id", "section-table").appendTo($(".content")).css("background-color", "#0B98B2").css("color", "white").css("border-radius", "40PX")
      let $table = createTable(people).appendTo($riderTableSection).css("background-color", "#0B98B2").css("border-radius", "40PX").css("color", "white").css("padding", "20PX")
      let $riderHeader = $("<h3>").text("Billy's Rider").prependTo('#section-table').css("background-color", "#0B98B2").css("border-radius", "40PX").css("color", "white").css("padding", "20PX");

            // YOUR CODE ABOVE HERE //
        })
        .fail(function() {
            console.log('getJSON on discography failed!');
        });
});
