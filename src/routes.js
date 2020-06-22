import React from 'react';

const WaitSchedule = React.lazy(() => import('./views/ServiceManagement/waitSchedule'));
const ConfirmSchedule = React.lazy(() => import('./views/ServiceManagement/confirmSchedule'));
const PackingSchedule = React.lazy(() => import('./views/ServiceManagement/packingSchedule'));
const ShippingSchedule = React.lazy(() => import('./views/ServiceManagement/shippingSchedule'));
const ReceivedSchedule = React.lazy(() => import('./views/ServiceManagement/receivedSchedule'));
const CancelSchedule = React.lazy(() => import('./views/ServiceManagement/cancelSchedule'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Trang chủ' },
  { path: '/wait-schedule', exact: true, name: 'Danh sách lịch đang chờ', component: WaitSchedule },
  { path: '/confirm-schedule', exact: true, name: 'Danh sách đặt thành công', component: ConfirmSchedule },
  { path: '/packing-schedule', exact: true, name: 'Danh sách lịch đang chờ', component: PackingSchedule },
  { path: '/shipping-schedule', exact: true, name: 'Danh sách đặt thành công', component: ShippingSchedule },
  { path: '/received-schedule', exact: true, name: 'Danh sách lịch đang chờ', component: ReceivedSchedule },
  { path: '/cancel-schedule', exact: true, name: 'Danh sách đặt thành công', component: CancelSchedule },

  // { path: '/list-service', exact: true, name: 'Danh sách danh mục dịch vụ', component: ListService },
];

export default routes;
