'use client'

import { Card } from '@/components/ui/card'
import type { Post } from '@/lib/types'

interface PostHistoryProps {
  posts: Post[]
}

export default function PostHistory({ posts }: PostHistoryProps) {
  return (
    <div className="space-y-3">
      {posts.map((post) => (
        <Card
          key={post.id}
          className="p-4 bg-white border-slate-200 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="text-slate-900 leading-relaxed">{post.content}</p>

              {/* Media Grid */}
              {post.media.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                  {post.media.map((file) => (
                    <div
                      key={file.id}
                      className="overflow-hidden rounded-lg border border-slate-200"
                    >
                      {file.type === 'image' ? (
                        <img
                          src={file.url || "/placeholder.svg"}
                          alt={file.name}
                          className="w-full h-20 object-cover"
                        />
                      ) : (
                        <video
                          src={file.url}
                          className="w-full h-20 object-cover"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-3 flex flex-wrap gap-2">
                {post.platforms.map((platform) => (
                  <span
                    key={platform}
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      platform === 'twitter'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {platform === 'twitter' ? '𝕏' : 'in'} {platform}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-sm text-slate-500">
                {post.createdAt.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {post.createdAt.toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-200">
            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-800">
              ✓ {post.status}
            </span>
          </div>
        </Card>
      ))}
    </div>
  )
}
