import Layout from '@/layout'

export default {
  path: '/departments',

  component: Layout,
  meat: {
    id: 'departments'
  },
  children: [
    {
      path: '',
      name: 'departments',
      component: () => import('@/views/departments'),
      meta: {
        title: '组织结构',
        icon: 'tree'
      }
    }
  ]
}
