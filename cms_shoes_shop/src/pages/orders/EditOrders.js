import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CForm,
    CFormGroup,
    CInput,
    CLabel,
    CSelect,
    CRow,
    CSwitch,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import _ from 'lodash';
import Select from 'react-select';

import * as actions from '../../actions';
import * as networks from '../../networks';

class EditOrders extends Component {
    state = {
        formData: {
            id: '',
            customer_fullname: '',
            customer_phone: '',
            customer_email: '',
            customer_address: '',
            status: '',
            total: '',
            order_product_details: [],
        },
        productOptions: [],
    }

    async componentDidMount() {
        try {
            const orderId = this.props.match.params.id;
            const order = await networks.getSingleOrder(orderId);
            if (order.data && order.data.data) {
                this.setState({ formData: {
                    ...order.data.data,
                    order_product_details: order.data.data.order_product_details.map(order_product_detail => {
                        return {
                            ...order_product_detail,
                            product_id: order_product_detail.product_detail && order_product_detail.product_detail.product_id && order_product_detail.product_detail.product_id.id
                        }
                    })
                } });
            }

            const productOptions = await networks.getProductOptions();
            if (productOptions.data && productOptions.data.data) {
                this.setState({ productOptions: productOptions.data.data });
            }
        } catch (error) {

        }
    }

    handleChange = (e) => {
        const { formData } = this.state;
        const { name, value } = e.target;

        const newFormData = { ...formData };
        _.set(newFormData, name, value);

        this.setState({
            formData: newFormData
        });
    }

    handleSelectChange = (option, action) => {
        const { formData } = this.state;
        
        const newFormData = { ...formData };
        _.set(newFormData, action.name, option.value);

        this.setState({
            formData: newFormData
        });
    }

    handleNormalSelectChange = (e) => {
        const { formData } = this.state;
        const { name, value } = e.target;

        const newFormData = { ...formData };
        _.set(newFormData, name, value);

        this.setState({
            formData: newFormData
        });
    }

    handleSwitchChange = (e) => {
        const { formData } = this.state;
        const { name, checked } = e.target;
        this.setState({
            formData: {
                ...formData,
                [name]: checked,
            }
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { id, customer_fullname, customer_phone, customer_email, customer_address, status, total, order_product_details } = this.state.formData;

        this.props.updateOrder({ id, customer_fullname, customer_phone, customer_email, customer_address, status, total, order_product_details }, () => {
            this.props.history.push('/orders');
        });
    }

    handleAddNewProduct = () => {
        const { formData } = this.state;

        formData.order_product_details.push({
            product_detail_id: "",
            product_size_detail_id: "",
            quantity: 0,
            price: 0,
            sale_price: 0,
        });

        this.setState({
            formData,
        });
    }

    handleRemoveProduct = (removeIndex) => {
        const { formData } = this.state;

        this.setState({
            formData: {
                ...formData,
                order_product_details: formData.order_product_details.filter((item, index) => index != removeIndex)
            },
        });
    }

    render() {
        const { loading } = this.props;
        const { productOptions } = this.state;
        const { customer_fullname, customer_phone, customer_email, customer_address, status, order_product_details } = this.state.formData;
        
        return (
            <CRow>
                <CCol xs="12">
                    <CCard>
                        <CCardHeader>
                            Chỉnh sửa đơn hàng
                        </CCardHeader>
                        <CCardBody>
                            <CForm onSubmit={this.handleSubmit} id="new-form" className="form-horizontal">
                                <CFormGroup>
                                    <CLabel htmlFor="customer_fullname">Tên khách hàng</CLabel>
                                    <CInput disabled={['shipping', 'accomplished', 'cancelled'].includes(status)} value={customer_fullname} onChange={this.handleChange} required id="customer_fullname" name="customer_fullname" placeholder="Nhập tên khách hàng" />
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel htmlFor="customer_phone">Số điện thoại khách hàng</CLabel>
                                    <CInput disabled={['shipping', 'accomplished', 'cancelled'].includes(status)} value={customer_phone} onChange={this.handleChange} required id="customer_phone" name="customer_phone" placeholder="Nhập số điện thoại khách hàng" />
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel htmlFor="customer_email">Email khách hàng</CLabel>
                                    <CInput disabled={['shipping', 'accomplished', 'cancelled'].includes(status)} type="email" value={customer_email} onChange={this.handleChange} required id="customer_email" name="customer_email" placeholder="Nhập email khách hàng" />
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel htmlFor="customer_address">Địa chỉ khách hàng</CLabel>
                                    <CInput disabled={['shipping', 'accomplished', 'cancelled'].includes(status)} value={customer_address} onChange={this.handleChange} required id="customer_address" name="customer_address" placeholder="Nhập địa chỉ khách hàng" />
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel htmlFor="status">Trạng thái đơn hàng:</CLabel>
                                    <CSelect disabled={['accomplished', 'cancelled'].includes(status)} custom value={status} onChange={this.handleNormalSelectChange} name="status" id="status">
                                        <option value="pending">Chờ xử lý</option>
                                        <option value="processing">Đang xử lý</option>
                                        <option value="packed">Đã đóng gói</option>
                                        <option value="shipping">Đang vận chuyển</option>
                                        <option value="accomplished">Đã hoàn thành</option>
                                        <option value="cancelled">Đã hủy</option>
                                    </CSelect>
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel htmlFor="order_product_details">Thông tin sản phẩm</CLabel>
                                    <div>
                                        {order_product_details.map((_, index) => {
                                            const currentProduct = productOptions.filter(product => product.id == order_product_details[index].product_id)[0];
                                            const _productOptions = productOptions.map(product => ({ label: product.name, value: product.id }));
                                            
                                            return (
                                                <CCard key={order_product_details[index].id}>
                                                    <CCardBody>
                                                        <CFormGroup row className="my-0">
                                                            <CCol xs="4">
                                                                <CFormGroup>
                                                                    <CLabel htmlFor="product_id">Sản phẩm:</CLabel>
                                                                    <Select
                                                                        isDisabled={order_product_details[index].id}
                                                                        value={_productOptions.filter(item => item.value == order_product_details[index].product_id)[0]}
                                                                        name={`order_product_details[${index}].product_id`}
                                                                        options={_productOptions}
                                                                        classNamePrefix="select"
                                                                        styles={{
                                                                            container: styles => ({ ...styles, zIndex: 5 }),
                                                                        }}
                                                                        placeholder="Chọn sản phẩm"
                                                                        onChange={(option, action) => {
                                                                            const productSelected = productOptions.filter(item => item.id == option.value)[0];
                                                                            if (productSelected && productSelected.product_detail) {
                                                                                const formData = this.state.formData;
                                                                                formData.order_product_details[index].product_detail_id = productSelected.product_detail.id;
                                                                                formData.order_product_details[index].price = productSelected.product_detail.price;
                                                                                formData.order_product_details[index].sale_price = productSelected.product_detail.sales && productSelected.product_detail.sales[0] ? productSelected.product_detail.sales[0].sale_price : 0;
                                                                                this.setState({
                                                                                    formData,
                                                                                });
                                                                            }
                                                                            this.handleSelectChange(option, action);
                                                                        }}
                                                                        required
                                                                    />
                                                                </CFormGroup>
                                                            </CCol>
                                                            <CCol xs="4">
                                                                <CFormGroup>
                                                                    <CLabel htmlFor="product_detail_id">Màu sản phẩm:</CLabel>
                                                                    <CSelect disabled required custom value={order_product_details[index].product_detail_id} name={`order_product_details[${index}].product_detail_id`}>
                                                                        <option value="">Chọn màu</option>
                                                                        {currentProduct && currentProduct.product_detail && <option key={currentProduct.product_detail.id} value={currentProduct.product_detail.id}>Màu: {currentProduct.product_detail.color_id && currentProduct.product_detail.color_id.color_name}</option>}
                                                                    </CSelect>
                                                                </CFormGroup>
                                                            </CCol>
                                                            <CCol xs="4">
                                                                <CFormGroup>
                                                                    <CLabel htmlFor="product_size_detail_id">Size sản phẩm:</CLabel>
                                                                    <CSelect disabled={['shipping', 'accomplished', 'cancelled'].includes(status)} required custom value={order_product_details[index].product_size_detail_id} onChange={this.handleNormalSelectChange} name={`order_product_details[${index}].product_size_detail_id`}>
                                                                        <option value="">Chọn size</option>
                                                                        {currentProduct && currentProduct.product_detail
                                                                         && currentProduct.product_detail.sizes
                                                                         && currentProduct.product_detail.sizes.map(product_size_detail => <option key={product_size_detail.id} value={product_size_detail.id}>{product_size_detail.size_id && product_size_detail.size_id.size}</option>)}
                                                                    </CSelect>
                                                                </CFormGroup>
                                                            </CCol>
                                                            <CCol xs="4">
                                                                <CFormGroup>
                                                                    <CLabel htmlFor="quantity">Số lượng</CLabel>
                                                                    <CInput disabled={['shipping', 'accomplished', 'cancelled'].includes(status)} value={order_product_details[index].quantity} onChange={this.handleChange} required name={`order_product_details[${index}].quantity`} placeholder="Nhập số lượng sản phẩm" />
                                                                </CFormGroup>
                                                            </CCol>
                                                            <CCol xs="4">
                                                                <CFormGroup>
                                                                    <CLabel htmlFor="price">Giá</CLabel>
                                                                    <CInput disabled value={order_product_details[index].price} onChange={this.handleChange} required name={`order_product_details[${index}].price`} placeholder="Nhập giá" />
                                                                </CFormGroup>
                                                            </CCol>
                                                            <CCol xs="4">
                                                                <CFormGroup>
                                                                    <CLabel htmlFor="sale_price">Giá khuyến mãi</CLabel>
                                                                    <CInput disabled value={order_product_details[index].sale_price} onChange={this.handleChange} required name={`order_product_details[${index}].sale_price`} placeholder="Nhập giá" />
                                                                </CFormGroup>
                                                            </CCol>
                                                        </CFormGroup>
                                                    </CCardBody>
                                                    {!['shipping', 'accomplished', 'cancelled'].includes(status) && <CCardFooter className="text-right">
                                                        <CButton disabled={loading} onClick={() => this.handleRemoveProduct(index)} type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Xóa sản phẩm</CButton>
                                                    </CCardFooter>}
                                                </CCard>
                                            );
                                        })}
                                    </div>
                                    {!['shipping', 'accomplished', 'cancelled'].includes(status) && <div className="text-center">
                                        <CButton disabled={loading} onClick={this.handleAddNewProduct} size="sm" color="primary"><CIcon name="cil-plus" /> Thêm sản phẩm</CButton>
                                    </div>}
                                </CFormGroup>
                            </CForm>
                        </CCardBody>
                        <CCardFooter className="text-right">
                            <CButton disabled={loading} form="new-form" type="submit" size="sm" color="primary" className="mr-3"><CIcon name="cil-save" /> Lưu</CButton>
                            <Link to="/orders">
                                <CButton disabled={loading} type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Hủy bỏ</CButton>
                            </Link>
                        </CCardFooter>
                    </CCard>
                </CCol>
            </CRow>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.common.loading,
});

const mapDispatchToProps = dispatch => ({
    updateOrder: (order, cb) => dispatch(actions.updateOrder(order, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditOrders);
