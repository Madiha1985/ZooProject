
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';
const Main = styled.main`
  // padding: 2rem;
  // min-height: calc(100vh - 140px);
padding: 6rem 2rem 4rem;
 min-height: calc(100vh - 140px);
`;

export default function MainLayout(){
  return(
  <>
    <Header />
    <Main >
      <Outlet />
    </Main>
    <Footer />
  </>
  );
}


