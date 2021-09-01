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

class Sizes extends Component {
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
        Header: 'Size',
        accessor: 'size',
        filterable: true,
        sortable: true,
      },
      {
        Header: 'Mã size',
        accessor: 'size_code',
        filterable: true,
        sortable: true,
      },
      {
        Header: 'Hành động',
        accessor: 'id',
        sortable: false,
        Cell: (row) => (<div>
          <Link to={`/sizes/${row.value}/edit`}>
            <CButton color="info">Sửa</CButton>
          </Link>
          <CButton onClick={() => this.handleDeleteConfirm(row.value)} className="ml-3" color="danger">Xóa</CButton>
        </div>)
      },
    ],
    deleteId: null,
    showModalDelete: false,
  }

  handleDeleteConfirm = (id) => {
    this.setState({
      deleteId: id,
      showModalDelete: true,
    });
  }

  handleDelete = (confirm) => {
    if (confirm) {
      this.props.deleteSize(this.state.deleteId, () => {
        this.props.getSizes();
      });
    }

    this.setState({
      deleteId: null,
      showModalDelete: false,
    });
  }

  fetchData = (state, instance) => {
    this.props.getSizes({
      page: state.page + 1,
      perPage: state.pageSize,
      sorted: state.sorted,
      filtered: state.filtered,
    });
  }

  render() {
    const { columns, showModalDelete } = this.state;
    const { loading, sizes } = this.props;

    return (
      <CRow>
        <CCol xl={12}>
          <CCard>
            <CCardHeader>
              <div className="text-right">
                <Link to="/sizes/new">
                  <CButton color="primary">Tạo mới</CButton>
                </Link>
              </div>
            </CCardHeader>
            <CCardBody>
              <ReactTable
                data={sizes.data}
                columns={columns}
                onFetchData={this.fetchData}
                loading={loading}
                defaultPageSize={10}
                manual
                pages={Math.ceil(sizes.total/sizes.perPage)}
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
    sizes: state.sizes.sizes,
    loading: state.common.loading,
  }
}

const mapDispatchToProps = dispatch => ({
  getSizes: (params) => dispatch(actions.getSizes(params)),
  deleteSize: (sizeId, cb) => dispatch(actions.deleteSize(sizeId, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sizes)
