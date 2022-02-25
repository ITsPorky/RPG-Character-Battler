import React from "react";
import styled from "styled-components";

const Layout = ({ children, className }) => (
  <Container className={className}>
    <Flex>{children}</Flex>
  </Container>
);

const Container = styled.div`
  display: flex;
  justify-content: center;
  // padding-top: 5rem;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  // flex-wrap: wrap;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export default Layout;
