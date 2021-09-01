import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import * as networks from '../networks';
import * as actions from '../actions';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

class Favorites extends Component {
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
        this.props.getFavoriteProducts({
            page: this.state.page || 1,
        });
    }

    handleGoToPage = (page) => {
        this.setState({ page }, () => this.loadData());
    }

    toggleFavorite = async (e, product) => {
        e.preventDefault();

        try {
            if (product.is_favorite) {
                await networks.deleteProductFavorites(product.id);
                this.loadData();
                toast.success("Xóa sản phẩm khỏi danh sách yêu thích thành công!");
            } else {
                await networks.createProductFavorites({ product_id: product.id });
                this.loadData();
                toast.success("Thêm sản phẩm vào danh sách yêu thích thành công!");
            }
        } catch (error) {
            toast.error(error.response && error.response.data && error.response.data.message ? error.response.data.message : 'Thêm sản phẩm vào danh sách yêu thích chưa thành công!');
        }
    }

    render() {
        const { page } = this.state;
        const { favoriteProducts, isAuth } = this.props;
        console.log(favoriteProducts)
        return (
            <div>
                <div className="product-banner">
                    <img src="/img/product/banner.jpg" alt />
                </div>
                <div className="product-main-items">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="location">
                                    <ul>
                                        <li><a href="/" title="go to homepage">Home<span>/</span></a></li>
                                        <li><strong> Danh sách sản phẩm yêu thích</strong></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="product-content">
                                        <div className="tab-content">
                                            <div role="tabpanel" className="tab-pane active fade in home2" id="gird">
                                                {
                                                    favoriteProducts && favoriteProducts.data && favoriteProducts.data.length > 0 ? favoriteProducts.data.map(favoriteProduct => {
                                                        const product = favoriteProduct.product;
                                                        return (
                                                            <div className="col-lg-3 col-sm-4">
                                                                <div className="single-product">
                                                                    {
                                                                        product && product.is_new && (
                                                                            <div className="level-pro-new">
                                                                                <span>SP Mới</span>
                                                                            </div>
                                                                        )
                                                                    }
                                                                    {
                                                                        product.product_detail && product.product_detail.sales && product.product_detail.sales[0] && (
                                                                            <div className="level-pro-sale">
                                                                                <span>SP Giảm giá</span>
                                                                            </div>
                                                                        )
                                                                    }
                                                                    <div className="product-img">
                                                                        <Link to={`/product/${product.slug}`}>
                                                                            <img src={product.images && product.images[0] ? `${baseUrl}/${product.images[0].image_path}` : "/img/product/1.png"} alt className="primary-img" />
                                                                            <img src={product.images && product.images[0] ? `${baseUrl}/${product.images[0].image_path}` : "/img/product/1.png"} alt className="secondary-img" />
                                                                        </Link>
                                                                    </div>
                                                                    <div className="product-price">
                                                                        <div className="product-name">
                                                                            <Link to={`/product/${product.slug}`}>{product.name}</Link>
                                                                        </div>
                                                                        <div className="price-rating row">
                                                                            <div className="col-md-9">
                                                                                <span className={product.product_detail && product.product_detail.sales && product.product_detail.sales[0] ? 'old-price' : ''}>
                                                                                    {product.product_detail ? `${Number(product.product_detail.price).toLocaleString()} VND` : '0 VND'}
                                                                                </span>
                                                                                <br />
                                                                                {product.product_detail && product.product_detail.sales && product.product_detail.sales[0] ? (
                                                                                    <span>{Number(product.product_detail.sales[0].sale_price).toLocaleString()} VND</span>
                                                                                ) : <span>&nbsp;</span>}
                                                                            </div>
                                                                            <div className="col-md-3">
                                                                                {isAuth && (
                                                                                    <div className="action">
                                                                                        <ul className="add-to-links text-right">
                                                                                            <li>
                                                                                                <a className={product.is_favorite ? "active" : ""} href="#" onClick={(e) => this.toggleFavorite(e, product)}>
                                                                                                    <i className="fa fa-heart" />
                                                                                                </a>
                                                                                            </li>
                                                                                        </ul>
                                                                                    </div>
                                                                                ) || (
                                                                                        <div className="action">
                                                                                            <ul className="add-to-links text-right">
                                                                                                <li>
                                                                                                    <a href="#" onClick={(e) => {
                                                                                                        e.preventDefault();
                                                                                                        toast.error('Vui lòng đăng nhập để sử dụng chức năng này!');
                                                                                                    }}>
                                                                                                        <i className="fa fa-heart" />
                                                                                                    </a>
                                                                                                </li>
                                                                                            </ul>
                                                                                        </div>)}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="actions" style={{ width: '100%' }}>
                                                                        <Link to={`/product/${product.slug}`} style={{ display: 'block', width: '100%' }}>
                                                                            <button style={{ width: '100%' }} type="submit" className="cart-btn">Xem chi tiết</button>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    }) : ''
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="toolbar-bottom">
                                            <ul>
                                                <li><span>Trang:</span></li>
                                                {favoriteProducts && favoriteProducts.totalPage ? (
                                                    Array.from(Array(favoriteProducts.totalPage).keys()).map(pageKey => (
                                                        <li className={page == (pageKey + 1) ? 'current' : ''}><a onClick={(e) => {
                                                            e.preventDefault();
                                                            if (page != (pageKey + 1)) {
                                                                this.handleGoToPage(pageKey + 1);
                                                            }
                                                        }} href="#">{pageKey + 1}</a></li>
                                                    ))
                                                ) : ''}
                                                {favoriteProducts && favoriteProducts.totalPage && favoriteProducts.totalPage > 1 && page < favoriteProducts.totalPage ? (
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
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.common.loading,
        favoriteProducts: state.productFavorites.favoriteProducts,
        isAuth: state.auth.isAuth,
    }
}

const mapDispatchToProps = dispatch => ({
    getFavoriteProducts: (params) => dispatch(actions.getFavoriteProducts(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Favorites))