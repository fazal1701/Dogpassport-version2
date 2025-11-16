'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { mockBreedCommunity, mockCommunityMembers } from '@/lib/mock-data';

export default function CommunityPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'tips'>('overview');

  return (
    <div className="max-w-md mx-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-border p-4 flex items-center gap-3">
        <button onClick={() => router.back()} className="text-gray-600 hover:text-navy-900">←</button>
        <h1 className="text-lg font-bold text-navy-900">Breed Community</h1>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border sticky top-16 bg-white">
        {['overview', 'members', 'tips'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`flex-1 py-3 text-xs font-semibold transition-colors ${
              activeTab === tab
                ? 'border-b-2 border-forest-600 text-forest-600'
                : 'text-gray-600 hover:text-navy-900'
            }`}
          >
            {tab === 'overview' && '📊 Overview'}
            {tab === 'members' && '👥 Members'}
            {tab === 'tips' && '💡 Tips'}
          </button>
        ))}
      </div>

      <div className="p-4 space-y-4 pb-20">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-forest-50 to-emerald-50 rounded-lg p-6 border border-forest-300">
              <h2 className="text-2xl font-bold text-forest-900 mb-4">{mockBreedCommunity.breed}</h2>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-600">Community Members</p>
                  <p className="text-3xl font-bold text-forest-900">{mockBreedCommunity.memberCount}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Total Dogs</p>
                  <p className="text-3xl font-bold text-forest-900">{mockBreedCommunity.totalDogs}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-gray-600">Average Weight</p>
                  <p className="text-2xl font-bold text-forest-900">{mockBreedCommunity.avgWeight} lbs</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-navy-900 mb-2">Common Health Concerns</h3>
              <div className="space-y-2">
                {mockBreedCommunity.commonHealthConcerns.map((concern, i) => (
                  <Card key={i} className="border border-amber-200 bg-amber-50">
                    <CardContent className="p-3">
                      <p className="text-sm text-amber-900">⚠️ {concern}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Members Tab */}
        {activeTab === 'members' && (
          <div className="space-y-3">
            <Button className="w-full bg-forest-600 hover:bg-forest-700 text-white">
              + Connect with Community
            </Button>
            {mockCommunityMembers.map(member => (
              <Card key={member.id} className="border border-border hover:border-forest-600 cursor-pointer transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Image
                      src={member.photo || "/placeholder.svg"}
                      alt={member.dogName}
                      width={50}
                      height={50}
                      className="rounded-full border border-border"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-navy-900">{member.dogName}</p>
                      <p className="text-xs text-gray-600">{member.breed}</p>
                      {member.taskType && (
                        <p className="text-xs text-forest-700 mt-1 capitalize">{member.taskType.replace('-', ' ')} Service Dog</p>
                      )}
                      {member.location && (
                        <p className="text-xs text-gray-600 mt-1">📍 {member.location}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Tips Tab */}
        {activeTab === 'tips' && (
          <div className="space-y-3">
            {mockBreedCommunity.topTips.map((tip, i) => (
              <Card key={i} className="border border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <span className="text-lg">💡</span>
                    <p className="text-sm text-blue-900">{tip}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
