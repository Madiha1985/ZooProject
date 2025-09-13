import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';


const backgrounds = [
  '/assets/zoobackground2.jpg',
  '/assets/zoobackground3.jpg',
  '/assets/zoobackground4.jpg',
  '/assets/zoobackground5.jpg',
  '/assets/zoobackground6.jpg',
  '/assets/zoobackground7.jpg',
];

const BackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
`;

const BgImage = styled(motion.div)<{ imageUrl: string }>`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
`;

const fadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function AnimatedBackground(){
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % backgrounds.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <BackgroundWrapper>
      <AnimatePresence>
        <BgImage
          key={`bg-${index}`}
          imageUrl={backgrounds[index]}
          variants={fadeVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 2 }}
        />
      </AnimatePresence>
    </BackgroundWrapper>
  );
};

// export default AnimatedBackground;
