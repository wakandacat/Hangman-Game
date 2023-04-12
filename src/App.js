import logo from './logo.svg';
import './App.css';

//this code goes into the <body> tag in index.html
function App() {
    return (
      //html
        <div className="App">

            <header className="App-header">

            <h1>HANGMAN</h1>
              <button id="reset">
                  <a href="https://en.wikipedia.org/wiki/Special:Random">NEW</a>
              </button>
                <h3 id="randomURL">rrrrrrrrr</h3>

            </header>

            <div id="mainContent">

                <Word></Word>

                <Alphabet></Alphabet>

            </div>

    </div>
  );
}

//variables and arrays
const tempWord = "I'm a sentence to guess!";


//each character in the word to guess
function Character({value}) {
    return <p className="chars">{value}</p>;
}

//the whole word to guess
function Word() {
    const collectionOfChars = [];

    for (let i = 0; i < tempWord.length; i++) {
        collectionOfChars.push(<Character value={tempWord[i]} key={i} />);
    }
    return <div className="charBox">{collectionOfChars}</div>;
}

//the whole alphabet
function Alphabet() {
    const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",];

    return (
    <div id="alph">
        {letters.map((letters) => (
            <Character value={letters} key={letters.id}></Character>
        ))}
    </div>);

}

export default App;
