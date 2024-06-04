import React, {useEffect, useState} from "react";
import '../Game.css';
import GameCircle from "./GameCircle";
import Header from "./Header";
import Footer from "./Footer";
import { isWinner, isTie, getComputerMove} from "../helper";
import { GAME_STATE_PLAYING, INITIAL, PLAYER1, PLAYER2, GAME_STATE_WIN, NUM_CIRCLES, GAME_STATE_TIE} from "../Constants";


const GameBoard = () => {

    const [gameBoard, setGameBoard] = useState(Array(NUM_CIRCLES).fill(INITIAL));
    const [currentPlayer, setCurrentPlayer] = useState(PLAYER1);
    const [gameState, setGameState] = useState(GAME_STATE_PLAYING);
    const [winPlayer, setWinPlayer] = useState(INITIAL);
    
    useEffect(() => {
        initGame();
    }, []);

    const initGame = () => {
        setGameBoard(Array(NUM_CIRCLES).fill(INITIAL));
        setCurrentPlayer(PLAYER1);
        setGameState(GAME_STATE_PLAYING);
    }
    
    const initialBoard = () => {
        const circles = [];
        for (let i = 0; i < NUM_CIRCLES; i++){
            circles.push(renderCircle(i));
        }

        return circles;
    }

    const suggestMove = () => {
        circleClicked(getComputerMove(gameBoard));
    }

    const circleClicked = (id) => {

        if (gameBoard[id] !== INITIAL) return;
        if (gameState !== GAME_STATE_PLAYING){
            alert('Game Over');
            return;
        }
        
        if (isWinner(gameBoard, id, currentPlayer)) {
            setGameState(GAME_STATE_WIN);
            setWinPlayer(currentPlayer);
        }

        if (isTie(gameBoard, id, currentPlayer)) {
            setGameState(GAME_STATE_TIE);
            setWinPlayer(INITIAL);
        }



        setGameBoard(prev => {
            return prev.map((circle, pos) =>{
                if (pos === id) return currentPlayer;
                return circle;
            })
        })

        setCurrentPlayer(currentPlayer === PLAYER1 ? PLAYER2 : PLAYER1)
    }

    const renderCircle = id => {
        return <GameCircle key={id} id={id} className={`player${gameBoard[id]}`} onCircleClicked={circleClicked}/>
    }

    return (
        <>
            <Header gameState={gameState} currentPlayer={currentPlayer} winPlayer={winPlayer}/>
            <div className="gameBoard">
                {initialBoard()}
        
            </div>
            
            <Footer onNewGameClick={initGame} onSuggestClick={suggestMove}/>
        </>
    )
}

export default GameBoard;