<template>
  <q-page padding>
    <q-card>
      <img src="https://cdn.quasar.dev/img/mountains.jpg">
      <q-card-section>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-subtitle2">by John Doe</div>
      </q-card-section>
      <q-card-section>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      sales_data: 'day',
      seals_earning: {
        seals: [],
        earning: []
      },
      users: {
        columns: [
          { name: 'avatar', align: 'left', style: 'width:50px' },
          { name: 'user', align: 'left', label: 'User' },
          { name: 'activity', align: 'left', label: 'Activity' }
        ],
        data: [
          {
            user: {
              name: 'Depok Sarkar',
              type: 'Recurring',
              join_at: 'Jan 1, 2015',
              status: 'online',
              avatar: ''
            },
            activity: {
              login_at: '1 minutes ago'
            }
          },
          {
            user: {
              name: 'Shail',
              type: 'New',
              join_at: 'Jan 1, 2015',
              status: 'offline',
              avatar: ''
            },
            activity: {
              login_at: '5 minutes ago'
            }
          },
          {
            user: {
              name: 'Rashed Hossain',
              type: 'Recurring',
              join_at: 'Jan 1, 2015',
              status: 'online',
              avatar: ''
            },
            activity: {
              login_at: '5 minutes ago'
            }
          },
          {
            user: {
              name: 'Shail',
              type: 'New',
              join_at: 'Jan 1, 2015',
              status: 'offline',
              avatar: ''
            },
            activity: {
              login_at: '5 minutes ago'
            }
          },
          {
            user: {
              name: 'Rashed Hossain',
              type: 'Recurring',
              join_at: 'Jan 1, 2015',
              status: 'online',
              avatar: ''
            },
            activity: {
              login_at: '5 minutes ago'
            }
          },
          {
            user: {
              name: 'Tilar Smith',
              type: 'New',
              join_at: 'Jan 1, 2015',
              status: 'offline',
              avatar: ''
            },
            activity: {
              login_at: '5 minutes ago'
            }
          }
        ]
      },
      status: [
        {
          title: 'Monday',
          new_user: 0.4,
          recurring: 0.8
        },
        {
          title: 'Tuesday',
          new_user: 0.4,
          recurring: 0.8
        },
        {
          title: 'Wednesday',
          new_user: 0.4,
          recurring: 0.8
        },
        {
          title: 'Thursday',
          new_user: 0.4,
          recurring: 0.8
        },
        {
          title: 'Friday',
          new_user: 0.4,
          recurring: 0.8
        },
        {
          title: 'Saturday',
          new_user: 0.4,
          recurring: 0.8
        },
        {
          title: 'Sunday',
          new_user: 0.4,
          recurring: 0.8
        }
      ],
      earning: {
        title: '$95,542',
        subtitle: 'Total earnings',
        menus: [
          {
            name: 'Remove Card',
            route: ''
          },
          {
            name: 'Send Feedback',
            route: ''
          },
          {
            name: 'Share',
            route: ''
          }
        ],
        chart_label: 'Earning',
        data_points: [10, 22, 34, 46, 58, 70, 46, 23, 45, 78, 34, 12],
        color: 'warning'
      },
      customers: {
        title: '452',
        subtitle: 'Total earnings',
        menus: [
          {
            name: 'Remove Card',
            route: ''
          },
          {
            name: 'Send Feedback',
            route: ''
          },
          {
            name: 'Share',
            route: ''
          }
        ],
        chart_type: 'bar',
        chart_label: 'Customers',
        data_points: [10, 22, 34, 46, 58, 70, 46, 23, 45, 78, 34, 12],
        color: 'negative'
      },
      products: {
        title: '85,462',
        subtitle: 'Total products',
        menus: [
          {
            name: 'Remove Card',
            route: ''
          },
          {
            name: 'Send Feedback',
            route: ''
          },
          {
            name: 'Share',
            route: ''
          }
        ],
        chart_label: 'Products',
        data_points: [10, 22, 34, 46, 58, 70, 46, 23, 45, 78, 34, 12],
        color: 'info'
      },
      orders: {
        title: '85,462',
        subtitle: 'Total orders',
        menus: [
          {
            name: 'Remove Card',
            route: ''
          },
          {
            name: 'Send Feedback',
            route: ''
          },
          {
            name: 'Share',
            route: ''
          }
        ],
        chart_label: 'Orders',
        data_points: [10, 22, 34, 46, 58, 70, 46, 23, 45, 78, 34, 12],
        color: 'positive'
      },
      popular_products: {
        columns: [
          { name: 'thumbnail', align: 'left', label: 'Thumbnail', style: 'width:60px' },
          { name: 'name', align: 'left', label: 'Name', style: 'width:200px; white-space: normal;' },
          { name: 'category', align: 'left', label: 'Category' },
          { name: 'price', align: 'left', label: 'Price' },
          { name: 'actions', align: 'right' }
        ],
        actions: {
          view: true
        },
        data: [
          {
            id: 1,
            thumbnail: 'images/themes.png',
            name: 'License key title will be here according to your wish 1',
            category: [
              {
                id: 1,
                name: 'Sport & Outdoor',
                slug: 'slug'
              }
            ],
            price: '$15.00'
          },
          {
            id: 2,
            thumbnail: 'images/themes.png',
            name: 'License key title will be here according to your wish 1',
            category: [
              {
                id: 1,
                name: 'Sport & Outdoor',
                slug: 'slug'
              }
            ],
            price: '$15.00'
          },
          {
            id: 3,
            thumbnail: 'images/themes.png',
            name: 'License key title will be here according to your wish 1',
            category: [
              {
                id: 1,
                name: 'Sport & Outdoor',
                slug: 'slug'
              }
            ],
            price: '$15.00'
          },
          {
            id: 4,
            thumbnail: 'images/themes.png',
            name: 'License key title will be here according to your wish 1',
            category: [
              {
                id: 1,
                name: 'Sport & Outdoor',
                slug: 'slug'
              }
            ],
            price: '$15.00'
          },
          {
            id: 5,
            thumbnail: 'images/themes.png',
            name: 'License key title will be here according to your wish 1',
            category: [
              {
                id: 1,
                name: 'Sport & Outdoor',
                slug: 'slug'
              },
              {
                id: 1,
                name: 'HTML',
                slug: 'slug'
              }
            ],
            price: '$15.00'
          }
        ]
      },
      recent_orders: {
        columns: [
          { name: 'order_number', align: 'left', label: 'Order Number' },
          { name: 'created_at', align: 'left', label: 'Date' },
          { name: 'amount', align: 'left', label: 'Amount' },
          { name: 'actions', align: 'right' }
        ],
        actions: {
          view: true,
          edit: false,
          delete: false
        },
        data: [
          {
            id: 1,
            order_number: 'KGOI455-4582',
            created_at: '15 Sep 2020',
            amount: '$15.00'
          },
          {
            id: 2,
            order_number: 'KGOI455-4582',
            created_at: '15 Sep 2020',
            amount: '$15.00'
          },
          {
            id: 3,
            order_number: 'KGOI455-7546',
            created_at: '15 Sep 2020',
            amount: '$15.00'
          },
          {
            id: 4,
            order_number: 'KGOI455-7821',
            created_at: '15 Sep 2020',
            amount: '$15.00'
          },
          {
            id: 5,
            order_number: 'KGOI455-4524',
            created_at: '15 Sep 2020',
            amount: '$15.00'
          },
          {
            id: 6,
            order_number: 'KGOI455-4524',
            created_at: '15 Sep 2020',
            amount: '$15.00'
          },
          {
            id: 7,
            order_number: 'KGOI455-4524',
            created_at: '15 Sep 2020',
            amount: '$15.00'
          },
          {
            id: 8,
            order_number: 'KGOI455-4524',
            created_at: '15 Sep 2020',
            amount: '$15.00'
          }
        ]
      }
    }
  },
  methods: {
    getSeals () {
      this.seals_earning.seals = this.$core.data(50, 200, 27)
      this.seals_earning.earning = this.$core.data(30, 450, 27)
    }
  },
  watch: {
    sales_data: function (value) {
      this.getSeals()
    }
  },
  mounted () {
    if (this.$route.params.denyed) {
      this.$core.error('You haven\'t permission to access this page.')
    }
    this.getSeals()
  }
}
</script>
