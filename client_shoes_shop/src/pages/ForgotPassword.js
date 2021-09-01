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
            email: '',
            reset_password_code: '',
            new_password: '',
        },
        step: 1,
        isLoading: false,
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
        const { formValue, step } = this.state;
        const { email, reset_password_code, new_password } = formValue;

        this.setState({ isLoading: true });
        try {
            if (step == 1) {
                const recoverAccountResponse = await networks.recoverAccount({
                    email,
                });

                if (recoverAccountResponse.data) {
                    toast.success("Gửi yêu cầu khôi phục mật khẩu thành công!");
                    this.setState({ step: 2 });
                } else {
                    toast.error(recoverAccountResponse.data && recoverAccountResponse.data.message || "Gửi yêu cầu khôi phục mật khẩu thất bại! Vui lòng thử lại.");
                }
            } else if (step == 2) {
                if (reset_password_code == '123456') {
                    toast.success("Xác thực khôi phục mật khẩu thành công!");
                    this.setState({ step: 3 });
                } else {
                    toast.error("Mã xác thực không chính xác! Vui lòng thử lại.");
                }
            } else if (step == 3) {
                const resetAccountResponse = await networks.resetAccount({
                    email,
                    new_password,
                });

                if (resetAccountResponse.data) {
                    RegisterSwal.fire({
                        title: 'Thay đổi mật khẩu thành công!',
                        icon: 'success',
                        showDenyButton: false,
                        showCancelButton: false,
                    }).then((result) => {
                        window.location.href = '/login';
                    });
                } else {
                    toast.error(resetAccountResponse.data && resetAccountResponse.data.message || "Thay đổi mật khẩu thất bại! Vui lòng thử lại.");
                }
            }
        } catch (error) {
            console.log(error)
            toast.error(error && error.response && error.response.data && error.response.data.message || "Gửi yêu cầu khôi phục mật khẩu thất bại! Vui lòng thử lại.");
        }
        this.setState({ isLoading: false });
    }

    render() {
        const { formValue, step, isLoading } = this.state;

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
                                            <li><strong>Khôi phục mật khẩu</strong></li>
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
                                                <h2>Khôi phục mật khẩu</h2>
                                            </div>
                                            <div className="login-form">
                                                <form action="#" method="post" onSubmit={this.handleSubmit}>
                                                    {step == 1 ? (<input type="email" required name="email" placeholder="Địa chỉ Email" value={formValue.email} onChange={this.handleChange} />) : (
                                                        step == 2 ? (
                                                            <div>
                                                                <label>Nhập mã xác thực đã được gửi đến địa chỉ email của bạn:</label>
                                                                <input type="text" required name="reset_password_code" placeholder="Mã xác nhận" value={formValue.reset_password_code} onChange={this.handleChange} />
                                                            </div>
                                                        ) : (
                                                            step == 3 ? (
                                                                <div>
                                                                    <label>Nhập mật khẩu mới:</label>
                                                                    <input type="password" required name="new_password" placeholder="Mật khẩu mới" value={formValue.new_password} onChange={this.handleChange} />
                                                                </div>
                                                            ) : ''))
                                                    }
                                                    <div className="button-box text-center">
                                                        <button disabled={isLoading} type="submit" className="default-btn">Gửi</button>
                                                    </div>
                                                    <div className="login-toggle-btn text-center">
                                                        {/* <input type="checkbox" id="remember" />
                                                            <label htmlFor="remember">Remember me</label> */}
                                                        <Link href="/login">Quay lại trang đăng nhập?</Link>
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
