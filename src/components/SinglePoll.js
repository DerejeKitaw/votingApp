import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import * as PollActionCreators from '../ducks/polls';
import Poll from './Poll';
import Chart from './Chart';
import NewAnswer from './NewAnswer';
import loadAgain from '../app';

class SinglePoll extends React.Component {
  componentDidMount() {
    loadAgain();
  }
  render() {
    const { dispatch, polls, loggedIn } = this.props;
    const props = this.props;
    const deletePoll = bindActionCreators(PollActionCreators.deletePoll, dispatch);
    const updateVotes = bindActionCreators(PollActionCreators.updateVotes, dispatch);
    const addEditPoll = bindActionCreators(PollActionCreators.addEditPoll, dispatch);

    const renderDeleteBtn = () => {
      if (loggedIn) {
        return (
          <Link
            to="/polls"
            className="waves-effect btn red lighten-2"
            onClick={() => deletePoll(parseInt(props.match.params.id, 10))}
          >
            <i className="material-icons right">report_problem</i>
						DELETE Poll
					</Link>
        );
      }
    };

    const editPollBtn = () => {
      if (loggedIn) {
        return (
          <a className="waves-effect btn teal lighten-2" href="#modal1">
						ADD New Answer
					</a>
        );
      }
    };

    return (
      <div className="grey darken-2" style={{ margin: '0px', padding: '0px', height: '100%' }}>
        <div className="row">
          <div className="col s12 m6">
            <div className="card blue-grey darken-4 hoverable">
              <Poll
                polls={polls}
                index={parseInt(props.match.params.id, 10)}
                url={props.match.params.id}
                updateVotes={updateVotes}
              />
              <div className="card-action" />
            </div>
          </div>

          <div className="col s12 m6">
            <Chart
              polls={polls}
              index={parseInt(props.match.params.id, 10)}
              url={props.match.params.id}
            />
          </div>
        </div>

        <div className="row">
          <div className="col s12 m8">
            <a href="https://twitter.com/share" className="btn blue accent-1">
              <i className="waves-effect material-icons right">trending_up</i>
							Tweet Poll
						</a>
            {editPollBtn()}
            {renderDeleteBtn()}
            <NewAnswer
              polls={polls}
              index={parseInt(props.match.params.id, 10)}
              addEditPoll={addEditPoll}
            />
          </div>
          <div className="col s12 m4">
            <Link to="/polls" className="waves-effect btn green lighten-2 right-align">
							Back to all Polls
						</Link>
          </div>
        </div>
        <div className="row grey darken-2" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  polls: state.polls,
  loggedIn: state.loggedIn,
});

SinglePoll.propTypes = {
  polls: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(SinglePoll);