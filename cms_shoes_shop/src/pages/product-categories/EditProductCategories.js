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

import * as actions from '../../actions';
import * as networks from '../../networks';

class EditProductCategories extends Component {
    state = {
        formData: {
            name: '',
            parent_id: null,
        },
        parentOptions: [],
    }

    async componentDidMount() {
        try {
            const productCategoryId = this.props.match.params.id;
            const productCategory = await networks.getSingleProductCategory(productCategoryId);
            if (productCategory.data && productCategory.data.data) {
                this.setState({ formData: productCategory.data.data });
            }

            const parentOptions = await networks.getProductCategoryOptions();
            if (parentOptions.data && parentOptions.data.data) {
                this.setState({ parentOptions: parentOptions.data.data.filter(category => category.parent_id == null) });
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
        const { formData } = this.state;
        const { name, value } = e.target;
        this.setState({
            formData: {
                ...formData,
                [name]: value,
            }
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { id, name, parent_id } = this.state.formData;
        
        this.props.updateProductCategory({ id, name, parent_id }, () => {
            this.props.history.push('/product-categories');
        });
    }

    render() {
        const { loading } = this.props;
        const { parentOptions } = this.state;
        const { name, parent_id } = this.state.formData;

        return (
            <CRow>
                <CCol xs="12">
                    <CCard>
                        <CCardHeader>
                            Chỉnh sửa danh mục sản phẩm
                        </CCardHeader>
                        <CCardBody>
                            <CForm onSubmit={this.handleSubmit} id="new-form" className="form-horizontal">
                                <CFormGroup>
                                    <CLabel htmlFor="name">Tên danh mục</CLabel>
                                    <CInput value={name} onChange={this.handleChange} required id="name" name="name" placeholder="Nhập tên danh mục" />
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel htmlFor="parent_id">Danh mục cha:</CLabel>
                                    <CSelect custom value={parent_id} onChange={this.handleSelectChange} required name="parent_id" id="parent_id">
                                        <option value="">Chọn danh mục cha</option>
                                        {parentOptions.map(parentOption => <option key={parentOption.id} value={parentOption.id}>{parentOption.name}</option>)}
                                    </CSelect>
                                </CFormGroup>
                            </CForm>
                        </CCardBody>
                        <CCardFooter className="text-right">
                            <CButton disabled={loading} form="new-form" type="submit" size="sm" color="primary" className="mr-3"><CIcon name="cil-save" /> Lưu</CButton>
                            <Link to="/product-categories">
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
    updateProductCategory: (productCategory, cb) => dispatch(actions.updateProductCategory(productCategory, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProductCategories);
