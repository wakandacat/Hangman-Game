import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import React from 'react'


//this code goes into the <body> tag in index.html
function App() {

//-------------variables-----------------//
    //hanged man card image
    const card = require('./Resources/HangmanCard.png'); 

    //global variables and arrays
    //temporary array of wikipedia titles until I can get that other function to work
    const wikiTitles = ["Proxhyle comoreana", "Rhubarb", "Cisco Webex", "Hristina Georgieva", "Chorley Old Hall", "Starbienino", "Vortex (video game)"];
    //const tempWord = "";
    let newURL = "";

    //TEMP->picking a word to guess from the array
    const [tempWord, getRandomWord] = useState("");

    function handleNewWord() {
        getRandomWord(wikiTitles.at(Math.floor(Math.random() * 7)));
    }

    //useEffect makes it only happen once
    useEffect(() => {

        if (tempWord == "") {
            handleNewWord();
        }
       
        console.log(tempWord);

    }, [tempWord]);


    //the guessed letters variable
    const [gameState, setGame] = useState(0); //0 is ongoing, 1 is win, 2 is loss

    function handleGameState(state) {
       // console.log(state);
        setGame(state);
    }

    //the guessed letters variable
    const [guessedLetters, setValue] = useState("");

    //the setter function for guessedLetters
    function handleGuess(newGuess) {

        if (newGuess == "!") { //if ! received, then clear all the guessed letters
            setValue("");
            //console.log(guessedLetters);
        } else {
            setValue(guessedLetters + newGuess);
            //console.log(guessedLetters + newGuess);
            getNumWrong(guessedLetters + newGuess);
            console.log(checkComplete(guessedLetters + newGuess));
            console.log(gameState);
        }
    }

    //the amount of wrong guesses allowed
    const maxGuesses = 5;

    //the amount of wrong user guesses
    const [numGuess, increaseNum] = useState(0);

    //the setter function for numGuess to increase it for every wrong guess
    function handleNum(increment) {

        //if ! received, then reset the count to 0
        if (increment == "!") {
            increaseNum(0);
        } else {
            increaseNum(numGuess + increment);
            //console.log(numGuess);
        }

    }

    //---------------References of HTML elements to change their properties----------------

    //get the word to guess to add a class to it 
    const ref = React.useRef(null);//the word to guess

    //get the endgame text box 
    const endRef = React.useRef(null);//the word to guess

    //useEffect makes it only happen once
    useEffect(() => {
        if (gameState == 1) { //GAME WON
            //edit the word to guess
            ref.current.className = ref.current.className + " complete";
            ref.current.href = "https://en.wikipedia.org/wiki/" + tempWord;
            ref.current.style.cursor = "pointer";
            //console.log(ref.current);

            //show the end game text box
            endRef.current.p = "CLICK ME!";
            endRef.current.style.display = "block";
        }
        else if (gameState == 2) { //GAME OVER
            endRef.current.p = "GAME OVER";
            endRef.current.style.display = "block";
        } 


    }, [gameState]); //check for the gameState variable


    //get the hangman card image to change its properties
    const hangRef = React.useRef(null);

    //useEffect makes it only happen once
    useEffect(() => {

        if (numGuess != 0) { //if the numWrongGuesses increases
            // The DOM element is accessible here
            hangRef.current.style.webkitAnimationPlayState = "running"; //start the image animation          
            //run the animation for one second (the duration of the animation) and then pause it
            setTimeout(function () { hangRef.current.style.webkitAnimationPlayState = "paused"; }, 1000);
        }
    }, [numGuess]);

    useEffect(() => {
        //end the game if at maxGuesses
        if (numGuess == maxGuesses) {
            handleGameState(2);
            hangRef.current.style.filter = "brightness(500%)"; //DOESNT WORK NEED !important somehow
        }
    }, [numGuess]);


    //calculate the amount of wrong guesses
    function getNumWrong(guessedLetters) {
        //let currChar = "";
        let currStr = guessedLetters.toLowerCase();
        //console.log(currStr);
        let lastChar = currStr.slice(-1);
       // console.log(lastChar);

            //if the letter is in the guessedLetters string (has been guessed)
        if (tempWord.toLowerCase().includes(lastChar)) {
                //if the letter is correct
                //don't do anything
                //console.log("right");
        }
        else { //if the letter is incorrect
               // console.log("wrong");
                handleNum(1);
        } 
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

            //console.log(guessedLetters.value);
        }

        //call the onclick if enter is pressed
        const enterPressed = (event) => {
            if (event.key === "Enter") {
                checkGuess(guess);
            }
        }

        //the html of the input field and button to get user input
        return (
            <div id="userDiv">
                <input type="text" id="guess" name="guess" maxLength="1" placeholder="_" onChange={handleChange} onKeyPress={enterPressed} value={guess} autoFocus/>
                <button id="confirmGuess" className="headerButton" onClick={() => checkGuess(guess)}><p>GUESS</p></button>
            </div>
        );

    }

    //show the answer
    function GiveUpButton(guessedLetters) {

        return <button className="headerButton" onClick={showAllLetters}><p>GIVE UP</p></button>

    }

    function showAllLetters() {
        handleGuess("abcdefghijklmnopqrstuvwxyz");
    }


    //the new word button
    function ResetButton(guessedLetters) {

        //fetch('https://en.wikipedia.org/wiki/Special:Random').then(function (response) {
        //    console.log(response.url); // Final URL after redirections
        //});

        return <button className="headerButton" onClick={getNewURL}><p>NEW</p></button>

    }


    //function to get a new word to guess
    function getNewURL() {

        //clear the guessed letters
        handleGuess("!");

        //clear the amounf of wrong guesses
        handleNum("!");

        //reset the gameState
        handleGameState(0);

        //get new word to guess
        handleNewWord();

        //var url = new URL("https://en.wikipedia.org/w/api.php?"),
        //    params = { action: "query", format: "json", list: "random", rnlimit: 1, rnnamespace: 0 };

        //Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));


        //const request = new Request(url);

        //const myOptions = {
        //    method: "GET",
        //    mode: "no-cors",
        //};


        //fetch(request, myOptions)
        //    .then(response => Response.json)
        //    .then(data => console.log(data));

    }

    function EndGameBox() {
        return <div id="endGame" ref={endRef}><p>temp</p></div>
    }


    //check if all the letters in the word to guess have been guessed
    function checkComplete(guessed) {

        let guessStr = guessed.toLowerCase();
        let toGuess = tempWord.toLowerCase();

        let onlyLettersStr = "";

        for (var i = 0; i < toGuess.length; i++) { 
            //if the letter is not there
            if (guessStr.indexOf(toGuess.charAt(i)) == -1 && (/[a-zA-Z]/).test(toGuess[i]) == true) {
                return false; //return
            }
        }
        //if all the letters are there, then it is guessed successfully
        handleGameState(1);
        return true;

    }


    //each character in the word to guess and alphabet
    function Character({ value }) {
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


            if (currChar == " ") { //if a space then add a breakline
                collectionOfChars.push(<hr value={currChar} key={i}/>);
            } else {
                collectionOfChars.push(<Character value={currChar} key={i} />);
            }

        }
        return <div><a id="theWord" className="charBox" ref={ref} href="" target="_blank">{collectionOfChars}</a></div>;
    }


    //the whole alphabet
    function Alphabet(guessedLetters/*, handleNum*/) {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const collectionOfAlph = [];
        let guessedClass = 0; //decide which classname the character will get depending on if it has been guessed or not
        //1 = not guessed, 2 = guessed but wrong, 3 = guessed but right

        for (let i = 0; i < letters.length; i++) {

            //if the letter is in the guessedLetters string (has been guessed)
            if (guessedLetters.value.includes(letters[i]) || guessedLetters.value.includes(letters[i].toLowerCase()) || guessedLetters.value.includes(letters[i].toUpperCase())) {
                //if the letter is correct
                if (tempWord.includes(letters[i]) || tempWord.includes(letters[i].toLowerCase()) || tempWord.includes(letters[i].toUpperCase())) {
                    guessedClass = 3;
                } else { //if the letter is incorrect
                    guessedClass = 2;
                    // console.log("wrong");
                    //handleNum = {handleNum};
                }
            } else {
                guessedClass = 1;
            }

            //toggle character class depending on if it is guessed or not
            collectionOfAlph.push(<p className={`chars ${guessedClass == 1 ? "" : (guessedClass == 2 ? "guessedIncorrect" : "guessedCorrect")}`} value={letters[i]} key={letters[i].toString()}>{letters[i]}</p>);

        }

        return <div id="alph">{collectionOfAlph}</div>;

    }

    //the main content of the page
    return (

        <div className="App">

            <header className="App-header">

                <h1 id="title">HANGMAN</h1> 
                
                <ResetButton value={guessedLetters}></ResetButton>

                <GiveUpButton value={guessedLetters}></GiveUpButton>

            </header>

            <div id="mainContent">

                <div id="topLevel">
                    <img id="hangCard" src={card} ref={hangRef}/>

                    <div>
                        <div id="wrongGuesses">{numGuess} / {maxGuesses}</div>

                        <Word value={guessedLetters}></Word>
                    </div>

                </div>

                <EndGameBox></EndGameBox>

                <Alphabet value={guessedLetters} ></Alphabet>

                <UserInput value={guessedLetters}></UserInput>

            </div>
            
        </div>
  );
}

//run the App function as the "main function"
export default App;
