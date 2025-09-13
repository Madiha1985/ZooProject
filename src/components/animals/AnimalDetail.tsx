
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import animalService from '../../services/animalService';
import type { IAnimal } from '../../models/IAnimal';
import { useAnimalContext } from '../../context/AnimalContext';

import Loader from '../common/Loader';
import fallbackImg from "../../assets/fallbackimage.jpg";
import fullImg from "../../assets/full.jpg";
import soonImg from "../../assets/hungry.webp";
import hungryImg from "../../assets/hungrycat.jpg";

const Container = styled.div`
  padding: 2rem;
`;

const Img = styled.img`
  max-width: 100%;
  border-radius: 8px;
`;

const Name = styled.h1``;

const Description = styled.p`
  max-width: 600px;
`;

const FeedingStatusWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem; 
  margin-top: 1rem;
`;

const FeedButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 0.7rem 1.2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 1rem;
  color: #333;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const MotionContainer = motion(Container);
const MotionFeedButton = motion(FeedButton);
const MotionBackLink = motion(BackLink);

const getFeedingLevel = (lastFed: string) => {
  const hoursSinceFed =
    (Date.now() - new Date(lastFed).getTime()) / (1000 * 60 * 60);
  if (hoursSinceFed < 3) return 'full';
  if (hoursSinceFed < 4) return 'soon';
  return 'hungry';
};

export default function AnimalDetail() {
  const { id } = useParams<{ id: string }>();
  const { state, feedAnimal } = useAnimalContext();

  const [animal, setAnimal] = useState<IAnimal | null>(null);
  const [loading, setLoading] = useState(true);
  const [canFeed, setCanFeed] = useState(false);
  const [feedingLevel, setFeedingLevel] = useState<'full' | 'soon' | 'hungry'>('full');

  // Sync local state with context animals and also fallback to fetching if context empty
  useEffect(() => {
    if (!id) return;

    const found = state.find(a => a.id === +id);

    if (found) {
      setAnimal(found);
      updateFeedStatus(found.lastFed);
      setLoading(false);
      // Also store in localStorage for persistence
      localStorage.setItem(`animal_${id}`, JSON.stringify(found));
    } else {
      // If not found in context (e.g., first load), try localStorage fallback
      const storedAnimal = localStorage.getItem(`animal_${id}`);
      if (storedAnimal) {
        try {
          const parsed = JSON.parse(storedAnimal);
          setAnimal(parsed);
          updateFeedStatus(parsed.lastFed);
        } catch {
          // Ignore parse errors
        } finally {
          setLoading(false);
        }
      } else {
        // Fallback: fetch from API (optional, depends on your app logic)
        animalService.getAnimalById(+id)
          .then(data => {
            setAnimal(data);
            updateFeedStatus(data.lastFed);
            localStorage.setItem(`animal_${id}`, JSON.stringify(data));
          })
          .catch(() => setAnimal(null))
          .finally(() => setLoading(false));
      }
    }
  }, [id, state]);

  // Update feeding status every minute
  useEffect(() => {
    if (!animal) return;
    const interval = setInterval(() => {
      updateFeedStatus(animal.lastFed);
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, [animal?.lastFed]);

  // Feeding status helper
  const updateFeedStatus = (lastFed: string) => {
    const hoursSinceFed = (Date.now() - new Date(lastFed).getTime()) / (1000 * 60 * 60);
    setCanFeed(hoursSinceFed >= 4);
    setFeedingLevel(getFeedingLevel(lastFed));
  };

  // Feeding action: dispatch feed and update local state + localStorage
  const handleFeed = () => {
    if (!animal) return;

    feedAnimal(animal.id); // Update context

    const updated = {
      ...animal,
      isFed: true,
      lastFed: new Date().toISOString(),
    };
    setAnimal(updated);
    localStorage.setItem(`animal_${animal.id}`, JSON.stringify(updated));
    updateFeedStatus(updated.lastFed);
  };

  if (loading) return <Loader />;

  if (!animal) return <Container>Animal not found</Container>;

  return (
    <MotionContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <MotionBackLink
        to="/animals"
        whileHover={{ scale: 1.1, color: '#004d00' }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        ← Back to Animals
      </MotionBackLink>

      <Name>{animal.name}</Name>
      <Img
        src={animal.imageUrl}
        alt={animal.name || 'Animal image'}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = fallbackImg;
        }}
      />
      <Description>{animal.longDescription}</Description>

      <p>Last fed: {new Date(animal.lastFed).toLocaleString()}</p>

      <FeedingStatusWrapper>
        <motion.img
          src={
            feedingLevel === 'full'
              ? fullImg
              : feedingLevel === 'soon'
              ? soonImg
              : hungryImg
          }
          alt={feedingLevel}
          style={{ width: '80px', height: '80px', objectFit: 'contain', marginTop: '1rem' }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <MotionFeedButton
          onClick={handleFeed}
          disabled={!canFeed}
          whileHover={{ scale: canFeed ? 1.05 : 1 }}
          whileTap={{ scale: canFeed ? 0.95 : 1 }}
        >
          {canFeed ? 'Feed Animal 🍽️' : 'Already Fed'}
        </MotionFeedButton>
      </FeedingStatusWrapper>
    </MotionContainer>
  );
}

