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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import DatePicker from 'react-date-picker';
import moment from 'moment'

import * as actions from '../../actions';
import * as networks from '../../networks';

class EditProductSales extends Component {
    state = {
        formData: {
            product_id: '',
            product_detail_id: '',
            sale_price: 0,
            start_date: new Date(moment().startOf('date').valueOf()),
            end_date: new Date(moment().startOf('date').valueOf()),
        },
        productOptions: [],
    }

    async componentDidMount() {
        try {
            const productDetailSaleId = this.props.match.params.id;
            const productDetailSale = await networks.getSingleProductDetailSale(productDetailSaleId);
            if (productDetailSale.data && productDetailSale.data.data) {
                this.setState({ formData: {
                    ...productDetailSale.data.data,
                    product_id: productDetailSale.data.data.product_id && productDetailSale.data.data.product_id.id,
                    product_detail_id: productDetailSale.data.data.product_detail_id && productDetailSale.data.data.product_detail_id.id,
                    start_date: new Date(moment(productDetailSale.data.data.start_date).valueOf()),
                    end_date: new Date(moment(productDetailSale.data.data.end_date).valueOf()),
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
        this.setState({
            formData: {
                ...formData,
                [name]: value,
            }
        });
    }

    handleSelectChange = (e) => {
        const { formData, productOptions } = this.state;
        const { name, value } = e.target;

        this.setState({
            formData: {
                ...formData,
                [name]: value,
            }
        }, () => {
            if (name == 'product_id') {
                if (value) {
                    const productSelected = productOptions.filter(product => product.id == value)[0];
                    if (productSelected && productSelected.product_detail && productSelected.product_detail.id) {
                        this.setState({
                            formData: {
                                ...this.state.formData,
                                product_detail_id: productSelected.product_detail.id,
                            }
                        });
                    }
                } else {
                    this.setState({
                        formData: {
                            ...this.state.formData,
                            product_detail_id: null,
                        }
                    });
                }
            }
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { id, product_id, product_detail_id, sale_price, start_date, end_date } = this.state.formData;

        this.props.updateProductDetailSale({ id, product_id, product_detail_id, sale_price, start_date, end_date }, () => {
            this.props.history.push('/product-sales');
        });
    }

    render() {
        const { loading } = this.props;
        const { productOptions } = this.state;
        const { product_detail_id, product_id, sale_price, start_date, end_date } = this.state.formData;
        const currentProduct = productOptions.filter(product => product.id == product_id)[0];

        return (
            <CRow>
                <CCol xs="12">
                    <CCard>
                        <CCardHeader>
                            Chỉnh sửa khuyến mãi
                        </CCardHeader>
                        <CCardBody>
                            <CForm onSubmit={this.handleSubmit} id="new-form" className="form-horizontal">
                                <CFormGroup>
                                    <CLabel htmlFor="product_id">Sản phẩm:</CLabel>
                                    <CSelect required custom value={product_id} onChange={this.handleSelectChange} name="product_id" id="product_id">
                                        <option value="">Chọn sản phẩm</option>
                                        {productOptions.map(product => <option key={product.id} value={product.id}>{product.name}</option>)}
                                    </CSelect>
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel htmlFor="product_detail_id">Thông số sản phẩm:</CLabel>
                                    <CSelect disabled required custom value={product_detail_id} onChange={this.handleSelectChange} name="product_detail_id" id="product_detail_id">
                                        <option value="">Chọn thông số</option>
                                        {currentProduct && currentProduct.product_detail && <option key={currentProduct.product_detail.id} value={currentProduct.product_detail.id}>Màu: {currentProduct.product_detail.color_id && currentProduct.product_detail.color_id.color_name} - Giá gốc: {currentProduct.product_detail.price}</option>}
                                    </CSelect>
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel htmlFor="sale_price">Giá khuyến mãi</CLabel>
                                    <CInput type="number" value={sale_price} onChange={this.handleChange} required id="sale_price" name="sale_price" placeholder="Nhập giá khuyến mãi" />
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel htmlFor="start_date">Ngày bắt đầu</CLabel>
                                    <DatePicker className="form-control p-0" format="dd/MM/yyyy" locale="vi-VN" required name="start_date" value={start_date} onChange={(date) => this.handleChange({ target: { name: 'start_date', value: date } })} clearIcon={null} />
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel htmlFor="end_date">Giá kết thúc</CLabel>
                                    <DatePicker className="form-control p-0" format="dd/MM/yyyy" locale="vi-VN" required name="end_date" value={end_date} onChange={(date) => this.handleChange({ target: { name: 'end_date', value: date } })} clearIcon={null} />
                                </CFormGroup>
                            </CForm>
                        </CCardBody>
                        <CCardFooter className="text-right">
                            <CButton disabled={loading} form="new-form" type="submit" size="sm" color="primary" className="mr-3"><CIcon name="cil-save" /> Lưu</CButton>
                            <Link to="/product-sales">
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
    updateProductDetailSale: (productDetailSale, cb) => dispatch(actions.updateProductDetailSale(productDetailSale, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProductSales);
