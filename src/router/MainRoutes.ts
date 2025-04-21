const MainRoutes = {
  path: '/main',
  meta: {
    requiresAuth: false
  },
  redirect: '/main/dashboard/default',
  component: () => import('@/layouts/full/FullLayout.vue'),
  children: [
    {
      name: 'LandingPage',
      path: '/',
      component: () => import('@/views/dashboards/default/DefaultDashboard.vue')
    },
    {
      name: 'Default',
      path: '/dashboard/default',
      component: () => import('@/views/dashboards/default/DefaultDashboard.vue')
    },
    {
      name: 'Starter',
      path: '/starter',
      component: () => import('@/views/StarterPage.vue')
    },
    {
      name: 'Tabler Icons',
      path: '/icons/tabler',
      component: () => import('@/views/utilities/icons/TablerIcons.vue')
    },
    {
      name: 'Material Icons',
      path: '/icons/material',
      component: () => import('@/views/utilities/icons/MaterialIcons.vue')
    },
    {
      name: 'Typography',
      path: '/utils/typography',
      component: () => import('@/views/utilities/typography/TypographyPage.vue')
    },
    {
      name: 'Shadows',
      path: '/utils/shadows',
      component: () => import('@/views/utilities/shadows/ShadowPage.vue')
    },
    {
      name: 'Colors',
      path: '/utils/colors',
      component: () => import('@/views/utilities/colors/ColorPage.vue')
    },{
      name: 'defaultReport',
      path: '/default/report',
      component:() => import('@/views/reports/defaultReport.vue')
    },
    {
      name: 'TemperatureReport',
      path: '/history/temperature',
      component:() => import('@/views/reports/temperatureReport.vue')
    },{
      name:'HumidityReport',
      path: '/history/humidity',
      component:() => import('@/views/reports/humidityReport.vue')
    },{
      name:'SoilStatusReport',
      path:'/history/soil',
      component:() => import('@/views/reports/soilStatusReport.vue')
    },{
      name:'AirQualityReport',
      path:'/history/airQuality',
      component:() => import('@/views/reports/airQuality.vue')
    },{
      name:"ManageGreenhouse",
      path:'/manage/greenhouse',
      component:() => import('@/views/manageGreenHouse/defaultMange.vue')
    },{
      name: "lightOne",
      path: '/manage/light1',
      component:()=> import('@/views/manageGreenHouse/lightOne.vue')
    },{
      name: "lightTwo",
      path:'/manage/light2',
      component:()=> import('@/views/manageGreenHouse/lightTwo.vue')
    },{
      name: "lightThree",
      path:'/manage/light3',
      component:()=> import('@/views/manageGreenHouse/lightThree.vue')
    },{
      name:'temperatureTem',
      path: '/threshold/temperature',
      component:()=> import('@/views/thresholds/thresholdValues.vue')
    },{
      name:'notification',
      path:'/notification/defaultNotification',
      component:()=> import('@/views/notification/defaultNotification.vue')
    },{
      name:'activities',
      path:'/activities',
      component:()=> import('@/views/activities/defaultActivities.vue')
    },{
      name:'inventory',
      path:'/inventory',
      component:()=>import('@/views/inventory/defaultInventory.vue')
    }
  ]
};

export default MainRoutes;
