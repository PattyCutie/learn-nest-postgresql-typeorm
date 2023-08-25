import { QuestionEntity } from 'src/entity/question.entity';
import { UserChoiceEntity } from 'src/entity/user-choice.entity';

export function TotalPoints(
  questions: QuestionEntity[],
  userChoices: UserChoiceEntity[],
): number {
  let totalPoints = 0;

  for (const question of questions) {
    const selectedChoice = userChoices.find(
      (choice) => choice.questionId === question.id,
    );

    if (selectedChoice && selectedChoice.isCorrect) {
      totalPoints += 1;
    }
  }

  return totalPoints;
}
