export interface NavLink {
  name: string
  path: string
}

export interface SeoProps {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
} 