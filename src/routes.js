import React from 'react';

const ConfirmSchedule = React.lazy(() => import('./views/ServiceManagement/ConfirmSchedule'));
const ListService = React.lazy(() => import('./views/Services/ListService'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Trang chủ' },
  { path: '/confirm-schedule', exact: true, name: 'Danh sách lịch đang chờ', component: ConfirmSchedule },
  { path: '/list-service', exact: true, name: 'Danh sách danh mục dịch vụ', component: ListService },
];

export default routes;
