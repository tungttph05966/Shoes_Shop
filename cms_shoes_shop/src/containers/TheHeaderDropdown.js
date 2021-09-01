import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import {
  SIGN_OUT,
  TOGGLE_SIDEBAR,
} from '../actions/actionTypes';

const TheHeaderDropdown = () => {
  const dispatch = useDispatch()
  const userInfo = useSelector(state => state.auth.userInfo)

  const logout = () => {
    dispatch({type: SIGN_OUT})
  }

  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link flex-row align-items-center" caret={false}>
        <div className="c-avatar" style={{ border: '1px solid #cecece' }}>
          <CImg
            src={`https://avatars.dicebear.com/api/identicon/${userInfo.id}.svg`}
            className="c-avatar-img"
            alt=""
          />
        </div>
        <span className="username ml-2">{userInfo.fullname || userInfo.username}</span>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        {/* <CDropdownItem>
          <CIcon name="cil-user" className="mfe-2" />Thông tin cá nhân
        </CDropdownItem> */}
        {/* <CDropdownItem>
          <CIcon name="cil-settings" className="mfe-2" />
          Settings
        </CDropdownItem> */}
        <CDropdownItem divider />
        <CDropdownItem onClick={logout}>
          <CIcon name={'cil-account-logout'} className="mfe-2" />
          Đăng xuất
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
