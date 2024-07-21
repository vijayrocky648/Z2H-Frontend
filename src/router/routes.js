const initialPath = '/admin'

const routes = [
  // New Page Paths
  {
    path: `${initialPath}/main`,
    name: "main",
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: `${initialPath}/settings`,
        name: "settings",
        component: () => import('src/pages/SettingsPage.vue'),
        children: [
          {
            path: `${initialPath}/user-settings`,
            name: "user-settings",
            component: () => import("src/components/tabs/UserSettingsTab.vue")
          },
          {
            path: `${initialPath}/customer-settings`,
            name: "customer-settings",
            component: () => import("src/components/tabs/DistiributorSettingsTab.vue")
          },
        ]
      },
      {
        path: `${initialPath}/users`,
        name: "users",
        component: () => import("src/pages/UsersPage.vue")
      },
      {
        path: `${initialPath}/customers`,
        name: "customers",
        component: () => import("src/pages/CustomersPage.vue")
      },
      {
        path: `${initialPath}/registration-payments`,
        name: "registrationPayments",
        component: () => import("src/pages/OrdersPage.vue")
      },
      {
        path: `${initialPath}/products`,
        name: "products",
        component: () => import("src/pages/ProductsPage.vue")
      },
      {
        path: `${initialPath}/commissions`,
        name: "commissions",
        component: () => import("src/pages/CommissionsPage.vue")
      },
      {
        path: `${initialPath}/sales`,
        name: "sales",
        component: () => import("src/pages/SalesReportsPage.vue")
      },
      {
        path: `${initialPath}/no-downline`,
        name: "noDownline",
        component: () => import("src/pages/NoDownlineReportsPage.vue")
      },
      {
        path: `${initialPath}/commission-reports`,
        name: "commissionReports",
        component: () => import("src/pages/CommissionsReportsPage.vue")
      }
    ]
  },
  {
    path: `${initialPath}/sign-in`,
    component: () => import('pages/LoginPage.vue'),
    name: "sign-in"
  },

]

export default routes
