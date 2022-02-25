import React, { Component } from "react";
import styled from "styled-components";
import { startBattle } from "../utils/utils";
import CharacterData from "./characterData";
import HealthAndArmor from "./HealthAndArmor";

class BattleScreen extends Component {
  state = {
    playerSeed: "",
    player: "",
    playerIsLoaded: false,
    enemySeed: "",
    enemy: "",
    enemyIsLoaded: false,
    log: [],
    logIsLoaded: false,
  };

  handleCallbackCharacter = (data) => {
    this.setState({ playerSeed: data });
    fetch(`http://localhost:3030/seed/${data}/metadata`)
      .then((res) => res.json())
      .then((json) => {
        this.setState({ player: json, playerIsLoaded: true });
      });
  };

  handleCallbackEnemy = (data) => {
    this.setState({ enemySeed: data });
    fetch(`http://localhost:3030/seed/${data}/metadata`)
      .then((res) => res.json())
      .then((json) => {
        this.setState({ enemy: json, enemyIsLoaded: true });
      });
  };

  handleBattle = () => {
    const log = startBattle(this.state.player, this.state.enemy);
    this.setState({ log: log, logIsLoaded: true });
  };

  render() {
    const { player, enemy, log, playerIsLoaded, enemyIsLoaded, logIsLoaded } =
      this.state;
    return (
      <Battle>
        <h1 Style="text-align: center;">Battle Scene</h1>
        <Row>
          <div>
            <CharacterData onCallback={this.handleCallbackCharacter} />
          </div>
          <div>
            <CharacterData onCallback={this.handleCallbackEnemy} />
          </div>
        </Row>
        <BattleField>
          {playerIsLoaded && (
            <CharacterBox>
              <CharacterSpriteLeft
                key={player.seed}
                src={player.sprite_url}
                width="350"
                height="auto"
              />
              <h2>{player.name}</h2>
              <CharacterHP>{HealthAndArmor(player)}</CharacterHP>
            </CharacterBox>
          )}
          {enemyIsLoaded && (
            <CharacterBox>
              <CharacterSpriteRight
                key={enemy.seed}
                src={enemy.sprite_url}
                width="350"
                height="auto"
              />
              <h2>{enemy.name}</h2>
              <CharacterHP>{HealthAndArmor(enemy)}</CharacterHP>
            </CharacterBox>
          )}
        </BattleField>
        <Row>
          <button className="styled-input inverse" onClick={this.handleBattle}>
            Battle
          </button>
        </Row>
        {logIsLoaded && (
          <Row>
            <BattleLog>
              {log.map((l) => (
                <p>{l}</p>
              ))}
            </BattleLog>
          </Row>
        )}
      </Battle>
    );
  }
}

const Battle = styled.section`
  padding: 5em 0;
`;

const BattleField = styled.section`
  background: url('../../public/images/bg_all.png'); 
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  max-width: 1200px
  padding: 1em 0;
`;

const CharacterSpriteLeft = styled.img`
  display: block;
`;

const CharacterSpriteRight = styled.img`
  display: block;
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
`;

const CharacterBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CharacterHP = styled.div`
  display: block;
`;

const BattleLog = styled.div`
  border: 3px solid #fff;
  padding: 1em;
  width: 80%;
  height: 250px;
  overflow: scroll;
  overflow-x: hidden;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  max-width: 1200px
  padding: 1em 0;
`;

export default BattleScreen;
