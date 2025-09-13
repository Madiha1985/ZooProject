import type { IAnimal } from "../models/IAnimal";

// ✅ Action types as constant object
export const AnimalActionTypes = {
  SET_ANIMALS: "SET_ANIMALS",
  FEED_ANIMAL: "FEED_ANIMAL",
} as const;

// ✅ Infer action type values from AnimalActionTypes
export type AnimalActionType = typeof AnimalActionTypes[keyof typeof AnimalActionTypes];

// ✅ Action shape
export type AnimalAction =
  | { type: typeof AnimalActionTypes.SET_ANIMALS; payload: IAnimal[] }
  | { type: typeof AnimalActionTypes.FEED_ANIMAL; payload: { id: number; time: string } };

// ✅ Reducer
export const AnimalReducer = (state: IAnimal[], action: AnimalAction): IAnimal[] => {
  switch (action.type) {
    case AnimalActionTypes.SET_ANIMALS:
      return action.payload;

    case AnimalActionTypes.FEED_ANIMAL:
      const updated = state.map((animal) =>
        animal.id === action.payload.id
          ? { ...animal, isFed: true, lastFed: action.payload.time }
          : animal
      );
      localStorage.setItem("fedAnimals", JSON.stringify(updated));
      return updated;

    default:
      return state;
  }
};
