import React, { useState } from 'react';

function Card(props) {

    const { character, isMini, hasSelectedCharacter } = props,
    [isFlipped, setIsFlipped] = useState(character ? character.flipped : false);

    function flipCharacter() {
        setIsFlipped(!isFlipped)
    }

    function selectCharacter() {
        props.onChange(character);
    }

    function zoomCharacter() {
        props.onZoom(character)
    }
  
    return (
        <div className={"character flip-box " + (isFlipped ? "flipped" : "") + (isMini ? "mini" : "")} onClick={flipCharacter}>
            <div className="flip-box-inner" >
                <div className="flip-box-front" style={character ? { backgroundImage: "url(" + character.url + ")" } : {backgroundColor:"lightgray"}}>
                </div>
                <div className="flip-box-back" >
                    <h2 >{character ? character.name : "me"}</h2>
                </div >
            </div>
           <button className="zoom" onClick={zoomCharacter}><span>+</span></button>
           {!isMini && !hasSelectedCharacter ? <div className="select" onClick={selectCharacter}><span>Select</span></div> : null}
        </div >
    );
}

export default Card;
