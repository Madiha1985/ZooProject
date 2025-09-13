import styled from 'styled-components';
import AnimatedBackground from '../components/AnimatedBackground';

const Container = styled.main`
  height: 100vh;
  background-image: url('/assets/zoo-background1.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-shadow: 0 0 5px black;
  padding: 2rem;
`;

const Heading = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const SubHeading = styled.p`
  font-size: 1.5rem;
`;

export default function Home() {
  return (
  <>
  <AnimatedBackground/>
  <Container>
    <Heading>Welcome to the Zoo</Heading>
    <SubHeading>Explore the animals with us and feed them.</SubHeading>
  </Container>
  </>
);
}

