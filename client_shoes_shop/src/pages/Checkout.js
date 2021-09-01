import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import * as actions from '../actions';
import * as networks from '../networks';

const CheckoutSwal = withReactContent(Swal)

class Checkout extends Component {
    state = {
        currentStep: 1,
        formValue: {
            fullname: '',
            phone: '',
            address: '',
            email: '',
            password: '',
        }
    }

    componentDidMount() {
        this.props.getCarts();
    }

    nextStep = async (e) => {
        e.preventDefault();
        const { carts } = this.props;
        const { isAuth, userInfo } = this.props;
        const { currentStep, formValue } = this.state;
        const { fullname, phone, address, email, password } = formValue;

        if (currentStep == 1) {
            this.setState({ currentStep: 2 });
        } else {
            if (!isAuth && (!fullname || !phone || !address || !email || !password)) {
                this.setState({ currentStep: 1 });
                toast.error("Bạn cần điền đầy đủ thông tin!");
                return;
            }

            try {
                const makeOrderResponse = await networks.makeOrders({
                    fullname: fullname || userInfo.fullname,
                    phone: phone || userInfo.phone,
                    address: address || userInfo.address,
                    email,
                    password,
                    carts: carts,
                });
    
                if (makeOrderResponse.data && makeOrderResponse.data.data) {
                    this.props.deleteAllCart(() => {
                        this.props.getCarts();
                        CheckoutSwal.fire({
                            title: 'Đặt hàng thành công!',
                            icon: 'success',
                            showDenyButton: false,
                            showCancelButton: false,
                        }).then((result) => {
                            this.props.history.push('/');
                        });
                    });
                } else {
                    toast.error("Đặt hàng chưa thành công! Vui lòng thử lại.");
                }
            } catch (error) {
                toast.error("Đặt hàng chưa thành công! Vui lòng thử lại.");
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

    render() {
        const { carts, loading, isAuth, userInfo } = this.props;
        const { currentStep, formValue } = this.state;

        return (
            <div className="checkout-area">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="location">
                                <ul>
                                    <li><a href="/" title="go to homepage">Home<span>/</span></a></li>
                                    <li><strong> Thanh toán</strong></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-8 col-sm-offset-2">
                            <div className="checkout-banner hidden-xs">
                                <a href="#">
                                    <img src="/img/checkout/checkout_banner.jpg" alt />
                                </a>
                            </div>
                            <div className="checkout-heading">
                                <h2>Thanh toán</h2>
                            </div>
                            <div className="checkout-accordion">
                                <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                                    <div className="panel panel-default">
                                        <div className="panel-heading" role="tab" id="headingTwo">
                                            <h4 className="panel-title">
                                                <a className="collapsed" role="button" onClick={() => this.setState({ currentStep: currentStep == 1 ? 2 : 1 })}>
                                                    Bước 1: Thông tin giao hàng
                                                    <i className="fa fa-caret-down" />
                                                </a>
                                            </h4>
                                        </div>
                                        <div id="collapseTwo" className={`panel-collapse collapse ${currentStep == 1 ? 'in' : ''}`} role="tabpanel" aria-labelledby="headingTwo">
                                            <form onSubmit={this.nextStep} className="panel-body">
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="account-details">
                                                            <h4>Thông tin giao hàng</h4>
                                                            <div className="form-box">
                                                                <div className="form-name">
                                                                    <label>Họ tên <em>*</em> </label>
                                                                    <input type="text" name="fullname" required placeholder="Họ tên" value={formValue.fullname || userInfo.fullname} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                            <div className="form-box">
                                                                <div className="form-name">
                                                                    <label>Số điện thoại <em>*</em> </label>
                                                                    <input type="text" name="phone" required placeholder="Số điện thoại" value={formValue.phone || userInfo.phone} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                            <div className="form-box">
                                                                <div className="form-name">
                                                                    <label>Địa chỉ nhận hàng <em>*</em> </label>
                                                                    <input type="text" name="address" required placeholder="Địa chỉ nhận hàng" value={formValue.address || userInfo.address} onChange={this.handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {!isAuth && (
                                                        <div className="col-sm-6">
                                                            <div className="account-details">
                                                                <h4>Thông tin tài khoản</h4>
                                                                <div className="form-box">
                                                                    <div className="form-name">
                                                                        <label>Địa chỉ Email <em>*</em> </label>
                                                                        <input type="email" name="email" required placeholder="Địa chỉ Email" value={formValue.email} onChange={this.handleChange} />
                                                                    </div>
                                                                </div>
                                                                <div className="form-box">
                                                                    <div className="form-name">
                                                                        <label>Mật khẩu <em>*</em> </label>
                                                                        <input type="password" name="password" required placeholder="Mật khẩu" value={formValue.password} onChange={this.handleChange} />
                                                                    </div>
                                                                </div>
                                                                <br/>
                                                                <p>Đã có tài khoản? <u><Link to="/login">Đăng nhập</Link></u></p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="privacy-policy">
                                                    <button type="submit" value="Continue" className="check-button">Tiếp tục</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="panel panel-default">
                                        <div className="panel-heading" role="tab" id="headingSix">
                                            <h4 className="panel-title">
                                                <a className="collapsed" role="button" onClick={() => this.setState({ currentStep: currentStep == 2 ? 1 : 2 })}>
                                                    Bước 2: Xác nhận đơn hàng
                                                    <i className="fa fa-caret-down" />
                                                </a>
                                            </h4>
                                        </div>
                                        <div id="collapseSix" className={`panel-collapse collapse ${currentStep == 2 ? 'in' : ''}`} role="tabpanel" aria-labelledby="headingSix">
                                            <form onSubmit={this.nextStep} className="panel-body">
                                                <div className="confirm-order">
                                                    <div className="table-responsive">
                                                        <table className="table table-bordered table-hover">
                                                            <thead>
                                                                <tr>
                                                                    <th>Tên sản phẩm</th>
                                                                    <th>Số lượng</th>
                                                                    <th>Giá</th>
                                                                    <th>Tổng tiền</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {carts && carts.length > 0 ? (
                                                                    carts.map(cartItem => (
                                                                        <tr key={cartItem.id}>
                                                                            <td>
                                                                                <Link href="#">{
                                                                                    cartItem.product.name
                                                                                }</Link>
                                                                            </td>
                                                                            <td>{cartItem.quantity}</td>
                                                                            <td className="unit-price-checkout">
                                                                                <div>
                                                                                    <span className={cartItem.sale_price ? 'old-price' : ''}>
                                                                                        {Number(cartItem.price || 0).toLocaleString()} VND
                                                                                    </span>
                                                                                    {cartItem.sale_price ? (
                                                                                        <>
                                                                                            <span>{Number(cartItem.sale_price || 0).toLocaleString()} VND</span>
                                                                                        </>
                                                                                    ) : ''}
                                                                                </div>
                                                                            </td>
                                                                            <td>{Number(cartItem.quantity * (cartItem.sale_price || cartItem.price || 0)).toLocaleString()} VND</td>
                                                                        </tr>
                                                                    ))
                                                                ) : ''}
                                                            </tbody>
                                                            <tfoot>
                                                                <tr>
                                                                    <td className="text-right" colSpan={3}>
                                                                        <strong>Tổng cộng:</strong>
                                                                    </td>
                                                                    <td>
                                                                        {Number(carts && carts.length > 0 ? carts.reduce((total, cartItem) => total + cartItem.quantity * (cartItem.sale_price || cartItem.price || 0), 0) : 0).toLocaleString()} VND
                                                                    </td>
                                                                </tr>
                                                            </tfoot>
                                                        </table>
                                                    </div>
                                                    <button disabled={loading} type="submit" value="Continue" className="check-button">Xác nhận đơn hàng</button>
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

        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.common.loading,
        carts: state.carts.carts,
        userInfo: state.auth.userInfo,
        isAuth: state.auth.isAuth,
    }
}

const mapDispatchToProps = dispatch => ({
    deleteAllCart: (cb) => dispatch(actions.deleteAllCart(cb)),
    getCarts: (params) => dispatch(actions.getCarts(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Checkout))
