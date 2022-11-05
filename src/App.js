import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import { getCurrenciesAct } from './redux/actions';

class App extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrenciesAct());
  }

  render() {
    return (
      <Switch>
        <Route exact path="/project-trybewallet/" component={ Login } />
        <Route exact path="/project-trybewallet/carteira" component={ Wallet } />
      </Switch>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(App);
