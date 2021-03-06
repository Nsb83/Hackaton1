export class TriviaClass {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  answers: string[];

    constructor (
      category: string,
      type: string,
      difficulty: string,
      question: string,
      answers: string[]
      ) {
      this.category = category;
      this.type = type;
      this.difficulty = difficulty;
      this.question = question;
      this.answers = answers;
    }
}

