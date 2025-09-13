
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg);}
  100% { transform: rotate(360deg);}
`;

const Spinner = styled.div`
  border: 5px solid #f3f3f3;
  border-top: 5px solid #444;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
  margin: 4rem auto;
`;
export default function Loader(){
return(
<Spinner />
);
}




