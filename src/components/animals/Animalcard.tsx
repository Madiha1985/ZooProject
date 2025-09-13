import fallbackImg from '../../assets/fallbackimage.jpg'
import type { IAnimal } from '../../models/IAnimal';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState } from 'react';

const MotionCard = styled(motion.div)`
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 5px #ccc;
  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: 0 0 10px #999;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 1rem;
`;

const Name = styled.h3`
  margin: 0;
`;

const ShortDesc = styled.p`
  margin: 0.5rem 0 0 0;
  color: #555;
`;

interface Props {
  animal: IAnimal;
}

export default function AnimalCard({ animal }:Props){
  const navigate = useNavigate();
const [imgSrc, setImgSrc] = useState(animal.imageUrl);
  const handleClick = () => {
    navigate(`/animals/${animal.id}`);
  };
  const handleImgError = () => {
  setImgSrc(fallbackImg); 
};


  return (
    <MotionCard onClick={handleClick}
     animate={{
    scale: [1, 1.05, 1, 1.05, 1],
    rotate: [0, 1, -1, 1, 0],
    borderRadius: ["8px", "12px", "8px", "12px", "8px"]
  }}
  transition={{
    duration: 3,
    ease: "easeInOut",
    times: [0, 0.25, 0.5, 0.75, 1],
    repeat: Infinity,
    repeatDelay: 2,
  }}
    >
      <Img src={imgSrc} alt={animal.name} onError={handleImgError} />
      <Content>
        <Name>{animal.name}</Name>
        <ShortDesc>{animal.shortDescription}</ShortDesc>
      </Content>
    </MotionCard>
  );
};


