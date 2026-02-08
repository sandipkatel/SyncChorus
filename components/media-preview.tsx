'use client'

import { Button } from '@/components/ui/button'
import type { MediaFile } from '@/lib/types'

interface MediaPreviewProps {
  media: MediaFile[]
  onRemove: (id: string) => void
}

export default function MediaPreview({ media, onRemove }: MediaPreviewProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {media.map((file) => (
        <div
          key={file.id}
          className="relative group overflow-hidden rounded-lg border border-slate-200 bg-slate-50"
        >
          {file.type === 'image' ? (
            <img
              src={file.url || "/placeholder.svg"}
              alt={file.name}
              className="w-full h-24 object-cover"
            />
          ) : (
            <video
              src={file.url}
              className="w-full h-24 object-cover"
            />
          )}

          {/* Remove Button - appears on hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              type="button"
              size="sm"
              variant="destructive"
              onClick={() => onRemove(file.id)}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Remove
            </Button>
          </div>

          {/* File Type Badge */}
          <div className="absolute top-1 right-1 bg-black/60 text-white text-xs px-2 py-1 rounded">
            {file.type === 'image' ? '🖼️' : '🎥'}
          </div>
        </div>
      ))}
    </div>
  )
}
