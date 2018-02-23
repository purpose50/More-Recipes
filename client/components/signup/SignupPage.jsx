import React from 'react';
import PropTypes from 'prop-types';
import SignupForm from '../../containers/SignupForm';
import Navigation from '../Navigation';

const SignupPage = props => (
  <div>
    <Navigation {...props}/>
    <SignupForm redirectUser={props.history} />
  </div>
);

SignupPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
};

export default SignupPage;
