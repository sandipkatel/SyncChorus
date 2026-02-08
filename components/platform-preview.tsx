import { Card } from '@/components/ui/card'
import { platformConfigs, allPlatforms } from '@/lib/platform-config'
import type { MediaFile } from '@/lib/types'

interface PlatformPreviewProps {
  content: string
  media: MediaFile[]
}

export default function PlatformPreview({ content, media }: PlatformPreviewProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-slate-900">Platform Previews</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {allPlatforms.map((platform) => {
          const config = platformConfigs[platform]
          const isOverLimit = content.length > config.charLimit
          const displayContent = content.length > config.charLimit 
            ? content.substring(0, config.charLimit) + '...' 
            : content

          return (
            <Card key={platform} className="overflow-hidden border-slate-200">
              {/* Platform Header */}
              <div className={`${config.bgColor} px-4 py-3 text-white`}>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{config.icon}</span>
                  <span className="font-semibold text-sm">{config.label}</span>
                </div>
                <p className="text-xs mt-1 opacity-80">
                  {content.length} / {config.charLimit} characters
                </p>
              </div>

              {/* Preview Content */}
              <div className="p-4 bg-white">
                {/* Text Preview */}
                <p className="text-sm text-slate-900 leading-relaxed line-clamp-4">
                  {displayContent || <span className="text-slate-400 italic">No content yet...</span>}
                </p>

                {/* Character Limit Warning */}
                {isOverLimit && (
                  <div className="mt-3 p-2 bg-red-50 rounded border border-red-200">
                    <p className="text-xs text-red-700 font-medium">
                      Content exceeds {config.label} limit by {content.length - config.charLimit} characters
                    </p>
                  </div>
                )}

                {/* Media Preview */}
                {media.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-200">
                    <p className="text-xs font-medium text-slate-600 mb-2">
                      {media.length} attachment{media.length !== 1 ? 's' : ''}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {media.map((file) => (
                        <div
                          key={file.id}
                          className="w-full aspect-square rounded border border-slate-200 overflow-hidden bg-slate-50"
                        >
                          {file.type === 'image' ? (
                            <img
                              src={file.url || "/placeholder.svg"}
                              alt={file.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-100">
                              <span className="text-xs text-slate-600">Video</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Platform-specific hints */}
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <p className="text-xs text-slate-500">
                    {platform === 'twitter' && '280 character limit for posts'}
                    {platform === 'linkedin' && 'Professional network - formal tone recommended'}
                    {platform === 'facebook' && 'Supports long-form content up to 63K characters'}
                    {platform === 'instagram' && 'Visual platform - captions up to 2,200 characters'}
                    {platform === 'threads' && 'Text-based with 500 character limit per post'}
                  </p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
