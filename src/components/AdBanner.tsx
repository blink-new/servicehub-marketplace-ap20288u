import { useState } from 'react'
import { X, Play, Pause } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'

interface AdBannerProps {
  type: 'banner' | 'video'
  isPremium?: boolean
  onClose?: () => void
}

export function AdBanner({ type, isPremium = false, onClose }: AdBannerProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [videoProgress, setVideoProgress] = useState(0)
  const [canSkip, setCanSkip] = useState(false)

  // Don't show ads for premium users
  if (isPremium) return null

  if (type === 'banner') {
    return (
      <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 mb-1">
                Grow Your Business Online
              </h3>
              <p className="text-sm text-gray-600">
                Create a professional website in minutes with our AI-powered platform
              </p>
            </div>
            <div className="ml-4 flex items-center space-x-2">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Learn More
              </Button>
              {onClose && (
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (type === 'video') {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <Card className="w-full max-w-md">
          <CardContent className="p-0">
            <div className="relative bg-gray-900 aspect-video rounded-t-lg flex items-center justify-center">
              {/* Mock Video Player */}
              <div className="text-center text-white">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  {isVideoPlaying ? (
                    <Pause className="h-8 w-8" />
                  ) : (
                    <Play className="h-8 w-8 ml-1" />
                  )}
                </div>
                <p className="text-sm">Advertisement</p>
                <p className="text-xs text-gray-300 mt-1">
                  {canSkip ? 'Skip available' : `${15 - Math.floor(videoProgress / 1000)}s`}
                </p>
              </div>

              {/* Skip Button */}
              {canSkip && onClose && (
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute top-4 right-4"
                  onClick={onClose}
                >
                  Skip Ad
                </Button>
              )}

              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                <div 
                  className="h-full bg-white transition-all duration-100"
                  style={{ width: `${(videoProgress / 15000) * 100}%` }}
                />
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-medium text-gray-900 mb-2">
                Premium Business Tools
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Streamline your workflow with our professional suite
              </p>
              <Button className="w-full" size="sm">
                Try Free for 30 Days
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return null
}