import styled from "styled-components";

function Header() {
  return (
    <Area>
      <h1>BDRILL</h1>
    </Area>
  );
}

export default Header;

const Area = styled.header`
  background-color: #f0f0f0;
  padding: 1rem;
  h1 {
    margin: 0;
  }
`;
