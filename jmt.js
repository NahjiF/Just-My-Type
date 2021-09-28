$(document).ready(function() {

    $('#keyboard-upper-container').css('display', 'none');

    $(document).keydown(function(e) {
        if (e.shiftKey) {
            $('#keyboard-lower-container').css('display', 'none');
            $('#keyboard-upper-container').css('display', 'block');
        }
    })
    $(document).keyup(function() {
        $('#keyboard-lower-container').css('display', 'block');
        $('#keyboard-upper-container').css('display', 'none');
    })

    let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];

    let s = 0
    let l = 0
    $('<p></p>').text(sentences[s]).appendTo('#sentence');
    $('<h3></h3>').text(sentences[s][l]).appendTo('#target-letter');


    var numberOfMistakes = 0;
    var start;

    $(document).on('keypress', function(e) {

        var a = (e.keyCode || e.which);

        $('#' + a).css('background-color', 'yellow');

        $(document).keyup(function() {
            $('#' + a).css('background-color', '#f5f5f5');
        })

        if (l == 0 && s == 0) {
            let time = new Date();
            start = time.getMinutes();
        }

        let b = (sentences[s][l]).charCodeAt();

        if (a == b) {

            $('#feedback').attr('class', 'glyphicon-ok').css('display', 'initial');

            $('#yellow-block').css('margin-left', '+=15px');

            l++;

            if (l == sentences[s].length) {

                if (s + 1 == sentences.length) {


                    var timeUp = new Date();
                    var end = timeUp.getMinutes();

                    var timing = end - start;

                    let speed = Math.round((55 - numberOfMistakes) / timing);

                    $('#yellow-block').css("display", "none");
                    $('#sentence').text("You've made it to the end! You typed: " + speed + " words per minute.");

                    $(document).off("keypress")
                    $('#target-letter').text("click on the screen to begin again");
                    $(document).click(function() {
                        location.reload();
                    })


                } else {

                    s++;
                    l = 0;

                    $('#sentence').text(sentences[s]);
                    $('#target-letter').text(sentences[s][l]);

                    $('#yellow-block').css('margin-left', 'initial');

                    $('#feedback').css('display', 'none');
                }

            } else {

                $('#target-letter').text((sentences[s][l]));
            }


        } else {

            $('#feedback').attr('class', 'glyphicon-remove').css('display', 'initial');

            numberOfMistakes += 1;
        }
    })











})