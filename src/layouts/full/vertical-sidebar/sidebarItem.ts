import {
  CircleIcon,
  WindmillIcon,
  TypographyIcon,
  ShadowIcon,
  PaletteIcon,
  KeyIcon,
  BugIcon,
  DashboardIcon,
  FileReportIcon,
  BrandChromeIcon,
  HelpIcon,
  EaseInControlPointIcon,
  ForkliftIcon,
  GaugeIcon,
  NotificationIcon,
  ActivityIcon,
  BuildingStoreIcon
} from 'vue-tabler-icons';

export interface menu {
  header?: string;
  title?: string;
  icon?: object;
  to?: string;
  divider?: boolean;
  chip?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItem: menu[] = [
  { header: 'Control panel' },
  {
    title: 'Realtime dashboard',
    icon: DashboardIcon,
    to: '/dashboard/default'
  },
  {
    title: 'Climate reports',
    icon: FileReportIcon,
    to: '/default/report'
  },{
    title: 'Control Greenhouse',
    icon:EaseInControlPointIcon,
    to: '/manage/greenhouse'
  },{
    title:'Threshold values',
    icon:GaugeIcon,
    to: '/threshold/temperature'
  },{
    title:'Notification',
    icon:NotificationIcon,
    to: '/notification/defaultNotification'
  },{
    title:"Activities",
    icon:ActivityIcon,
    to: '/activities'
  },{
    title:"Inventory",
    icon:BuildingStoreIcon,
    to:"/inventory"
  },
  // { divider: true },
  // { header: 'Pages' },
  // {
  //   title: 'Authentication',
  //   icon: KeyIcon,
  //   to: '/auth',
  //   children: [
  //     {
  //       title: 'Login',
  //       icon: CircleIcon,
  //       to: '/login1'
  //     },
  //     {
  //       title: 'Register',
  //       icon: CircleIcon,
  //       to: '/register'
  //     }
  //   ]
  // },
  // {
  //   title: 'Error 404',
  //   icon: BugIcon,
  //   to: '/error'
  // },
  // { divider: true },
  // { header: 'Utilities' },
  // {
  //   title: 'Typography',
  //   icon: TypographyIcon,
  //   to: '/utils/typography'
  // },
  // {
  //   title: 'Shadows',
  //   icon: ShadowIcon,
  //   to: '/utils/shadows'
  // },
  // {
  //   title: 'Colors',
  //   icon: PaletteIcon,
  //   to: '/utils/colors'
  // },

  // {
  //   title: 'Icons',
  //   icon: WindmillIcon,
  //   to: '/forms/radio',
  //   children: [
  //     {
  //       title: 'Tabler Icons',
  //       icon: CircleIcon,
  //       to: '/icons/tabler'
  //     },
  //     {
  //       title: 'Material Icons',
  //       icon: CircleIcon,
  //       to: '/icons/material'
  //     }
  //   ]
  // },
  // { divider: true },
  // {
  //   title: 'Sample Page',
  //   icon: BrandChromeIcon,
  //   to: '/starter'
  // },
  // {
  //   title: 'Documentation',
  //   icon: HelpIcon,
  //   to: 'https://codedthemes.gitbook.io/berry-vuetify/',
  //   type: 'external'
  // }
];

export default sidebarItem;
