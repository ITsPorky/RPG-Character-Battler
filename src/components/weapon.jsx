import React, { Component } from "react";
import styled from "styled-components";
import Column from "./common/column";
import Layout from "./common/layout";

export class Weapon extends Component {
  names = ["Type:", "Damage:", "Modifier:", "Elemental:"];

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      weapon: this.props.weapon,
    };
  }

  render() {
    const { data, weapon } = this.state;

    return (
      <Layout>
        {/* <Column>
          <WeaponSprite
            src={data.weapon_url}
            alt="Weapon Sprite"
            width="100"
            height="auto"
          />
        </Column> */}
        <Column>
          <WeaponInfo>
            <WeaponSprite
              src={data.weapon_url}
              alt="Weapon Sprite"
              width="100"
              height="100"
            />
            <table>
              <tbody>
                <tr>
                  <th>{this.names[0]}</th>
                  <td key={this.names[0]}>{weapon.type}</td>
                </tr>
                <tr>
                  <th>{this.names[1]}</th>
                  <td key={this.names[1]}>{weapon.damage}</td>
                </tr>
                <tr>
                  <th>{this.names[2]}</th>
                  <td key={this.names[2]}>{`+${weapon.modifier}`}</td>
                </tr>
                <tr>
                  <th>{this.names[3]}</th>
                  <td key={this.names[3]}>{weapon.elemental}</td>
                </tr>
              </tbody>
            </table>
          </WeaponInfo>
        </Column>
      </Layout>
    );
  }
}

const WeaponSprite = styled.img`
  background: radial-gradient(#666, #222);
  // background: radial-gradient(#888, #fff);
  border: 3px solid #fff;
  margin-right: 0.5em;
  image-rendering: pixelated;
`;

const WeaponInfo = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  padding: 1em;
  text-align: left;
  border: 3px solid #fff;
`;

export default Weapon;
