import { Crown, Lock, Check } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'

interface PremiumGateProps {
  isOpen: boolean
  onClose: () => void
  onUpgrade: () => void
}

export function PremiumGate({ isOpen, onClose, onUpgrade }: PremiumGateProps) {
  if (!isOpen) return null

  const premiumFeatures = [
    'View ratings and reviews',
    'See years of experience',
    'Send attachments in chat',
    'Send voice messages',
    'No video ads',
    'Priority support'
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Crown className="h-8 w-8 text-amber-600" />
          </div>
          <CardTitle className="text-2xl">Upgrade to Premium</CardTitle>
          <p className="text-gray-600">
            Unlock all features and get the best experience
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Features List */}
          <div className="space-y-3">
            {premiumFeatures.map((feature) => (
              <div key={feature} className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="h-3 w-3 text-green-600" />
                </div>
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          {/* Pricing */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">Monthly</div>
                <div className="text-sm text-gray-500">Billed monthly</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg">₹99</div>
                <div className="text-sm text-gray-500">/month</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 border-2 border-amber-200 rounded-lg bg-amber-50">
              <div>
                <div className="font-medium flex items-center">
                  Yearly
                  <Badge className="ml-2 bg-amber-100 text-amber-800">Save 50%</Badge>
                </div>
                <div className="text-sm text-gray-500">Billed annually</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg">₹599</div>
                <div className="text-sm text-gray-500">/year</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button 
              onClick={onUpgrade}
              className="w-full bg-amber-600 hover:bg-amber-700"
            >
              <Crown className="h-4 w-4 mr-2" />
              Upgrade Now
            </Button>
            
            <Button 
              variant="outline" 
              onClick={onClose}
              className="w-full"
            >
              Maybe Later
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            Cancel anytime. No hidden fees.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}