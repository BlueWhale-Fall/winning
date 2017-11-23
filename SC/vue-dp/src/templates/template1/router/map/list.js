let List = resolve => require(['@/templates/template1/views/list/ListHome.vue'], resolve);
export default [
  {
    name: 'list',
    path: '/index',
    component: List
  }
]
