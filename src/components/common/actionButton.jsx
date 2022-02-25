import React, { Component } from "react";
import styled from "styled-components";

class ActionButton extends Component {
  state = {
    name: this.props.name,
    action: this.props.onClick,
  };

  render() {
    const { name, action } = this.state;
    return <Button onClick={action}>{name}</Button>;
  }
}

const Button = styled.button`
  font-family: "Press Start 2P", cursive;
  border: 2px solid #fff;
  background-color: #222;
  color: #fff;
  padding: 0.5em;
`;

export default ActionButton;
