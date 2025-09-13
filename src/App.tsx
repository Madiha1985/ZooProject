// import "./App.css";

import AppRouter from "./AppRouter";
import { AnimalProvider } from "./context/AnimalContext";




export default function App() {
  return (
    <AnimalProvider>
      <AppRouter/>
    </AnimalProvider>
 
  );
};

