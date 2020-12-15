import React from 'react';


const ChonDoitac = React.lazy(() => import('./views/Hopdong/chonDoitac'));
const Hopdong = React.lazy(() => import('./views/Hopdong/hopdong'));
const ChonTrandau = React.lazy(() => import('./views/Hopdong/chonTrandau'))

const routes = [
  { path: '/', exact: true, name: 'Trang chủ' },
  { path: '/chon-doitac', name: 'Chọn đối tác', component: ChonDoitac},
  { path: '/hopdong', name: 'Hợp đồng', component: Hopdong},
  { path: '/chon-trandau', name: "Chọn trận đấu", component: ChonTrandau},

];

export default routes;
