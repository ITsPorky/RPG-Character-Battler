import React, { Component } from "react";
import styled from "styled-components";

class FlexContainer extends Component {
  render() {
    const {
      children,
      className,
      justifyContent,
      alignItems,
      flexDirection,
      flexWrap,
      alignContent,
    } = this.props;

    return (
      <Container
        className={className}
        justifyContent={justifyContent}
        alignItems={alignItems}
        flexDirection={flexDirection}
        flexWrap={flexWrap}
        alignContent={alignContent}
      >
        {children}
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : "row"};
  flex-wrap: ${(props) => (props.flexWrap ? props.flexWrap : "wrap")};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "flex-start"};
  align-items: ${(props) => (props.alignItems ? props.alignItems : "stretch")};
  align-content: ${(props) =>
    props.alignContent ? props.alignContent : "stretch"};
`;

export default FlexContainer;
