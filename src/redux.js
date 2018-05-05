const GET_CHART_DATA_REQUEST = 'GET_CHART_DATA_REQUEST';
const GET_CHART_DATA_SUCCESS = 'GET_CHART_DATA_SUCCESS';
const GET_CHART_DATA_FAILURE = 'GET_CHART_DATA_FAILURE';

const initialState = {
  is_loading: false,
  chart_data: null,
  error: null
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_CHART_DATA_REQUEST:
      return { ...state, is_loading: true, error: null };

    case GET_CHART_DATA_SUCCESS:
      return { ...state, is_loading: false, chart_data: action.chart_data };

    case GET_CHART_DATA_FAILURE:
      return { ...state, is_loading: false, chart_data: null, error: action.error };

    default:
      return state;
  }
}