import React from "react";
import styled from "styled-components";

const InfoTable = (data) => {
  const names = [
    "Name:",
    "Sex:",
    "Race:",
    "Class:",
    "Height:",
    "Background:",
    "Proficiency:",
  ];

  return (
    <Stats>
      <table>
        <tbody>
          <tr>
            <th>{names[0]}</th>
            <td key={names[0]}>{data.name}</td>
          </tr>
          <tr>
            <th>{names[1]}</th>
            <td key={names[1]}>{data.sex}</td>
          </tr>
          <tr>
            <th>{names[2]}</th>
            <td key={names[2]}>{data.race}</td>
          </tr>
          <tr>
            <th>{names[3]}</th>
            <td key={names[3]}>{data.class}</td>
          </tr>
          <tr>
            <th>{names[4]}</th>
            <td key={names[4]}>{data.height}</td>
          </tr>
          <tr>
            <th>{names[5]}</th>
            {/* <td key={names[5]}>{data.background.background}</td> */}
          </tr>
          <tr>
            <th>{names[6]}</th>
            <td
              key={names[6]}
            >{`${data.statModifier} (+${data.statModifierValue})`}</td>
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

export default InfoTable;
