// The $() function works similarly to document.querySelectorAll()
$(document).ready(() => {
    console.log('jQuery is ready to go!');
});
// Pass jQuery an HTML string and it will create the corresponding DOM element.
// const $container = $('<div></div>');
// or
// const $container = $('<div>');

const $container = $('<div>');
const $title = $('<h1>', {
    text: 'Dad Jokes'
});
$container.append($title);
$(document.body).append($container);
$title.css('color','tomato')

const $jokeButton = $('<button></button>', {
    text: 'Click for a new joke 😂'
})
$jokeButton.appendTo($container);

$jokeButton.on('click', event => {
    console.log('You clicked!');
    getJoke()
        .then(joke => {
            $('.joke').remove();

            $('<p></p>', {
                text: joke,
            }).addClass('joke')
              .hide()
              .appendTo($container)
              .fadeIn();  // semi-colon goes on the last method in the chain
        });
});

function getJoke() {
    return $.ajax({
        url: 'https://icanhazdadjoke.com/',
        headers: {
            'Accept': 'application/json'        
        }
    }).then(res => {
        return res.joke;
    }).catch(err => {
        console.log(err);
        return 'There was an error making the reqeuest';
    });
}

//to display in console
// getJoke()
//     .then(joke => {
//         console.log(joke);
//     });

//form handling
function searchJoke(term) {
    return $.ajax({
        url: 'https://icanhazdadjoke.com/search?term=' + term,
        headers: {
            'Accept': 'application/json'        
        }
    }).then(res => {
        return res.results.map(result => result.joke)
    }).catch(err => {
        console.log(err);
        return 'There was an error making the reqeuest';
    });
}
//creating form
const $jokeForm = $('<form>');
const $jokeInput = $('<input>', {
    placeholder: 'Enter search term'
});
const $submitBtn = $('<input>', {
    type: 'submit',
    value: '😂 Search!'
});
//get input, 
$jokeForm
    .append($jokeInput)
    .append($submitBtn)
    .appendTo(document.body)
    .on('submit', event => {
        event.preventDefault();
        const searchTerm = $jokeInput.val();
        searchJoke(searchTerm)
            .then(jokesArray => {
                $(jokesArray).each((index, joke) => {
                    $('<p>', {
                        text: joke,
                        class: 'joke-result'
                    }).appendTo(document.body)
                })
            })
    });
// Outside of our .on('submit') handler
$(document.body).on('click', '.joke-result', event => {
    $(event.target).remove();
});


//-------small exercise handling browser events-------
const $theButton = $('<button></button>', {
    text: 'Click here'
})
$theButton.appendTo($container);
$theButton.on('click', event => {
    console.log('You clicked the button.');
})


// right and left click practice on JQuery
$(document).on("contextmenu", ".element", function(e){
    console.log('Right Mouse Clicked!');
    return false;
 });
 
 $(document).on('click', '.element', function(){
  console.log('Left Mouse Clicked!');
 });


