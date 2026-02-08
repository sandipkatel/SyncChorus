'use client'

import React from "react"

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import PlatformToggle from './platform-toggle'
import MediaPreview from './media-preview'
import PlatformPreview from './platform-preview'
import { allPlatforms } from '@/lib/platform-config'
import type { Platform, MediaFile } from '@/lib/types'

interface PostComposerProps {
  onPublish: (content: string, platforms: string[], media: MediaFile[]) => Promise<void>
  onChange?: (content: string, media: MediaFile[]) => void
  isLoading?: boolean
}

const CHAR_LIMIT = 500
const SUPPORTED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm']

export default function PostComposer({ onPublish, onChange, isLoading = false }: PostComposerProps) {
  const [content, setContent] = useState('')
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(['twitter', 'linkedin'])
  const [media, setMedia] = useState<MediaFile[]>([])
  const [showPreview, setShowPreview] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const charCount = content.length
  const isOverLimit = charCount > CHAR_LIMIT
  const canPublish = content.trim().length > 0 && selectedPlatforms.length > 0 && !isOverLimit && !isLoading

  const togglePlatform = (platform: Platform) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    )
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    Array.from(files).forEach(file => {
      if (!SUPPORTED_TYPES.includes(file.type)) {
        console.log('[v0] Unsupported file type:', file.type)
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          const mediaFile: MediaFile = {
            id: Date.now().toString() + Math.random(),
            url: event.target.result as string,
            type: file.type.startsWith('image') ? 'image' : 'video',
            name: file.name
          }
          setMedia(prev => {
            const newMedia = [...prev, mediaFile]
            onChange?.(content, newMedia)
            return newMedia
          })
          console.log('[v0] Media file added:', mediaFile.name)
        }
      }
      reader.readAsDataURL(file)
    })

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const removeMedia = (id: string) => {
    const newMedia = media.filter(m => m.id !== id)
    setMedia(newMedia)
    onChange?.(content, newMedia)
  }

  const handlePublish = async () => {
    if (!canPublish) return
    await onPublish(content, selectedPlatforms, media)
    setContent('')
    setMedia([])
  }

  return (
    <Card className="p-6 bg-white border-slate-200">
      {/* Text Area */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-900 mb-2">
          What's on your mind?
        </label>
        <textarea
          value={content}
          onChange={(e) => {
            const newContent = e.target.value
            setContent(newContent)
            onChange?.(newContent, media)
          }}
          placeholder="Write your post here... It will be published to all selected platforms."
          className="w-full h-32 p-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-slate-900 placeholder-slate-500"
        />
        
        {/* Character Count */}
        <div className="mt-2 flex justify-between items-center">
          <span className={`text-sm ${isOverLimit ? 'text-red-600 font-medium' : 'text-slate-500'}`}>
            {charCount} / {CHAR_LIMIT}
          </span>
          {isOverLimit && (
            <span className="text-xs text-red-600">Content exceeds limit</span>
          )}
        </div>
      </div>

      {/* Media Upload */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-900 mb-3">
          Attach Media (Optional)
        </label>
        <div className="flex gap-2 mb-4">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={SUPPORTED_TYPES.join(',')}
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            className="border-slate-300"
          >
            + Add Photos/Videos
          </Button>
          {media.length > 0 && (
            <span className="text-sm text-slate-600 flex items-center">
              {media.length} file{media.length !== 1 ? 's' : ''} attached
            </span>
          )}
        </div>
        {media.length > 0 && (
          <MediaPreview media={media} onRemove={removeMedia} />
        )}
      </div>

      {/* Platform Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-900 mb-3">
          Publish to:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:flex md:gap-3 md:flex-wrap">
          {allPlatforms.map((platform) => (
            <PlatformToggle
              key={platform}
              platform={platform}
              isSelected={selectedPlatforms.includes(platform)}
              onChange={() => togglePlatform(platform)}
            />
          ))}
        </div>
        {selectedPlatforms.length === 0 && (
          <p className="text-sm text-red-600 mt-2">Select at least one platform</p>
        )}
      </div>

      {/* Preview Toggle */}
      <div className="mb-6 flex items-center gap-2">
        <input
          type="checkbox"
          id="preview-toggle"
          checked={showPreview}
          onChange={(e) => setShowPreview(e.target.checked)}
          className="rounded"
        />
        <label htmlFor="preview-toggle" className="text-sm font-medium text-slate-900 cursor-pointer">
          Show platform previews
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end">
        <Button
          variant="outline"
          onClick={() => setContent('')}
          disabled={isLoading}
          className="border-slate-300"
        >
          Clear
        </Button>
        <Button
          onClick={handlePublish}
          disabled={!canPublish}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isLoading ? 'Publishing...' : 'Publish to All'}
        </Button>
      </div>
    </Card>
  )
}
