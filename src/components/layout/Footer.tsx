import styled from 'styled-components';

const Foot = styled.footer`
  background: #004d00;
  color: white;
  text-align: center;
  padding: 1rem;
  position: fixed;
  width: 100%;
  bottom: 0;
`;

export default function Footer(){
return(
<Foot>© 2025 Zoo App</Foot>
);
}
