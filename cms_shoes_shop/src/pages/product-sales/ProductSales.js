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
import moment from 'moment'
import DatePicker from 'react-date-picker';

import * as actions from '../../actions';
import * as networks from '../../networks';

class ProductSales extends Component {
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
        Header: 'Sản phẩm',
        accessor: 'product_id.name',
        id: 'product_id',
        filterable: true,
        sortable: false,
        Filter: ({ filter, onChange }) =>
          <select
            onChange={event => onChange(event.target.value)}
            style={{ width: "100%" }}
            value={filter ? filter.value : ""}
          >
            <option value="">Show All</option>
            {this.state.productOptions && this.state.productOptions.map(parentOption => <option key={parentOption.id} value={parentOption.id}>{parentOption.name}</option>)}
          </select>
      },
      {
        Header: 'Thuộc tính sản phẩm',
        accessor: 'product_detail_id',
        sortable: false,
        filterable: false,
        Cell: (row) => (<span>
          Màu: {row.value.color_id && row.value.color_id.color_name}
        </span>)
      },
      {
        Header: 'Giá gốc',
        accessor: 'product_detail_id.price',
        sortable: false,
        filterable: false,
        Cell: (row) => (<span>
          {Number(row.value).toLocaleString()} VNĐ
        </span>)
      },
      {
        Header: 'Giá khuyến mãi',
        accessor: 'sale_price',
        sortable: false,
        filterable: false,
        Cell: (row) => (<span>
          {Number(row.value).toLocaleString()} VNĐ
        </span>)
      },
      {
        Header: 'Ngày bắt đầu',
        accessor: 'start_date',
        sortable: true,
        filterable: false,
        Cell: (row) => (<span>
          {moment(row.value).format('DD/MM/YYYY')}
        </span>),
        Filter: ({ filter, onChange }) => (
          <div>
            <DatePicker format="dd/MM/yyyy" locale="vi-VN" name="start_date" value={filter ? filter.value : null} onChange={(date) => this.handleChange(date)} clearIcon={null} />
          </div>
        )
      },
      {
        Header: 'Ngày kết thúc',
        accessor: 'end_date',
        sortable: true,
        filterable: false,
        Cell: (row) => (<span>
          {moment(row.value).format('DD/MM/YYYY')}
        </span>)
      },
      {
        Header: 'Hành động',
        accessor: 'id',
        sortable: false,
        Cell: (row) => (<div>
          <Link to={`/product-sales/${row.value}/edit`}>
            <CButton color="info">Sửa</CButton>
          </Link>
          <CButton onClick={() => this.handleDeleteConfirm(row.value)} className="ml-3" color="danger">Xóa</CButton>
        </div>)
      },
    ],
    productOptions: [],
    deleteId: null,
    showModalDelete: false,
  }

  async componentDidMount() {
      try {
          const productOptions = await networks.getProductOptions();
          if (productOptions.data && productOptions.data.data) {
            this.setState({ productOptions: productOptions.data.data });
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
      this.props.deleteProductDetailSale(this.state.deleteId, () => {
        this.props.getProductDetailSales();
      });
    }

    this.setState({
      deleteId: null,
      showModalDelete: false,
    });
  }

  fetchData = (state, instance) => {
    this.props.getProductDetailSales({
      page: state.page + 1,
      perPage: state.pageSize,
      sorted: state.sorted,
      filtered: state.filtered,
    });
  }

  render() {
    const { columns, showModalDelete } = this.state;
    const { loading, productDetailSales } = this.props;

    return (
      <CRow>
        <CCol xl={12}>
          <CCard>
            <CCardHeader>
              <div className="text-right">
                <Link to="/product-sales/new">
                  <CButton color="primary">Tạo mới</CButton>
                </Link>
              </div>
            </CCardHeader>
            <CCardBody>
              <ReactTable
                data={productDetailSales.data}
                columns={columns}
                onFetchData={this.fetchData}
                loading={loading}
                defaultPageSize={10}
                manual
                pages={Math.ceil(productDetailSales.total/productDetailSales.perPage)}
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
    productDetailSales: state.productDetailSales.productDetailSales,
    loading: state.common.loading,
  }
}

const mapDispatchToProps = dispatch => ({
  getProductDetailSales: (params) => dispatch(actions.getProductDetailSales(params)),
  deleteProductDetailSale: (productDetailSaleId, cb) => dispatch(actions.deleteProductDetailSale(productDetailSaleId, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductSales)
