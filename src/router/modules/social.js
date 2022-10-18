import Layout from '@/layout'

export default {
  path: '/social_securitys',

  component: Layout,
  meat: {
    id: 'social_securitys'
  },
  children: [
    {
      path: '',
      name: 'social_securitys',
      component: () => import('@/views/social'),
      meta: {
        title: '社保',
        icon: 'table'
      }
    }
  ]
}
