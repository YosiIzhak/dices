import React from 'react'

import './weekend.css'


class Player extends React.Component {
    // static currentID = 1;
    static getInitialState() {
        return {
            //   id: Player.currentID++,
            id: '',
            currentScore: 0,
            globalScore: 0,
            playerKey: ''
        }
    }
    constructor(props) {
        super(props);
        this.state = props.player;
    }
    componentWillReceiveProps(props) {
        this.setState(props.player)
    }

    render() {
        return (
            <div className="wrapper">
                <div>Player: {this.props.id}  </div>
                <div>Global score: {this.state.globalScore}  </div>
                <div>Current score: {this.state.currentScore}</div>

            </div>
        )
    }
}
export default Player;