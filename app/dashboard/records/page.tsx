'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { mockRecords } from '@/lib/mock-data';
import { Upload, FileText, Clock, CheckCircle2, AlertCircle, Sparkles, Filter, Syringe, Award, Hospital, Pill, Scissors, Heart, File } from 'lucide-react';
import { RecordCard } from '@/components/dog-passport';

export default function RecordsPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [aiSorting, setAiSorting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = Array.from(new Set(mockRecords.map(r => r.category)));
  const filteredRecords = selectedCategory
    ? mockRecords.filter(r => r.category === selectedCategory)
    : mockRecords;

  // Expiration alerts
  const expiringRecords = mockRecords.filter(r => r.status === 'expiring-soon');
  const expiredRecords = mockRecords.filter(r => r.status === 'expired');

  // AI Document Sorting Simulation
  const handleAISort = async () => {
    setAiSorting(true);
    // Simulate AI categorization
    await new Promise(resolve => setTimeout(resolve, 2000));
    setAiSorting(false);
    // In production, this would call an AI service to categorize documents
  };

  // Drag and Drop Handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    await handleFileUpload(files);
  }, []);

  const handleFileUpload = async (files: File[]) => {
    setUploading(true);
    // Simulate upload and AI categorization
    await new Promise(resolve => setTimeout(resolve, 1500));
    setUploading(false);
    // In production, upload files and trigger AI sorting
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      await handleFileUpload(files);
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen" style={{ background: 'var(--golden-brown-50)' }}>
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-golden-brown-200 p-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="text-gray-600 hover:text-navy-900">←</button>
          <h1 className="text-lg font-bold text-navy-900">Health Records</h1>
        </div>
        <button
          onClick={handleAISort}
          disabled={aiSorting}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-ice-100 text-navy-900 rounded-lg text-xs font-semibold hover:bg-ice-200 transition-colors disabled:opacity-50"
        >
          <Sparkles className={`w-3.5 h-3.5 ${aiSorting ? 'animate-spin' : ''}`} />
          {aiSorting ? 'Sorting...' : 'AI Sort'}
        </button>
      </div>

      <div className="p-4 space-y-4 pb-20">
        {/* Expiration Alerts - Prominent */}
        {(expiringRecords.length > 0 || expiredRecords.length > 0) && (
          <Card className={`border-2 ${
            expiredRecords.length > 0 
              ? 'border-red-500 bg-red-50' 
              : 'border-amber-400 bg-amber-50'
          }`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className={`w-5 h-5 ${
                  expiredRecords.length > 0 ? 'text-red-600' : 'text-amber-600'
                }`} />
                <div className="flex-1">
                  <p className={`font-semibold text-sm ${
                    expiredRecords.length > 0 ? 'text-red-900' : 'text-amber-900'
                  }`}>
                    {expiredRecords.length > 0 
                      ? `${expiredRecords.length} record${expiredRecords.length > 1 ? 's' : ''} expired`
                      : `${expiringRecords.length} record${expiringRecords.length > 1 ? 's' : ''} expiring soon`
                    }
                  </p>
                  <p className={`text-xs mt-1 ${
                    expiredRecords.length > 0 ? 'text-red-700' : 'text-amber-700'
                  }`}>
                    {expiredRecords.length > 0
                      ? 'Update these records to maintain verification status'
                      : 'Review and renew before expiration to avoid service interruption'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Upload Section - Desktop Drag-Drop + Mobile Upload */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
            isDragging
              ? 'border-navy-900 bg-golden-brown-50 scale-105'
              : 'border-golden-brown-300 bg-golden-brown-50 hover:border-navy-900 hover:bg-golden-brown-100/50'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileSelect}
            className="hidden"
          />
          <Upload className={`w-8 h-8 mx-auto mb-3 ${
            isDragging ? 'text-navy-900' : 'text-gray-400'
          }`} />
          <p className="text-sm font-semibold text-navy-900 mb-1">
            {isDragging ? 'Drop files here' : 'Upload Documents'}
          </p>
          <p className="text-xs text-gray-600 mb-4">
            Drag and drop files here, or click to browse
          </p>
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="bg-navy-900 hover:bg-navy-800 text-white"
            style={{ backgroundColor: 'var(--navy-900)' }}
          >
            {uploading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Uploading...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                <span>Choose Files</span>
              </div>
            )}
          </Button>
          <p className="text-xs text-gray-500 mt-2">
            PDF, JPG, PNG • AI will auto-categorize
          </p>
        </div>

        {/* Category Filter with Counts */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <p className="text-xs font-semibold text-gray-600">Filter by category</p>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === null
                  ? 'bg-navy-900 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All ({mockRecords.length})
            </button>
            {categories.map(cat => {
              const count = mockRecords.filter(r => r.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-navy-900 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {cat.replace('-', ' ')} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Records List with Enhanced Status */}
        <div className="space-y-3">
          {filteredRecords.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <FileText className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                <p className="text-gray-600 font-semibold">No records found</p>
                <p className="text-xs text-gray-500 mt-1">
                  {selectedCategory ? `Try a different category filter` : 'Upload your first document'}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredRecords.map(record => (
              <RecordCard
                key={record.id}
                record={record}
                onClick={() => {
                  // Handle record click - could open modal or navigate to detail
                  console.log('View record:', record.id);
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
