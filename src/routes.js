import React from 'react';

const WaitSchedule = React.lazy(() => import('./views/ServiceManagement/waitSchedule'));
const ConfirmSchedule = React.lazy(() => import('./views/ServiceManagement/confirmSchedule'));
const PackingSchedule = React.lazy(() => import('./views/ServiceManagement/packingSchedule'));
const ShippingSchedule = React.lazy(() => import('./views/ServiceManagement/shippingSchedule'));
const ReceivedSchedule = React.lazy(() => import('./views/ServiceManagement/receivedSchedule'));
const CancelSchedule = React.lazy(() => import('./views/ServiceManagement/cancelSchedule'));
const ListCategory = React.lazy(() => import('./views/Category/category'));
const FlowerProduct = React.lazy(() => import('./views/Category/flowerProduts'));
const ScheduleDetail = React.lazy(() => import('./views/ServiceManagement/scheduleDetail'));
const CategoryDetail = React.lazy(() => import('./views/Category/categoryDetail'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Trang chủ' },
  { path: '/wait-schedule', exact: true, name: 'Danh sách lịch đang chờ', component: WaitSchedule },
  { path: '/confirm-schedule', exact: true, name: 'Danh sách đặt thành công', component: ConfirmSchedule },
  { path: '/packing-schedule', exact: true, name: 'Danh sách đóng gói', component: PackingSchedule },
  { path: '/shipping-schedule', exact: true, name: 'Danh sách đang được vận chuyển', component: ShippingSchedule },
  { path: '/received-schedule', exact: true, name: 'Danh sách đã được giao', component: ReceivedSchedule },
  { path: '/cancel-schedule', exact: true, name: 'Danh sách yêu cầu hủy', component: CancelSchedule },
  { path: '/list-categorys', exact: true, name: 'Danh sách danh mục', component: ListCategory},
  { path: '/list-flower-products', exact: true, name: 'Danh sách sản phẩm', component: FlowerProduct},
  { path: '/orderbill/:id', name: 'Chi tiết đơn hàng', component: ScheduleDetail },
  { path: '/category/find-by-id/:id', name: 'Chi tiết danh mục', component: CategoryDetail },

  // /list-products
  
  // { path: '/list-service', exact: true, name: 'Danh sách danh mục dịch vụ', component: ListService },
];

export default routes;
