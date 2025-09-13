import BaseService from './baseService';
import type { IAnimal } from '../models/IAnimal';

class AnimalService extends BaseService {
  constructor() {
    super(import.meta.env.VITE_API_URL);
  }

  getAnimals(): Promise<IAnimal[]> {
    return this.get<IAnimal[]>('/animals');
  }

  getAnimalById(id: number): Promise<IAnimal> {
    return this.get<IAnimal>(`/animals/${id}`);
  }
}

export default new AnimalService();
