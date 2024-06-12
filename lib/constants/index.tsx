import { LayoutDashboard, Shapes, ShoppingBag, Tag, Users2 } from 'lucide-react'

export const navLinks = [
  {
    url: '/',
    icon: <LayoutDashboard size={30}/>,
    label: 'Dashboard',
  },
  {
    url: '/collections',
    icon: <Shapes size={30}/>,
    label: 'Collections',
  },
  {
    url: '/products',
    icon: <Tag size={30}/>,
    label: 'Products',
  },
  {
    url: '/orders',
    icon: <ShoppingBag size={30}/>,
    label: 'Orders',
  },
  {
    url: '/customers',
    icon: <Users2 size={30}/>,
    label: 'Customers',
  },
]
