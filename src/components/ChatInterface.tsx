import { useState, useRef } from 'react'
import { 
  Send, 
  Paperclip, 
  Mic, 
  MicOff, 
  Image, 
  MapPin, 
  X,
  Lock,
  Crown
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { ServiceProvider, ChatMessage } from '../types'

interface ChatInterfaceProps {
  provider: ServiceProvider
  isOpen: boolean
  onClose: () => void
  isPremium?: boolean
  onPremiumRequired: () => void
}

export function ChatInterface({ 
  provider, 
  isOpen, 
  onClose, 
  isPremium = false,
  onPremiumRequired 
}: ChatInterfaceProps) {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      senderId: provider.userId,
      receiverId: 'current-user',
      content: `Hi! I'm ${provider.title.split(' ')[0]}. How can I help you today?`,
      type: 'text',
      timestamp: new Date().toISOString()
    }
  ])
  const [isRecording, setIsRecording] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!isOpen) return null

  const handleSendMessage = () => {
    if (!message.trim()) return

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'current-user',
      receiverId: provider.userId,
      content: message,
      type: 'text',
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, newMessage])
    setMessage('')

    // Simulate provider response
    setTimeout(() => {
      const response: ChatMessage = {
        id: (Date.now() + 1).toString(),
        senderId: provider.userId,
        receiverId: 'current-user',
        content: "Thanks for your message! I'll get back to you with details about the service.",
        type: 'text',
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [...prev, response])
    }, 1000)
  }

  const handleAttachment = () => {
    if (!isPremium) {
      onPremiumRequired()
      return
    }
    fileInputRef.current?.click()
  }

  const handleVoiceMessage = () => {
    if (!isPremium) {
      onPremiumRequired()
      return
    }
    setIsRecording(!isRecording)
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl h-[600px] flex flex-col">
        <CardHeader className="flex-shrink-0 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={provider.profileImage} alt={provider.title} />
                <AvatarFallback>
                  {provider.title.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{provider.title}</CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={provider.availability ? "default" : "secondary"}
                    className={provider.availability ? "bg-green-100 text-green-800" : ""}
                  >
                    {provider.availability ? "Online" : "Away"}
                  </Badge>
                  <span className="text-sm text-gray-500">{provider.location}</span>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        {/* Messages */}
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.senderId === 'current-user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.senderId === 'current-user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <p className={`text-xs mt-1 ${
                  msg.senderId === 'current-user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {formatTime(msg.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </CardContent>

        {/* Input Area */}
        <div className="flex-shrink-0 border-t p-4">
          <div className="flex items-center space-x-2">
            {/* Attachment Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleAttachment}
              className={!isPremium ? "text-gray-400" : ""}
            >
              {!isPremium ? <Lock className="h-4 w-4" /> : <Paperclip className="h-4 w-4" />}
            </Button>

            {/* Message Input */}
            <div className="flex-1">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
            </div>

            {/* Voice Message Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleVoiceMessage}
              className={`${!isPremium ? "text-gray-400" : ""} ${
                isRecording ? "text-red-500" : ""
              }`}
            >
              {!isPremium ? (
                <Lock className="h-4 w-4" />
              ) : isRecording ? (
                <MicOff className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </Button>

            {/* Send Button */}
            <Button onClick={handleSendMessage} size="sm">
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {!isPremium && (
            <div className="mt-2 text-center">
              <Button
                variant="link"
                size="sm"
                onClick={onPremiumRequired}
                className="text-amber-600 text-xs"
              >
                <Crown className="h-3 w-3 mr-1" />
                Upgrade to send attachments and voice messages
              </Button>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*,video/*"
          onChange={(e) => {
            // Handle file upload
            console.log('File selected:', e.target.files?.[0])
          }}
        />
      </Card>
    </div>
  )
}