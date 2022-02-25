import React, { Component } from "react";
import styled from "styled-components";
import Layout from "./common/layout";
import Column from "./common/column";
import StatsTable from "./statsTable";
import HealthAndArmor from "./HealthAndArmor";
import Weapon from "./weapon";
import InfoTable from "./infoTable";

class Character extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      weapon: this.props.weapon,
    };
  }

  // componentDidMount() {
  //   fetch(`http://localhost:3030/seed/${this.props.seed}/metadata`)
  //     .then((res) => res.json())
  //     .then((json) => {
  //       this.setState({
  //         data: json,
  //       });
  //     });
  // }

  render() {
    const { data, weapon } = this.state;

    return (
      <React.Fragment>
        <Layout>
          <Column>
            <CharacterWindow>
              <CharacterSprite
                src={data.sprite_url}
                alt="Character Sprite"
                width="250"
                height="auto"
              />
            </CharacterWindow>
          </Column>
          <Column>
            <CharacterInfo>
              <h2>{data.name}</h2>
              <p>{data.description}</p>
            </CharacterInfo>
          </Column>
        </Layout>
        <Layout>
          <Column>{InfoTable(data)}</Column>
          <Column>
            {HealthAndArmor(data)}
            {StatsTable(data)}
          </Column>
          <Column>
            <CharacterSprite src={data.image_url} alt="Character Card" />
          </Column>
        </Layout>
        <Layout>
          <Column>
            <Weapon key={data.seed} data={data} weapon={weapon} />
          </Column>
        </Layout>
      </React.Fragment>
    );
  }
}

const CharacterSprite = styled.img`
  background: radial-gradient(#666, #222);
  // background: radial-gradient(#888, #fff);
  border: 3px solid #fff;
`;

const CharacterWindow = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const CharacterInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  padding: 0 1em;
  border: 3px solid #fff;
`;

export default Character;
