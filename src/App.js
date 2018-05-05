import React, { Component } from 'react';

import { connect } from 'react-redux';

import { UncontrolledAlert, Form, FormGroup, Label, Input, Button } from 'reactstrap';

import BubbleChart from './components/BubbleChart';

class App extends Component {
  formSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    this.props.onRequestChartData({
      dim_words: data.get('dim_words').split(','),
      score_dim_words: data.get('score_dim_words').split(','),
      model_id: data.get('model_id'),
    });
  };

  render() {
    const { is_loading, chart_data, error } = this.props;

    return (
      <div className="container">
        <h1>Bubble Chart Demo</h1>
        { error && <UncontrolledAlert color="danger">
          Something went wrong! Please try again
          { React.isValidElement(error) || typeof error === 'string' ? [ <hr key="error_line" />, error ] : null }
        </UncontrolledAlert> }
        <Form onSubmit={this.formSubmit}>
          <FormGroup>
            <Label htmlFor="dim_words">Dim words</Label>
            <Input type="text" name="dim_words" id="dim_words" className="form-control" defaultValue="car,automotive,volkswagen" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="score_dim_words">Score dim words</Label>
            <Input type="text" name="score_dim_words" id="score_dim_words" className="form-control" defaultValue="innovative,innovation,future" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="model_id">Model id</Label>
            <Input type="text" name="model_id" id="model_id" className="form-control" defaultValue="001" />
          </FormGroup>
          <Button color="primary" disabled={is_loading}>{ is_loading ? 'Loading data...' : 'Submit' }</Button>
        </Form>
        { chart_data && <BubbleChart data={chart_data} /> }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    is_loading: state.is_loading,
    chart_data: state.chart_data,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestChartData: (form_data) => dispatch({ type: 'GET_CHART_DATA_REQUEST', payload: form_data })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);