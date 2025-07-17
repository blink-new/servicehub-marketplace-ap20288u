import { 
  Sparkles, 
  Wrench, 
  Zap, 
  Car, 
  Shield, 
  Hammer 
} from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { ServiceCategory } from '../types'

const iconMap = {
  Sparkles,
  Wrench,
  Zap,
  Car,
  Shield,
  Hammer
}

interface ServiceCategoryGridProps {
  categories: ServiceCategory[]
  onCategorySelect: (category: ServiceCategory) => void
}

export function ServiceCategoryGrid({ categories, onCategorySelect }: ServiceCategoryGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((category) => {
        const IconComponent = iconMap[category.icon as keyof typeof iconMap]
        
        return (
          <Card 
            key={category.id}
            className="cursor-pointer hover:shadow-md transition-shadow duration-200 group"
            onClick={() => onCategorySelect(category)}
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <IconComponent className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-medium text-sm text-gray-900 mb-1">
                {category.name}
              </h3>
              <p className="text-xs text-gray-500 line-clamp-2">
                {category.description}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}