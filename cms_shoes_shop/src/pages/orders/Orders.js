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

class Orders extends Component {
  state = {
    columns: [
      {
        Header: 'Mã đơn hàng',
        accessor: 'id',
        filterable: false,
        sortable: false,
      },
      {
        Header: 'Họ tên',
        accessor: 'customer_fullname',
        filterable: true,
        sortable: true,
      },
      {
        Header: 'Email khách hàng',
        accessor: 'customer_email',
        filterable: true,
        sortable: true,
      },
      {
        Header: 'Số điện thoại',
        accessor: 'customer_phone',
        filterable: true,
        sortable: true,
      },
      {
        Header: 'Địa chỉ',
        accessor: 'customer_address',
        filterable: true,
        sortable: true,
      },
      {
        Header: 'Trạng thái',
        accessor: 'status',
        filterable: true,
        sortable: true,
        Cell: (row) => (<div>
          <span>
            {
              row.value == 'pending' ? 'Chờ xử lý'
               : (row.value == 'processing' ? 'Đang xử lý'
               : (row.value == 'packed' ? 'Đã đóng gói'
                : (row.value == 'shipping' ? 'Đang vận chuyển'
                  : (row.value == 'accomplished' ? 'Đã hoàn thành'
                   : (row.value == 'cancelled' ? 'Đã hủy' : '')))))
            }
          </span>
        </div>),
        Filter: ({ filter, onChange }) =>
          <select
            onChange={event => onChange(event.target.value)}
            style={{ width: "100%" }}
            value={filter ? filter.value : ""}
          >
            <option value="">Show All</option>
            <option value="pending">Chờ xử lý</option>
            <option value="processing">Đang xử lý</option>
            <option value="packed">Đã đóng gói</option>
            <option value="shipping">Đang vận chuyển</option>
            <option value="accomplished">Đã hoàn thành</option>
            <option value="cancelled">Đã hủy</option>
          </select>
      },
      {
        Header: 'Tổng tiền',
        accessor: 'total',
        filterable: false,
        sortable: false,
        Cell: (row) => (<span>
          {Number(row.value).toLocaleString()} VNĐ
        </span>)
      },
      {
        Header: 'Hành động',
        accessor: 'id',
        sortable: false,
        Cell: (row) => !['accomplished', 'cancelled'].includes(row.original.status) && (<div>
          <Link to={`/orders/${row.value}/edit`}>
            <CButton color="info">Sửa</CButton>
          </Link>
          {!['shipping'].includes(row.original.status) && <CButton onClick={() => this.handleCancelConfirm(row.original)} className="ml-3" color="danger">Hủy đơn</CButton>}
        </div>)
      },
    ],
    cancelData: null,
    showModalCancel: false,
  }

  handleCancel = async (isCancel) => {
    if (isCancel) {
      this.props.updateOrder({
        id: this.state.cancelData.id,
        customer_fullname: this.state.cancelData.desciption,
        customer_phone: this.state.cancelData.desciption,
        customer_email: this.state.cancelData.desciption,
        customer_address: this.state.cancelData.desciption,
        status: 'cancelled',
        total: this.state.cancelData.desciption,
      }, () => {
        this.props.getOrders();
      });
    }

    this.setState({
      cancelData: null,
      showModalCancel: false,
    });
  }

  handleCancelConfirm = (record) => {
    this.setState({
      cancelData: record,
      showModalCancel: true,
    });
  }

  fetchData = (state, instance) => {
    this.props.getOrders({
      page: state.page + 1,
      perPage: state.pageSize,
      sorted: state.sorted,
      filtered: state.filtered,
    });
  }

  render() {
    const { columns, showModalCancel } = this.state;
    const { loading, orders } = this.props;

    return (
      <CRow>
        <CCol xl={12}>
          <CCard>
            <CCardBody>
              <ReactTable
                data={orders.data}
                columns={columns}
                onFetchData={this.fetchData}
                loading={loading}
                defaultPageSize={10}
                manual
                pages={Math.ceil(orders.total / orders.perPage)}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CModal
          show={showModalCancel}
          onClose={() => this.handleCancel(false)}
          color="danger"
        >
          <CModalHeader closeButton>
            <CModalTitle>Bạn có chắc chắn muốn hủy đơn hàng này?</CModalTitle>
          </CModalHeader>
          <CModalFooter>
            <CButton color="danger" onClick={() => this.handleCancel(true)}>Hủy đơn</CButton>{' '}
            <CButton color="secondary" onClick={() => this.handleCancel(false)}>Hủy bỏ</CButton>
          </CModalFooter>
        </CModal>
      </CRow>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orders.orders,
    loading: state.common.loading,
  }
}

const mapDispatchToProps = dispatch => ({
  getOrders: (params) => dispatch(actions.getOrders(params)),
  updateOrder: (order, cb) => dispatch(actions.updateOrder(order, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders)
