import React from "react";
import styled from "styled-components";

const HealthAndArmor = (data) => {
  return (
    <Stats>
      <tbody>
        <tr>
          <td>
            <b>Health Points (HP):</b>
          </td>
          <td key={data.hp}>{data.hp}</td>
        </tr>
        <tr>
          <td>
            <b>Armor Class (AC):</b>
          </td>
          <td key={data.ac}>{data.ac}</td>
        </tr>
      </tbody>
    </Stats>
  );
};

const Stats = styled.table`
  // text-align: left;
  // border: 3px solid #fff;
  // padding: 0.2em 0.5em;
  display: flex;
  flex: 2;
  flex-direction: column;
  padding: 1em;
  text-align: left;
  border: 3px solid #fff;
  margin: 0.25em;
  background-color: #222d;
`;

export default HealthAndArmor;
