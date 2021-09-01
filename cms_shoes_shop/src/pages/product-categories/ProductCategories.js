import React, { Component, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CModal,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CButton,
} from '@coreui/react'
import ReactTable from 'react-table-v6'

import * as actions from '../../actions';
import * as networks from '../../networks';

class ProductCategories extends Component {
  state = {
    columns: [
      {
        Header: 'Số thứ tự',
        accessor: 'index',
        filterable: false,
        sortable: false,
        Cell: (row) => {
          console.log(row)
          return (<span>{row.index + (row.page*row.pageSize) + 1}</span>);
        }
      },
      {
        Header: 'Tên',
        accessor: 'name',
        filterable: true,
        sortable: true,
      },
      {
        Header: 'Slug',
        accessor: 'slug',
        sortable: true,
      },
      {
        Header: 'Danh mục cha',
        accessor: 'parent_id.name',
        id: 'parent_id',
        sortable: false,
        filterable: true,
        Filter: ({ filter, onChange }) =>
          <select
            onChange={event => onChange(event.target.value)}
            style={{ width: "100%" }}
            value={filter ? filter.value : ""}
          >
            <option value="">Show All</option>
            {this.state.parentOptions && this.state.parentOptions.map(parentOption => <option key={parentOption.id} value={parentOption.id}>{parentOption.name}</option>)}
          </select>
      },
      {
        Header: 'Hành động',
        accessor: 'id',
        sortable: false,
        Cell: (row) => (<div>
          <Link to={`/product-categories/${row.value}/edit`}>
            <CButton color="info">Sửa</CButton>
          </Link>
          <CButton onClick={() => this.handleDeleteConfirm(row.value)} className="ml-3" color="danger">Xóa</CButton>
        </div>)
      },
    ],
    parentOptions: [],
    deleteId: null,
    showModalDelete: false,
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

  handleDeleteConfirm = (id) => {
    this.setState({
      deleteId: id,
      showModalDelete: true,
    });
  }

  handleDelete = (confirm) => {
    if (confirm) {
      this.props.deleteProductCategory(this.state.deleteId, () => {
        this.props.getProductCategories();
      });
    }

    this.setState({
      deleteId: null,
      showModalDelete: false,
    });
  }

  fetchData = (state, instance) => {
    this.props.getProductCategories({
      page: state.page + 1,
      perPage: state.pageSize,
      sorted: state.sorted,
      filtered: state.filtered,
    });
  }

  render() {
    const { columns, showModalDelete } = this.state;
    const { loading, productCategories } = this.props;

    return (
      <CRow>
        <CCol xl={12}>
          <CCard>
            <CCardHeader>
              <div className="text-right">
                <Link to="/product-categories/new">
                  <CButton color="primary">Tạo mới</CButton>
                </Link>
              </div>
            </CCardHeader>
            <CCardBody>
              <ReactTable
                data={productCategories.data}
                columns={columns}
                onFetchData={this.fetchData}
                loading={loading}
                defaultPageSize={10}
                manual
                pages={Math.ceil(productCategories.total/productCategories.perPage)}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CModal 
          show={showModalDelete} 
          onClose={() => this.handleDelete(false)}
          color="danger"
        >
          <CModalHeader closeButton>
            <CModalTitle>Bạn có chắc chắn muốn xóa dữ liệu này?</CModalTitle>
          </CModalHeader>
          <CModalFooter>
            <CButton color="danger" onClick={() => this.handleDelete(true)}>Xóa</CButton>{' '}
            <CButton color="secondary" onClick={() => this.handleDelete(false)}>Hủy bỏ</CButton>
          </CModalFooter>
        </CModal>
      </CRow>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    productCategories: state.productCategories.productCategories,
    loading: state.common.loading,
  }
}

const mapDispatchToProps = dispatch => ({
  getProductCategories: (params) => dispatch(actions.getProductCategories(params)),
  deleteProductCategory: (productCategoryId, cb) => dispatch(actions.deleteProductCategory(productCategoryId, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategories)
