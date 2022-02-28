import React, { Component } from "react";
import styled from "styled-components";
import HealthAndArmor from "./HealthAndArmor";

class BattleEntity extends Component {
  state = {
    entity: this.props.data,
    facingLeft: this.props.facingLeft,
  };

  render() {
    const { entity, facingLeft } = this.state;
    return (
      <Entity>
        <EntityBox>
          <EntitySprite
            src={entity.sprite_url}
            width="350"
            height="auto"
            facingLeft={facingLeft}
          />
          <h2>{entity.name}</h2>
          <EntityHP>{HealthAndArmor(entity)}</EntityHP>
        </EntityBox>
      </Entity>
    );
  }
}

const Entity = styled.section`
  padding: 5em 0;
`;

const EntitySprite = styled.img`
  display: block;
  -webkit-transform: ${(props) => (props.facingLeft ? "scaleX(-1)" : "none")};
  transform: ${(props) => (props.facingLeft ? "scaleX(-1)" : "none")};
  animation-name: ${(props) =>
    props.facingLeft ? "Character-bounce-left" : "Character-bounce"};
  animation-duration: 1s;
  animation-iteration-count: infinite;
  // background: radial-gradient(#000, transparent) 75%;
  background: radial-gradient(ellipse, #000, transparent 40%);
  image-rendering: pixelated;
`;

const EntityBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const EntityHP = styled.div`
  display: block;
`;

export default BattleEntity;
