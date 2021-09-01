import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import LoadingOverlay from 'react-loading-overlay-ts';

import * as actions from '../../actions';

class Login extends Component {
  state = {
    formData: {
      username: '',
      password: ''
    }
  }

  handleChange = (e) => {
    const { formData } = this.state;
    const { name, value } = e.target;
    this.setState({
      formData: {
        ...formData,
        [name]: value,
      }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state.formData;

    this.props.signIn({ username, password });
  }

  render() {
    const { loading } = this.props;
    const { username, password } = this.state.formData;

    return (
      <>
        {loading && <LoadingOverlay
          active={loading}
          spinner
          text=''
          styles={{
            wrapper: (base) => ({
              ...base,
              position: 'fixed',
              width: '100vw',
              height: '100vh',
              zIndex: 99999,
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
        />}
        <div className="c-app c-default-layout flex-row align-items-center">
          <CContainer>
            <CRow className="justify-content-center">
              <CCol md="5">
                <CCardGroup>
                  <CCard className="p-4">
                    <CCardBody>
                      <CForm onSubmit={this.handleSubmit}>
                        <h1>Đăng nhập</h1>
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-user" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput required name="username" type="text" placeholder="Nhập tài khoản" value={username} onChange={this.handleChange} />
                        </CInputGroup>
                        <CInputGroup className="mb-4">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-lock-locked" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput required name="password" type="password" placeholder="Nhập mật khẩu" value={password} onChange={this.handleChange} />
                        </CInputGroup>
                        <CRow>
                          <CCol xs="6">
                            <CButton type="submit" color="primary" className="px-4">Đăng nhập</CButton>
                          </CCol>
                        </CRow>
                      </CForm>
                    </CCardBody>
                  </CCard>
                </CCardGroup>
              </CCol>
            </CRow>
          </CContainer>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.common.loading,
});

const mapDispatchToProps = dispatch => ({
  signIn: (signInData) => dispatch(actions.signIn(signInData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
