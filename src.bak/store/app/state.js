const user = JSON.parse(localStorage.getItem('currentUser'))
console.log(user)

export default function () {
  return {
    user: user || {},
    authenticated: user !== '',
    menus: [
      {
        name: 'WordPress Themes',
        href: '/themes'
      },
      {
        name: 'Jekyll Themes',
        href: '/themes'
      },
      {
        name: 'HTML Themes',
        href: '/themes'
      },
      {
        name: 'Support',
        href: '/contact'
      },
      {
        name: 'About Us',
        href: '/common'
      }
    ],
    products: [
      {
        id: 1,
        name: 'Automatic Updates #1',
        desc: 'With just one click of a button, you can update the theme that powers your website.',
        thumbnail: 'images/themes.png',
        category: 'HTML',
        cat_slug: 'html',
        price_only: '28',
        price: '$28.00',
        active: true
      },
      {
        id: 2,
        name: 'Automatic Updates #2',
        desc: 'With just one click of a button, you can update the theme that powers your website.',
        thumbnail: 'images/themes.png',
        category: 'HTML',
        cat_slug: 'html',
        price_only: '28',
        price: '$28.00',
        active: true
      },
      {
        id: 3,
        name: 'Automatic Updates',
        desc: 'With just one click of a button, you can update the theme that powers your website.',
        thumbnail: 'images/themes.png',
        category: 'HTML',
        cat_slug: 'html',
        price_only: '28',
        price: '$28.00',
        active: true
      },
      {
        id: 4,
        name: 'Automatic Updates',
        desc: 'With just one click of a button, you can update the theme that powers your website.',
        thumbnail: 'images/themes.png',
        category: 'Wordpress',
        cat_slug: 'wordpress',
        price_only: '28',
        price: '$28.00',
        active: true
      },
      {
        id: 5,
        name: 'Automatic Updates',
        desc: 'With just one click of a button, you can update the theme that powers your website.',
        thumbnail: 'images/themes.png',
        category: 'Wordpress',
        cat_slug: 'wordpress',
        price_only: '28',
        price: '$28.00',
        active: true
      },
      {
        id: 6,
        name: 'Automatic Updates',
        desc: 'With just one click of a button, you can update the theme that powers your website.',
        thumbnail: 'images/themes.png',
        category: 'Wordpress',
        cat_slug: 'wordpress',
        price_only: '28',
        price: '$28.00',
        active: true
      },
      {
        id: 7,
        name: 'Automatic Updates',
        desc: 'With just one click of a button, you can update the theme that powers your website.',
        thumbnail: 'images/themes.png',
        category: 'UI Kits',
        cat_slug: 'ui-kits',
        price_only: '28',
        price: '$28.00',
        active: true
      },
      {
        id: 8,
        name: 'Automatic Updates',
        desc: 'With just one click of a button, you can update the theme that powers your website.',
        thumbnail: 'images/themes.png',
        category: 'Ghost',
        cat_slug: 'ghost',
        price_only: '28',
        price: '$28.00',
        active: true
      },
      {
        id: 9,
        name: 'Automatic Updates',
        desc: 'With just one click of a button, you can update the theme that powers your website.',
        thumbnail: 'images/themes.png',
        category: 'Ghost',
        cat_slug: 'ghost',
        price_only: '28',
        price: '$28.00',
        active: true
      },
      {
        id: 10,
        name: 'Automatic Updates',
        desc: 'With just one click of a button, you can update the theme that powers your website.',
        thumbnail: 'images/themes.png',
        category: 'Ghost',
        cat_slug: 'ghost',
        price_only: '28',
        price: '$28.00',
        active: true
      },
      {
        id: 11,
        name: 'Automatic Updates',
        desc: 'With just one click of a button, you can update the theme that powers your website.',
        thumbnail: 'images/themes.png',
        category: 'Ghost',
        cat_slug: 'ghost',
        price_only: '28',
        price: '$28.00',
        active: true
      },
      {
        id: 1,
        name: 'Automatic Updates',
        desc: 'With just one click of a button, you can update the theme that powers your website.',
        thumbnail: 'images/themes.png',
        category: 'Jeklly',
        cat_slug: 'jekyll',
        price_only: '28',
        price: '$28.00',
        active: true
      },
      {
        id: 12,
        name: 'Automatic Updates',
        desc: 'With just one click of a button, you can update the theme that powers your website.',
        thumbnail: 'images/themes.png',
        category: 'Jeklly',
        cat_slug: 'jekyll',
        price_only: '28',
        price: '$28.00',
        active: true
      },
      {
        id: 13,
        name: 'Automatic Updates',
        desc: 'With just one click of a button, you can update the theme that powers your website.',
        thumbnail: 'images/themes.png',
        category: 'HTML',
        cat_slug: 'html',
        price_only: '28',
        price: '$28.00',
        active: true
      },
      {
        id: 14,
        name: 'Automatic Updates',
        desc: 'With just one click of a button, you can update the theme that powers your website.',
        thumbnail: 'images/themes.png',
        category: 'HTML',
        cat_slug: 'html',
        price_only: '28',
        price: '$28.00',
        active: true
      },
      {
        id: 16,
        name: 'Automatic Updates',
        desc: 'With just one click of a button, you can update the theme that powers your website.',
        thumbnail: 'images/themes.png',
        category: 'HTML',
        cat_slug: 'html',
        price_only: '28',
        price: '$28.00',
        active: true
      },
      {
        id: 17,
        name: 'Automatic Updates',
        desc: 'With just one click of a button, you can update the theme that powers your website.',
        thumbnail: 'images/themes.png',
        category: 'Wordpress',
        cat_slug: 'wordpress',
        price_only: '28',
        price: '$28.00',
        active: true
      },
      {
        id: 18,
        name: 'Automatic Updates',
        desc: 'With just one click of a button, you can update the theme that powers your website.',
        thumbnail: 'images/themes.png',
        category: 'Wordpress',
        cat_slug: 'wordpress',
        price_only: '28',
        price: '$28.00',
        active: true
      },
      {
        id: 19,
        name: 'Automatic Updates',
        desc: 'With just one click of a button, you can update the theme that powers your website.',
        thumbnail: 'images/themes.png',
        category: 'Wordpress',
        cat_slug: 'wordpress',
        price_only: '28',
        price: '$28.00',
        active: true
      },
      {
        id: 20,
        name: 'Automatic Updates',
        desc: 'With just one click of a button, you can update the theme that powers your website.',
        thumbnail: 'images/themes.png',
        category: 'UI Kits',
        cat_slug: 'ui-kits',
        price_only: '28',
        price: '$28.00',
        active: true
      },
      {
        id: 21,
        name: 'Automatic Updates',
        desc: 'With just one click of a button, you can update the theme that powers your website.',
        thumbnail: 'images/themes.png',
        category: 'Ghost',
        cat_slug: 'ghost',
        price_only: '28',
        price: '$28.00',
        active: true
      },
      {
        id: 22,
        name: 'Automatic Updates',
        desc: 'With just one click of a button, you can update the theme that powers your website.',
        thumbnail: 'images/themes.png',
        category: 'Ghost',
        cat_slug: 'ghost',
        price_only: '28',
        price: '$28.00',
        active: true
      },
      {
        id: 23,
        name: 'Automatic Updates',
        desc: 'With just one click of a button, you can update the theme that powers your website.',
        thumbnail: 'images/themes.png',
        category: 'Ghost',
        cat_slug: 'ghost',
        price_only: '28',
        price: '$28.00',
        active: true
      },
      {
        id: 24,
        name: 'Automatic Updates',
        desc: 'With just one click of a button, you can update the theme that powers your website.',
        thumbnail: 'images/themes.png',
        category: 'Ghost',
        cat_slug: 'ghost',
        price_only: '28',
        price: '$28.00',
        active: true
      },
      {
        id: 25,
        name: 'Automatic Updates',
        desc: 'With just one click of a button, you can update the theme that powers your website.',
        thumbnail: 'images/themes.png',
        category: 'Jeklly',
        cat_slug: 'jekyll',
        price_only: '28',
        price: '$28.00',
        active: true
      },
      {
        id: 26,
        name: 'Automatic Updates',
        desc: 'With just one click of a button, you can update the theme that powers your website.',
        thumbnail: 'images/themes.png',
        category: 'Jeklly',
        cat_slug: 'jekyll',
        price_only: '28',
        price: '$28.00',
        active: true
      }
    ],
    related_products: [
      {
        id: 1,
        name: 'Automatic Updates',
        desc: 'With just one click of a button, you can update the theme that powers your website.',
        thumbnail: 'images/themes.png',
        category: 'HTML',
        cat_slug: 'html',
        price_only: '28',
        price: '$28.00',
        active: true
      },
      {
        id: 2,
        name: 'Automatic Updates',
        desc: 'With just one click of a button, you can update the theme that powers your website.',
        thumbnail: 'images/themes.png',
        category: 'HTML',
        cat_slug: 'html',
        price_only: '28',
        price: '$28.00',
        active: true
      },
      {
        id: 3,
        name: 'Automatic Updates',
        desc: 'With just one click of a button, you can update the theme that powers your website.',
        thumbnail: 'images/themes.png',
        category: 'Jeklly',
        cat_slug: 'jekyll',
        price_only: '28',
        price: '$28.00',
        active: true
      }
    ],
    notifications: [
      {
        id: 1,
        user: {
          id: 1,
          name: 'Michael Smith',
          avatar: ''
        },
        content: '<span class="text-weight-bold">Michael Smith</span> create a support ticket #5425.',
        time: '1 minute ago',
        type: 'ticket_create'
      },
      {
        id: 2,
        user: {
          id: 1,
          name: 'Michael Smith',
          avatar: ''
        },
        content: '<span class="text-weight-bold">Michael Smith</span> request for disput #512.',
        time: '1 hours ago',
        type: 'disput'
      },
      {
        id: 3,
        user: {
          id: 1,
          name: 'Shail Smith',
          avatar: ''
        },
        content: '<span class="text-weight-bold">Shail Smith</span> added new product in wordpress theme.',
        time: '1 hours ago',
        type: 'add_product'
      },
      {
        id: 4,
        user: {
          id: 1,
          name: 'Shail Smith',
          avatar: ''
        },
        content: '<span class="text-weight-bold">Shail Smith</span> place an order #5451.',
        time: '1 hours ago',
        type: 'order'
      },
      {
        id: 5,
        user: {
          id: 1,
          name: 'Michael Smith',
          avatar: ''
        },
        content: '<span class="text-weight-bold">Michael Smith</span> reply on ticket #58524.',
        time: '1 hours ago',
        type: 'ticket_reply'
      }
    ],
    popularProducts: [
      {
        id: 1,
        name: 'Automatic Updates',
        desc: 'With just one click of a button, you can update the theme that powers your website.',
        thumbnail: 'images/themes.png',
        category: 'HTML',
        cat_slug: 'html',
        price_only: '28',
        price: '$28.00',
        active: true
      },
      {
        id: 2,
        name: 'Automatic Updates',
        desc: 'With just one click of a button, you can update the theme that powers your website.',
        thumbnail: 'images/themes.png',
        category: 'HTML',
        cat_slug: 'html',
        price_only: '28',
        price: '$28.00',
        active: true
      },
      {
        id: 3,
        name: 'Automatic Updates',
        desc: 'With just one click of a button, you can update the theme that powers your website.',
        thumbnail: 'images/themes.png',
        category: 'HTML',
        cat_slug: 'html',
        price_only: '28',
        price: '$28.00',
        active: true
      },
      {
        id: 4,
        name: 'Automatic Updates',
        desc: 'With just one click of a button, you can update the theme that powers your website.',
        thumbnail: 'images/themes.png',
        category: 'Wordpress',
        cat_slug: 'wordpress',
        price_only: '28',
        price: '$28.00',
        active: true
      },
      {
        id: 5,
        name: 'Automatic Updates',
        desc: 'With just one click of a button, you can update the theme that powers your website.',
        thumbnail: 'images/themes.png',
        category: 'Wordpress',
        cat_slug: 'wordpress',
        price_only: '28',
        price: '$28.00',
        active: true
      }
    ]
  }
}
