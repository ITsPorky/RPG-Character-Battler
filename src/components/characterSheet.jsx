import React, { Component } from "react";
import styled from "styled-components";
import FlexContainer from "./common/flexContainer";
import FlexItem from "./common/flexItem";
import CharacterData from "./characterData";
import StatsTable from "./statsTable";
import Weapon from "./weapon";
import InfoTable from "./infoTable";
import HealthAndArmor from "./HealthAndArmor";
import { API_ADDRESS } from "../utils/utils";

class CharacterSheet extends Component {
  constructor(props) {
    super(props);
    this.state = { data: "", weapon: "", isLoaded: false };
  }

  handleCallback = (data) => {
    fetch(`${API_ADDRESS}/seed/${data}/metadata`)
      .then((res) => res.json())
      .then((json) => {
        this.setState({ data: json, weapon: json.weapon, isLoaded: true });
      });
  };

  render() {
    const { data, weapon, isLoaded } = this.state;

    return (
      <Character>
        <h1 Style="text-align: center;">Character Sheet</h1>
        <div Style="text-align: center;">
          <CharacterData onCallback={this.handleCallback} />
        </div>
        {isLoaded && (
          <React.Fragment>
            <FlexContainer flexDirection="row">
              <CharacterWindow>
                <CharacterSprite
                  src={data.sprite_url}
                  alt="Character Sprite"
                  width="250"
                  height="auto"
                />
              </CharacterWindow>
              <CharacterInfo>
                <h2>{data.name}</h2>
                <p>{data.description}</p>
              </CharacterInfo>
            </FlexContainer>
            <FlexContainer>
              {InfoTable(data)}
              <FlexItem>
                {HealthAndArmor(data)}
                {StatsTable(data)}
              </FlexItem>
              <CharacterCard src={data.image_url} alt="Character Card" />
              <Weapon key={data.seed} data={data} weapon={weapon} />
            </FlexContainer>
          </React.Fragment>
        )}
      </Character>
    );
  }
}

const Character = styled.section`
  padding: 5em 0;
`;

const CharacterSprite = styled.img`
  background: radial-gradient(#666, #222);
  // background: radial-gradient(#888, #fff);
  border: 3px solid #fff;
  margin: 0.25em;
  image-rendering: pixelated;
`;
const CharacterCard = styled.img`
  border: 3px solid #fff;
  margin: 0.25em;
`;

const CharacterWindow = styled.div`
  display: flex;
  flex-direction: column;
  // flex: 1;
`;

const CharacterInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  padding: 0 1em;
  border: 3px solid #fff;
  margin: 0.25em;
`;

export default CharacterSheet;
