import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

import * as actions from '../actions';

class Navbar extends Component {
    signOut = () => {
        this.props.signOut(() => {
            window.location.href = "/";
        });
    }


    renderCategories = () => {
        const { productCategories } = this.props;

        return (productCategories || []).map(productCategory => {
            return (
                <li key={productCategory.id}>
                    <Link to={`/category/${productCategory.slug}`}>{productCategory.name}</Link>
                    {/* {productCategory.children && productCategory.children.length > 0 ? (
                        <div className="mega-menu">
                            {productCategory.children.map(productCategoryChild => {
                                return (
                                    <Link key={productCategoryChild.id} to={`/category/${productCategory.slug}/${productCategoryChild.slug}`}>
                                        {productCategoryChild.name}
                                    </Link>
                                );
                            })}
                        </div>
                    ) : null} */}
                </li>
            )
        });
    }

    render() {
        const { carts, userInfo, isAuth } = this.props;

        return (
            <header>
                <div className="top-link">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-7 col-md-offset-3 col-sm-9 hidden-xs">
                                <div className="call-support">
                                    <p>Call support free: <span> (800) 123 456 789</span></p>
                                </div>
                            </div>
                            <div className="col-md-2 col-sm-3">
                                <div className="dashboard">
                                    <div className="account-menu">
                                        <ul>
                                            <li className="search">
                                                <Link to="#">
                                                    <i className="fa fa-search"></i>
                                                </Link>
                                                <ul className="search">
                                                    <li>
                                                        <form action="#">
                                                            <input type="text" />
                                                            <button type="submit"> <i className="fa fa-search"></i> </button>
                                                        </form>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Link to="#">
                                                    <i className="fa fa-bars"></i>
                                                </Link>
                                                {isAuth ? (
                                                    <ul>
                                                        <li><Link to="/my-account">Thông tin cá nhân</Link></li>
                                                        <li><Link to="/change-password">Đổi mật khẩu</Link></li>
                                                        <li><Link to="/favorites">Danh sách yêu thích</Link></li>
                                                        <li><Link to="/my-order">Lịch sử đặt hàng</Link></li>
                                                        <li><Link to="#" onClick={this.signOut}>Đăng xuất</Link></li>
                                                    </ul>
                                                ) : (
                                                    <ul>
                                                        <li><Link to="/login">Đăng nhập</Link></li>
                                                        <li><Link to="/register">Đăng ký</Link></li>
                                                    </ul>
                                                )}
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="cart-menu">
                                        <ul>
                                            <li><Link to="/cart"> <img src="/img/icon-cart.png" alt="" /> {carts && carts.length > 0 ? <span>{carts.length}</span> : ''} </Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mainmenu-area product-items">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="logo">
                                    <Link to="/">
                                        <img src="/img/logo.png" alt="" />
                                    </Link>
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="mainmenu">
                                    <nav>
                                        <ul>
                                            <li>
                                                <Link to="/">Home</Link>
                                            </li>
                                            {this.renderCategories()}
                                            <li><Link to="/contact">Liên hệ</Link></li>
                                            <li><Link to="/about-us">Về chúng tôi</Link></li>
                                            {/* <li><Link to="#">Pages</Link>
                                                <div className="sub-menu pages">
                                                    <span>
                                                        <Link to="about-us.html">About us</Link>
                                                    </span>
                                                    <span>
                                                        <Link to="blog.html">Blog</Link>
                                                    </span>
                                                    <span>
                                                        <Link to="blog-details.html">Blog Details</Link>
                                                    </span>
                                                    <span>
                                                        <Link to="cart.html">Cart</Link>
                                                    </span>
                                                    <span>
                                                        <Link to="checkout.html">Checkout</Link>
                                                    </span>
                                                    <span>
                                                        <Link to="contact.html">Contact</Link>
                                                    </span>
                                                    <span>
                                                        <Link to="my-account.html">My account</Link>
                                                    </span>
                                                    <span>
                                                        <Link to="/shop">Shop</Link>
                                                    </span>
                                                    <span>
                                                        <Link to="shop-list.html">Shop list</Link>
                                                    </span>
                                                    <span>
                                                        <Link to="single-product.html">Single Shop</Link>
                                                    </span>
                                                    <span>
                                                        <Link to="login.html">Login page</Link>
                                                    </span>
                                                    <span>
                                                        <Link to="register.html">Ragister page</Link>
                                                    </span>
                                                    <span>
                                                        <Link to="wishlist.html">Wishlist</Link>
                                                    </span>
                                                </div>
                                            </li> */}
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="mobile-menu">
                                    <nav>
                                        <ul>
                                            <li><Link to="/">Home</Link>
                                            </li>
                                            <li><Link to="/shop">Women</Link>
                                                <ul>
                                                    <li><Link to="#">Dresses</Link>
                                                        <ul>
                                                            <li><Link to="#">Coctail</Link></li>
                                                            <li><Link to="#">day</Link></li>
                                                            <li><Link to="#">evening</Link></li>
                                                            <li><Link to="#">sports</Link></li>
                                                        </ul>
                                                    </li>
                                                    <li><Link to="#">shoes</Link>
                                                        <ul>
                                                            <li><Link to="#">Sports</Link></li>
                                                            <li><Link to="#">run</Link></li>
                                                            <li><Link to="#">sandals</Link></li>
                                                            <li><Link to="#">boots</Link></li>
                                                        </ul>
                                                    </li>
                                                    <li><Link to="#">handbags</Link>
                                                        <ul>
                                                            <li><Link to="#">Blazers</Link></li>
                                                            <li><Link to="#">table</Link></li>
                                                            <li><Link to="#">coats</Link></li>
                                                            <li><Link to="#">kids</Link></li>
                                                        </ul>
                                                    </li>
                                                    <li><Link to="#">clothing</Link>
                                                        <ul>
                                                            <li><Link to="#">T-shirts</Link></li>
                                                            <li><Link to="#">coats</Link></li>
                                                            <li><Link to="#">Jackets</Link></li>
                                                            <li><Link to="#">jeans</Link></li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li><Link to="/shop">Men</Link>
                                                <ul>
                                                    <li><Link to="#">Bags</Link>
                                                        <ul>
                                                            <li><Link to="#">Bootees bag</Link></li>
                                                            <li><Link to="#">Blazers</Link></li>
                                                        </ul>
                                                    </li>
                                                    <li><Link to="#">clothing</Link>
                                                        <ul>
                                                            <li><Link to="#">coats</Link></li>
                                                            <li><Link to="#">T-shirts</Link></li>
                                                        </ul>
                                                    </li>
                                                    <li><Link to="#">Lingerie</Link>
                                                        <ul>
                                                            <li><Link to="#">Bands</Link></li>
                                                            <li><Link to="#">Furniture</Link></li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li><Link to="/shop">Foorwear</Link>
                                                <ul>
                                                    <li><Link to="#">footwear men</Link>
                                                        <ul>
                                                            <li><Link to="#">gifts</Link></li>
                                                        </ul>
                                                    </li>
                                                    <li><Link to="#">footwear women</Link>
                                                        <ul>
                                                            <li><Link to="#">boots</Link></li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li><Link to="/shop">Jewellery</Link>
                                                <ul>
                                                    <li><Link to="#">Rings</Link></li>
                                                </ul>
                                            </li>
                                            <li><Link to="/shop">Accessories</Link></li>
                                            <li><Link to="/contact">Liên hệ</Link></li>
                                            <li><Link to="/about-us">Về chúng tôi</Link></li>
                                            {/* <li><Link to="#">Pages</Link>
                                                <ul>
                                                    <li><Link to="about-us.html">About us</Link></li>
                                                    <li><Link to="blog.html">Blog</Link></li>
                                                    <li><Link to="blog-details.html">Blog Details</Link></li>
                                                    <li><Link to="cart.html">Cart</Link></li>
                                                    <li><Link to="checkout.html">Checkout</Link></li>
                                                    <li><Link to="contact.html">Contact</Link></li>
                                                    <li><Link to="my-account.html">My account</Link></li>
                                                    <li><Link to="/shop">Shop</Link></li>
                                                    <li><Link to="shop-list.html">Shop list</Link></li>
                                                    <li><Link to="single-product.html">Single Shop</Link></li>
                                                    <li><Link to="wishlist.html">Wishlist</Link></li>
                                                    <li><Link to="login.html">login page</Link></li>
                                                    <li><Link to="register.html">register page</Link></li>
                                                </ul>
                                            </li> */}
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.common.loading,
        productCategories: state.productCategories.productCategories,
        carts: state.carts.carts,
        userInfo: state.auth.userInfo,
        isAuth: state.auth.isAuth,
    }
}

const mapDispatchToProps = dispatch => ({
    signOut: (cb) => dispatch(actions.signOut(cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)