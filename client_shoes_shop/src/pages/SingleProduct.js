import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Magnifier from "react-magnifier";
import { toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';

import * as networks from '../networks';
import * as actions from '../actions';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

class SingleProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: null,
            currentProductSizeDetailIndex: 0,
            currentProductImageIndex: 0,
            productSlug: props.match.params.slug,
            quantity: 1,
        }
    }

    async componentDidMount() {
        const productResponse = await networks.getSingleProduct(this.state.productSlug);
        if (productResponse.data && productResponse.data.data) {
            this.setState({
                product: productResponse.data.data,
            }, () => {
                setTimeout(() => {
                    if (window.$) {
                        window.$(".product-page-slider").owlCarousel({
                            autoPlay: false,
                            slideSpeed: 2000,
                            pagination: false,
                            navigation: true,
                            items: 3,
                            itemsDesktop: [1199, 3],
                            itemsDesktopSmall: [980, 3],
                            itemsTablet: [768, 2],
                            itemsMobile: [479, 2],
                        });
                        window.$(".upsell-slider").owlCarousel({
                            autoPlay: false,
                            slideSpeed: 2000,
                            pagination: false,
                            navigation: true,
                            items: 4,
                            itemsDesktop: [1199, 3],
                            itemsDesktopSmall: [980, 3],
                            itemsTablet: [768, 2],
                            itemsMobile: [479, 1],
                        });
                        window.$(".related-slider").owlCarousel({
                            autoPlay: false,
                            slideSpeed: 2000,
                            pagination: false,
                            navigation: true,
                            items: 4,
                            itemsDesktop: [1199, 3],
                            itemsDesktopSmall: [980, 3],
                            itemsTablet: [768, 2],
                            itemsMobile: [479, 1],
                        });
                    }
                }, 500);
            });
        }
    }

    handleChangeImage = (imageIndex) => {
        this.setState({ currentProductImageIndex: imageIndex });
    }

    handleSelectSize = (sizeIndex) => {
        this.setState({ currentProductSizeDetailIndex: sizeIndex });
    }

    handleAddToCart = () => {
        const { product, currentProductSizeDetailIndex, quantity } = this.state;
        const { carts } = this.props;

        if (!product || !product.id) {
            return;
        }

        const color = product.product_detail;
        const sizes = product.product_detail && product.product_detail.sizes;

        if (quantity <= 0 || quantity > sizes[currentProductSizeDetailIndex].quantity) {
            return toast.success("Số lượng sản phẩm không hợp lệ!");
        }

        this.props.createCart({
            product_id: product.id,
            product_detail_id: color && color.id,
            product_size_detail_id: sizes[currentProductSizeDetailIndex] && sizes[currentProductSizeDetailIndex].id,
            price: product.product_detail.price,
            sale_price: 0,
            quantity,
        }, () => {
            this.props.getCarts({});
        });
    }

    toggleFavorite = async (e) => {
        e.preventDefault();
        const { product } = this.state;

        if (product.is_favorite) {
            await networks.deleteProductFavorites(product.id);
            toast.success("Xóa sản phẩm khỏi danh sách yêu thích thành công!");

            this.setState({
                product: {
                    ...product,
                    is_favorite: false,
                }
            });
        } else {
            await networks.createProductFavorites({ product_id: product.id });
            toast.success("Thêm sản phẩm vào danh sách yêu thích thành công!");

            this.setState({
                product: {
                    ...product,
                    is_favorite: true,
                }
            });
        }
    }

    render() {
        const { isAuth } = this.props;
        const { product, currentProductSizeDetailIndex, quantity, currentProductImageIndex } = this.state;

        if (!product || !product.id) {
            return <></>;
        }

        const color = product.product_detail;
        const sizes = product.product_detail && product.product_detail.sizes;

        return (
            <>
                <div>
                    <div className="Single-product-location home2">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="location">
                                        <ul>
                                            <li><Link to="/" title="go to homepage">Trang chủ<span>/</span></Link></li>
                                            <li><strong> {product.name}</strong></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* single product area end */}
                    {/* single product details start */}
                    <div className="single-product-details">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="single-product-img tab-content">
                                        {product.images && product.images[currentProductImageIndex] && (
                                            <div className="single-pro-main-image" id={`#pro-large-img-${product.images[currentProductImageIndex].id}`}>
                                                <Magnifier src={`${baseUrl}/${product.images[currentProductImageIndex].image_path}`} width='100%' mgWidth={250} mgHeight={250} mgShape="square" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="product-page-slider">
                                        {
                                            (product.images || []).map((image, index) => (
                                                <div key={image.id} className="single-product-slider">
                                                    <a onClick={() => this.handleChangeImage(index)} href={`#pro-large-img-${image.id}`} data-toggle="tab">
                                                        <img src={`${baseUrl}/${image.image_path}`} alt />
                                                    </a>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="single-product-details">
                                        <a href="#" className="product-name">{product.name}</a>
                                        <div className="avalable">
                                            <p>Tình trạng: {(
                                                sizes && sizes[currentProductSizeDetailIndex] && sizes[currentProductSizeDetailIndex].quantity > 0 ? <span> Còn hàng ({sizes[currentProductSizeDetailIndex].quantity} sản phẩm)</span> : <span> Hết hàng</span>
                                            )}</p>
                                        </div>
                                        <div className="item-price">
                                            <span className={product.product_detail && product.product_detail.sales && product.product_detail.sales[0] ? 'old-price' : ''}>
                                                {product.product_detail ? `${Number(product.product_detail.price).toLocaleString()} VND` : '0 VND'}
                                            </span>
                                            {product.product_detail && product.product_detail.sales && product.product_detail.sales[0] ? (
                                                <span>{Number(product.product_detail.sales[0].sale_price).toLocaleString()} VND</span>
                                            ) : <span>&nbsp;</span>}
                                        </div>
                                        <div className="single-product-info">
                                            <div dangerouslySetInnerHTML={{ __html: product.description }}></div>
                                            <div className="share">
                                                <img src="/img/product/share.png" alt />
                                            </div>
                                        </div>
                                        {isAuth && (
                                            <div className="action">
                                                <ul className="add-to-links">
                                                    <li>
                                                        <a className={product.is_favorite ? "active" : ""} href="#" onClick={this.toggleFavorite}>
                                                            <i className="fa fa-heart" />
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        ) || (
                                                <div className="action">
                                                    <ul className="add-to-links">
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
                                        <div className="select-catagory">
                                            <div className="color-select">
                                                <label className="required">
                                                    <em>*</em> Màu
                                                </label>
                                                <div className="input-box">
                                                    <div className="single-sidebar-content" style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        flexWrap: 'wrap',
                                                        margin: '0 -5px',
                                                    }} >
                                                        <a key={color.id} href="#" style={{
                                                            backgroundColor: color.color_id.color_code,
                                                            display: 'inline-block',
                                                            width: 25,
                                                            height: 25,
                                                            margin: 5,
                                                            borderRadius: '100%',
                                                            color: '#ffffff',
                                                            fontSize: 10,
                                                            textAlign: 'center',
                                                            lineHeight: '25px',
                                                        }} onClick={(e) => {
                                                            e.preventDefault();
                                                        }}
                                                            data-tip={color.color_id.color_name}>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="size-select">
                                                <label className="required">
                                                    <em>*</em> Kích cỡ
                                                </label>
                                                <div className="input-box">
                                                    <div className="single-sidebar-content" style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        flexWrap: 'wrap',
                                                        margin: '0 -5px',
                                                    }} >
                                                        {sizes && sizes.map((size, index) => (
                                                            <a key={size.id} href="#" style={{
                                                                backgroundColor: currentProductSizeDetailIndex == index ? '#000000' : 'transparent',
                                                                display: 'inline-block',
                                                                width: 35,
                                                                height: 35,
                                                                margin: 5,
                                                                color: currentProductSizeDetailIndex == index ? '#ffffff' : '#000000',
                                                                fontSize: 14,
                                                                textAlign: 'center',
                                                                lineHeight: '35px',
                                                            }} onClick={(e) => {
                                                                e.preventDefault();
                                                                this.handleSelectSize(index);
                                                            }}>
                                                                {size.size_id.size}
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="cart-item">
                                            <div className="price-box">
                                                <span className={product.product_detail && product.product_detail.sales && product.product_detail.sales[0] ? 'old-price' : ''}>
                                                    {product.product_detail ? `${Number(product.product_detail.price * quantity).toLocaleString()} VND` : '0 VND'}
                                                </span>
                                                {product.product_detail && product.product_detail.sales && product.product_detail.sales[0] ? (
                                                    <span>{Number(product.product_detail.sales[0].sale_price * quantity).toLocaleString()} VND</span>
                                                ) : <span>&nbsp;</span>}
                                            </div>
                                            {
                                                sizes && sizes[currentProductSizeDetailIndex] && sizes[currentProductSizeDetailIndex].quantity > 0 && (
                                                    <div className="single-cart">
                                                        <div className="cart-plus-minus">
                                                            <label>Số lượng: </label>
                                                            <div onClick={() => {
                                                                if (quantity - 1 > 0) {
                                                                    this.setState({ quantity: quantity - 1 });
                                                                }
                                                            }} className="dec qtybutton">{'<'}</div>
                                                            <input readOnly className="cart-plus-minus-box" type="text" name="qtybutton" value={quantity} />
                                                            <div onClick={() => {
                                                                if (quantity + 1 > sizes[currentProductSizeDetailIndex].quantity) {
                                                                    toast.error("Vượt quá số lượng cho phép!");
                                                                } else {
                                                                    this.setState({ quantity: quantity + 1 });
                                                                }
                                                            }} className="inc qtybutton">{'>'}</div>
                                                        </div>
                                                        <button onClick={this.handleAddToCart} className="cart-btn">Thêm vào giỏ hàng</button>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* single product details end */}
                    {/* single product tab start */}
                    <div className="single-product-tab-area">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="single-product-tab">
                                        {/* <ul className="single-product-tab-navigation" role="tablist">
                                            <li role="presentation" className="active"><a href="#tab1" aria-controls="tab1" role="tab" data-toggle="tab">Mô tả sản phẩm</a></li>
                                        </ul>
                                        <div className="tab-content single-product-page">
                                            <div role="tabpanel" className="tab-pane fade in active" id="tab1">
                                                <div className="single-p-tab-content">
                                                    <p>{product.description}</p>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ReactTooltip />
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.common.loading,
        carts: state.carts.carts,
        isAuth: state.auth.isAuth,
    }
}

const mapDispatchToProps = dispatch => ({
    createCart: (cart, cb) => dispatch(actions.createCart(cart, cb)),
    getCarts: (params) => dispatch(actions.getCarts(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SingleProduct))