export default {
  items: [
    {
      title: true,
      name: 'Quản lý dịch vụ',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Quản lý lịch đặt',
      url: '/',
      icon: 'fa fa-pencil-square fa-lg',
      children: [
        {
          name: 'Lịch đang chờ',
          url: '/await-schedule',
          icon: '',
        },
        {
          name: 'Đã xác nhận',
          url: '/confirm-schedule',
          icon: '',
        },
        {
          name: 'Đang đóng gói',
          url: '/packing-schedule',
          icon: '',
        },
        {
          name: 'Đang được giao',
          url: '/shipping-schedule',
          icon: '',
        },
        {
          name: 'Đã giao hàng',
          url: '/received-schedule',
          icon: '',
        },
        {
          name: 'Yêu cầu hủy',
          url: '/cancel-schedule',
          icon: '',
        },
      ],
    },
    {
      name: 'Danh mục dịch vụ',
      url: '/list-service',
      icon: 'fa fa-cc-amex fa-lg',
      children: [
        {
          name: 'Danh mục sản phẩm',
          url: '/list-categorys',
          icon: '',
        },
        {
          name: 'Danh sách sản phẩm',
          url: '/list-products',
          icon: '',
        },
      ]
    },
  ],
};
