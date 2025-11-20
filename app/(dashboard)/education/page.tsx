'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { mockEducationCards } from '@/lib/mock-data';
import { Printer, Download, ArrowLeft, Users, User } from 'lucide-react';

export default function EducationPage() {
  const router = useRouter();
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [audience, setAudience] = useState<'all' | 'handler' | 'staff'>('all');

  const filteredCards = audience === 'all'
    ? mockEducationCards
    : mockEducationCards.filter(c => c.audience === audience || c.audience === 'both');

  const selectedEducationCard = selectedCard
    ? mockEducationCards.find(c => c.id === selectedCard)
    : null;

  const handlePrint = () => {
    window.print();
  };

  if (selectedEducationCard) {
    return (
      <div className="max-w-md mx-auto">
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setSelectedCard(null)} className="text-gray-600 hover:text-navy-900">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-bold text-navy-900">Education</h1>
          </div>
          {selectedEducationCard.audience === 'staff' && (
            <Button
              onClick={handlePrint}
              size="sm"
              variant="outline"
              className="flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              Print
            </Button>
          )}
        </div>
        <div className="p-4 space-y-4 pb-20">
          <div className="text-6xl text-center mb-4">{selectedEducationCard.icon}</div>
          <h2 className="text-2xl font-bold text-navy-900">{selectedEducationCard.title}</h2>
          <div className="flex gap-2 flex-wrap">
            <span className="px-3 py-1 bg-ice-100 text-navy-900 rounded-full text-xs font-semibold">
              {selectedEducationCard.readTime} min read
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              selectedEducationCard.audience === 'staff' 
                ? 'bg-forest-600 text-white' 
                : selectedEducationCard.audience === 'handler'
                ? 'bg-navy-900 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}>
              {selectedEducationCard.audience === 'staff' ? 'For Staff' : 
               selectedEducationCard.audience === 'handler' ? 'For Handlers' : 'For Everyone'}
            </span>
          </div>
          <div className="prose prose-sm max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {selectedEducationCard.content}
            </div>
          </div>
          {selectedEducationCard.audience === 'staff' && (
            <Card className="bg-ice-50 border-forest-600/20">
              <CardContent className="p-4">
                <p className="text-xs text-forest-700 font-semibold mb-2">
                  💡 Staff Training Tip
                </p>
                <p className="text-xs text-forest-700">
                  Print this page and keep it at your station for quick reference. Share with new staff members during training.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      {/* Page Header */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => router.back()} className="text-gray-600 hover:text-navy-900 transition-colors">←</button>
          <h1 className="text-xl font-bold text-navy-900">Education Library</h1>
        </div>
      </div>

      <div className="p-4 space-y-4 pb-20">
        {/* Staff Cards Prominent Section */}
        {audience === 'all' || audience === 'staff' ? (
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-navy-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-forest-600" />
                For Staff & Businesses
              </h2>
              <span className="text-xs bg-forest-600 text-white px-2 py-1 rounded-full font-semibold">
                {filteredCards.filter(c => c.audience === 'staff').length} cards
              </span>
            </div>
            <p className="text-xs text-gray-600 mb-3">
              Essential training materials for restaurant, rideshare, and business staff. Print and share with your team.
            </p>
            {filteredCards
              .filter(c => c.audience === 'staff')
              .map(card => (
                <Card
                  key={card.id}
                  onClick={() => setSelectedCard(card.id)}
                  className="cursor-pointer hover:border-forest-600 transition-all hover:shadow-md border-2 border-forest-600/20 bg-gradient-to-r from-ice-50 to-white"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">{card.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-bold text-navy-900">{card.title}</p>
                          <span className="text-xs bg-forest-600 text-white px-2 py-0.5 rounded-full font-semibold">
                            Staff
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{card.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-gray-500">{card.readTime} min read</span>
                          <span className="text-xs text-forest-600 font-semibold">• Printable</span>
                        </div>
                      </div>
                      <div className="text-forest-600">→</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        ) : null}

        {/* Handler Cards Section */}
        {(audience === 'all' || audience === 'handler') && (
          <div className="space-y-3">
            {audience === 'all' && (
              <h2 className="text-lg font-bold text-navy-900 flex items-center gap-2">
                <User className="w-5 h-5 text-navy-900" />
                For Handlers
              </h2>
            )}
            {filteredCards
              .filter(c => c.audience === 'handler' || c.audience === 'both')
              .map(card => (
                <Card
                  key={card.id}
                  onClick={() => setSelectedCard(card.id)}
                  className="cursor-pointer hover:border-navy-900 transition-colors"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">{card.icon}</div>
                      <div className="flex-1">
                        <p className="font-semibold text-navy-900">{card.title}</p>
                        <p className="text-xs text-gray-600 mt-1">{card.description}</p>
                        <p className="text-xs text-gray-500 mt-2">{card.readTime} min read</p>
                      </div>
                      <div className="text-gray-400">→</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        )}

        {/* Audience Filter - Only show if not already filtered */}
        {audience === 'all' && (
          <div className="pt-4 border-t border-border">
            <p className="text-xs text-gray-600 mb-2 font-semibold">Filter by audience:</p>
            <div className="flex gap-2">
              {(['all', 'handler', 'staff'] as const).map(opt => {
                const isActive = audience === opt;
                const isStaff = opt === 'staff';
                return (
                  <button
                    key={opt}
                    onClick={() => setAudience(opt)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                      isActive
                        ? (isStaff 
                          ? 'bg-forest-600 text-white'
                          : 'bg-navy-900 text-white')
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {opt === 'all' ? 'All' : opt === 'handler' ? 'For Handlers' : 'For Staff'}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
