import React from "react";
import { GAME_STATE_PLAYING, GAME_STATE_WIN, GAME_STATE_TIE } from "../Constants";

const Header = ({gameState, currentPlayer, winPlayer}) => {
    
    const renderLabel = () => {
        switch (gameState) {
            case GAME_STATE_PLAYING:
                return <div>Player {currentPlayer} Turn</div>
            case GAME_STATE_WIN:
                return <div>Player {winPlayer} Won!</div>
            case GAME_STATE_TIE:
                return <div>Its a Tie!</div>
            default:

     }


    }

    return (
        <div className="panel header">
            <div className="header-text">{renderLabel()}</div>

        </div>
    );
};
    

export default Header;