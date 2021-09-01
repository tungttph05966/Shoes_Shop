import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index';
import LoadingOverlay from 'react-loading-overlay-ts';

import * as actions from '../actions';

class TheLayout extends Component {
  componentDidMount() {
    this.props.getUserInfo();
  }

  render() {
    const { userInfo, isCheckAuth, isAuth } = this.props;
    
    if (!isCheckAuth) {
      return (
        <LoadingOverlay
          active={true}
          spinner
          text=''
          styles={{
            wrapper: (base) => ({
              ...base,
              width: '100vw',
              height: '100vh',
            }),
            overlay: (base) => ({
              ...base,
              background: '#ffffff',
            }),
            spinner: (base) => ({
              ...base,
              '& svg': {
                ...base['& svg'],
                '& circle': {
                  ...base['& svg']['& circle'],
                  stroke: "red",
                },
              },
            })
          }}
        />
      )
    }

    if (!isAuth) {
      return <Redirect to="/login" />
    }

    if (!userInfo || !userInfo.is_admin) {
      return <div onClick={this.props.signOut()} />
    }

    return (
      <div className="c-app c-default-layout">
        <TheSidebar/>
        <div className="c-wrapper">
          <TheHeader/>
          <div className="c-body">
            <TheContent/>
          </div>
          <TheFooter/>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
  isCheckAuth: state.auth.isCheckAuth,
  isAuth: state.auth.isAuth,
  loading: state.common.loading,
});

const mapDispatchToProps = dispatch => ({
  getUserInfo: () => dispatch(actions.getUserInfo()),
  signOut: () => dispatch(actions.signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TheLayout);
