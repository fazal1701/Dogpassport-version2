'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { mockResourcePartners } from '@/lib/mock-data';

export default function ResourcesPage() {
  const router = useRouter();
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = ['all', 'airline', 'rideshare', 'hotel', 'grooming', 'insurance', 'veterinary', 'training', 'retail'];
  
  const filteredPartners = categoryFilter === 'all'
    ? mockResourcePartners
    : mockResourcePartners.filter(p => p.category === categoryFilter);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      airline: 'from-blue-100 to-blue-50',
      rideshare: 'from-purple-100 to-purple-50',
      hotel: 'from-amber-100 to-amber-50',
      grooming: 'from-pink-100 to-pink-50',
      insurance: 'from-green-100 to-green-50',
      veterinary: 'from-red-100 to-red-50',
      training: 'from-indigo-100 to-indigo-50',
      retail: 'from-cyan-100 to-cyan-50',
    };
    return colors[category] || 'from-gray-100 to-gray-50';
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => router.back()} className="text-gray-600 hover:text-navy-900 transition-colors">←</button>
          <h1 className="text-xl font-bold text-navy-900">Partners & Resources</h1>
        </div>
      </div>

      <div className="p-4 space-y-4 pb-24">
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

        {/* Partners Grid */}
        <div className="space-y-3">
          {filteredPartners.map(partner => (
            <Card key={partner.id} className="border border-border hover:border-forest-600 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="text-4xl">{partner.logo}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-bold text-navy-900">{partner.name}</p>
                        <p className="text-xs text-gray-600 mt-1">{partner.description}</p>
                      </div>
                      <span className="text-xs bg-forest-100 text-forest-800 px-2 py-1 rounded font-semibold whitespace-nowrap">
                        {partner.badge}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-br from-navy-900 to-navy-800 border-0">
          <CardContent className="p-4 text-white">
            <h3 className="font-bold mb-2">Become a Partner?</h3>
            <p className="text-sm mb-3 text-ice-100">Help service dog handlers everywhere with Dog Passport integration.</p>
            <Button className="w-full bg-white text-navy-900 hover:bg-ice-50">
              Contact Us
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
