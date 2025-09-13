// import { useEffect, useState } from 'react';
import styled from 'styled-components';
// import animalService from '../services/animalService';
// import type { IAnimal } from '../models/IAnimal';
import AnimalCard from '../components/animals/Animalcard'
import Loader from '../components/common/Loader';
import { useAnimalContext } from '../context/AnimalContext';

const Container = styled.section`
  padding: 2rem;
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
`;

export default function AnimalsOverview(){
const { state } = useAnimalContext();
const animals = state;

  if (!animals.length) return <Loader />;   
  return (
    <Container>
      {animals.map(animal => (
        <AnimalCard key={animal.id} animal={animal} />
      ))}
    </Container>
  );
}
  