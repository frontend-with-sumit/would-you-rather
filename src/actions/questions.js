export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const SAVE_QUESTION = "SAVE_QUESTION";
export const SAVE_ANSWER_To_QUESTION = "SAVE_ANSWER_TO_QUESTION";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
}

export function addQuestion(question) {
  return {
    type: SAVE_QUESTION,
    question
  };
}

export function saveAnswerToQuestion({ authedUser, qid, answer }) {
  return {
    type: SAVE_ANSWER_To_QUESTION,
    authedUser,
    qid,
    answer
  };
}
