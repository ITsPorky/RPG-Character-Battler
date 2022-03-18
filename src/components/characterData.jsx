import React, { Component } from "react";
import { API_ADDRESS } from "../utils/utils";

class CharacterData extends Component {
  handleSubmit = (event) => {
    const seed = event.target.seed.value;
    this.props.onCallback(seed);
    event.preventDefault();
  };

  fetchCharacter = async (seed) => {
    fetch(`${API_ADDRESS}/seed/${seed}/metadata`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.setState({ data: json });
      });
  };

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <label>
            {this.props.label}
            <input className="styled-input" type="text" name="seed" />
          </label>
          <input className="styled-input" type="submit" value="Summon" />
        </form>
      </React.Fragment>
    );
  }
}

export default CharacterData;
