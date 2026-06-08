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
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'Switzerland Alps',
    subtitle: 'Bernese Oberland Range',
    temperature: '04°C',
    weatherStatus: 'Cold',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'Bora Bora',
    subtitle: 'French Polynesia Lagoon',
    temperature: '28°C',
    weatherStatus: 'Sunny',
    imageUrl: 'https://images.unsplash.com/photo-1532408840957-227293e7b06d?q=80&w=2000&auto=format&fit=crop'
  }
];