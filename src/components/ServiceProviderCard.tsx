import { Star, MapPin, Clock, Shield, MessageCircle, Lock } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { ServiceProvider } from '../types'

interface ServiceProviderCardProps {
  provider: ServiceProvider
  isPremium?: boolean
  onContactClick: (provider: ServiceProvider) => void
}

export function ServiceProviderCard({ 
  provider, 
  isPremium = false, 
  onContactClick 
}: ServiceProviderCardProps) {
  const canViewRating = isPremium
  const canViewExperience = isPremium

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          {/* Avatar */}
          <Avatar className="h-16 w-16">
            <AvatarImage src={provider.profileImage} alt={provider.title} />
            <AvatarFallback>
              {provider.title.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-1">
                  {provider.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {provider.description}
                </p>
              </div>
              
              {/* Availability Badge */}
              <Badge 
                variant={provider.availability ? "default" : "secondary"}
                className={provider.availability ? "bg-green-100 text-green-800" : ""}
              >
                {provider.availability ? "Available" : "Busy"}
              </Badge>
            </div>

            {/* Location */}
            <div className="flex items-center text-sm text-gray-500 mb-3">
              <MapPin className="h-4 w-4 mr-1" />
              {provider.location}
            </div>

            {/* Rating and Experience */}
            <div className="flex items-center space-x-4 mb-3">
              {canViewRating ? (
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-sm font-medium">{provider.rating}</span>
                  <span className="text-sm text-gray-500 ml-1">
                    ({provider.totalReviews} reviews)
                  </span>
                </div>
              ) : (
                <div className="flex items-center text-gray-400">
                  <Lock className="h-4 w-4 mr-1" />
                  <span className="text-sm">Premium feature</span>
                </div>
              )}

              {canViewExperience ? (
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-600">
                    {provider.experience} years exp.
                  </span>
                </div>
              ) : (
                <div className="flex items-center text-gray-400">
                  <Lock className="h-4 w-4 mr-1" />
                  <span className="text-sm">Premium feature</span>
                </div>
              )}
            </div>

            {/* Verification Badges */}
            <div className="flex items-center space-x-2 mb-4">
              {provider.verificationBadges.map((badge) => (
                <Badge key={badge} variant="outline" className="text-xs">
                  <Shield className="h-3 w-3 mr-1" />
                  {badge}
                </Badge>
              ))}
            </div>

            {/* Price and Contact */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-lg font-bold text-gray-900">
                  ₹{provider.hourlyRate}
                </span>
                <span className="text-sm text-gray-500 ml-1">/hour</span>
              </div>
              
              <Button 
                onClick={() => onContactClick(provider)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}