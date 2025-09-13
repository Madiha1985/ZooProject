
// import { createContext, useContext, useEffect, useReducer } from "react";
// import type { IAnimal } from "../models/IAnimal";
// import animalService from "../services/animalService";

// type State = {
//   animals: IAnimal[];
// };

// type Action =
//   | { type: "SET_ANIMALS"; payload: IAnimal[] }
//   | { type: "FEED_ANIMAL"; id: number; time: string };


// const AnimalContext = createContext<{
//   state: State;
//   feedAnimal: (id: number) => void;
// }>({ state: { animals: [] }, feedAnimal: () => {} });

// const reducer = (state: State, action: Action): State => {
//   switch (action.type) {
//     case "SET_ANIMALS":
//       return { animals: action.payload };
//     case "FEED_ANIMAL":
//       const updatedAnimals = state.animals.map(animal =>
//         animal.id === action.id
//           ? { ...animal, isFed: true, lastFed: action.time }
//           : animal
//       );
//       localStorage.setItem("fedAnimals", JSON.stringify(updatedAnimals));
//       return { animals: updatedAnimals };
//     default:
//       return state;
//   }
// };

// export const AnimalProvider = ({ children }: { children: React.ReactNode }) => {
//   const [state, dispatch] = useReducer(reducer, { animals: [] });

//   useEffect(() => {
//     const fetchAndSync = async () => {
//       const data = await animalService.getAnimals();
//       const local = JSON.parse(localStorage.getItem("fedAnimals") || "[]");

//       const merged = data.map(animal => {
//         const localMatch = local.find((a: IAnimal) => a.id === animal.id);
//         return localMatch ?? animal;
//       });

//       dispatch({ type: "SET_ANIMALS", payload: merged });
//     };

//     fetchAndSync();
//   }, []);

//   const feedAnimal = (id: number) => {
//     const now = new Date().toISOString();
//     dispatch({ type: "FEED_ANIMAL", id, time: now });
//   };

//   return (
//     <AnimalContext.Provider value={{ state, feedAnimal }}>
//       {children}
//     </AnimalContext.Provider>
//   );
// };

// export const useAnimalContext = () => useContext(AnimalContext);

import { createContext, useContext, useEffect, useReducer} from "react";
import type { Dispatch } from "react";
import type { IAnimal } from "../models/IAnimal";
import animalService from "../services/animalService";
import {
  AnimalReducer,
  AnimalActionTypes,
} from "../reducers/animalReducer";
import type { AnimalAction } from "../reducers/animalReducer";

// ✅ Define context shape
interface IAnimalContext {
  state: IAnimal[];
  dispatch: Dispatch<AnimalAction>;
   feedAnimal: (id: number) => void;
}

// ✅ Create context
export const AnimalContext = createContext<IAnimalContext>({
  state: [],
  dispatch: () => {}, // placeholder
  feedAnimal: () => {},
});

// ✅ Provider component
export const AnimalProvider = ({ children }: { children: React.ReactNode }) => {
  // const [animals, dispatch] = useReducer(AnimalReducer, []);
const [state, dispatch] = useReducer(AnimalReducer, []);

  useEffect(() => {
    const fetchAnimals = async () => {
      const apiAnimals = await animalService.getAnimals();
      const local = JSON.parse(localStorage.getItem("fedAnimals") || "[]");

      const merged = apiAnimals.map((animal) => {
        const match = local.find((a: IAnimal) => a.id === animal.id);
        return match ?? animal;
      });

      dispatch({ type: AnimalActionTypes.SET_ANIMALS, payload: merged });
    };

    fetchAnimals();
  }, []);
  
// Implement feedAnimal function that dispatches the FEED_ANIMAL action
  const feedAnimal = (id: number) => {
    const time = new Date().toISOString();
    dispatch({
      type: AnimalActionTypes.FEED_ANIMAL,
      payload: { id, time },
    });
  };

  return (
    <AnimalContext.Provider value={{state, dispatch, feedAnimal}}>
      {children}
    </AnimalContext.Provider>
  );
};

// ✅ Custom hook for easier use
export const useAnimalContext = () => useContext(AnimalContext);
