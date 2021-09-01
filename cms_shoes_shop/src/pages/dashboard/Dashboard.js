import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader,
  CCol,
  CRow,
  CWidgetProgressIcon,
} from '@coreui/react'
import {
  CChartLine,
} from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import DatePicker from 'react-date-picker';
import moment from 'moment'
import _ from 'lodash'
import { toast } from 'react-toastify';
import ReactTable from 'react-table-v6'

import * as actions from '../../actions';
import * as networks from '../../networks';

class Dashboard extends Component {
  state = {
    dashboardInfo: {
      totalCusomer: 0,
      totalProduct: 0,
      totalOrder: 0,
      totalPendingOrder: 0,
    },
    columns: [
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
        Header: 'Số lượng tồn kho',
        accessor: 'totalInventory',
        filterable: false,
        sortable: true,
      },
    ],
    totalOrders: [],
    totalIncomes: [],
    inventory: {
      data: [],
      page: 0,
      total: 0,
      perPage: 0,
    },
    params: {
      totalOrders: {
        start_date: moment().startOf('date').add(-7, 'day').valueOf(),
        end_date: moment().endOf('date').valueOf(),
      },
      totalIncomes: {
        start_date: moment().startOf('date').add(-7, 'day').valueOf(),
        end_date: moment().endOf('date').valueOf(),
      },
    }
  }

  async componentDidMount() {
    try {
      const dashboardInfo = await networks.getDashboardInfos();
      if (dashboardInfo.data && dashboardInfo.data.data) {
        this.setState({ dashboardInfo: dashboardInfo.data.data });
      }

      const totalOrderResponse = await networks.getTotalOrder();
      const totalIncomeResponse = await networks.getTotalIncome();
      const inventoryResponse = await networks.getInventory();

      this.setState({
        totalOrders: totalOrderResponse.data && totalOrderResponse.data.data || [],
        totalIncomes: totalIncomeResponse.data && totalIncomeResponse.data.data || [],
        inventory: inventoryResponse.data && inventoryResponse.data.data || {
          data: [],
          page: 0,
          total: 0,
          perPage: 0,
        },
      });
    } catch (error) {

    }
  }

  handleChange = async (key, value) => {
    const { params } = this.state;

    const newParams = { ...params };
    _.set(newParams, key, value);

    if (key == 'totalOrders.start_date') {
      if (moment(value).valueOf() > moment(params.totalOrders.end_date).valueOf()) {
        return toast.error('Giá trị không hợp lệ');
      }
      const totalOrderResponse = await networks.getTotalOrder({
        start_date: moment(value).valueOf(),
        end_date: moment(params.totalOrders.end_date).valueOf(),
      });

      if (totalOrderResponse.data && totalOrderResponse.data.data) {
        this.setState({
          totalOrders: totalOrderResponse.data && totalOrderResponse.data.data || [],
        });
      }
    } else if (key == 'totalOrders.end_date') {
      if (moment(value).valueOf() < moment(params.totalOrders.start_date).valueOf()) {
        return toast.error('Giá trị không hợp lệ');
      }
      const totalOrderResponse = await networks.getTotalOrder({
        start_date: moment(params.totalOrders.start_date).valueOf(),
        end_date: moment(value).valueOf(),
      });

      if (totalOrderResponse.data && totalOrderResponse.data.data) {
        this.setState({
          totalOrders: totalOrderResponse.data && totalOrderResponse.data.data || [],
        });
      }
    } else if (key == 'totalIncomes.start_date') {
      if (moment(value).valueOf() > moment(params.totalIncomes.end_date).valueOf()) {
        return toast.error('Giá trị không hợp lệ');
      }
      const totalIncomeResponse = await networks.getTotalIncome({
        start_date: moment(value).valueOf(),
        end_date: moment(params.totalIncomes.end_date).valueOf(),
      });

      if (totalIncomeResponse.data && totalIncomeResponse.data.data) {
        this.setState({
          totalIncomes: totalIncomeResponse.data && totalIncomeResponse.data.data || [],
        });
      }
    } else if (key == 'totalIncomes.end_date') {
      if (moment(value).valueOf() < moment(params.totalIncomes.start_date).valueOf()) {
        return toast.error('Giá trị không hợp lệ');
      }
      const totalIncomeResponse = await networks.getTotalIncome({
        start_date: moment(params.totalIncomes.start_date).valueOf(),
        end_date: moment(value).valueOf(),
      });

      if (totalIncomeResponse.data && totalIncomeResponse.data.data) {
        this.setState({
          totalIncomes: totalIncomeResponse.data && totalIncomeResponse.data.data || [],
        });
      }
    }

    this.setState({
      params: newParams
    });
  }

  fetchData = async (state, instance) => {
    const inventoryResponse = await networks.getInventory({
      page: state.page + 1,
      perPage: state.pageSize,
      sorted: state.sorted,
      filtered: state.filtered,
    });

    if (inventoryResponse.data && inventoryResponse.data.data) {
      this.setState({
        inventory: inventoryResponse.data && inventoryResponse.data.data || {
          data: [],
          page: 0,
          total: 0,
          perPage: 0,
        },
      })
    }
  }

  render() {
    const { loading } = this.props;
    const { columns, totalIncomes, totalOrders, inventory, params, } = this.state;
    const { totalCusomer, totalOrder, totalPendingOrder, totalProduct } = this.state.dashboardInfo;

    return (
      <>

        <CCardGroup className="mb-4">
          <CWidgetProgressIcon
            header={`${totalCusomer}`}
            text="Khách hàng"
            color="gradient-info"
            value={100}
            inverse
          >
            <CIcon name="cil-people" height="36" />
          </CWidgetProgressIcon>
          <CWidgetProgressIcon
            header={`${totalProduct}`}
            text="Sản phẩm"
            color="gradient-warning"
            value={100}
            inverse
          >
            <CIcon name="cil-basket" height="36" />
          </CWidgetProgressIcon>
          <CWidgetProgressIcon
            header={`${totalOrder}`}
            text="Đơn hàng"
            color="gradient-primary"
            value={100}
            inverse
          >
            <CIcon name="cil-chartPie" height="36" />
          </CWidgetProgressIcon>
          <CWidgetProgressIcon
            header={`${totalPendingOrder}`}
            text="Đơn hàng chờ xử lý"
            color="gradient-danger"
            value={100}
            inverse
          >
            <CIcon name="cil-speedometer" height="36" />
          </CWidgetProgressIcon>
        </CCardGroup>
        <CRow>
          <CCol xs="12"><CCardGroup columns className="cols-2" >
            <CCard>
              <CCardHeader>
                Số lượng đơn hàng
              </CCardHeader>
              <CCardBody>
                <div className="mb-3">
                  Từ ngày <DatePicker
                    className="date-picker-border"
                    format="dd/MM/yyyy"
                    locale="vi-VN"
                    required
                    name="start_date"
                    value={new Date(params.totalOrders.start_date)}
                    onChange={(date) => this.handleChange('totalOrders.start_date', date)}
                    clearIcon={null}
                  /> đến ngày <DatePicker
                    className="date-picker-border"
                    format="dd/MM/yyyy"
                    locale="vi-VN"
                    required
                    value={new Date(params.totalOrders.end_date)}
                    onChange={(date) => this.handleChange('totalOrders.end_date', date)}
                    clearIcon={null}
                  />
                </div>
                <CChartLine
                  datasets={[
                    {
                      label: 'Tổng số đơn hàng',
                      borderColor: 'rgb(228,102,81,0.9)',
                      backgroundColor: 'rgb(228,102,81,0.9)',
                      fill: false,
                      data: totalOrders.map(order => order[Object.keys(order)[0]])
                    },
                  ]}
                  options={{
                    tooltips: {
                      enabled: true
                    },
                    scales: {
                      yAxes: [{
                        ticks: {
                          reverse: false,
                          stepSize: 1,
                          beginAtZero: true
                        },
                      }]
                    }
                  }}
                  labels={totalOrders.map(order => moment(Number(Object.keys(order)[0])).format('DD/MM/YYYY'))}
                />
              </CCardBody>
            </CCard>

            <CCard>
              <CCardHeader>
                Doanh thu
              </CCardHeader>
              <CCardBody>
                <div className="mb-3">
                  Từ ngày <DatePicker
                    className="date-picker-border"
                    format="dd/MM/yyyy"
                    locale="vi-VN"
                    required
                    name="start_date"
                    value={new Date(params.totalIncomes.start_date)}
                    onChange={(date) => this.handleChange('totalIncomes.start_date', date)}
                    clearIcon={null}
                  /> đến ngày <DatePicker
                    className="date-picker-border"
                    format="dd/MM/yyyy"
                    locale="vi-VN"
                    required
                    value={new Date(params.totalIncomes.end_date)}
                    onChange={(date) => this.handleChange('totalIncomes.end_date', date)}
                    clearIcon={null}
                  />
                </div>
                <CChartLine
                  datasets={[
                    {
                      label: 'Tổng doanh thu',
                      borderColor: 'rgb(0,216,255,0.9)',
                      backgroundColor: 'rgb(0,216,255,0.9)',
                      fill: false,
                      data: totalIncomes.map(income => income[Object.keys(income)[0]])
                    },
                  ]}
                  options={{
                    tooltips: {
                      enabled: true
                    },
                    scales: {
                      yAxes: [{
                        ticks: {
                          reverse: false,
                          stepSize: 1,
                          beginAtZero: true
                        },
                      }]
                    }
                  }}
                  labels={totalIncomes.map(income => moment(Number(Object.keys(income)[0])).format('DD/MM/YYYY'))}
                />
              </CCardBody>
            </CCard>
          </CCardGroup>
          </CCol>
          <CCol xs="12">
            <CCard>
              <CCardHeader>
                Số lượng sản phẩm tồn kho
              </CCardHeader>
              <CCardBody>
                <ReactTable
                  data={inventory.data}
                  columns={columns}
                  onFetchData={this.fetchData}
                  loading={loading}
                  defaultPageSize={10}
                  manual
                  pages={Math.ceil(inventory.total / inventory.perPage)}
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.common.loading,
  }
}

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
