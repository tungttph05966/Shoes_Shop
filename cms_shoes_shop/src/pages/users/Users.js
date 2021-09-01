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

class Users extends Component {
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
        Header: 'Tài khoản',
        accessor: 'username',
        filterable: true,
        sortable: true,
      },
      {
        Header: 'Họ tên',
        accessor: 'fullname',
        filterable: true,
        sortable: true,
      },
      {
        Header: 'Email',
        accessor: 'email',
        filterable: true,
        sortable: true,
      },
      {
        Header: 'Số điện thoại',
        accessor: 'phone',
        filterable: true,
        sortable: true,
      },
      {
        Header: 'Địa chỉ',
        accessor: 'address',
        filterable: true,
        sortable: true,
      },
      {
        Header: 'Hành động',
        accessor: 'id',
        sortable: false,
        Cell: (row) => (<div>
          <Link to={`/users/${row.value}/edit`}>
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
      this.props.deleteUser(this.state.deleteId, () => {
        this.props.getUsers();
      });
    }

    this.setState({
      deleteId: null,
      showModalDelete: false,
    });
  }

  fetchData = (state, instance) => {
    this.props.getUsers({
      page: state.page + 1,
      perPage: state.pageSize,
      sorted: state.sorted,
      filtered: state.filtered,
    });
  }

  render() {
    const { columns, showModalDelete } = this.state;
    const { loading, users } = this.props;

    return (
      <CRow>
        <CCol xl={12}>
          <CCard>
            <CCardHeader>
              <div className="text-right">
                <Link to="/users/new">
                  <CButton color="primary">Tạo mới</CButton>
                </Link>
              </div>
            </CCardHeader>
            <CCardBody>
              <ReactTable
                data={users.data}
                columns={columns}
                onFetchData={this.fetchData}
                loading={loading}
                defaultPageSize={10}
                manual
                pages={Math.ceil(users.total/users.perPage)}
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
    users: state.users.users,
    loading: state.common.loading,
  }
}

const mapDispatchToProps = dispatch => ({
  getUsers: (params) => dispatch(actions.getUsers(params)),
  deleteUser: (userId, cb) => dispatch(actions.deleteUser(userId, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users)
