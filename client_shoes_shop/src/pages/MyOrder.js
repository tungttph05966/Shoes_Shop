import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import * as networks from '../networks';
import * as actions from '../actions';

class MyOrder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 1,
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        this.props.getOrders({
            page: this.state.page || 1,
        });
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

    handleGoToPage = (page) => {
        this.setState({ page }, () => this.loadData());
    }

    render() {
        const { page } = this.state;
        const { orders } = this.props;

        return (
            <div className="account-area">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="location">
                                <ul>
                                    <li><Link href="/" title="go to homepage">Home<span>/</span></Link></li>
                                    <li><strong> Lịch sử đặt hàng</strong></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-10 col-sm-offset-1">
                            <div className="my-account-accordion">
                                <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                                    <div className="panel-body">
                                        <div className="col-md-12">
                                            <div className="delivery-details">
                                                <div className="table-responsive">
                                                    <table className="table table-bordered table-hover">
                                                        <thead>
                                                            <tr>
                                                                <th>SĐT người nhận</th>
                                                                <th>Tên người nhận</th>
                                                                <th>Địa chỉ nhận hàng</th>
                                                                <th>Tổng tiền</th>
                                                                <th>Ngày đặt</th>
                                                                <th>Trạng thái</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {orders && orders.data && orders.data.length > 0 ? (
                                                                orders.data.map(orderItem => (
                                                                    <tr key={orderItem.id}>
                                                                        <td>{orderItem.customer_phone}</td>
                                                                        <td>{orderItem.customer_fullname}</td>
                                                                        <td>{orderItem.customer_address}</td>
                                                                        <td>{Number(orderItem.total).toLocaleString()} VND</td>
                                                                        <td>{new Date(orderItem.created_at).toLocaleDateString()}</td>
                                                                        <td>{this.renderOrderStatus(orderItem.status)}</td>
                                                                        <td>
                                                                            <Link to={`/my-order/${orderItem.id}`}>Xem chi tiết</Link>
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            ) : ''}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="toolbar-bottom">
                                                <ul>
                                                    <li><span>Trang:</span></li>
                                                    {orders && orders.totalPage ? (
                                                        Array.from(Array(orders.totalPage).keys()).map(pageKey => (
                                                            <li className={page == (pageKey + 1) ? 'current' : ''}><a onClick={(e) => {
                                                                e.preventDefault();
                                                                if (page != (pageKey + 1)) {
                                                                    this.handleGoToPage(pageKey + 1);
                                                                }
                                                            }} href="#">{pageKey + 1}</a></li>
                                                        ))
                                                    ) : ''}
                                                    {orders && orders.totalPage && orders.totalPage > 1 && page < orders.totalPage ? (
                                                        <li><a onClick={(e) => {
                                                            e.preventDefault();
                                                            this.handleGoToPage(page + 1);
                                                        }} href="#"> <img src="/img/product/pager_arrow_right.gif" alt /> </a></li>
                                                    ) : ''}
                                                </ul>
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
        orders: state.orders.orders,
    }
}

const mapDispatchToProps = dispatch => ({
    getOrders: (params) => dispatch(actions.getOrders(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyOrder)