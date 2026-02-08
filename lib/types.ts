export interface MediaFile {
  id: string
  url: string
  type: 'image' | 'video'
  name: string
}

export interface Post {
  id: string
  content: string
  platforms: string[]
  media: MediaFile[]
  createdAt: Date
  status: 'draft' | 'published' | 'failed'
}

export type Platform = 'twitter' | 'linkedin' | 'facebook' | 'instagram' | 'threads'

export interface PlatformConfig {
  name: string
  label: string
  charLimit: number
  icon: string
  color: string
  bgColor: string
}
