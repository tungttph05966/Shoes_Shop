import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';

import * as actions from '../actions';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

class Cart extends Component {
    state = {
        editingIndex: null,
        editingData: null,
    }

    handleEmptyCart = () => {
        this.props.deleteAllCart(() => {
            this.props.getCarts({});
        });
    }

    handleRemoveCartItem = (cartId) => {
        this.props.deleteCart(
            cartId,
            () => {
                this.props.getCarts({});
            }
        );
    }

    handleEditCartItem = (editIndex, editData) => {
        this.setState({
            editingIndex: editIndex,
            editingData: {
                ...editData
            },
        });
    }

    handleSaveCartItem = (saveIndex) => {
        const { carts } = this.props;

        carts[saveIndex] = this.state.editingData;

        this.props.updateCart(
            this.state.editingData,
            () => {
                this.props.getCarts({});
                this.setState({
                    editingIndex: null,
                    editingData: null,
                });
            }
        );
    }

    handleUpdateQuantity = (e) => {
        const { editingData } = this.state;
        const quantity = Number(e.target.value);

        if (quantity < 0 || quantity > editingData.productSizeDetail.quantity) {
            toast.error("Số lượng sản phẩm không hợp lệ!");
        } else {
            editingData.quantity = quantity;
            this.setState({ editingData });
        }
    }

    render() {
        const { editingIndex, editingData } = this.state;
        const { carts } = this.props;

        return (
            <div className="shopping-cart">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="location">
                                <ul>
                                    <li><a href="/" title="go to homepage">Home<span>/</span></a></li>
                                    <li><strong> Giỏ hàng</strong></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="table-responsive">
                                <table className="table-bordered table table-hover">
                                    <thead>
                                        <tr>
                                            <th className="cart-item-img" />
                                            <th className="cart-product-name text-center">Sản phẩm</th>
                                            <th className="cart-product-color text-center">Màu sắc</th>
                                            <th className="cart-product-size text-center">Size</th>
                                            <th className="unit-price text-center">Giá</th>
                                            <th className="quantity text-center">Số lượng</th>
                                            <th className="subtotal text-center">Tổng cộng</th>
                                            <th className="remove-icon" />
                                        </tr>
                                    </thead>
                                    <tbody className="text-center">
                                        {carts && carts.length > 0 ? carts.map((cartItem, index) => (
                                            <tr>
                                                <td className="cart-item-img">
                                                    <Link to={`/product/${cartItem.product.slug}`}>
                                                        <img width="100" src={`${baseUrl}/${cartItem.product.images && cartItem.product.images[0] && cartItem.product.images[0].image_path}`} alt />
                                                    </Link>
                                                </td>
                                                <td className="cart-product-name">
                                                    <Link to={`/product/${cartItem.product.slug}`}>{cartItem.product.name}</Link>
                                                </td>
                                                <td className="cart-product-color">
                                                    <span>
                                                        {cartItem.productDetail && cartItem.productDetail.color_id && cartItem.productDetail.color_id.color_code && (
                                                            <span style={{
                                                                backgroundColor: cartItem.productDetail.color_id.color_code,
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
                                                            data-tip={cartItem.productDetail.color_id.color_name}></span>
                                                        )}
                                                    </span>
                                                </td>
                                                <td className="cart-product-size">
                                                    <span>{cartItem.productSizeDetail && cartItem.productSizeDetail.size_id && cartItem.productSizeDetail.size_id.size}</span>
                                                </td>
                                                <td className="unit-price">
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
                                                <td className="quantity">
                                                    <span>
                                                        {editingIndex != null && carts[editingIndex] && editingIndex == index ? (
                                                            <input type="number" value={editingData.quantity} onChange={this.handleUpdateQuantity} />
                                                        ) : cartItem.quantity}
                                                    </span>
                                                </td>
                                                <td className="subtotal">
                                                    <span>{Number((cartItem.sale_price || cartItem.price || 0) * cartItem.quantity).toLocaleString()} VND</span>
                                                </td>
                                                <td className="remove-icon">
                                                    {editingIndex != null && carts[editingIndex] ? (editingIndex == index ? (
                                                        <a href="#" onClick={(e) => {
                                                            e.preventDefault();
                                                            this.handleSaveCartItem(index);
                                                        }} style={{ marginRight: 10, }}>
                                                            <span className="glyphicon glyphicon-floppy-disk"></span>
                                                        </a>
                                                    ) : '') : (
                                                        <a href="#" onClick={(e) => {
                                                            e.preventDefault();
                                                            this.handleEditCartItem(index, cartItem);
                                                        }} style={{ marginRight: 10, }}>
                                                            <span className="glyphicon glyphicon-edit"></span>
                                                        </a>
                                                    )}
                                                    <a href="#" onClick={(e) => {
                                                        e.preventDefault();
                                                        this.handleRemoveCartItem(cartItem.id);
                                                    }}>
                                                        <span style={{ color: 'red' }} className="glyphicon glyphicon-remove"></span>
                                                    </a>
                                                </td>
                                            </tr>
                                        )) : ''}
                                    </tbody>
                                </table>
                                {!carts || carts.length == 0 ? <p className="text-center">Giỏ hàng trống</p> : ''}
                                <div className="shopping-button">
                                    <div className="continue-shopping">
                                        <Link to="/">
                                            <button type="submit">Tiếp tục mua sắm</button>
                                        </Link>
                                    </div>
                                    <div className="shopping-cart-left">
                                        <button onClick={this.handleEmptyCart} type="submit">Làm trống giỏ hàng</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {carts && carts.length > 0 ? (
                        <div className="row">
                            <div className="col-sm-5 col-sm-offset-7">
                                <div className="totals">
                                    <h3>Tổng cộng <span>{carts && carts.length > 0 ? Number(carts.reduce((total, cartItem) => total + (cartItem.sale_price || cartItem.price || 0) * cartItem.quantity, 0)).toLocaleString() : 0} VND</span></h3>
                                    <div className="shopping-button">
                                        <a href="/checkout">
                                            <button type="submit">Tiến hành thanh toán</button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : ''}
                </div>
                <ReactTooltip />
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.common.loading,
        carts: state.carts.carts,
    }
}

const mapDispatchToProps = dispatch => ({
    updateCart: (cart, cb) => dispatch(actions.updateCart(cart, cb)),
    deleteAllCart: (cb) => dispatch(actions.deleteAllCart(cb)),
    deleteCart: (cartId, cb) => dispatch(actions.deleteCart(cartId, cb)),
    getCarts: (params) => dispatch(actions.getCarts(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart)