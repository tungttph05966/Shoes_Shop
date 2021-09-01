import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CForm,
    CFormGroup,
    CInput,
    CLabel,
    CSelect,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import * as actions from '../../actions';
import * as networks from '../../networks';

class NewUsers extends Component {
    state = {
        formData: {
            fullname: '',
            phone: '',
            address: '',
            username: '',
            email: '',
            password: '',
        },
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
        const { fullname, phone, address, username, email, password } = this.state.formData;

        this.props.createUser({ fullname, phone, address, username, email, password }, () => {
            this.props.history.push('/users');
        });
    }

    render() {
        const { loading } = this.props;
        const { fullname, phone, address, username, email, password } = this.state.formData;

        return (
            <CRow>
                <CCol xs="12">
                    <CCard>
                        <CCardHeader>
                            Tạo người dùng mới
                        </CCardHeader>
                        <CCardBody>
                            <CForm onSubmit={this.handleSubmit} id="new-form" className="form-horizontal">
                                <CFormGroup>
                                    <CLabel htmlFor="username">Tên đăng nhập</CLabel>
                                    <CInput value={username} onChange={this.handleChange} required id="username" name="username" placeholder="Nhập tên đăng nhập" />
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel htmlFor="password">Mật khẩu</CLabel>
                                    <CInput type="password" value={password} onChange={this.handleChange} required id="password" name="password" placeholder="Nhập mật khẩu" />
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel htmlFor="email">Email</CLabel>
                                    <CInput type="email" value={email} onChange={this.handleChange} id="email" name="email" placeholder="Nhập email" />
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel htmlFor="fullname">Họ tên</CLabel>
                                    <CInput value={fullname} onChange={this.handleChange} id="fullname" name="fullname" placeholder="Nhập họ tên" />
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel htmlFor="phone">Số điện thoại</CLabel>
                                    <CInput value={phone} onChange={this.handleChange} id="phone" name="phone" placeholder="Nhập số điện thoại" />
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel htmlFor="address">Địa chỉ</CLabel>
                                    <CInput value={address} onChange={this.handleChange} id="address" name="address" placeholder="Nhập địa chỉ" />
                                </CFormGroup>
                            </CForm>
                        </CCardBody>
                        <CCardFooter className="text-right">
                            <CButton disabled={loading} form="new-form" type="submit" size="sm" color="primary" className="mr-3"><CIcon name="cil-plus" /> Tạo</CButton>
                            <Link to="/users">
                                <CButton disabled={loading} type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Hủy bỏ</CButton>
                            </Link>
                        </CCardFooter>
                    </CCard>
                </CCol>
            </CRow>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.common.loading,
});

const mapDispatchToProps = dispatch => ({
    createUser: (user, cb) => dispatch(actions.createUser(user, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewUsers);
