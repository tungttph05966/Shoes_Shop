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

class EditUser extends Component {
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

    async componentDidMount() {
        try {
            const userId = this.props.match.params.id;
            const user = await networks.getSingleUser(userId);
            if (user.data && user.data.data) {
                this.setState({
                    formData: {
                        ...user.data.data,
                        password: '',
                    }
                });
            }
        } catch (error) {

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
        const { id, fullname, phone, address, email, password } = this.state.formData;

        this.props.updateUser({ id, fullname, phone, address, email, password }, () => {
            this.props.history.push('/users');
        });
    }

    render() {
        const { loading } = this.props;
        const { fullname, username, phone, address, email, password } = this.state.formData;

        return (
            <CRow>
                <CCol xs="12">
                    <CCard>
                        <CCardHeader>
                            Chỉnh sửa người dùng
                        </CCardHeader>
                        <CCardBody>
                            <CForm onSubmit={this.handleSubmit} id="new-form" className="form-horizontal">
                                <CFormGroup>
                                    <CLabel htmlFor="username">Tên đăng nhập</CLabel>
                                    <CInput disabled value={username} onChange={this.handleChange} required id="username" name="username" placeholder="Nhập tên đăng nhập" />
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel htmlFor="password">Mật khẩu</CLabel>
                                    <CInput type="password" value={password} onChange={this.handleChange} id="password" name="password" placeholder="Nhập mật khẩu mới" />
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
                            <CButton disabled={loading} form="new-form" type="submit" size="sm" color="primary" className="mr-3"><CIcon name="cil-save" /> Lưu</CButton>
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
    updateUser: (user, cb) => dispatch(actions.updateUser(user, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
