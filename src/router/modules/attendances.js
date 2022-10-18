import Layout from '@/layout'

export default {
  path: '/attendances',

  component: Layout,
  meat: {
    id: 'attendances'
  },
  children: [
    {
      path: '',
      name: 'attendances',
      component: () => import('@/views/attendances'),
      meta: {
        title: '考勤',
        icon: 'skill'
      }
    }
  ]
}
