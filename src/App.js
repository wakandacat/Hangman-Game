import logo from './logo.svg';
import './App.css';
import { useState } from 'react';


//this code goes into the <body> tag in index.html
function App() {

    //the guessed letters variable
    const [guessedLetters, setValue] = useState("");

    //the setter function for guessedLetters
    function handleGuess(newGuess) {
        setValue(guessedLetters+newGuess);
    }

    //the amount of wrong guesses allowed
    const maxGuesses = 5;

    //the amount of wrong user guesses
    const [numGuess, increaseNum] = useState(0); 

    //the setter function for numGuess
    function handleGuess(newGuess) {
        setValue(guessedLetters + newGuess);
    }


    //get the user input and display it
    function UserInput(guessedLetters) {
        //the var to have a changing state
        const [guess, setMessage] = useState('');
        //the event handler to update the "guess" variable when button clicked
        const handleChange = (event) => {
            setMessage(event.target.value);
        }

        //function to check the user input when button clicked
        function checkGuess(userInput) {

            //clear the input field
            document.getElementById('guess').value = '';

            //if the user input is a valid letter and not already in the string, then add it to the characters that have been guessed
            if ((/[a-zA-Z]/).test(userInput) && guessedLetters.value.includes(userInput.toLowerCase()) == false && guessedLetters.value.includes(userInput.toUpperCase()) == false && guessedLetters.value.includes(userInput) == false) {
                //update guessedLetters
                handleGuess(userInput);
            } else {
                console.log("please enter a valid letter");
            }

            console.log(guessedLetters.value);
        }


        //the html of the input field and button to get user input
        return (
            <div>
                <input type="text" id="guess" name="guess" maxLength="1" onChange={handleChange} value={guess} />
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

    //the main content of the page
    return (

        <div className="App">

            <header className="App-header">

                <h1>HANGMAN</h1> 
                
                <ResetButton value={guessedLetters}></ResetButton>

            </header>

            <div id="mainContent">

                <Word value={guessedLetters}></Word>

                <Alphabet value={guessedLetters}></Alphabet>

                <UserInput value={guessedLetters}></UserInput>

            </div>
            
        </div>
  );
}


//variables and arrays
const tempWord = "I'm a sentence to guess!";
let newURL = "";


//the new word button
function ResetButton(guessedLetters) {

    //fetch('https://en.wikipedia.org/wiki/Special:Random').then(function (response) {
    //    console.log(response.url); // Final URL after redirections
    //});

    //clear the guessed letters
   // guessedLetters = "";

    return <button id="reset" onClick={getNewURL}>NEW</button>

}


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
function Word(guessedLetters) {
    const collectionOfChars = [];
    let currChar = "";

    for (let i = 0; i < tempWord.length; i++) {
  
        //  if the letter has been guessed and is in the word, show it
        if (guessedLetters.value.includes(tempWord[i].toUpperCase()) || guessedLetters.value.includes(tempWord[i].toLowerCase())) {
            currChar = tempWord[i];
        } else if ((/[a-zA-Z]/).test(tempWord[i])) { //all other letters, hide
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
function Alphabet(guessedLetters) {
    const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",];

    return (
    <div id="alph">
        {letters.map((letters) => (
            <Character value={letters} key={letters.toString()}></Character>
        ))}
    </div>);

}

//run the App function as the "main function"
export default App;
