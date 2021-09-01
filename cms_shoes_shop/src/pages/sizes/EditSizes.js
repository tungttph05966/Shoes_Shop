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

class EditSizes extends Component {
    state = {
        formData: {
            size: '',
            size_code: '',
        },
    }

    async componentDidMount() {
        try {
            const sizeId = this.props.match.params.id;
            const size = await networks.getSingleSize(sizeId);
            if (size.data && size.data.data) {
                this.setState({ formData: size.data.data });
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
        const { id, size, size_code } = this.state.formData;
        
        this.props.updateSize({ id, size, size_code }, () => {
            this.props.history.push('/sizes');
        });
    }

    render() {
        const { loading } = this.props;
        const { size, size_code } = this.state.formData;

        return (
            <CRow>
                <CCol xs="12">
                    <CCard>
                        <CCardHeader>
                            Chỉnh sửa size sản phẩm
                        </CCardHeader>
                        <CCardBody>
                            <CForm onSubmit={this.handleSubmit} id="new-form" className="form-horizontal">
                                <CFormGroup>
                                    <CLabel htmlFor="size">Size</CLabel>
                                    <CInput type="string" value={size} onChange={this.handleChange} required id="size" name="size" placeholder="Nhập size" />
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel htmlFor="size_code">Mã size</CLabel>
                                    <CInput value={size_code} onChange={this.handleChange} required id="size_code" name="size_code" placeholder="Nhập mã size" />
                                </CFormGroup>
                            </CForm>
                        </CCardBody>
                        <CCardFooter className="text-right">
                            <CButton disabled={loading} form="new-form" type="submit" size="sm" color="primary" className="mr-3"><CIcon name="cil-save" /> Lưu</CButton>
                            <Link to="/sizes">
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
    updateSize: (size, cb) => dispatch(actions.updateSize(size, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditSizes);
