'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockBlogPosts } from '@/lib/mock-data';
import Link from 'next/link';
import { Heart, MessageCircle, Home, Stethoscope, GraduationCap, User } from 'lucide-react';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPost, setSelectedPost] = useState<string | null>(null);

  const categories = ['all', 'tips', 'story', 'research', 'event', 'question'];

  const filteredPosts =
    selectedCategory === 'all'
      ? mockBlogPosts
      : mockBlogPosts.filter(post => post.category === selectedCategory);

  const post = selectedPost ? mockBlogPosts.find(p => p.id === selectedPost) : null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-ice-50 to-white pb-32">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-navy-900 mb-2">Community Blog</h1>
          <p className="text-gray-600">Stories, tips, and insights from service dog handlers and experts</p>
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
              <Card key={post.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedPost(post.id)}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-navy-900 mb-1">{post.title}</h3>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      by {post.author} •
                      {post.authorRole === 'handler' && <><Home className="w-3 h-3 ml-1" /> Handler</>}
                      {post.authorRole === 'vet' && <><Stethoscope className="w-3 h-3 ml-1" /> Veterinarian</>}
                      {post.authorRole === 'trainer' && <><GraduationCap className="w-3 h-3 ml-1" /> Trainer</>}
                      {!['handler', 'vet', 'trainer'].includes(post.authorRole) && <><User className="w-3 h-3 ml-1" /> Expert</>}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    post.category === 'tips' ? 'bg-emerald-100 text-forest-700' :
                    post.category === 'story' ? 'bg-blue-100 text-navy-700' :
                    post.category === 'research' ? 'bg-purple-100 text-purple-700' :
                    post.category === 'event' ? 'bg-orange-100 text-orange-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {post.category}
                  </span>
                </div>
                <p className="text-gray-700 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><Heart className="w-4 h-4" /> {post.likes}</span>
                    <span className="flex items-center gap-1"><MessageCircle className="w-4 h-4" /> {post.comments}</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                  <Button size="sm" className="bg-navy-600 hover:bg-navy-700 text-white">Read</Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div>
            <Button
              onClick={() => setSelectedPost(null)}
              className="mb-6 bg-gray-200 hover:bg-gray-300 text-gray-900"
            >
              ← Back to Posts
            </Button>
            <Card className="p-8">
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
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    post?.category === 'tips' ? 'bg-emerald-100 text-forest-700' :
                    post?.category === 'story' ? 'bg-blue-100 text-navy-700' :
                    post?.category === 'research' ? 'bg-purple-100 text-purple-700' :
                    post?.category === 'event' ? 'bg-orange-100 text-orange-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {post?.category}
                  </span>
                </div>
              </div>

              <div className="prose max-w-none mb-8">
                <p className="text-lg text-gray-700 leading-relaxed">{post?.content}</p>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {post?.tags.map(tag => (
                  <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-6 py-6 border-t border-b border-gray-200">
                <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
                  <Heart className="w-5 h-5" /> <span>{post?.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-navy-600 transition-colors">
                  <MessageCircle className="w-5 h-5" /> <span>{post?.comments}</span>
                </button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </main>
  );
}
