"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import PostComposer from "@/components/post-composer";
import PostHistory from "@/components/post-history";
import PlatformPreview from "@/components/platform-preview";
import type { Post, MediaFile } from "@/lib/types";

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPublishing, setIsPublishing] = useState(false);
  const [composerContent, setComposerContent] = useState("");
  const [composerMedia, setComposerMedia] = useState<MediaFile[]>([]);

  const handlePublish = async (
    content: string,
    platforms: string[],
    media: MediaFile[],
  ) => {
    setIsPublishing(true);

    // Simulate API calls with a small delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Log mock API calls
    console.log("[v0] Publishing to platforms:", platforms);
    console.log("[v0] Attached media:", media.length, "file(s)");
    for (const platform of platforms) {
      console.log(
        `[v0] POST /api/${platform}/publish - Content: ${content}, Media: ${media.length} file(s)`,
      );
    }

    // Add to history
    const newPost: Post = {
      id: Date.now().toString(),
      content,
      platforms,
      media,
      createdAt: new Date(),
      status: "published",
    };

    setPosts((prev) => [newPost, ...prev]);
    setComposerContent("");
    setComposerMedia([]);
    setIsPublishing(false);
  };

  const handleComposerChange = (content: string, media: MediaFile[]) => {
    setComposerContent(content);
    setComposerMedia(media);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">SyncChorus</h1>
          <p className="mt-2 text-slate-600">
            Publish to all platforms at once
          </p>
        </div>

        {/* Post Composer Section */}
        <div className="mb-8">
          <PostComposer
            onPublish={handlePublish}
            onChange={handleComposerChange}
            isLoading={isPublishing}
          />
        </div>

        {/* Platform Preview Section */}
        <div className="mb-8">
          <PlatformPreview content={composerContent} media={composerMedia} />
        </div>

        {/* Post History */}
        {posts.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Published Posts
            </h2>
            <PostHistory posts={posts} />
          </div>
        )}
      </div>
    </div>
  );
}
