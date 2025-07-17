import { ServiceCategory, ServiceProvider } from '../types'

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'cleaning',
    name: 'House Cleaning',
    icon: 'Sparkles',
    description: 'Professional house cleaning services'
  },
  {
    id: 'plumbing',
    name: 'Plumbing',
    icon: 'Wrench',
    description: 'Plumbing repairs and installations'
  },
  {
    id: 'electrical',
    name: 'Electrical Work',
    icon: 'Zap',
    description: 'Electrical repairs and installations'
  },
  {
    id: 'driving',
    name: 'Driver Services',
    icon: 'Car',
    description: 'Personal driver and transportation'
  },
  {
    id: 'security',
    name: 'Security Guard',
    icon: 'Shield',
    description: 'Security and guard services'
  },
  {
    id: 'furniture',
    name: 'Furniture Repair',
    icon: 'Hammer',
    description: 'Furniture repair and maintenance'
  }
]

export const mockProviders: ServiceProvider[] = [
  {
    id: '1',
    userId: 'user1',
    category: serviceCategories[4], // Security
    title: 'Professional Security Guard',
    description: 'Experienced security professional with 8 years in residential and commercial security.',
    experience: 8,
    rating: 4.8,
    totalReviews: 127,
    hourlyRate: 250,
    location: 'Mumbai, Maharashtra',
    availability: true,
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    verificationBadges: ['ID Verified', 'Background Check'],
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    userId: 'user2',
    category: serviceCategories[0], // Cleaning
    title: 'Expert House Cleaner',
    description: 'Professional cleaning service with eco-friendly products and attention to detail.',
    experience: 5,
    rating: 4.9,
    totalReviews: 89,
    hourlyRate: 180,
    location: 'Delhi, NCR',
    availability: true,
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b9e0e4b0?w=150&h=150&fit=crop&crop=face',
    verificationBadges: ['ID Verified', 'Insurance'],
    createdAt: '2024-02-01T10:00:00Z'
  },
  {
    id: '3',
    userId: 'user3',
    category: serviceCategories[1], // Plumbing
    title: 'Licensed Plumber',
    description: 'Certified plumber specializing in residential repairs and installations.',
    experience: 12,
    rating: 4.7,
    totalReviews: 203,
    hourlyRate: 300,
    location: 'Bangalore, Karnataka',
    availability: false,
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    verificationBadges: ['ID Verified', 'Licensed', 'Insurance'],
    createdAt: '2024-01-20T10:00:00Z'
  }
]