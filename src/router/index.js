import { createRouter, createWebHistory } from 'vue-router';
const Layout = () => import("@/layout/index.vue")

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue'),
  },
  {
    path: "/",
    component: Layout,
    redirect: "/workbench",
    children: [
      {
        path: "workbench",
        component: () => import("@/views/workbench/index.vue"),
        name: "Workbench",
        meta: {
          title: "工作台",
          svgIcon: "workbench",
          affix: true
        }
      }
    ]
  },

  {
    path: '/screen',
    component: Layout,
    redirect: '/screen',
    children: [{
      path: 'screen',
      name: 'Screen',
      component: () => import('@/views/screen/index.vue'),
      meta: { title: 'Screen', svgIcon: 'screen' }
    }]
  },

  {
    path: "/system",
    component: Layout,
    redirect: "/system/user",
    name: "System",
    meta: {
      title: "系统管理",
      svgIcon: "setting"
    },
    children: [
      {
        path: "user",
        component: () => import("@/views/system/user/index.vue"),
        name: "User",
        meta: {
          title: "用户管理",
          svgIcon: ""
        }
      },

      {
        path: "role",
        component: () => import("@/views/system/role/index.vue"),
        name: "Role",
        meta: {
          title: "角色管理",
          svgIcon: ""
        }
      },
      {
        path: "roleLink",
        component: () => import("@/views/system/role/roleLink.vue"),
        name: "RoleLink",
        meta: {
          title: "角色链接",
          svgIcon: "",
          hidden: true,
          activeMenu: '/system/role'
        }
      },
      {
        path: "menu",
        component: () => import("@/views/system/menu/index.vue"),
        name: "Menu",
        meta: {
          title: "菜单设置",
          svgIcon: "",
        }
      },
      
    ],
    
  },
  {
    path: "/strip",
    component: Layout,
    redirect: "/strip/log",
    name: "Strip",
    meta: {
      title: "进程单管理",
      svgIcon: "飞机"
    },
    children: [
      {
        path: "log",
        component: () => import("@/views/strip/log/index.vue"),
        name: "Log",
        meta: {
          title: "历史记录",
          svgIcon: ""
        }
      },
      {
        path: "plan",
        component: () => import("@/views/strip/plan/index.vue"),
        name: "Plan",
        meta: {
          title: "后续计划",
          svgIcon: ""
        }
      },
      {
        path: "statistics",
        component: () => import("@/views/strip/statistics/index.vue"),
        name: "Statistics",
        meta: {
          title: "统计分析",
          svgIcon: ""
        }
      },
      
    ]
  },
  {
    path: "/403",
    component: () => import("@/views/error/403.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/404",
    component: () => import("@/views/error/404.vue"),
    meta: {
      hidden: true
    },
    alias: "/:pathMatch(.*)*"
  },
];

export const asyncRoutes = []

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: constantRoutes,
});

export function resetRouter() {
  // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      if (name && meta.roles?.length) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch (error) {
    // 强制刷新浏览器也行，只是交互体验不是很好
    window.location.reload()
  }
}

export default router;
