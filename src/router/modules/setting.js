import Layout from '@/layout'

export default {
  path: '/settings',

  component: Layout,
  meat: {
    id: 'settings'
  },
  children: [
    {
      path: '',
      name: 'setting',
      component: () => import('@/views/setting'),
      meta: {
        title: '公司设置',
        icon: 'setting'
      }
    }
  ]
}
