export interface User {
  id: string
  email: string
  displayName: string
  avatar?: string
  isKycVerified: boolean
  isPremium: boolean
  createdAt: string
}

export interface ServiceProvider {
  id: string
  userId: string
  category: ServiceCategory
  title: string
  description: string
  experience: number
  rating: number
  totalReviews: number
  hourlyRate: number
  location: string
  availability: boolean
  profileImage?: string
  verificationBadges: string[]
  createdAt: string
}

export interface ServiceCategory {
  id: string
  name: string
  icon: string
  description: string
}

export interface ChatMessage {
  id: string
  senderId: string
  receiverId: string
  content: string
  type: 'text' | 'image' | 'voice' | 'location'
  timestamp: string
  attachmentUrl?: string
}

export interface Review {
  id: string
  providerId: string
  customerId: string
  rating: number
  comment: string
  createdAt: string
}

export interface PremiumFeature {
  id: string
  name: string
  description: string
  isPremiumOnly: boolean
}