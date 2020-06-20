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
          url: '/confirm-schedule',
          icon: '',
        }
      ],
    },
    {
      name: 'Danh mục dịch vụ',
      url: '/list-service',
      icon: 'fa fa-cc-amex fa-lg',
    },
  ],
};
