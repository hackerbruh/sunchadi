import React, { Component } from "react";
import { connect } from "react-redux";

import Grid from "../../../app/components/Grid/Grid";
import Loader from "../../../app/common/Loader/Loader";
import Input from "../../../app/components/Input/Input";

import Worker from "./WorkerCard/WorkerCard";

import { searchWorker, fetchWorkers } from "../workerActions";

class Workers extends Component {
  state = {
    term: ""
  };
  componentDidMount() {
    this.props.fetchWorkers();
  }

  render() {
    const { term } = this.state;
    let { workers, searchedWorkers, loading, error } = this.props;
    if (error) {
      return <div>Inernet Connection Error</div>;
    }
    if (loading) {
      return <Loader message="Loading Workers" />;
    }
    if (searchedWorkers.length > 0) {
      workers = searchedWorkers;
    }

    let workersGrid = workers.map(({ id, photoURI, name, address }) => (
      <Grid.Column key={id}>
        <Worker {...{ id, photoURI, name, address }} />
      </Grid.Column>
    ));

    if (term !== "" && searchedWorkers.length < 1) {
      workersGrid = [];
    }

    if (workersGrid.length < 1) {
      workersGrid = <div>No Workers</div>;
    }

    return (
      <Grid gutterWidth="0rem">
        <Input
          onChange={e => {
            this.setState({ term: e.target.value });
            this.props.searchWorker(e.target.value);
          }}
        />
        <div style={{ height: "100vh", overflow: "scroll" }}>
          <Grid.Row columns={3}>{workersGrid}</Grid.Row>
        </div>
      </Grid>
    );
  }
}

const mapState = ({
  workers: { workers, searchedWorkers },
  async: { loading, error }
}) => ({
  workers,
  searchedWorkers,
  loading,
  error
});

const actions = {
  searchWorker,
  fetchWorkers
};

export default connect(
  mapState,
  actions
)(Workers);
