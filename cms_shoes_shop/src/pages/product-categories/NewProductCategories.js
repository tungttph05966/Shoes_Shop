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

class NewProductCategories extends Component {
    state = {
        formData: {
            name: '',
            parent_id: null,
        },
        parentOptions: [],
    }

    async componentDidMount() {
        try {
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
        const { name, parent_id } = this.state.formData;

        this.props.createProductCategory({ name, parent_id }, () => {
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
                            T???o danh m???c s???n ph???m m???i
                        </CCardHeader>
                        <CCardBody>
                            <CForm onSubmit={this.handleSubmit} id="new-form" className="form-horizontal">
                                <CFormGroup>
                                    <CLabel htmlFor="name">T??n danh m???c</CLabel>
                                    <CInput value={name} onChange={this.handleChange} required id="name" name="name" placeholder="Nh???p t??n danh m???c" />
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel htmlFor="parent_id">Danh m???c cha:</CLabel>
                                    <CSelect custom value={parent_id} onChange={this.handleSelectChange} required name="parent_id" id="parent_id">
                                        <option value="">Ch???n danh m???c cha</option>
                                        {parentOptions.map(parentOption => <option key={parentOption.id} value={parentOption.id}>{parentOption.name}</option>)}
                                    </CSelect>
                                </CFormGroup>
                            </CForm>
                        </CCardBody>
                        <CCardFooter className="text-right">
                            <CButton disabled={loading} form="new-form" type="submit" size="sm" color="primary" className="mr-3"><CIcon name="cil-plus" /> T???o</CButton>
                            <Link to="/product-categories">
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
    createProductCategory: (productCategory, cb) => dispatch(actions.createProductCategory(productCategory, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewProductCategories);
