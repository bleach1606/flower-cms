import React from 'react';


const ChonDoitac = React.lazy(() => import('./views/Hopdong/chonDoitac'));
const Hopdong = React.lazy(() => import('./views/Hopdong/hopdong'));

const routes = [
  { path: '/', exact: true, name: 'Trang chủ' },
  { path: '/chon-doitac', name: 'Chọn đối tác', component: ChonDoitac},
  { path: '/hopdong', name: 'Hợp đồng', component: Hopdong},

];

export default routes;
