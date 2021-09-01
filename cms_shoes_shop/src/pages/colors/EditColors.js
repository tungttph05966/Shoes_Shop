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

class EditColors extends Component {
    state = {
        formData: {
            color_name: '',
            color_code: '#000000',
        },
    }

    async componentDidMount() {
        try {
            const colorId = this.props.match.params.id;
            const color = await networks.getSingleColor(colorId);
            if (color.data && color.data.data) {
                this.setState({ formData: color.data.data });
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
        const { id, color_name, color_code } = this.state.formData;
        
        this.props.updateColor({ id, color_name, color_code }, () => {
            this.props.history.push('/colors');
        });
    }

    render() {
        const { loading } = this.props;
        const { color_name, color_code } = this.state.formData;

        return (
            <CRow>
                <CCol xs="12">
                    <CCard>
                        <CCardHeader>
                            Chỉnh sửa màu sản phẩm
                        </CCardHeader>
                        <CCardBody>
                            <CForm onSubmit={this.handleSubmit} id="new-form" className="form-horizontal">
                                <CFormGroup>
                                    <CLabel htmlFor="color_name">Tên màu</CLabel>
                                    <CInput value={color_name} onChange={this.handleChange} required id="color_name" name="color_name" placeholder="Nhập tên màu" />
                                </CFormGroup>
                                <CFormGroup>
                                    <CLabel htmlFor="color_code">Mã màu</CLabel>
                                    <CInput type="color" value={color_code} onChange={this.handleChange} required id="color_code" name="color_code" placeholder="Nhập mã màu" />
                                </CFormGroup>
                            </CForm>
                        </CCardBody>
                        <CCardFooter className="text-right">
                            <CButton disabled={loading} form="new-form" type="submit" size="sm" color="primary" className="mr-3"><CIcon name="cil-save" /> Lưu</CButton>
                            <Link to="/Colors">
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
    updateColor: (color, cb) => dispatch(actions.updateColor(color, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditColors);
