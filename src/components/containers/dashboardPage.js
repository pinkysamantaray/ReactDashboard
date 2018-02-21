import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import GridContainer from './gridContainer';

export class DashboardPage extends React.Component {

  render() {
    return (
      <GridContainer />
    );
  }
}

DashboardPage.propTypes = {
};

function mapStateToProps(state) {
  return {
    
  };
}

function mapDispatchToProps(dispatch) {
  return {
    
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardPage);
