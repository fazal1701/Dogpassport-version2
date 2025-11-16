'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const STEPS = [
  { id: 'welcome', title: 'Welcome' },
  { id: 'dog-profile', title: 'Dog Profile' },
  { id: 'task-type', title: 'Task Type' },
  { id: 'completion', title: 'Complete' },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [dogData, setDogData] = useState({
    name: '',
    breed: '',
    weight: '',
    taskType: 'ptsd',
    photo: '/service-dog.jpg',
  });

  function handleNext() {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push('/dashboard');
    }
  }

  function handleBack() {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }

  const stepContent = {
    welcome: (
      <div className="space-y-6">
        <div className="text-center">
          <span className="text-6xl inline-block mb-4">🐕</span>
          <h2 className="text-3xl font-bold text-navy-900">Welcome to Dog Passport</h2>
          <p className="text-gray-600 mt-2">Let's set up your service dog's verified identity in minutes.</p>
        </div>
        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
          <p className="text-sm text-emerald-800"><strong>✓ Free to create</strong> • Upgrade anytime • No credit card needed</p>
        </div>
      </div>
    ),
    'dog-profile': (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-navy-900">Tell us about your dog</h2>
        <div>
          <label className="text-sm font-medium text-navy-900 mb-1 block">Dog's Name</label>
          <Input
            value={dogData.name}
            onChange={(e) => setDogData({ ...dogData, name: e.target.value })}
            placeholder="e.g., Buddy"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-navy-900 mb-1 block">Breed</label>
          <Input
            value={dogData.breed}
            onChange={(e) => setDogData({ ...dogData, breed: e.target.value })}
            placeholder="e.g., Labrador Retriever"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-navy-900 mb-1 block">Weight (lbs)</label>
          <Input
            type="number"
            value={dogData.weight}
            onChange={(e) => setDogData({ ...dogData, weight: e.target.value })}
            placeholder="e.g., 68"
          />
        </div>
      </div>
    ),
    'task-type': (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-navy-900">Service Dog Task Type</h2>
        <p className="text-gray-600 text-sm">What task does your dog perform?</p>
        <div className="space-y-2">
          {[
            { value: 'ptsd', label: 'PTSD Alert' },
            { value: 'mobility', label: 'Mobility Assistance' },
            { value: 'medical-alert', label: 'Medical Alert' },
            { value: 'psychiatric', label: 'Psychiatric Support' },
            { value: 'autism', label: 'Autism Support' },
            { value: 'other', label: 'Other' },
          ].map((task) => (
            <label key={task.value} className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-ice-50">
              <input
                type="radio"
                name="taskType"
                value={task.value}
                checked={dogData.taskType === task.value}
                onChange={(e) => setDogData({ ...dogData, taskType: e.target.value })}
                className="mr-3"
              />
              <span className="text-navy-900">{task.label}</span>
            </label>
          ))}
        </div>
      </div>
    ),
    completion: (
      <div className="text-center space-y-6">
        <div>
          <span className="text-6xl inline-block mb-4">🎉</span>
          <h2 className="text-3xl font-bold text-navy-900">You're all set!</h2>
          <p className="text-gray-600 mt-2">Your dog's profile is ready. Let's create your passport badge.</p>
        </div>
        <div className="bg-gradient-to-br from-ice-100 to-emerald-100 rounded-2xl p-6">
          <Card className="bg-white">
            <CardContent className="p-4 text-center">
              <Image
                src="/service-dog-badge.jpg"
                alt="Badge preview"
                width={100}
                height={100}
                className="rounded-full mx-auto mb-2"
              />
              <p className="font-semibold text-navy-900">{dogData.name || 'Your Dog'}</p>
              <p className="text-sm text-gray-600">{dogData.breed || 'Breed'}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    ),
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {STEPS.map((step, idx) => (
            <div
              key={step.id}
              className={`h-1 flex-1 rounded-full transition-colors ${
                idx <= currentStep ? 'bg-forest-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <Card className="shadow-lg">
          <CardContent className="p-6">
            {stepContent[STEPS[currentStep].id as keyof typeof stepContent]}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <Button
            onClick={handleBack}
            disabled={currentStep === 0}
            variant="outline"
            className="flex-1"
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            className="flex-1 bg-forest-600 hover:bg-forest-700 text-white"
          >
            {currentStep === STEPS.length - 1 ? 'Go to Dashboard' : 'Next'}
          </Button>
        </div>

        <p className="text-center text-xs text-gray-500 mt-4">
          Step {currentStep + 1} of {STEPS.length}
        </p>
      </div>
    </div>
  );
}
