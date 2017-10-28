import { Baby } from './baby.model';

export interface Card {

  id: number;
  ocupado: boolean;
  encontrado: boolean;
  baby?: Baby;


}
