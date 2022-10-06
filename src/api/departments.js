import request from '@/utils/request'

/**
 * 获取组织架构数据
 **/
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}

/**
 * 编辑部门
 *
 * ***/
export function updateDepartments(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}

export function delDepartments(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}
