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
  CSwitch,
} from '@coreui/react'
import ReactTable from 'react-table-v6'

import * as actions from '../../actions';
import * as networks from '../../networks';

class Products extends Component {
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
        Header: 'Mã sản phẩm',
        accessor: 'sku',
        filterable: true,
        sortable: true,
      },
      {
        Header: 'Danh mục',
        accessor: 'categories',
        filterable: false,
        sortable: false,
        Cell: (row) => (<span>
          {row.value && row.value.map(category => category.category && category.category.name || '').join(' | ') || ''}
        </span>)
      },
      {
        Header: 'Ẩn sản phẩm',
        accessor: 'is_disable',
        filterable: false,
        sortable: false,
        Cell: (row) => (<div>
          {/* {JSON.stringify(row.original)} */}
          <CSwitch
            className="ml-2"
            color="info"
            name="is_disable"
            checked={row.value}
            onChange={(e) => this.handleSwitchChange(e.target.checked, row.original)}
            shape="pill"
          />
        </div>)
      },
      {
        Header: 'Hành động',
        accessor: 'id',
        sortable: false,
        Cell: (row) => (<div>
          <Link to={`/products/${row.value}/edit`}>
            <CButton color="info">Sửa</CButton>
          </Link>
        </div>)
      },
    ],
    deleteId: null,
    showModalDelete: false,
  }

  handleSwitchChange = async (isChecked, record) => {
    this.props.updateProduct({
      id: record.id,
      desciption: record.desciption,
      is_disable: isChecked,
      is_new: record.is_new,
      name: record.name,
      sku: record.sku,
      slug: record.slug,
    }, () => {
      this.props.getProducts();
    });
  }

  handleDeleteConfirm = (id) => {
    this.setState({
      deleteId: id,
      showModalDelete: true,
    });
  }

  handleDelete = (confirm) => {
    if (confirm) {
      this.props.deleteProduct(this.state.deleteId, () => {
        this.props.getProducts();
      });
    }

    this.setState({
      deleteId: null,
      showModalDelete: false,
    });
  }

  fetchData = (state, instance) => {
    this.props.getProducts({
      page: state.page + 1,
      perPage: state.pageSize,
      sorted: state.sorted,
      filtered: state.filtered,
    });
  }

  render() {
    const { columns, showModalDelete } = this.state;
    const { loading, products } = this.props;

    return (
      <CRow>
        <CCol xl={12}>
          <CCard>
            <CCardHeader>
              <div className="text-right">
                <Link to="/products/new">
                  <CButton color="primary">Tạo mới</CButton>
                </Link>
              </div>
            </CCardHeader>
            <CCardBody>
              <ReactTable
                data={products.data}
                columns={columns}
                onFetchData={this.fetchData}
                loading={loading}
                defaultPageSize={10}
                manual
                pages={Math.ceil(products.total / products.perPage)}
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
    products: state.products.products,
    loading: state.common.loading,
  }
}

const mapDispatchToProps = dispatch => ({
  getProducts: (params) => dispatch(actions.getProducts(params)),
  deleteProduct: (productId, cb) => dispatch(actions.deleteProduct(productId, cb)),
  updateProduct: (product, cb) => dispatch(actions.updateProduct(product, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products)
