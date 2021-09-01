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

class Colors extends Component {
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
        Header: 'Tên màu',
        accessor: 'color_name',
        filterable: true,
        sortable: true,
      },
      {
        Header: 'Mã màu',
        accessor: 'color_code',
        sortable: true,
      },
      {
        Header: 'Hành động',
        accessor: 'id',
        sortable: false,
        Cell: (row) => (<div>
          <Link to={`/colors/${row.value}/edit`}>
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
      this.props.deleteColor(this.state.deleteId, () => {
        this.props.getColors();
      });
    }

    this.setState({
      deleteId: null,
      showModalDelete: false,
    });
  }

  fetchData = (state, instance) => {
    this.props.getColors({
      page: state.page + 1,
      perPage: state.pageSize,
      sorted: state.sorted,
      filtered: state.filtered,
    });
  }

  render() {
    const { columns, showModalDelete } = this.state;
    const { loading, colors } = this.props;

    return (
      <CRow>
        <CCol xl={12}>
          <CCard>
            <CCardHeader>
              <div className="text-right">
                <Link to="/colors/new">
                  <CButton color="primary">Tạo mới</CButton>
                </Link>
              </div>
            </CCardHeader>
            <CCardBody>
              <ReactTable
                data={colors.data}
                columns={columns}
                onFetchData={this.fetchData}
                loading={loading}
                defaultPageSize={10}
                manual
                pages={Math.ceil(colors.total/colors.perPage)}
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
    colors: state.colors.colors,
    loading: state.common.loading,
  }
}

const mapDispatchToProps = dispatch => ({
  getColors: (params) => dispatch(actions.getColors(params)),
  deleteColor: (colorId, cb) => dispatch(actions.deleteColor(colorId, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Colors)
