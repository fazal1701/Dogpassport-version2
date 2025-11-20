'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { mockAppointments, mockMeals, mockAIInsights } from '@/lib/mock-data';
import { Hospital, Scissors, FileText, Heart, Pill, Apple, Dog, Sparkles } from 'lucide-react';

export default function HealthPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'appointments' | 'meals' | 'insights'>('appointments');

  const upcomingAppointments = mockAppointments.filter(a => a.status === 'scheduled').sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className="max-w-md mx-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-border p-4 flex items-center gap-3">
        <button onClick={() => router.back()} className="text-gray-600 hover:text-navy-900">←</button>
        <h1 className="text-lg font-bold text-navy-900">Health Hub</h1>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border sticky top-16 bg-white">
        {['appointments', 'meals', 'insights'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`flex-1 py-3 text-xs font-semibold transition-colors ${
              activeTab === tab
                ? 'border-b-2 border-forest-600 text-forest-600'
                : 'text-gray-600 hover:text-navy-900'
            }`}
          >
            {tab === 'appointments' && '📅 Appointments'}
            {tab === 'meals' && '🍖 Meals'}
            {tab === 'insights' && '✨ Insights'}
          </button>
        ))}
      </div>

      <div className="p-4 space-y-4 pb-20">
        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <div className="space-y-3">
            <Button className="w-full bg-forest-600 hover:bg-forest-700 text-white">
              + Schedule Appointment
            </Button>
            {upcomingAppointments.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">No upcoming appointments</p>
              </div>
            ) : (
              upcomingAppointments.map(apt => (
                <Card key={apt.id} className="border border-border hover:border-forest-600 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-ice-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        {apt.type === 'vet' && <Hospital className="w-5 h-5 text-navy-900" />}
                        {apt.type === 'grooming' && <Scissors className="w-5 h-5 text-navy-900" />}
                        {apt.type === 'training' && <FileText className="w-5 h-5 text-navy-900" />}
                        {apt.type === 'check-up' && <Heart className="w-5 h-5 text-navy-900" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-navy-900">{apt.title}</p>
                        <p className="text-xs text-gray-600 mt-1">
                          {apt.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </p>
                        {apt.vetName && <p className="text-xs text-forest-700 mt-1">With {apt.vetName}</p>}
                        {apt.notes && <p className="text-xs text-gray-600 mt-1">{apt.notes}</p>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Meals Tab */}
        {activeTab === 'meals' && (
          <div className="space-y-3">
            <Button className="w-full bg-forest-600 hover:bg-forest-700 text-white">
              + Log Meal
            </Button>
            {mockMeals.map(meal => (
              <Card key={meal.id} className="border border-border">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">🍖</div>
                    <div className="flex-1">
                      <p className="font-semibold text-navy-900">{meal.foodType}</p>
                      <p className="text-xs text-gray-600 mt-1">{meal.amount}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {meal.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Insights Tab */}
        {activeTab === 'insights' && (
          <div className="space-y-3">
            {mockAIInsights.map(insight => (
              <Card 
                key={insight.id} 
                className={`border-2 ${
                  insight.priority === 'high' ? 'border-red-300 bg-red-50' :
                  insight.priority === 'medium' ? 'border-amber-300 bg-amber-50' :
                  'border-blue-300 bg-blue-50'
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-ice-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      {insight.category === 'health' && <Pill className="w-5 h-5 text-navy-900" />}
                      {insight.category === 'nutrition' && <Apple className="w-5 h-5 text-navy-900" />}
                      {insight.category === 'behavior' && <Dog className="w-5 h-5 text-navy-900" />}
                      {insight.category === 'training' && <FileText className="w-5 h-5 text-navy-900" />}
                      {insight.category === 'wellness' && <Sparkles className="w-5 h-5 text-navy-900" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-navy-900">{insight.title}</p>
                      <p className="text-xs text-gray-700 mt-1">{insight.message}</p>
                      {insight.actionItems && (
                        <div className="mt-2 space-y-1">
                          {insight.actionItems.slice(0, 2).map((item, i) => (
                            <p key={i} className="text-xs text-gray-700">• {item}</p>
                          ))}
                        </div>
                      )}
                    </div>
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
