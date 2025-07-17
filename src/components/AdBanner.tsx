import { useState, useEffect } from 'react'
import { X, Play, Pause } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'

interface AdBannerProps {
  type: 'banner' | 'video'
  isPremium?: boolean
  onClose?: () => void
}

export function AdBanner({ type, isPremium = false, onClose }: AdBannerProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const [videoProgress, setVideoProgress] = useState(0)
  const [canSkip, setCanSkip] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(15)

  // Video ad timer effect
  useEffect(() => {
    if (type === 'video' && isVideoPlaying) {
      const interval = setInterval(() => {
        setVideoProgress(prev => {
          const newProgress = prev + 100
          const newTimeRemaining = Math.max(0, 15 - Math.floor(newProgress / 1000))
          setTimeRemaining(newTimeRemaining)
          
          // Enable skip after 5 seconds
          if (newProgress >= 5000) {
            setCanSkip(true)
          }
          
          // Auto-close after 15 seconds if no skip
          if (newProgress >= 15000 && onClose) {
            onClose()
          }
          
          return newProgress
        })
      }, 100)

      return () => clearInterval(interval)
    }
  }, [type, isVideoPlaying, onClose])

  // Don't show ads for premium users
  if (isPremium) return null

  if (type === 'banner') {
    return (
      <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 relative">
        <CardContent className="p-4">
          {onClose && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-gray-200/50"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
          <div className="flex items-center justify-between pr-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                  Ad
                </span>
                <h3 className="font-medium text-gray-900">
                  Grow Your Business Online
                </h3>
              </div>
              <p className="text-sm text-gray-600">
                Create a professional website in minutes with our AI-powered platform
              </p>
            </div>
            <div className="ml-4">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Learn More
              </Button>
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
                <div 
                  className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-white/30 transition-colors"
                  onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                >
                  {isVideoPlaying ? (
                    <Pause className="h-8 w-8" />
                  ) : (
                    <Play className="h-8 w-8 ml-1" />
                  )}
                </div>
                <p className="text-sm font-medium">Advertisement</p>
                <p className="text-xs text-gray-300 mt-1">
                  {canSkip ? 'You can skip this ad' : `Skip in ${timeRemaining}s`}
                </p>
              </div>

              {/* Skip Button */}
              <div className="absolute top-4 right-4">
                {canSkip && onClose ? (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={onClose}
                    className="bg-white/90 text-gray-900 hover:bg-white font-medium"
                  >
                    Skip Ad
                  </Button>
                ) : (
                  <div className="bg-black/50 text-white text-xs px-3 py-1.5 rounded-md font-medium">
                    Skip in {timeRemaining}s
                  </div>
                )}
              </div>

              {/* Close button (always available) */}
              {onClose && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="absolute top-4 left-4 h-8 w-8 p-0 text-white hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
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
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full font-medium">
                  Sponsored
                </span>
                <h3 className="font-medium text-gray-900">
                  Premium Business Tools
                </h3>
              </div>
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