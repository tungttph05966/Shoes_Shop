import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import * as networks from '../networks';
import * as actions from '../actions';

class MyAccount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formValue: props.userInfo || {}
        }
    }

    componentDidMount() {
        this.props.getUserInfo(() => {
            const { userInfo } = this.props;
            this.setState({ formValue: userInfo });
        });
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
        const { fullname, phone, address, email } = formValue;

        try {
            const updateUserInfoResponse = await networks.updateProfile({
                fullname,
                phone,
                address,
                email,
            });

            if (updateUserInfoResponse.data && updateUserInfoResponse.data.success) {
                toast.success("Cập nhật thông tin tài khoản thành công!");
            } else {
                toast.error("Cập nhật thông tin tài khoản thất bại! Vui lòng thử lại.");
            }
        } catch (error) {
            toast.error("Cập nhật thông tin tài khoản thất bại! Vui lòng thử lại.");
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
                                    <li><strong> Thông tin cá nhân</strong></li>
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
                                                            <label>Họ tên <em>*</em> </label>
                                                            <input type="text" name="fullname" required placeholder="Họ tên" value={formValue.fullname} onChange={this.handleChange} />
                                                        </div>
                                                        <div className="form-name">
                                                            <label>Địa chỉ Email <em>*</em> </label>
                                                            <input type="email" name="email" required placeholder="Địa chỉ Email" value={formValue.email} onChange={this.handleChange} />
                                                        </div>
                                                        <div className="form-name">
                                                            <label>Số điện thoại</label>
                                                            <input type="text" name="phone" placeholder="Số điện thoại" value={formValue.phone} onChange={this.handleChange} />
                                                        </div>
                                                        <div className="form-name">
                                                            <label>Địa chỉ nhận hàng</label>
                                                            <input type="text" name="address" placeholder="Địa chỉ nhận hàng" value={formValue.address} onChange={this.handleChange} />
                                                        </div>
                                                        <div className="save-button">
                                                            <button>Lưu</button>
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
        userInfo: state.auth.userInfo,
        isAuth: state.auth.isAuth,
    }
}

const mapDispatchToProps = dispatch => ({
  getUserInfo: (cb, params) => dispatch(actions.getUserInfo(cb, params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount)