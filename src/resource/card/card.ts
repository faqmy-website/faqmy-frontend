export interface CardResource {
  id: string;
  question: string;
  answer: string;
  learned: boolean;
}

export interface InputCard {
  stack_id: string;
  question: string;
  answer: string;
}
