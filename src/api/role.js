import request from '@/utils/request'

export const getRoles = () => {
  return request({
    url: '/sys/role'
  })
}

export const getRolesInfo = (id) => {
  return request({
    url: '/sys/role/' + id
  })
}

export const setRolesPermission = (data) => {
  return request({
    url: '/sys/role/assignPrem',
    method: 'PUT',
    data
  })
}
