import React, { Component } from "react";
import Character from "./character";
import Weapon from "./weapon";
import Layout from "./common/layout";
import Column from "./common/column";

class CharacterSheet extends Component {
  constructor(props) {
    super(props);
    this.state = { seed: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ seed: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ seed: this.element.value });
    // this.setState({ seed: this.element.name.value });
  }

  render() {
    return (
      <React.Fragment>
        <h1 Style="text-align: center;">Character Sheet</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Seed:
            <input
              type="text"
              name="seed"
              value={this.state.seed}
              ref={(el) => (this.element = el)}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Generate" />
        </form>
        <Layout>
          <Column>
            <Character key={this.state.seed} seed={this.state.seed} />
          </Column>
          {/* <Column>
            <Weapon data={data} />
          </Column> */}
        </Layout>
      </React.Fragment>
    );
  }
}

export default CharacterSheet;
