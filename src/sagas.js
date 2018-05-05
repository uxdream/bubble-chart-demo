import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

export function* watcherSaga() {
  yield takeLatest('GET_CHART_DATA_REQUEST', workerSaga);
}

function fetchChartData({ dim_words, score_dim_words, model_id }) {
  return axios({
    method: 'post',
    url: '/api/bubble_list',
    data: {
      dim_words,
      score_dim_words,
      model_id,
    },
    timeout: 2500,
  });
}

function* workerSaga(action) {
  try {
    const response = yield call(fetchChartData, action.payload);

    if (response.data.error) {
      yield put({ type: 'GET_CHART_DATA_FAILURE', error: response.data.error });
    } else {
      yield put({ type: 'GET_CHART_DATA_SUCCESS', chart_data: response.data });
    }
  } catch (error) {
    yield put({ type: 'GET_CHART_DATA_FAILURE', error });
  }
}