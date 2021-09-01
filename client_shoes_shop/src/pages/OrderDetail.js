import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

import * as actions from '../actions';
import * as networks from '../networks';

class OrderDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: null,
            productId: props.match.params.id,
        }
    }

    async componentDidMount() {
        const orderResponse = await networks.getOrderById(this.state.productId);
        if (orderResponse.data && orderResponse.data.data) {
            this.setState({
                order: orderResponse.data.data,
            });
        }
    }

    renderOrderStatus(status) {
        let statusLabel = "";

        switch (status) {
            case 'pending':
                statusLabel = "Chờ xử lý";
                break;
            case 'processing':
                statusLabel = "Đang xử lý";
                break;
            case 'packed':
                statusLabel = "Đóng gói";
                break;
            case 'shipping':
                statusLabel = "Đang giao";
                break;
            case 'accomplished':
                statusLabel = "Đã hoàn thành";
                break;
            case 'cancelled':
                statusLabel = "Đã hủy";
                break;
            default:
                break;
        }

        return <span>{statusLabel}</span>
    }

    render() {
        const { order } = this.state;

        return (
            <div className="checkout-area">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="location">
                                <ul>
                                    <li><a href="/" title="go to homepage">Home<span>/</span></a></li>
                                    <li><strong> Thông tin đơn hàng</strong></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-8 col-sm-offset-2">
                            <div className="checkout-accordion">
                                {order && order.id ? (<div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                                    <div className="panel panel-default">
                                        <div className="panel-heading" role="tab" id="headingTwo">
                                            <h4 className="panel-title">
                                                <a className="collapsed" role="button">
                                                    Thông tin giao hàng
                                                    <i className="fa fa-caret-down" />
                                                </a>
                                            </h4>
                                        </div>
                                        <div id="collapseTwo" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingTwo">
                                            <form onSubmit={this.nextStep} className="panel-body">
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="account-details">
                                                            <p>Họ tên: {order.customer_fullname}</p>
                                                            <p>Số điện thoại: {order.customer_phone}</p>
                                                            <p>Địa chỉ nhận hàng: {order.customer_address}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="panel panel-default">
                                        <div className="panel-heading" role="tab" id="headingSix">
                                            <h4 className="panel-title">
                                                <a className="collapsed" role="button">
                                                    Thông tin đơn hàng
                                                    <i className="fa fa-caret-down" />
                                                </a>
                                            </h4>
                                        </div>
                                        <div id="collapseSix" className="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingSix">
                                            <form onSubmit={this.nextStep} className="panel-body">
                                                <div className="confirm-order">
                                                    <div className="table-responsive">
                                                        <table className="table table-bordered table-hover">
                                                            <thead>
                                                                <tr>
                                                                    <th>Tên sản phẩm</th>
                                                                    <th>Màu sắc</th>
                                                                    <th>Size</th>
                                                                    <th>Giá</th>
                                                                    <th>Số lượng</th>
                                                                    <th>Tổng tiền</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {order.order_product_details && order.order_product_details.length > 0 ? (
                                                                    order.order_product_details.map(orderDetailItem => (
                                                                        <tr key={orderDetailItem.id}>
                                                                            <td>
                                                                                <Link href="#">{
                                                                                    orderDetailItem.product_detail && orderDetailItem.product_detail.product_id && orderDetailItem.product_detail.product_id.name
                                                                                }</Link>
                                                                            </td>
                                                                            <td className="unit-product-color">
                                                                                <span>
                                                                                    {orderDetailItem.product_detail && orderDetailItem.product_detail.color_id && orderDetailItem.product_detail.color_id.color_code && (
                                                                                        <span style={{
                                                                                            backgroundColor: orderDetailItem.product_detail.color_id.color_code,
                                                                                            display: 'inline-block',
                                                                                            width: 15,
                                                                                            height: 15,
                                                                                            margin: 0,
                                                                                            borderRadius: '100%',
                                                                                            color: '#ffffff',
                                                                                            fontSize: 10,
                                                                                            textAlign: 'center',
                                                                                            lineHeight: '15px',
                                                                                        }}
                                                                                        data-tip={orderDetailItem.product_detail.color_id.color_name}></span>
                                                                                    )}
                                                                                </span>
                                                                            </td>
                                                                            <td className="unit-product-size">
                                                                                <span>{orderDetailItem.product_size_detail && orderDetailItem.product_size_detail.size_id && orderDetailItem.product_size_detail.size_id.size}</span>
                                                                            </td>
                                                                            <td>{orderDetailItem.quantity}</td>
                                                                            <td className="unit-price-checkout">
                                                                                <div>
                                                                                    <span className={orderDetailItem.sale_price ? 'old-price' : ''}>
                                                                                        {Number(orderDetailItem.price || 0).toLocaleString()} VND
                                                                                    </span>
                                                                                    {orderDetailItem.sale_price ? (
                                                                                        <>
                                                                                            <span>{Number(orderDetailItem.sale_price || 0).toLocaleString()} VND</span>
                                                                                        </>
                                                                                    ) : ''}
                                                                                </div>
                                                                            </td>
                                                                            <td>{Number(orderDetailItem.quantity * (orderDetailItem.sale_price || orderDetailItem.price || 0)).toLocaleString()} VND</td>
                                                                        </tr>
                                                                    ))
                                                                ) : ''}
                                                            </tbody>
                                                            <tfoot>
                                                                <tr>
                                                                    <td className="text-right" colSpan={5}>
                                                                        <strong>Tổng cộng:</strong>
                                                                    </td>
                                                                    <td>
                                                                        {Number(order.total).toLocaleString()} VND
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="text-right" colSpan={5}>
                                                                        <strong>Trạng thái:</strong>
                                                                    </td>
                                                                    <td>{this.renderOrderStatus(order.status)}</td>
                                                                </tr>
                                                            </tfoot>
                                                        </table>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>) : ''}
                            </div>
                        </div>
                    </div>
                </div>
                <ReactTooltip />
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OrderDetail))
