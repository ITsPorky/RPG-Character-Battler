import React from "react";
import styled from "styled-components";
import HealthAndArmor from "./HealthAndArmor";

const StatsTable = (data) => {
  const names = [
    "Strength:",
    "Dexterity:",
    "Constitution:",
    "Intelligence:",
    "Wisdom:",
    "Charisma:",
  ];

  return (
    <Stats>
      {/* {HealthAndArmor(data)} */}
      <table>
        <thead>
          <tr>
            <th>Statistics:</th>
            <th>Value:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{names[0]}</td>
            <td key={data.str}>{data.str}</td>
          </tr>
          <tr>
            <td>{names[1]}</td>
            <td key={data.dex}>{data.dex}</td>
          </tr>
          <tr>
            <td>{names[2]}</td>
            <td key={data.con}>{data.con}</td>
          </tr>
          <tr>
            <td>{names[3]}</td>
            <td key={data.int}>{data.int}</td>
          </tr>
          <tr>
            <td>{names[4]}</td>
            <td key={data.wis}>{data.wis}</td>
          </tr>
          <tr>
            <td>{names[5]}</td>
            <td key={data.cha}>{data.cha}</td>
          </tr>
        </tbody>
      </table>
    </Stats>
  );
};

const Stats = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  padding: 1em;
  text-align: left;
  border: 3px solid #fff;
  margin: 0.25em;
`;

export default StatsTable;
