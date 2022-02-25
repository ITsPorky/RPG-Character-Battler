import React from "react";
import styled from "styled-components";

const Column = ({ children, className, centerAlign, centerJustify }) => (
  <Container
    className={className}
    centerAlign={centerAlign}
    centerJustify={centerJustify}
  >
    {children}
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ centerAlign }) => (centerAlign ? "center" : "flex-start")};
  justify-content: ${({ centerJustify }) =>
    centerJustify ? "center" : "flex-start"};
  padding: 0.5em;
`;

export default Column;
