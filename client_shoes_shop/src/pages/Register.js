import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import * as actions from '../actions';
import * as networks from '../networks';

const RegisterSwal = withReactContent(Swal)

class Register extends Component {
    state = {
        formValue: {
            fullname: '',
            email: '',
            password: '',
        }
    }

    handleChange = (e) => {
        const { formValue } = this.state;
        const { name, value } = e.target;

        this.setState({
            formValue: {
                ...formValue,
                [name]: value,
            }
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const { formValue } = this.state;
        const { fullname, email, password } = formValue;

        try {
            const registerResponse = await networks.signUp({
                fullname,
                email,
                password,
            });

            if (registerResponse.data && registerResponse.data.data) {
                RegisterSwal.fire({
                    title: 'Đăng ký tài khoản thành công!',
                    icon: 'success',
                    showDenyButton: false,
                    showCancelButton: false,
                }).then((result) => {
                    this.props.history.push('/login');
                });
            } else {
                toast.error(registerResponse.data && registerResponse.data.message || "Đăng ký tài khoản thất bại! Vui lòng thử lại.");
            }
        } catch (error) {
            toast.error(error && error.response && error.response.data && error.response.data.message || "Đăng ký tài khoản thất bại! Vui lòng thử lại.");
        }
    }

    render() {
        const { loading } = this.props;
        const { formValue } = this.state;

        return (
            <>
                <div>
                    <div className="shopping-cart">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="location">
                                        <ul>
                                            <li><Link to="/" title="go to homepage">Home<span>/</span></Link></li>
                                            <li><strong>Đăng ký tài khoản</strong></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="login-area ptb-120">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 col-md-offset-3 text-center">
                                    <div className="login">
                                        <div className="login-form-container">
                                            <div className="login-text">
                                                <h2>Đăng ký tài khoản</h2>
                                            </div>
                                            <div className="login-form">
                                                <form action="#" method="post" onSubmit={this.handleSubmit}>
                                                    <input type="text" name="fullname" placeholder="Họ tên" value={formValue.fullname} onChange={this.handleChange} />
                                                    <input type="email" name="email" placeholder="Địa chỉ Email" value={formValue.value} onChange={this.handleChange} />
                                                    <input type="password" name="password" placeholder="Mật khẩu" value={formValue.password} onChange={this.handleChange} />
                                                    <div className="button-box text-center">
                                                        <button disabled={loading} type="submit" className="default-btn">Đăng ký</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.common.loading,
    }
}

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register))
