import React, { Component } from "react";
import styled from "styled-components";

class FlexItem extends Component {
  render() {
    const {
      children,
      className,
      display,
      flexGrow,
      flexShrink,
      flexBasis,
      alignSelf,
      order,
    } = this.props;
    return (
      <Container
        className={className}
        display={display}
        flexGrow={flexGrow}
        flexShrink={flexShrink}
        flexBasis={flexBasis}
        alignSelf={alignSelf}
        order={order}
      >
        {children}
      </Container>
    );
  }
}

const Container = styled.div`
  display: ${(props) => (props.display ? props.display : "block")};
  flex-grow: ${(props) => (props.flexGrow ? props.flexGrow : "1")};
  flex-shrink: ${(props) => (props.flexShrink ? props.flexShrink : "1")};
  flex-basis: ${(props) => (props.flexBasis ? props.flexBasis : "auto")};
  align-self: ${(props) => (props.alignSelf ? props.alignSelf : "auto")};
  order: ${(props) => (props.order ? props.order : "0")};
`;

export default FlexItem;
