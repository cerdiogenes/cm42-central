import * as ProjectBoard from 'models/beta/projectBoard';
import actionTypes from './actionTypes';
import { classifyStories } from './column';
import { receiveUsers } from './user';
import { receiveStories } from './story';

const requestProjectBoard = () => ({
  type: actionTypes.REQUEST_PROJECT_BOARD
});

const receiveProjectBoard = (projectId) => ({
  type: actionTypes.RECEIVE_PROJECT_BOARD,
  data: projectId
});

const errorRequestProjectBoard = (error) => ({
  type: actionTypes.ERROR_REQUEST_PROJECT_BOARD,
  error: error
});

const receiveProject = (project) => ({
  type: actionTypes.RECEIVE_PROJECT,
  data: project
});

export const fetchProjectBoard = (projectId) => {
  return (dispatch) => {
    dispatch(requestProjectBoard());

    ProjectBoard.get(projectId)
      .then(({ project, users, stories }) => {
        dispatch(receiveProject(project));
        dispatch(receiveUsers(users));
        dispatch(receiveStories(stories));
        dispatch(receiveProjectBoard(projectId));
        classifyStories(dispatch, stories, project);
      })
      .catch((error) =>
        dispatch(errorRequestProjectBoard(error))
      );
  };
}
