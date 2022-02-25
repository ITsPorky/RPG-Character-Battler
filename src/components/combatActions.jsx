import React, { Component } from "react";
import styled from "styled-components";
import ActionButton from "./common/actionButton";

class CombatActions extends Component {
  state = {
    names: ["Attack", "Special", "Heal", "Flee"],
    player: this.props.player,
    enemy: this.props.enemy,
  };

  handleAttack = (player, enemy) => {
    this.props.attackCallback(player, enemy);
  };

  handleSpecial = (player, enemy) => {
    this.props.specialCallback(player, enemy);
  };

  handleHeal = (player, enemy) => {
    this.props.healCallback(player, enemy);
  };

  handleFlee = (player, enemy) => {
    this.props.fleeCallback(player, enemy);
  };

  render() {
    const { names, player, enemy } = this.state;
    return (
      <ActionContainer>
        <table>
          <tbody>
            <tr>
              <td>
                <ActionButton
                  key={names[0]}
                  name={names[0]}
                  onClick={() => this.props.attackCallback(player, enemy)}
                />
              </td>
              <td>
                <ActionButton
                  key={names[1]}
                  name={names[1]}
                  onClick={() => this.props.specialCallback(player, enemy)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <ActionButton
                  key={names[2]}
                  name={names[2]}
                  onClick={() => this.props.healCallback(player, enemy)}
                />
              </td>
              <td>
                <ActionButton
                  key={names[3]}
                  name={names[3]}
                  onClick={() => this.props.fleeCallback(player, enemy)}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </ActionContainer>
    );
  }
}

const ActionContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1em;
  text-align: center;
  border: 3px solid #fff;
  background-color: #222d;
`;

export default CombatActions;
