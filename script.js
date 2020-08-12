//Get quote from api

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twiterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


//Show loading

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide loading
function complete(){
  if(!loader.hidden)  {
      quoteContainer.hidden = false;
      loader.hidden = true;
  }
}

async function getQuote() {
loading();

    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';


    try {
        const responce = await fetch(proxyUrl + apiUrl);
        const data = await responce.json();


        if (data.quoteAuthor === '') {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        //reduce font size for long quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');

        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;

       //stop loader and show the quote
        complete();


    } catch (error) {
        getQuote();
    }
}

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - 
    ${author}`;

    window.open(twitterUrl, '_blank');

}


//event listners

newQuoteBtn.addEventListener('click' , getQuote);
twiterBtn.addEventListener('click' , tweetQuote);


getQuote();


