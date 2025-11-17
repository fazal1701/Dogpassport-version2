'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockDog, mockUser } from '@/lib/mock-data';
import { CheckCircle2, Clock, FileText, Shield, PenTool, XCircle, Loader2 } from 'lucide-react';

type VerificationStep = 'overview' | 'request' | 'review' | 'signature' | 'submitted' | 'approved' | 'rejected';

export default function VerificationPage() {
  const router = useRouter();
  const [step, setStep] = useState<VerificationStep>('overview');
  const [signing, setSigning] = useState(false);
  const [signature, setSignature] = useState('');
  const [vetSignature, setVetSignature] = useState('');

  // User is automatically logged in as John Doe

  const isPremium = mockUser.subscriptionTier === 'premium';
  const canRequestVerification = mockDog.vetInfoUploaded && mockDog.serviceDogInfoSubmitted;

  const handleRequestVerification = () => {
    if (!canRequestVerification) {
      alert('Please complete your dog profile and upload vet records first.');
      return;
    }
    setStep('request');
  };

  const handleSubmitRequest = () => {
    setStep('review');
  };

  const handleESignature = async () => {
    setSigning(true);
    // Simulate e-signature process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSignature('John Doe');
    setSigning(false);
    setStep('signature');
  };

  const handleVetSignature = async () => {
    setSigning(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setVetSignature('Dr. Emily Chen, DVM');
    setSigning(false);
    setStep('submitted');
  };

  const getCheckmarkInfo = () => {
    switch (mockDog.checkmarkStatus) {
      case 'yellow':
        return {
          icon: <Clock className="w-6 h-6 text-yellow-500" />,
          color: 'yellow',
          label: 'Yellow Checkmark',
          description: 'Temporary - Service dog info submitted, awaiting vet records',
          expires: 'Expires in 7 days if vet records not uploaded',
        };
      case 'green':
        return {
          icon: <CheckCircle2 className="w-6 h-6 text-emerald-500" />,
          color: 'green',
          label: 'Green Checkmark',
          description: 'Complete - All information uploaded and verified',
        };
      case 'blue':
        return {
          icon: <CheckCircle2 className="w-6 h-6 text-blue-600" />,
          color: 'blue',
          label: 'Blue Checkmark',
          description: 'Verified - Premium subscription with vet verification',
          premium: true,
        };
      default:
        return null;
    }
  };

  const checkmarkInfo = getCheckmarkInfo();

  if (step === 'overview') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="sticky top-0 bg-white border-b border-border p-4 flex items-center gap-3 z-10">
          <button onClick={() => router.back()} className="text-black hover:text-navy-900">
            ← Back
          </button>
          <h1 className="text-lg font-bold text-navy-900">Vet Verification</h1>
        </div>

        <div className="p-4 space-y-6 pb-20">
          {/* Current Status */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-navy-900" />
                Current Verification Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {checkmarkInfo && (
                <div className={`p-4 rounded-lg border-2 ${
                  checkmarkInfo.color === 'blue' 
                    ? 'border-blue-500 bg-blue-50'
                    : checkmarkInfo.color === 'green'
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-yellow-500 bg-yellow-50'
                }`}>
                  <div className="flex items-start gap-3">
                    {checkmarkInfo.icon}
                    <div className="flex-1">
                      <p className="font-bold text-lg text-navy-900">{checkmarkInfo.label}</p>
                      <p className="text-sm text-black mt-1">{checkmarkInfo.description}</p>
                      {checkmarkInfo.expires && (
                        <p className="text-xs text-amber-700 mt-2">{checkmarkInfo.expires}</p>
                      )}
                      {checkmarkInfo.premium && (
                        <p className="text-xs text-blue-700 mt-2 font-semibold">
                          ✓ Premium Verified - Accepted by airlines, rideshares, and businesses
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Subscription Tier */}
              <div className="p-4 bg-ice-50 rounded-lg border border-ice-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-navy-900">
                      {isPremium ? 'Premium Subscription' : 'Free Account'}
                    </p>
                    <p className="text-xs text-black mt-1">
                      {isPremium 
                        ? 'Your dog has a Blue Checkmark - the most trusted verification'
                        : 'Upgrade to Premium for Blue Checkmark verification'
                      }
                    </p>
                  </div>
                  {!isPremium && (
                    <Button
                      onClick={() => router.push('/dashboard/subscription')}
                      className="bg-forest-600 hover:bg-forest-700 text-white"
                    >
                      Upgrade to Premium
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Verification Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Verification Requirements</CardTitle>
              <CardDescription>
                Complete these steps to get your Blue Checkmark (Premium only)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className={`flex items-center gap-3 p-3 rounded-lg ${
                mockDog.serviceDogInfoSubmitted 
                  ? 'bg-emerald-50 border border-emerald-200'
                  : 'bg-gray-50 border border-gray-200'
              }`}>
                {mockDog.serviceDogInfoSubmitted ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-gray-400" />
                )}
                <div className="flex-1">
                  <p className={`font-semibold ${mockDog.serviceDogInfoSubmitted ? 'text-emerald-900' : 'text-black'}`}>
                    1. Service Dog Information
                  </p>
                  <p className="text-xs text-black mt-1">
                    Complete DOT form information (handler info, animal description, training attestations)
                  </p>
                </div>
              </div>

              <div className={`flex items-center gap-3 p-3 rounded-lg ${
                mockDog.vetInfoUploaded 
                  ? 'bg-emerald-50 border border-emerald-200'
                  : 'bg-gray-50 border border-gray-200'
              }`}>
                {mockDog.vetInfoUploaded ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-gray-400" />
                )}
                <div className="flex-1">
                  <p className={`font-semibold ${mockDog.vetInfoUploaded ? 'text-emerald-900' : 'text-black'}`}>
                    2. Veterinary Records Upload
                  </p>
                  <p className="text-xs text-black mt-1">
                    Upload vaccination records, health certificates, and vet contact information
                  </p>
                </div>
              </div>

              <div className={`flex items-center gap-3 p-3 rounded-lg ${
                mockDog.vetVerificationStatus === 'approved'
                  ? 'bg-emerald-50 border border-emerald-200'
                  : mockDog.vetVerificationStatus === 'pending'
                  ? 'bg-amber-50 border border-amber-200'
                  : 'bg-gray-50 border border-gray-200'
              }`}>
                {mockDog.vetVerificationStatus === 'approved' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : mockDog.vetVerificationStatus === 'pending' ? (
                  <Clock className="w-5 h-5 text-amber-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-gray-400" />
                )}
                <div className="flex-1">
                  <p className={`font-semibold ${
                    mockDog.vetVerificationStatus === 'approved' 
                      ? 'text-emerald-900' 
                      : mockDog.vetVerificationStatus === 'pending'
                      ? 'text-amber-900'
                      : 'text-black'
                  }`}>
                    3. Vet Verification Review
                  </p>
                  <p className="text-xs text-black mt-1">
                    {mockDog.vetVerificationStatus === 'approved'
                      ? 'Verified by veterinarian - Blue Checkmark active'
                      : mockDog.vetVerificationStatus === 'pending'
                      ? 'Under review by verification team'
                      : 'Request verification from your veterinarian'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            {!mockDog.vetVerificationRequested && canRequestVerification && isPremium && (
              <Button
                onClick={handleRequestVerification}
                className="w-full bg-forest-600 hover:bg-forest-700 text-white h-12 text-lg font-semibold"
              >
                Request Vet Verification
              </Button>
            )}

            {mockDog.vetVerificationStatus === 'pending' && (
              <Card className="bg-amber-50 border-amber-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-amber-600" />
                    <div>
                      <p className="font-semibold text-amber-900">Verification Under Review</p>
                      <p className="text-xs text-amber-700 mt-1">
                        Your verification request is being reviewed. This typically takes 3-5 business days.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {mockDog.vetVerificationStatus === 'approved' && (
              <Card className="bg-emerald-50 border-emerald-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="font-semibold text-emerald-900">Verification Approved</p>
                      <p className="text-xs text-emerald-700 mt-1">
                        Verified on {mockDog.vetVerificationDate?.toLocaleDateString()}. Your Blue Checkmark is active.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Important Notice */}
          <Card className="bg-navy-900 text-white">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-2">Authentication & Verification</p>
                  <p className="text-xs text-ice-100 leading-relaxed">
                    All verification requests require authenticated user accounts. False records are subject to federal penalties under 18 U.S.C. § 1001. 
                    Your e-signature confirms the accuracy of all submitted information.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Request Step
  if (step === 'request') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="sticky top-0 bg-white border-b border-border p-4 flex items-center gap-3 z-10">
          <button onClick={() => setStep('overview')} className="text-black hover:text-navy-900">
            ← Back
          </button>
          <h1 className="text-lg font-bold text-navy-900">Request Verification</h1>
        </div>

        <div className="p-4 space-y-6 pb-20">
          <Card>
            <CardHeader>
              <CardTitle>Verification Request</CardTitle>
              <CardDescription>
                Submit your dog's information for veterinarian verification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-4 bg-ice-50 rounded-lg">
                  <p className="font-semibold text-navy-900 mb-2">Dog Information</p>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Name:</span> {mockDog.name}</p>
                    <p><span className="font-medium">Breed:</span> {mockDog.breed}</p>
                    <p><span className="font-medium">Weight:</span> {mockDog.weight} lbs</p>
                    <p><span className="font-medium">Task Type:</span> {mockDog.taskType}</p>
                  </div>
                </div>

                <div className="p-4 bg-ice-50 rounded-lg">
                  <p className="font-semibold text-navy-900 mb-2">Documents to Review</p>
                  <div className="space-y-2">
                    {['Rabies Vaccination', 'Service Dog Training Certificate', 'Health Certificate'].map((doc, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-black">
                        <FileText className="w-4 h-4 text-black" />
                        <span>{doc}</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 ml-auto" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Button
                onClick={handleSubmitRequest}
                className="w-full bg-forest-600 hover:bg-forest-700 text-white"
              >
                Continue to Review
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Review Step
  if (step === 'review') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="sticky top-0 bg-white border-b border-border p-4 flex items-center gap-3 z-10">
          <button onClick={() => setStep('request')} className="text-black hover:text-navy-900">
            ← Back
          </button>
          <h1 className="text-lg font-bold text-navy-900">Review & E-Signature</h1>
        </div>

        <div className="p-4 space-y-6 pb-20">
          <Card>
            <CardHeader>
              <CardTitle>Review Your Information</CardTitle>
              <CardDescription>
                Please review all information before signing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border-2 border-navy-900 rounded-lg bg-white">
                <p className="text-xs text-black mb-4">I hereby attest that:</p>
                <div className="space-y-3 text-sm text-black">
                  <p>✓ All information provided is accurate and complete</p>
                  <p>✓ {mockDog.name} is a trained service dog required for my disability</p>
                  <p>✓ All vaccination records are current and valid</p>
                  <p>✓ I understand false statements are subject to federal penalties</p>
                </div>
              </div>

                <Button
                  onClick={handleESignature}
                  disabled={signing}
                  className="w-full bg-navy-900 hover:bg-navy-800 text-white h-12"
                >
                {signing ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <PenTool className="w-5 h-5" />
                    <span>E-Sign Document</span>
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Signature Step
  if (step === 'signature') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="sticky top-0 bg-white border-b border-border p-4 flex items-center gap-3 z-10">
          <button onClick={() => setStep('review')} className="text-black hover:text-navy-900">
            ← Back
          </button>
          <h1 className="text-lg font-bold text-navy-900">Vet Signature</h1>
        </div>

        <div className="p-4 space-y-6 pb-20">
          <Card>
            <CardHeader>
              <CardTitle>Veterinarian Verification</CardTitle>
              <CardDescription>
                Your veterinarian will review and sign this verification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-ice-50 rounded-lg">
                <p className="font-semibold text-navy-900 mb-2">Handler Signature</p>
                <p className="text-sm text-black">{signature}</p>
                <p className="text-xs text-black mt-1">Signed: {new Date().toLocaleString()}</p>
              </div>

              <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
                <p className="font-semibold text-navy-900 mb-2">Veterinarian Signature</p>
                <p className="text-sm text-black mb-4">
                  Your vet will review the documents and provide their signature
                </p>
                <Button
                  onClick={handleVetSignature}
                  disabled={signing}
                  className="w-full bg-forest-600 hover:bg-forest-700 text-white"
                >
                  {signing ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    'Simulate Vet Signature (Demo)'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Submitted Step
  if (step === 'submitted') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="p-4 space-y-6">
          <Card className="bg-emerald-50 border-emerald-200">
            <CardContent className="p-8 text-center">
              <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-emerald-900 mb-2">Verification Request Submitted</h2>
              <p className="text-black mb-6">
                Your verification request has been submitted and is under review. 
                You'll receive a notification when the review is complete (typically 3-5 business days).
              </p>
              <Button
                onClick={() => {
                  setStep('overview');
                  // In production, update dog status
                }}
                className="bg-forest-600 hover:bg-forest-700 text-white"
              >
                Return to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}

