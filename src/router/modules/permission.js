import Layout from '@/layout'

export default {
  path: '/permissions',

  component: Layout,
  meat: {
    id: 'permission'
  },
  children: [
    {
      path: '',
      name: 'permission',
      component: () => import('@/views/permission'),
      meta: {
        title: '权限管理',
        icon: 'lock'
      }
    }
  ]
}
