'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { mockTravelGuides } from '@/lib/mock-data';
import { CheckCircle2, FileText } from 'lucide-react';

export default function TravelPage() {
  const router = useRouter();
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const guideTypes = ['all', 'airline', 'rideshare', 'restaurant', 'hotel', 'national-park', 'event'];
  
  const filteredGuides = typeFilter === 'all'
    ? mockTravelGuides
    : mockTravelGuides.filter(g => g.guideType === typeFilter);

  const selectedGuideData = selectedGuide
    ? mockTravelGuides.find(g => g.id === selectedGuide)
    : null;

  if (selectedGuideData) {
    return (
      <div className="max-w-md mx-auto">
        <div className="sticky top-0 bg-white border-b border-border p-4 flex items-center gap-3">
          <button onClick={() => setSelectedGuide(null)} className="text-gray-600 hover:text-navy-900">←</button>
          <h1 className="text-lg font-bold text-navy-900">Travel Guide</h1>
        </div>
        <div className="p-4 space-y-4 pb-24">
          <div className="text-6xl text-center mb-4">{selectedGuideData.icon}</div>
          <h2 className="text-2xl font-bold text-navy-900">{selectedGuideData.title}</h2>
          
          <div className="flex gap-2 flex-wrap">
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
              selectedGuideData.difficulty === 'easy' ? 'bg-emerald-100 text-emerald-800' :
              selectedGuideData.difficulty === 'moderate' ? 'bg-amber-100 text-amber-800' :
              'bg-red-100 text-red-800'
            }`}>
              {selectedGuideData.difficulty.charAt(0).toUpperCase() + selectedGuideData.difficulty.slice(1)}
            </span>
          </div>

          <p className="text-gray-700 leading-relaxed">{selectedGuideData.content}</p>

          <div>
            <h3 className="font-bold text-navy-900 mb-3">📋 Essential Tips</h3>
            <ul className="space-y-2">
              {selectedGuideData.tips.map((tip, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-700">
                  <span className="font-bold text-forest-600">{i + 1}.</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-navy-900 mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5" /> Required Documents
            </h3>
            <div className="space-y-2">
              {selectedGuideData.documents.map((doc, i) => (
                <div key={i} className="flex items-center gap-2 p-2 bg-ice-50 rounded-lg text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={() => router.push('/records')} className="w-full bg-forest-600 hover:bg-forest-700 text-white">
            View My Records
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="sticky top-0 bg-white border-b border-border p-4 flex items-center gap-3">
        <button onClick={() => router.back()} className="text-gray-600 hover:text-navy-900">←</button>
        <h1 className="text-lg font-bold text-navy-900">Travel Guides</h1>
      </div>

      <div className="p-4 space-y-4 pb-24">
        {/* Type Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {guideTypes.map(type => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap ${
                typeFilter === type
                  ? 'bg-navy-900 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {type === 'all' ? 'All' : type.replace('-', ' ').charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Guides */}
        <div className="space-y-3">
          {filteredGuides.map(guide => (
            <Card
              key={guide.id}
              onClick={() => setSelectedGuide(guide.id)}
              className="cursor-pointer hover:border-forest-600 transition-colors"
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{guide.icon}</div>
                  <div className="flex-1">
                    <p className="font-semibold text-navy-900">{guide.title}</p>
                    <p className="text-xs text-gray-700 mt-1">{guide.content.substring(0, 60)}...</p>
                    <div className="flex gap-2 mt-2">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        guide.difficulty === 'easy' ? 'bg-emerald-100 text-emerald-800' :
                        guide.difficulty === 'moderate' ? 'bg-amber-100 text-amber-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {guide.difficulty}
                      </span>
                    </div>
                  </div>
                  <div className="text-gray-400">→</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
