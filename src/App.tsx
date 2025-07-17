import { useState, useEffect } from 'react'
import { Header } from './components/layout/Header'
import { ServiceCategoryGrid } from './components/ServiceCategoryGrid'
import { ServiceProviderCard } from './components/ServiceProviderCard'
import { ChatInterface } from './components/ChatInterface'
import { PremiumGate } from './components/PremiumGate'
import { AdBanner } from './components/AdBanner'
import { Button } from './components/ui/button'
import { Card, CardContent } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { serviceCategories, mockProviders } from './data/mockData'
import { ServiceCategory, ServiceProvider } from './types'
import { blink } from './blink/client'

function App() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null)
  const [filteredProviders, setFilteredProviders] = useState(mockProviders)
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null)
  const [showChat, setShowChat] = useState(false)
  const [showPremiumGate, setShowPremiumGate] = useState(false)
  const [showVideoAd, setShowVideoAd] = useState(false)
  const [showBannerAd, setShowBannerAd] = useState(true)
  const [isPremium, setIsPremium] = useState(false)

  // Auth state management
  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
      // Mock premium status - in real app this would come from user data
      setIsPremium(false)
    })
    return unsubscribe
  }, [])

  // Filter providers based on search and category
  useEffect(() => {
    let filtered = mockProviders

    if (selectedCategory) {
      filtered = filtered.filter(provider => 
        provider.category.id === selectedCategory.id
      )
    }

    if (searchQuery) {
      filtered = filtered.filter(provider =>
        provider.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.category.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredProviders(filtered)
  }, [searchQuery, selectedCategory])

  // Show video ad occasionally for non-premium users
  useEffect(() => {
    if (!isPremium && Math.random() < 0.3) {
      const timer = setTimeout(() => {
        setShowVideoAd(true)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [isPremium])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setSelectedCategory(null)
  }

  const handleCategorySelect = (category: ServiceCategory) => {
    setSelectedCategory(category)
    setSearchQuery('')
  }

  const handleContactClick = (provider: ServiceProvider) => {
    setSelectedProvider(provider)
    setShowChat(true)
  }

  const handlePremiumRequired = () => {
    setShowPremiumGate(true)
  }

  const handleUpgrade = () => {
    // In real app, this would integrate with payment system
    setIsPremium(true)
    setShowPremiumGate(false)
    alert('Premium upgrade successful! (Demo)')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-sm">SH</span>
          </div>
          <p className="text-gray-600">Loading ServiceHub...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-xl">SH</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome to ServiceHub
            </h1>
            <p className="text-gray-600 mb-6">
              Connect with verified service providers in your area
            </p>
            <Button 
              onClick={() => blink.auth.login()}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Sign In to Continue
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onSearch={handleSearch} 
        isPremium={isPremium}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Trusted Service Providers
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with KYC-verified professionals for all your service needs
          </p>
        </div>

        {/* Ad Banner for non-premium users */}
        {showBannerAd && (
          <AdBanner 
            type="banner" 
            isPremium={isPremium} 
            onClose={() => setShowBannerAd(false)}
          />
        )}

        {/* Active Filters */}
        {(selectedCategory || searchQuery) && (
          <div className="mb-6">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Active filters:</span>
              {selectedCategory && (
                <Badge 
                  variant="secondary" 
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(null)}
                >
                  {selectedCategory.name} ×
                </Badge>
              )}
              {searchQuery && (
                <Badge 
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => setSearchQuery('')}
                >
                  "{searchQuery}" ×
                </Badge>
              )}
              <Button
                variant="link"
                size="sm"
                onClick={() => {
                  setSelectedCategory(null)
                  setSearchQuery('')
                }}
                className="text-blue-600"
              >
                Clear all
              </Button>
            </div>
          </div>
        )}

        {/* Service Categories */}
        {!selectedCategory && !searchQuery && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Browse Services
            </h2>
            <ServiceCategoryGrid 
              categories={serviceCategories}
              onCategorySelect={handleCategorySelect}
            />
          </div>
        )}

        {/* Service Providers */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              {selectedCategory 
                ? `${selectedCategory.name} Providers` 
                : searchQuery 
                  ? `Search Results for "${searchQuery}"`
                  : 'Featured Providers'
              }
            </h2>
            <span className="text-sm text-gray-500">
              {filteredProviders.length} providers found
            </span>
          </div>

          {filteredProviders.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-gray-500 mb-4">
                  No service providers found matching your criteria
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory(null)
                    setSearchQuery('')
                  }}
                >
                  View All Providers
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {filteredProviders.map((provider) => (
                <ServiceProviderCard
                  key={provider.id}
                  provider={provider}
                  isPremium={isPremium}
                  onContactClick={handleContactClick}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Chat Interface */}
      {selectedProvider && (
        <ChatInterface
          provider={selectedProvider}
          isOpen={showChat}
          onClose={() => {
            setShowChat(false)
            setSelectedProvider(null)
          }}
          isPremium={isPremium}
          onPremiumRequired={handlePremiumRequired}
        />
      )}

      {/* Premium Gate */}
      <PremiumGate
        isOpen={showPremiumGate}
        onClose={() => setShowPremiumGate(false)}
        onUpgrade={handleUpgrade}
      />

      {/* Video Ad */}
      {showVideoAd && (
        <AdBanner
          type="video"
          isPremium={isPremium}
          onClose={() => setShowVideoAd(false)}
        />
      )}
    </div>
  )
}

export default App