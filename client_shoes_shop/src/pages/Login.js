import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import * as actions from '../actions';
import * as networks from '../networks';

const RegisterSwal = withReactContent(Swal)

class Login extends Component {
    state = {
        formValue: {
            username: '',
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
        const { username, password } = formValue;

        try {
            const loginResponse = await networks.signIn({
                username,
                password,
            });

            if (loginResponse.data && loginResponse.data.data) {
                RegisterSwal.fire({
                    title: 'Đăng nhập thành công!',
                    icon: 'success',
                    showDenyButton: false,
                    showCancelButton: false,
                }).then((result) => {
                    window.location.href = "/";
                });
            } else {
                toast.error(loginResponse.data && loginResponse.data.message || "Đăng nhập thất bại! Vui lòng thử lại.");
            }
        } catch (error) {
            toast.error(error && error.response && error.response.data && error.response.data.message || "Đăng nhập thất bại! Vui lòng thử lại.");
        }
    }

    render() {
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
                                            <li><strong>Đăng nhập</strong></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="login-area">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 col-md-offset-3 text-center">
                                    <div className="login">
                                        <div className="login-form-container">
                                            <div className="login-text">
                                                <h2>Đăng nhập</h2>
                                            </div>
                                            <div className="login-form">
                                                <form action="#" method="post" onSubmit={this.handleSubmit}>
                                                    <input type="email" name="username" placeholder="Địa chỉ Email" value={formValue.username} onChange={this.handleChange} />
                                                    <input type="password" name="password" placeholder="Mật khẩu" value={formValue.password} onChange={this.handleChange} />
                                                    <div className="button-box text-center">
                                                        <button type="submit" className="default-btn">Đăng nhập</button>
                                                    </div>
                                                    <div className="login-toggle-btn text-center">
                                                        {/* <input type="checkbox" id="remember" />
                                                            <label htmlFor="remember">Remember me</label> */}
                                                        <Link to="/forgot-password">Quên mật khẩu?</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))
