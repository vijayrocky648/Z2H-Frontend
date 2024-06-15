const routes = [
  // New Page Paths
  {
    path: '/main',
    name: "main",
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: "/settings",
        name: "settings",
        component: () => import('src/pages/SettingsPage.vue'),
        children: [
          {
            path: "/user-settings",
            name: "user-settings",
            component: () => import("src/components/tabs/UserSettingsTab.vue")
          },
          {
            path: "/customer-settings",
            name: "customer-settings",
            component: () => import("src/components/tabs/DistiributorSettingsTab.vue")
          },
        ]
      },
      {
        path: "/users",
        name: "users",
        component: () => import("src/pages/UsersPage.vue")
      },
      {
        path: "/customers",
        name: "customers",
        component: () => import("src/pages/CustomersPage.vue")
      },
      {
        path: "/registration-payments",
        name: "registrationPayments",
        component: () => import("src/pages/OrdersPage.vue")
      },
      {
        path: "/products",
        name: "products",
        component: () => import("src/pages/ProductsPage.vue")
      },
      {
        path: "/commissions",
        name: "commissions",
        component: () => import("src/pages/CommissionsPage.vue")
      },
    ]
  },
  {
    path: '/sign-in',
    component: () => import('pages/LoginPage.vue'),
    name: "sign-in"
  },

]

export default routes
