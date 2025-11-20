'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockBlogPosts } from '@/lib/mock-data';
import Link from 'next/link';

export default function BlogPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPost, setSelectedPost] = useState<string | null>(null);

  const categories = ['all', 'tips', 'story', 'research', 'event', 'question'];

  const filteredPosts =
    selectedCategory === 'all'
      ? mockBlogPosts
      : mockBlogPosts.filter(post => post.category === selectedCategory);

  const post = selectedPost ? mockBlogPosts.find(p => p.id === selectedPost) : null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-ice-50 via-white to-gray-50">
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <button onClick={() => router.back()} className="text-gray-600 hover:text-navy-900 transition-colors">←</button>
            <h1 className="text-2xl font-bold text-navy-900">Community Blog</h1>
          </div>
          <p className="text-sm text-gray-600 ml-9">Stories, tips, and insights from service dog handlers and experts</p>
        </div>

        <div className="flex gap-2 overflow-x-auto mb-8 pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedPost(null);
              }}
              className={`px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-forest-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {!selectedPost ? (
          <div className="space-y-4">
            {filteredPosts.map(post => (
              <Card key={post.id} className="p-5 hover:shadow-lg transition-all cursor-pointer border border-gray-200 hover:border-navy-300" onClick={() => setSelectedPost(post.id)}>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-navy-900 mb-1">{post.title}</h3>
                    <p className="text-xs text-gray-600">
                      by {post.author} • {post.authorRole === 'handler' ? '🏠 Handler' : post.authorRole === 'vet' ? '🩺 Veterinarian' : post.authorRole === 'trainer' ? '🎓 Trainer' : '👤 Expert'}
                    </p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ml-2 ${
                    post.category === 'tips' ? 'bg-emerald-100 text-forest-700 border border-emerald-200' :
                    post.category === 'story' ? 'bg-navy-100 text-navy-700 border border-navy-200' :
                    post.category === 'research' ? 'bg-purple-100 text-purple-700 border border-purple-200' :
                    post.category === 'event' ? 'bg-gold-100 text-gold-700 border border-gold-200' :
                    'bg-gray-100 text-gray-700 border border-gray-200'
                  }`}>
                    {post.category}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-4 leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">❤️ {post.likes}</span>
                    <span className="flex items-center gap-1">💬 {post.comments}</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                  <Button size="sm" className="bg-gradient-to-r from-navy-700 to-navy-900 hover:from-navy-800 hover:to-navy-950 text-white shadow-sm">Read</Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div>
            <Button
              onClick={() => setSelectedPost(null)}
              className="mb-4 bg-gradient-to-r from-gold-100 to-gold-50 hover:from-gold-200 hover:to-gold-100 text-navy-900 border border-gold-200 shadow-sm"
            >
              ← Back to Posts
            </Button>
            <Card className="p-6 border border-gray-200 shadow-md">
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-navy-900 mb-2">{post?.title}</h1>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{post?.author}</span>
                      <span>•</span>
                      <span>{new Date(post?.createdAt!).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    post?.category === 'tips' ? 'bg-emerald-100 text-forest-700 border border-emerald-200' :
                    post?.category === 'story' ? 'bg-navy-100 text-navy-700 border border-navy-200' :
                    post?.category === 'research' ? 'bg-purple-100 text-purple-700 border border-purple-200' :
                    post?.category === 'event' ? 'bg-gold-100 text-gold-700 border border-gold-200' :
                    'bg-gray-100 text-gray-700 border border-gray-200'
                  }`}>
                    {post?.category}
                  </span>
                </div>
              </div>

              <div className="prose max-w-none mb-6">
                <p className="text-base text-gray-700 leading-relaxed whitespace-pre-wrap">{post?.content}</p>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {post?.tags.map(tag => (
                  <span key={tag} className="bg-gradient-to-r from-ice-100 to-ice-50 text-navy-700 px-3 py-1 rounded-full text-xs font-medium border border-ice-200">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-6 py-4 border-t border-b border-gray-200">
                <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors font-medium">
                  ❤️ <span className="text-sm">{post?.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-navy-600 transition-colors font-medium">
                  💬 <span className="text-sm">{post?.comments}</span>
                </button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </main>
  );
}
