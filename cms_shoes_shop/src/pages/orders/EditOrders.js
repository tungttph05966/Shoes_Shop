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
                            Ch???nh s???a ????n h??ng
                        </CCardHeader>
                        <CCardBody>
                            <CForm onSubmit={this.handleSubmit} id="new-form" className="form-horizontal">
                                <CFormGroup>
                                    <CLabel htmlFor="customer_fullname">T??n kh??ch h??ng</CLabel>
                                    <CInput disabled={['shipping', 'accomplished', 'cancelled'].includes(status)} value={customer_fullname} onChange={this.handleChange} required id="customer_fullname" name="customer_fullname" placeholder="Nh???p t??n kh??ch h??ng" />
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel htmlFor="customer_phone">S??? ??i???n tho???i kh??ch h??ng</CLabel>
                                    <CInput disabled={['shipping', 'accomplished', 'cancelled'].includes(status)} value={customer_phone} onChange={this.handleChange} required id="customer_phone" name="customer_phone" placeholder="Nh???p s??? ??i???n tho???i kh??ch h??ng" />
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel htmlFor="customer_email">Email kh??ch h??ng</CLabel>
                                    <CInput disabled={['shipping', 'accomplished', 'cancelled'].includes(status)} type="email" value={customer_email} onChange={this.handleChange} required id="customer_email" name="customer_email" placeholder="Nh???p email kh??ch h??ng" />
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel htmlFor="customer_address">?????a ch??? kh??ch h??ng</CLabel>
                                    <CInput disabled={['shipping', 'accomplished', 'cancelled'].includes(status)} value={customer_address} onChange={this.handleChange} required id="customer_address" name="customer_address" placeholder="Nh???p ?????a ch??? kh??ch h??ng" />
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel htmlFor="status">Tr???ng th??i ????n h??ng:</CLabel>
                                    <CSelect disabled={['accomplished', 'cancelled'].includes(status)} custom value={status} onChange={this.handleNormalSelectChange} name="status" id="status">
                                        <option value="pending">Ch??? x??? l??</option>
                                        <option value="processing">??ang x??? l??</option>
                                        <option value="packed">???? ????ng g??i</option>
                                        <option value="shipping">??ang v???n chuy???n</option>
                                        <option value="accomplished">???? ho??n th??nh</option>
                                        <option value="cancelled">???? h???y</option>
                                    </CSelect>
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel htmlFor="order_product_details">Th??ng tin s???n ph???m</CLabel>
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
                                                                    <CLabel htmlFor="product_id">S???n ph???m:</CLabel>
                                                                    <Select
                                                                        isDisabled={order_product_details[index].id}
                                                                        value={_productOptions.filter(item => item.value == order_product_details[index].product_id)[0]}
                                                                        name={`order_product_details[${index}].product_id`}
                                                                        options={_productOptions}
                                                                        classNamePrefix="select"
                                                                        styles={{
                                                                            container: styles => ({ ...styles, zIndex: 5 }),
                                                                        }}
                                                                        placeholder="Ch???n s???n ph???m"
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
                                                                    <CLabel htmlFor="product_detail_id">M??u s???n ph???m:</CLabel>
                                                                    <CSelect disabled required custom value={order_product_details[index].product_detail_id} name={`order_product_details[${index}].product_detail_id`}>
                                                                        <option value="">Ch???n m??u</option>
                                                                        {currentProduct && currentProduct.product_detail && <option key={currentProduct.product_detail.id} value={currentProduct.product_detail.id}>M??u: {currentProduct.product_detail.color_id && currentProduct.product_detail.color_id.color_name}</option>}
                                                                    </CSelect>
                                                                </CFormGroup>
                                                            </CCol>
                                                            <CCol xs="4">
                                                                <CFormGroup>
                                                                    <CLabel htmlFor="product_size_detail_id">Size s???n ph???m:</CLabel>
                                                                    <CSelect disabled={['shipping', 'accomplished', 'cancelled'].includes(status)} required custom value={order_product_details[index].product_size_detail_id} onChange={this.handleNormalSelectChange} name={`order_product_details[${index}].product_size_detail_id`}>
                                                                        <option value="">Ch???n size</option>
                                                                        {currentProduct && currentProduct.product_detail
                                                                         && currentProduct.product_detail.sizes
                                                                         && currentProduct.product_detail.sizes.map(product_size_detail => <option key={product_size_detail.id} value={product_size_detail.id}>{product_size_detail.size_id && product_size_detail.size_id.size}</option>)}
                                                                    </CSelect>
                                                                </CFormGroup>
                                                            </CCol>
                                                            <CCol xs="4">
                                                                <CFormGroup>
                                                                    <CLabel htmlFor="quantity">S??? l?????ng</CLabel>
                                                                    <CInput disabled={['shipping', 'accomplished', 'cancelled'].includes(status)} value={order_product_details[index].quantity} onChange={this.handleChange} required name={`order_product_details[${index}].quantity`} placeholder="Nh???p s??? l?????ng s???n ph???m" />
                                                                </CFormGroup>
                                                            </CCol>
                                                            <CCol xs="4">
                                                                <CFormGroup>
                                                                    <CLabel htmlFor="price">Gi??</CLabel>
                                                                    <CInput disabled value={order_product_details[index].price} onChange={this.handleChange} required name={`order_product_details[${index}].price`} placeholder="Nh???p gi??" />
                                                                </CFormGroup>
                                                            </CCol>
                                                            <CCol xs="4">
                                                                <CFormGroup>
                                                                    <CLabel htmlFor="sale_price">Gi?? khuy???n m??i</CLabel>
                                                                    <CInput disabled value={order_product_details[index].sale_price} onChange={this.handleChange} required name={`order_product_details[${index}].sale_price`} placeholder="Nh???p gi??" />
                                                                </CFormGroup>
                                                            </CCol>
                                                        </CFormGroup>
                                                    </CCardBody>
                                                    {!['shipping', 'accomplished', 'cancelled'].includes(status) && <CCardFooter className="text-right">
                                                        <CButton disabled={loading} onClick={() => this.handleRemoveProduct(index)} type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> X??a s???n ph???m</CButton>
                                                    </CCardFooter>}
                                                </CCard>
                                            );
                                        })}
                                    </div>
                                    {!['shipping', 'accomplished', 'cancelled'].includes(status) && <div className="text-center">
                                        <CButton disabled={loading} onClick={this.handleAddNewProduct} size="sm" color="primary"><CIcon name="cil-plus" /> Th??m s???n ph???m</CButton>
                                    </div>}
                                </CFormGroup>
                            </CForm>
                        </CCardBody>
                        <CCardFooter className="text-right">
                            <CButton disabled={loading} form="new-form" type="submit" size="sm" color="primary" className="mr-3"><CIcon name="cil-save" /> L??u</CButton>
                            <Link to="/orders">
                                <CButton disabled={loading} type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> H???y b???</CButton>
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
