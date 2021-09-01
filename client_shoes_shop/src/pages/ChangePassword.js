import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import * as networks from '../networks';
import * as actions from '../actions';

const RegisterSwal = withReactContent(Swal)

class ChangePassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formValue: {
                new_password: '',
                old_password: '',
            }
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
        const { new_password, old_password } = formValue;

        try {
            const changePasswordResponse = await networks.changePassword({
                new_password,
                old_password,
            });

            if (changePasswordResponse.data && changePasswordResponse.data.success) {
                RegisterSwal.fire({
                    title: 'Cập nhật mật khẩu tài khoản thành công!',
                    icon: 'success',
                    showDenyButton: false,
                    showCancelButton: false,
                }).then((result) => {
                    window.location.href = '/';
                });
            } else {
                toast.error(changePasswordResponse.data && changePasswordResponse.data.message || "Cập nhật mật khẩu tài khoản thất bại! Vui lòng thử lại.");
            }
        } catch (error) {
            toast.error(error && error.response && error.response.data && error.response.data.message || "Cập nhật mật khẩu tài khoản thất bại! Vui lòng thử lại.");
        }
    }

    render() {
        const { formValue } = this.state;

        return (
            <div className="account-area">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="location">
                                <ul>
                                    <li><Link href="/" title="go to homepage">Home<span>/</span></Link></li>
                                    <li><strong> Thay đổi mật khẩu</strong></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-8 col-sm-offset-2">
                            <div className="my-account-accordion">
                                <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                                    <div className="panel-body">
                                        <div className="col-md-12">
                                            <div className="delivery-details">
                                                <form action="#" onSubmit={this.handleSubmit}>
                                                    <div className="list-style">
                                                        <div className="form-name">
                                                            <label>Mật khẩu hiện tại </label>
                                                            <input type="password" name="old_password" required placeholder="Mật khẩu hiện tại" value={formValue.old_password} onChange={this.handleChange} />
                                                        </div>
                                                        <div className="form-name">
                                                            <label>Mật khẩu mới </label>
                                                            <input type="password" name="new_password" required placeholder="Mật khẩu mới" value={formValue.new_password} onChange={this.handleChange} />
                                                        </div>
                                                        <div className="save-button">
                                                            <button>Gửi</button>
                                                        </div>
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
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.common.loading,
        isAuth: state.auth.isAuth,
    }
}

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)