import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import GameShowPlayer from './game_show_player';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import MapContainer from '../map/map';
import './show.css';
import { teamNames1, teamNames2 } from './team_names'
import ShowMap from '../map/show_map'
import $ from 'jquery'


class SetGameShow extends React.Component {
    constructor(props) {
        super(props);
        this.addPlayer = this.addPlayer.bind(this);
        this.removePlayer = this.removePlayer.bind(this);
        this.endGame = this.endGame.bind(this);
        this.state = {id: this.props.match.params.gameId, game: {}, 
        players: {}, count: {}};
        this.state.count[this.state.id] = 0;
        this.state.players[this.state.id] = [[], []];
        this.firstTeam = '';
        this.secondTeam = '';
        this.video = 'https://ballup-dev.s3-us-west-1.amazonaws.com/tipoff2.mp4';
        this.changeVideo = this.changeVideo.bind(this);
    }

    componentDidMount() {
       
        this.props.getGames();
        this.props.getGame(this.props.match.params.gameId);
        this.props.getUsers();
        this.props.getUser();
        let gameId = this.state.id;
           
            setTimeout(() => {
                $(".pre-show").addClass("show");
                $(".load-contain").addClass("load-contain-b");
                $(".show").removeClass("pre-show");
            }, 1000)
    }

    addPlayer(e) {
        e.preventDefault();
        
        let exists = false;

        this.state.game.players.forEach( player => {
            if (player.id === this.props.player.id || 
                player._id === this.props.player.id) {
                    exists = true;
                }
        })
        if (exists === false){
         this.state.game.players.push(this.props.player);
         this.props.updateGame(this.state.game);
        }
        
    }

    removePlayer(e) {
        e.preventDefault();
        let newPlayers = [];
        this.state.game.players.forEach(player => {
            if (player.id !== this.props.player.id) {
                newPlayers.push(player)
            }
        });
        this.state.game.players = newPlayers;
        this.props.updateGame(this.state.game);
    };

    changeVideo(e) {
        e.preventDefault();
        $(".video-box").addClass("video-box-b");
        $(".video-box2").addClass("video-box2-b");
        $(".team1").addClass("team1-b");
        $(".vs").addClass("vs-b");
        $(".team2").addClass("team2-b");
        $(".sneaks").addClass("sneaks-b");
        
    }

    endGame(e) {
        e.preventDefault();
            this.props.removeGame(this.state.game._id)
                .then(() => this.props.history.push('/'));
        
        
    }

    render() {
        
        let game = {players: []};
       
        this.props.games.forEach(g => {
            
            if (g._id === this.state.id) {
                game = g
                this.state.game = game;
            }
        });
        let scoreboard = 'https://ballup-dev.s3-us-west-1.amazonaws.com/scoreboard-ribbonFinal.mp4';
        let tipoff = 'https://ballup-dev.s3-us-west-1.amazonaws.com/tipoff2.mp4';
        let pickup = 'https://ballup-dev.s3-us-west-1.amazonaws.com/pickupBball2.mp4';

       
        if (!Object.keys(this.state.game).length) return (<div></div>)
       

        return (
            <div className="set-show">
                <div className="load-contain">
                    <div className="load-formation">
                        <div className="ball-crop">
                            <img src="bball_sprite.png" alt=""/>
                        </div>
                        <div className="ball-back">
                            <img src="bball_sprite_white.png" alt="" />
                        </div>
                    </div>
                </div>
                <div className="pre-show">
                    <div className="title-div">
                        <h1 className="gs-title">&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0; Game Set &#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;&#x25a0;</h1>
                    </div>

                    <div className="flex-vid">
                        <div className="video-box" id="video-box" onClick={this.changeVideo}>
                            <video id="tipoff-vid" onEnded={this.changeVideo} playsInline autoPlay  muted>
                                <source id="vid-src" src={tipoff} type="video/mp4" />
                            </video>
                        </div>
                        <div className="video-box2" id="video-box" >
                            <video id="tipoff-vid" onEnded={this.changeVideo} playsInline autoPlay loop  muted>
                                <source id="vid-src" src={pickup} type="video/mp4" />
                            </video>
                        </div>
                        <div className="middle-content">
                            <div className="showbox">
                                <div className="showbox-left">
                                    <div className="showbox-left-top">
                                        <div className="game-info">
                                            <h2>{game.title}</h2>
                                            <h2>{game.location}</h2>
                                            <h2>{game.time}</h2>
                                            <h2>{game.game_date}</h2>
                                        </div>
                                    </div>
                                    <div className="showbox-left-bottom">
                                        <div className="show-map">
                                            <ShowMap 
                                            game={game} 
                                            history={this.props.history}  
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="showbox-right">
                                    <img className="sneaks" src="shoes512.png" alt=""/>

                                    <div className="team1">
                                        <ul>
                                            <h1>
                                            {this.state.game.teamNames[0]}
                                            </h1>
                                            {
                                            Object.keys(
                                                this.state.game.teams[0]).map(position =>
                                                <li>{position} | @
                                                {this.state.game.teams[0][position]}
                                                </li>)
                                            }
                                        </ul>
                                    </div>
                                    <div className="vs">VS.</div>
                                    <div className="team2">
                                        <ul>
                                            <h1>{this.state.game.teamNames[1]}</h1>
                                            {
                                                Object.keys(
                                                    this.state.game.teams[1]).map(position =>
                                                        <li>{position} | @
                                                {this.state.game.teams[1][position]}
                                                        </li>)
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="buttons2">                           
                                    <button
                                    ><video id="first-rib" playsInline autoPlay muted>
                                        <source id="vid-src" src={scoreboard} type="video/mp4" />
                                    </video></button>
                                    <button 
                                    ><video id="second-rib" playsInline autoPlay muted>
                                        <source id="vid-src" src={scoreboard} type="video/mp4" />
                                    </video></button>
                                    <button 
                                    ><video id="third-rib" playsInline autoPlay muted>
                                        <source id="vid-src" src={scoreboard} type="video/mp4" />
                                    </video> </button>
                                    <button 
                                    className="owner-button cancel-game"
                                        onClick={this.endGame}
                                        >
                                    <video id="bottom-rib"  playsInline autoPlay muted>
                                        <source id="vid-src" src={scoreboard} type="video/mp4" />
                                    </video> </button>
                            </div>
                        </div>
                    </div>
                    <div id="divider"></div>
                    <div id="color">
                        <div id="color-left">
                        <p id="copyright" >BallUp © 2020</p>
                            <img src="left-court.png" />
                        </div>
                        <div id="color-right">
                            <img src="right-court.png" />
                        </div>
                    </div>
                </div>

                {document.onreadystatechange = () => {
                    if (document.readyState === 'complete') {
                        setTimeout(() => {
                            $(".pre-show").addClass("show");
                            $(".load-contain").addClass("load-contain-b");
                            $(".show").removeClass("pre-show");
                        }, 360)
                    }
                }}

            </div>
        )
    }

}

export default SetGameShow
