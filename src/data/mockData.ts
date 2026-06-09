export interface NavigationLink {
  label: string;
  path: string;
}

export interface SocialLink {
  name: string;
  url: string;
}

export interface Destinations {
  id: string;
  title: string;
  subtitle: string;
  temperature: string;
  weatherStatus: string;
  imageUrl: string;
  cardImageUrl?: string;
}

export const NAVIGATION_LINKS: NavigationLink[] = [
  { label: 'Destination', path: 'destination' },
  { label: 'Bookings', path: 'bookings' },
  { label: 'Activities', path: 'activities' }
];

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'Linkedin', url: 'https://linkedin.com' },
  { name: 'Facebook', url: 'https://facebook.com' },
  { name: 'Instagram', url: 'https://instagram.com' }
];

export const DESTINATIONS: Destinations[] = [
  {
    id: '1',
    title: 'Nepal Country',
    subtitle: 'The Himalayan Mountain Ranges',
    temperature: '-02°C',
    weatherStatus: 'Very Cold',
    imageUrl: 'https://images.unsplash.com/photo-1611516491426-03025e6043c8?q=80&w=1633&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    cardImageUrl: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: '2',
    title: 'Switzerland Alps',
    subtitle: 'Bernese Oberland Range',
    temperature: '04°C',
    weatherStatus: 'Cold',
    imageUrl: 'https://images.unsplash.com/photo-1530878902700-5ad4f9e4c318?q=80&w=1634&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    cardImageUrl: 'https://plus.unsplash.com/premium_photo-1666254759561-8c21a4094ac5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: '3',
    title: 'Bora Bora',
    subtitle: 'French Polynesia Lagoon',
    temperature: '28°C',
    weatherStatus: 'Sunny',
    imageUrl: 'https://images.unsplash.com/photo-1652842183703-47c2f7bb8c3c?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    cardImageUrl: 'https://images.unsplash.com/photo-1706461168163-20e92384c985?q=80&w=1593&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
];