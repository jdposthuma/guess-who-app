import React, { useState } from 'react';
import { games } from './services/data'
import Card from './components/Card'
import uuid from 'uuid/v4'
import './App.css';
import './Flip.css';

function App() {

  for (const key in games) {
    const game = games[key];
    game.map(x => Object.assign(x, { key: uuid() }))
  }

  // eslint-disable-next-line
  const [myGames, setMyGames] = useState(games),
    [currentGameName, setCurrentGameName] = useState(null),
    [currentGame, setCurrentGame] = useState(null),
    [showSplashScreen, setShowSplashScreen] = useState(true),
    [selectedCharacter, setSelectedCharacter] = useState(null),
    [zoomedCharacter, setZoomedCharacter] = useState(null);

  function startGame(gameName) {
    setCurrentGameName(gameName)
    setCurrentGame(games[gameName])
    setShowSplashScreen(false);
  }

  function newGame() {
    window.location.reload();
  }

  function reset() {
    currentGame.forEach(x => x.flipped = false);
    setSelectedCharacter(null)
    setCurrentGame(currentGame);
    setZoomedCharacter(null);
  }
  
  function selectCharacter(character) {
    setSelectedCharacter(character);
  }
  
  function zoomCharacter(character) {
    setZoomedCharacter(character);
  }

  function renderSplashScreen() {
    return (
      <div className="App" >
        <header>
          <h1 className="title" >Welcome!</h1>
        </header >
        <main className="Game" >
          {
            Object.keys(myGames).map(x => <button className="game-button" key={x} onClick={() => startGame(x)} >{x}</button>)
          }
        </main >
      </div>
    );
  }

  function renderZoomedCharacter() {

    if (!zoomedCharacter) {
      return null;
    }

    console.log(JSON.stringify(zoomCharacter))

    return (
      <section className="modal" >
        <img src={zoomedCharacter.url} alt={zoomedCharacter.name} />
      </section>
    );
  }

  function renderGame() {
    return (
      <div className="App" >
        <header>
          <h1 className="title">{currentGameName} Guess Who</h1>
          <div className="game-controls">
            <Card isMini={true} character={selectedCharacter} />
            <button onClick={reset}>Reset</button>
            <button onClick={newGame}>New Game</button>
          </div>
        </header >
        <main className="Game">
          {currentGame.map(x => <Card key={x.key} character={x} onChange={selectCharacter} hasSelectedCharacter={!!selectedCharacter} onZoom={zoomCharacter} />)}
        </main>
        {renderZoomedCharacter()}
      </div>
    );
  }

  return showSplashScreen ? renderSplashScreen() : renderGame();
}

export default App;