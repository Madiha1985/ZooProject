import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useAnimalContext } from '../../context/AnimalContext';
import NotificationToast from '../common/NotificationToast'
import { useEffect, useRef, useState } from 'react';
const Nav = styled.nav`
 width: 100%;
  background: #004d00;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-sizing:border-box;

`;
const Bell = styled.div`
  color: white;
  font-size: 1.2rem;
  position: relative;
  flex-shrink:0;
  span {
    position: absolute;
    top: -8px;
    right: -12px;
    background: red;
    color: white;
    font-size: 0.8rem;
    border-radius: 50%;
    padding: 0.2rem 0.5rem;
  }
`;


const StyledLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-weight: 600;

  &.active {
    text-decoration: underline;
  }
`;
export default function Header(){ 
  const lastToastTimeRef = useRef<number>(0);
 const { state, feedAnimal } = useAnimalContext();
  const [showToast, setShowToast] = useState(false);
  const [showList, setShowList] = useState(false);
  const toggleList = () => setShowList(!showList);

const handleFeed = (id: number) => {
  feedAnimal(id); 
};

 
  const unfedCount = state.filter((animal) => {
    const lastFed = new Date(animal.lastFed);
    const now = new Date();
    const hoursSinceFed = (now.getTime() - lastFed.getTime()) / (1000 * 60 * 60);
    return !animal.isFed || hoursSinceFed >= 4;
  }).length;

 const animalsNeedingFoodSoon = state.filter((animal) => {
    const lastFed = new Date(animal.lastFed);
    const now = new Date();
    const hoursSinceFed = (now.getTime() - lastFed.getTime()) / (1000 * 60 *60);
    return hoursSinceFed >= 3.5&& hoursSinceFed < 4;
  });
console.log('Animals needing food soon:', animalsNeedingFoodSoon);
console.log('Soon hungry animals:', animalsNeedingFoodSoon.map(a => `${a.name} (${a.id})`));

  useEffect(() => {
      const now = Date.now();

  const soonAnimalsExist = animalsNeedingFoodSoon.length > 0;
  if (soonAnimalsExist && now - lastToastTimeRef.current > 10000) {
    setShowToast(true);
    lastToastTimeRef.current = now;

    const timer = setTimeout(() => setShowToast(false), 5000);
    return () => clearTimeout(timer);
    }
}, [animalsNeedingFoodSoon.map(a=>a.id).join(','),state]);

  return (
  <Nav>
    <div style={{ display: 'flex', gap: '2rem' }}>
    <StyledLink to="/" end>Home</StyledLink>
    <StyledLink to="/animals">Animals</StyledLink>
    </div>
    {/* <Bell>
    🔔 <span>{unfedCount}</span>
  </Bell> */}


<Bell onClick={toggleList} style={{ cursor: 'pointer' }}>
  🔔 <span>{unfedCount}</span>
  {showList && (
    <div style={{
      position: 'absolute',
      top: '2rem',
      right: 0,
      background: '#DDF6D2',
      opacity:'0.9',
      color: 'black',
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '1rem',
      width: '250px',
      zIndex: 1001,
       maxHeight: '300px',
       overflowY: 'auto'  
    }}>
      {state.filter((animal) => {
        const lastFed = new Date(animal.lastFed);
        const now = new Date();
        const hoursSinceFed = (now.getTime() - lastFed.getTime()) / (1000 * 60 * 60);
        return !animal.isFed || hoursSinceFed >= 4;
      }).map((animal) => (
        <div key={animal.id} style={{ marginBottom: '0.5rem' }}>
          <div style={{ fontWeight: 600 }}>{animal.name}</div>
          <button
            style={{
              background: '#004d00',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '0.3rem 0.5rem',
              cursor: 'pointer',
              marginTop: '0.2rem'
            }}
            onClick={(e) => {
              e.stopPropagation(); // Prevent closing the list
              handleFeed(animal.id);
            }}
          >
            Feed
          </button>
        </div>
      ))}
      {unfedCount === 0 && <div>All animals are fed!</div>}
    </div>
  )}
</Bell>





   {showToast && (
        <NotificationToast message="Some animals will need food soon!" />
      )}
  </Nav>
);
}

