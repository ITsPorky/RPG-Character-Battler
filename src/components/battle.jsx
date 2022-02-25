import React, { Component } from "react";
import styled from "styled-components";
import {
  doAttackRound,
  doHealRound,
  doSpecialRound,
  doFleeRound,
  startBattle,
  rollInitiative2,
  initiateBattle,
} from "../utils/utils";
import BattleEntity from "./battleEntity";
import CharacterData from "./characterData";
import CombatActions from "./combatActions";

class Battle extends Component {
  state = {
    playerSeed: "",
    player: "",
    playerIsLoaded: false,
    playerTurn: false,
    enemySeed: "",
    enemy: "",
    enemyIsLoaded: false,
    log: [],
    logIsLoaded: false,
    initiativeOrder: [],
    battleActive: false,
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

  handleInitiative = () => {
    let initiative = rollInitiative2(2);

    if (initiative[0] >= initiative[1]) {
      this.setState({ playerTurn: true });
    } else {
      this.setState({ playerTurn: false });
    }

    const log = [];
    log.push(initiateBattle());
    // log.push(...this.state.log);
    log.push(
      `${this.state.player.name} rolled a ${initiative[0]}, and ${this.state.enemy.name} rolled a ${initiative[1]}.`
    );

    this.setState({
      logIsLoaded: true,
      initiativeOrder: initiative,
      log: log,
      battleActive: true,
    });
  };

  handleAttack = (player, enemy) => {
    if (player.hp > 0 && enemy.hp > 0) {
      const log = [];
      log.push(...this.state.log);
      const attackLog = doAttackRound(player, enemy);
      log.push(...attackLog);

      // Check turn
      const turn = this.state.playerTurn;
      if (turn === true) {
        this.setState({ log: log, playerTurn: false });
      } else {
        this.setState({ log: log, playerTurn: true });
      }
    } else {
      this.setState({ battleActive: false });
    }
  };

  handleSpecial = (player, enemy) => {
    if (player.hp > 0 && enemy.hp > 0) {
      const log = [];
      log.push(...this.state.log);
      const attackLog = doSpecialRound(player, enemy);
      log.push(...attackLog);

      // Check turn
      const turn = this.state.playerTurn;
      if (turn === true) {
        this.setState({ log: log, playerTurn: false });
      } else {
        this.setState({ log: log, playerTurn: true });
      }
    } else {
      this.setState({ battleActive: false });
    }
  };

  handleHeal = (player, enemy) => {
    if (player.hp > 0 && enemy.hp > 0) {
      const log = [];
      log.push(...this.state.log);
      const attackLog = doHealRound(player);
      log.push(...attackLog);

      // Check turn
      const turn = this.state.playerTurn;
      if (turn === true) {
        this.setState({ log: log, playerTurn: false });
      } else {
        this.setState({ log: log, playerTurn: true });
      }
    } else {
      this.setState({ battleActive: false });
    }
  };

  handleFlee = (player, enemy) => {
    if (player.hp > 0 && enemy.hp > 0) {
      const log = [];
      log.push(...this.state.log);

      const flee = doFleeRound(enemy);
      if (flee) {
        log.push(`${player.name} Fled from the battle.`);
        this.setState({ battleActive: false });
      } else {
        log.push(`${player.name} tried to flee, but couldn't get away.`);
      }

      // Check turn
      const turn = this.state.playerTurn;
      if (turn === true) {
        this.setState({ log: log, playerTurn: false });
      } else {
        this.setState({ log: log, playerTurn: true });
      }
    } else {
      this.setState({ battleActive: false });
    }
  };

  render() {
    const {
      player,
      enemy,
      log,
      playerIsLoaded,
      enemyIsLoaded,
      logIsLoaded,
      playerTurn,
      battleActive,
    } = this.state;
    return (
      <BattleContainer>
        <h1 Style="text-align: center;">1v1 Battle</h1>
        <Row>
          <div Style="padding: 1em">
            <CharacterData
              label="Player Seed:"
              onCallback={this.handleCallbackCharacter}
            />
          </div>
          <div Style="padding: 1em">
            <CharacterData
              label="Enemy Seed:"
              onCallback={this.handleCallbackEnemy}
            />
          </div>
        </Row>
        {playerIsLoaded && (
          <BattleField className="battle-bg">
            <div>
              {playerIsLoaded && (
                <BattleEntity
                  key={player.seed}
                  data={player}
                  facingLeft={false}
                />
              )}
              {logIsLoaded && playerTurn === true && battleActive && (
                <CombatActions
                  player={player}
                  enemy={enemy}
                  attackCallback={this.handleAttack}
                  specialCallback={this.handleSpecial}
                  healCallback={this.handleHeal}
                  fleeCallback={this.handleFlee}
                />
              )}
            </div>
            <div>
              {enemyIsLoaded && (
                <BattleEntity key={enemy.seed} data={enemy} facingLeft={true} />
              )}
              {logIsLoaded && playerTurn === false && battleActive && (
                <CombatActions
                  player={enemy}
                  enemy={player}
                  attackCallback={this.handleAttack}
                  specialCallback={this.handleSpecial}
                  healCallback={this.handleHeal}
                  fleeCallback={this.handleFlee}
                />
              )}
            </div>
          </BattleField>
        )}
        {playerIsLoaded && enemyIsLoaded && battleActive === false && (
          <Row>
            <button
              className="styled-input inverse"
              Style="margin: 1em"
              onClick={this.handleInitiative}
            >
              Battle
            </button>
          </Row>
        )}
        {logIsLoaded && (
          <Row>
            <BattleLog>
              {log.map((l) => (
                <p>{l}</p>
              ))}
            </BattleLog>
          </Row>
        )}
      </BattleContainer>
    );
  }
}

const BattleContainer = styled.section`
  padding: 5em 0;
`;

const BattleField = styled.section` 
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  max-width: 1200px
  padding: 1em 0;
  border: 3px solid #fff;
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

export default Battle;
