'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { mockSupportTopics } from '@/lib/mock-data';

export default function SupportPage() {
  const router = useRouter();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', 'account', 'verification', 'technical', 'legal', 'health'];
  
  let filteredTopics = categoryFilter === 'all'
    ? mockSupportTopics
    : mockSupportTopics.filter(t => t.category === categoryFilter);

  if (searchQuery) {
    filteredTopics = filteredTopics.filter(t =>
      t.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const selectedTopicData = selectedTopic
    ? mockSupportTopics.find(t => t.id === selectedTopic)
    : null;

  if (selectedTopicData) {
    return (
      <div className="max-w-md mx-auto">
        <div className="sticky top-0 bg-white border-b border-border p-4 flex items-center gap-3">
          <button onClick={() => setSelectedTopic(null)} className="text-gray-600 hover:text-navy-900">←</button>
          <h1 className="text-lg font-bold text-navy-900">Support</h1>
        </div>
        <div className="p-4 space-y-4 pb-24">
          <h2 className="text-2xl font-bold text-navy-900">{selectedTopicData.question}</h2>
          
          <div className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold w-fit">
            {selectedTopicData.category.toUpperCase()}
          </div>

          <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{selectedTopicData.answer}</p>

          {selectedTopicData.relatedTopics.length > 0 && (
            <div>
              <h3 className="font-bold text-navy-900 mb-3">Related Questions</h3>
              <div className="space-y-2">
                {selectedTopicData.relatedTopics.map(relatedId => {
                  const relatedTopic = mockSupportTopics.find(t => t.id === relatedId);
                  return relatedTopic ? (
                    <button
                      key={relatedId}
                      onClick={() => setSelectedTopic(relatedId)}
                      className="w-full text-left p-2 hover:bg-ice-50 rounded-lg transition-colors"
                    >
                      <p className="text-sm font-semibold text-navy-900 mb-1">{relatedTopic.question}</p>
                      <p className="text-xs text-gray-600">→ View answer</p>
                    </button>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="sticky top-0 bg-white border-b border-border p-4 flex items-center gap-3">
        <button onClick={() => router.back()} className="text-gray-600 hover:text-navy-900">←</button>
        <h1 className="text-lg font-bold text-navy-900">Support & FAQ</h1>
      </div>

      <div className="p-4 space-y-4 pb-24">
        {/* Search */}
        <input
          type="text"
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-lg text-sm"
        />

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap ${
                categoryFilter === cat
                  ? 'bg-navy-900 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Topics */}
        <div className="space-y-2">
          {filteredTopics.length > 0 ? (
            filteredTopics.map(topic => (
              <Card
                key={topic.id}
                onClick={() => setSelectedTopic(topic.id)}
                className="cursor-pointer hover:border-forest-600 transition-colors"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="font-semibold text-navy-900 text-sm">{topic.question}</p>
                      <p className="text-xs text-gray-600 mt-1">{topic.answer.substring(0, 60)}...</p>
                    </div>
                    <div className="text-gray-400">→</div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No results found</p>
            </div>
          )}
        </div>

        {/* Contact Support */}
        <Card className="bg-gradient-to-br from-forest-600 to-forest-700 border-0 text-white">
          <CardContent className="p-4">
            <p className="font-bold mb-2">Still need help?</p>
            <p className="text-sm mb-3 text-green-50">Contact our support team directly for personalized assistance.</p>
            <button className="w-full py-2 bg-white text-forest-600 font-semibold rounded-lg hover:bg-ice-50">
              Email Support
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
