import logo from './logo.svg';
import './App.css';
import { useState } from 'react';


//this code goes into the <body> tag in index.html
function App() {

  //  const [updated, setUpdated] = useState(message);


    return (
      //html
        <div className="App">

            <header className="App-header">

                <h1>HANGMAN</h1> 
                
                <ResetButton></ResetButton>

            </header>

            <div id="mainContent">

                <Word></Word>

                <Alphabet></Alphabet>

                <UserInput></UserInput>

            </div>
            
        </div>
  );
}

//the main game function
function mainGame() {

    //generate a word to guess

    //ask for for user input

    //update word to guess + alphabet with guesses


}


//variables and arrays
const tempWord = "I'm a sentence to guess!";
let newURL = "";
let guessedLetters = "";
//const [updated, setUpdated] = useState(message);

//the new word button
function ResetButton() {

    //fetch('https://en.wikipedia.org/wiki/Special:Random').then(function (response) {
    //    console.log(response.url); // Final URL after redirections
    //});

    //clear the guessed letters
    guessedLetters = "";

    return <button id="reset" onClick={getNewURL}>NEW</button>

}

//get the user input and display it
function UserInput() {
    //the var to have a changing state
    const [guess, setMessage] = useState('');

    //the event handler
    const handleChange = (event) => {
        setMessage(event.target.value);
    }

    //the html to put the changing var into
    return (
        <div>
            <input type="text" id="guess" name="guess" maxLength="1" onChange={handleChange} value={guess}/>
            <button id="confirmGuess" onClick={() => checkGuess(guess)}>GUESS</button>
        </div>
    );

    //var input = document.getElementById("guess");
    //input.addEventListener("keypress", function (event) {
    //    if (event.key === "Enter") {
    //        event.preventDefault();
    //        document.getElementById("confirmGuess").click();
    //    }
    //});
}

//function to check the user input when button clicked
function checkGuess(userInput) {
    document.getElementById('guess').value = '';

    //if the user input is a valid character, then add it to the characters that have been guessed
    if ((/[a-zA-Z]/).test(userInput)) {
        guessedLetters = guessedLetters + userInput;
       // updateWord(); //update the word to guess with the new letters
    } else {
        console.log("please enter a valid letter");
    }

    console.log(guessedLetters);
}

//function updateWord() {

//    const collectionOfChars = [];
//    let currChar = "";

//    for (let i = 0; i < tempWord.length; i++) {

//        //if the letter has been guessed and is in the word, show it
//        if (guessedLetters.includes(tempWord[i].toUpperCase) || guessedLetters.includes(tempWord[i].toLowerCase)) {
//            currChar = tempWord[i];
//        } else if ((/[a-zA-Z]/).test(tempWord[i])) { //all other letters, hide
//            currChar = "_";
//        }
//        else { //show all other characters
//            currChar = tempWord[i];
//        }

//        collectionOfChars.push(<Character value={currChar} key={i} />);
//    }

//    document.getElementById("theWord").innerHTML = collectionOfChars.value;
//    console.log(collectionOfChars);

//}

//function to get a new word to guess
//idk what this is actually
function getNewURL() {

    var url = new URL("https://en.wikipedia.org/w/api.php?"),
        params = { action: "query", format: "json", list: "random", rnlimit: 1, rnnamespace: 0 };

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));


    const request = new Request(url);

    const myOptions = {
        method: "GET",
        mode: "no-cors",
    };


    fetch(request, myOptions)
        .then(response => Response.json)
        .then(data => console.log(data));

}

//each character in the word to guess
function Character({value}) {
    return <p className="chars">{value}</p>;
}

//the whole word to guess
function Word() {
    const collectionOfChars = [];
    let currChar = "";

    for (let i = 0; i < tempWord.length; i++) {

       if ((/[a-zA-Z]/).test(tempWord[i])){ //all letters, hide
            currChar = "_";
        }
        else { //show all other characters
            currChar = tempWord[i];
        }

        collectionOfChars.push(<Character value={currChar} key={i} />);
    }
    return <div id="theWord" className="charBox">{collectionOfChars}</div>;
}

//the whole alphabet
function Alphabet() {
    const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",];

    return (
    <div id="alph">
        {letters.map((letters) => (
            <Character value={letters} key={letters.toString()}></Character>
        ))}
    </div>);

}

export default App;
