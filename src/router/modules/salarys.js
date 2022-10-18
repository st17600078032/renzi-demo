import Layout from '@/layout'

export default {
  path: '/salarys',

  component: Layout,
  meat: {
    id: 'salarys'
  },
  children: [
    {
      path: '',
      name: 'salarys',
      component: () => import('@/views/salarys'),
      meta: {
        title: '工资',
        icon: 'money'
      }
    }
  ]
}
