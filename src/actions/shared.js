import { showLoading, hideLoading } from "react-redux-loading";
import { getInitialData, saveQuestion, saveQuestionAnswer } from "../utils/api";
import { receiveQuestions } from "./questions";
import { receiveUsers, saveQuestionToUser } from "./users";
import { addQuestion, saveAnswerToQuestion } from "./questions";

export function handleInitialData() {
  return dispatch => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(hideLoading());
    });
  };
}

// add new question to user and question object
export function handleSaveQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    dispatch(showLoading());
    const { authedUser } = getState();

    return saveQuestion({ optionOneText, optionTwoText, author: authedUser })
      .then(question => {
        dispatch(addQuestion(question));
        dispatch(saveQuestionToUser(question));
      })
      .then(() => dispatch(hideLoading()));
  };
}

// save answer to user and question object
export function handleSaveAnswer(info) {
  return dispatch => {
    dispatch(saveAnswerToQuestion(info));

    return saveQuestionAnswer(info).catch(e => {
      console.warn("Error in saving answer: ", e);
    });
  };
}
