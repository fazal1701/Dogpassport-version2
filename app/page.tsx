'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
// @ts-ignore - qrcode types not available
import QRCode from 'qrcode';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!qrCanvasRef.current) return;

    const qrData = JSON.stringify({
      dogId: 'dog-1',
      name: 'Buddy',
      verified: true,
      timestamp: new Date().toISOString(),
    });

    QRCode.toCanvas(qrCanvasRef.current, qrData, {
      width: 200,
      margin: 2,
      color: { dark: '#1E3A8A', light: '#FFFFFF' },
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-off-white to-white">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-navy-900 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🐾</span>
            </div>
            <span className="text-xl font-bold text-navy-900">Dog Passport</span>
          </div>
          <nav className="hidden md:flex gap-8">
            <a href="#features" className="text-gray-600 hover:text-navy-900">Features</a>
            <a href="#benefits" className="text-gray-600 hover:text-navy-900">Benefits</a>
            <a 
              href="#faq" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-gray-600 hover:text-navy-900"
            >
              FAQ
            </a>
          </nav>
          <div className="flex gap-3">
            <Button 
              onClick={() => router.push('/signup')}
              className="bg-navy-900 hover:bg-navy-800 text-white"
            >
              Get Started
            </Button>
            <Button 
              onClick={() => router.push('/login')}
              variant="outline"
              className="border-navy-900 text-navy-900"
            >
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="mb-8 flex justify-center">
          <span className="inline-block text-5xl">🐕</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-navy-900 mb-6 text-balance">
          One Badge. Everywhere. No Questions.
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto text-balance">
          Dog Passport is a trusted digital identity and health vault for service dogs. Show your verified badge at airports, restaurants, rideshare services, and everywhere you go.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            size="lg" 
            onClick={() => router.push('/signup')}
            className="bg-forest-600 hover:bg-forest-700 text-white"
          >
            Get Your Dog's Passport
          </Button>
        </div>

        {/* Hero Image */}
        <div className="relative w-full max-w-2xl mx-auto mb-12">
          <div className="bg-gradient-to-br from-ice-100 to-emerald-100 rounded-3xl p-8 shadow-xl">
            <div className="bg-white rounded-2xl p-6 flex flex-col items-center gap-4">
              <Image
                src="/service-dog-labrador.jpg"
                alt="Dog Passport Badge"
                width={150}
                height={150}
                className="rounded-full"
              />
              <h3 className="text-lg font-semibold text-navy-900">Buddy</h3>
              <p className="text-sm text-gray-600">Labrador Retriever • PTSD Alert</p>
              <div className="flex gap-2 flex-wrap justify-center">
                <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-xs font-semibold">✓ ADA Compliant</span>
                <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-xs font-semibold">✓ TSA Approved</span>
              </div>
              <div className="bg-white w-full rounded-lg flex items-center justify-center p-4">
                <canvas ref={qrCanvasRef} className="w-full max-w-[160px]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-transparent to-ice-50 rounded-3xl mb-12">
        <h2 className="text-4xl font-bold text-navy-900 mb-12 text-center">Why Dog Passport?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: '✓',
              title: 'Instant Verification',
              description: 'One tap QR code verification. No more paperwork, no more questions.'
            },
            {
              icon: '🛡️',
              title: 'ADA & TSA Compliant',
              description: 'Built to government standards. Your dog is legally protected everywhere.'
            },
            {
              icon: '📋',
              title: 'Complete Health Vault',
              description: 'All medical records, vaccines, and training certs in one secure place.'
            },
            {
              icon: '🏆',
              title: 'Vet Verified',
              description: 'Direct integration with your veterinarian for instant verification.'
            },
            {
              icon: '🌐',
              title: 'Multi-Mode Passport',
              description: 'Flight mode, rideshare mode, restaurant mode, and more.'
            },
            {
              icon: '🤐',
              title: 'Privacy First',
              description: 'Your medical info stays private. Only your dog\'s health matters.'
            },
          ].map((feature, i) => (
            <Card key={i} className="border border-border hover:border-forest-600 transition-colors">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-navy-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section id="benefits" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-4xl font-bold text-navy-900 mb-6">The Problem</h2>
            <div className="space-y-4 text-gray-700">
              <p className="text-lg">
                The U.S. Government doesn't have an official ID or paperwork for American (ADA) Service Dogs. 
                This creates confusion and barriers for service dog handlers everywhere.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Restaurant workers, security, and rideshare drivers regularly ask for service dog IDs that don't exist</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Handlers face rejection and discrimination despite legal protections</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Business owners lack tools to identify legitimate service dogs, risking lawsuits</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>Airline DOT forms take hours to complete and verify</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8">
            <div className="text-center">
              <span className="text-6xl mb-4 block">😔</span>
              <p className="text-lg font-semibold text-red-900 mb-2">500,000+ Service Dogs</p>
              <p className="text-sm text-red-700">Need a trusted verification system</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-8 order-2 md:order-1">
            <div className="text-center">
              <span className="text-6xl mb-4 block">✅</span>
              <p className="text-lg font-semibold text-emerald-900 mb-2">The Solution</p>
              <p className="text-sm text-emerald-700">Dog Passport - The Official ID for Service Dogs</p>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-4xl font-bold text-navy-900 mb-6">How It Works</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-navy-900 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-navy-900 mb-2">Create Your Dog's Profile</h3>
                  <p className="text-gray-700 text-sm">
                    Register your service dog with name, breed, and task information. Upload veterinary records to your secure health vault.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-navy-900 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-navy-900 mb-2">Get Verified</h3>
                  <p className="text-gray-700 text-sm">
                    Free accounts get Yellow (temporary) or Green (complete) checkmarks. Premium members ($99/year) get Blue Checkmark verification from licensed veterinarians.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-navy-900 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-navy-900 mb-2">Show Your Badge</h3>
                  <p className="text-gray-700 text-sm">
                    Scan your QR code or tap NFC at airports, restaurants, rideshares, and businesses. Instant verification, no questions asked.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Checkmark System Explanation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-ice-50 to-white rounded-3xl mb-12">
        <h2 className="text-4xl font-bold text-navy-900 mb-4 text-center">Understanding Checkmarks</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Dog Passport uses a three-tier checkmark system to indicate verification status. The Blue Checkmark is the gold standard, trusted by airlines, rideshares, and businesses nationwide.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-2 border-yellow-300 bg-yellow-50">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">Y</span>
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-2">Yellow Checkmark</h3>
              <p className="text-sm text-gray-700 mb-4">Free • Temporary</p>
              <p className="text-xs text-gray-600">
                Service dog information submitted. Valid for 7 days until veterinary records are uploaded. Helps you get started quickly.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-emerald-300 bg-emerald-50">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">✓</span>
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-2">Green Checkmark</h3>
              <p className="text-sm text-gray-700 mb-4">Free • Complete</p>
              <p className="text-xs text-gray-600">
                All information uploaded and verified. Basic verification status. Good for general public access and record keeping.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-500 bg-blue-50">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">✓</span>
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-2">Blue Checkmark</h3>
              <p className="text-sm text-gray-700 mb-4">Premium • Verified</p>
              <p className="text-xs text-gray-600">
                Veterinarian-verified and trusted by airlines, rideshares, hotels, and businesses. The most reliable verification available. $99/year or $10/month.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Detailed Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-navy-900 mb-12 text-center">Complete Solution for Service Dog Handlers</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">✈️</span>
                <h3 className="text-xl font-bold text-navy-900">Flight Mode</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Generate DOT forms in 2 clicks. TSA agents recognize the Blue Checkmark immediately. Pre-approved for major airlines including American, Delta, and United.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✓ Instant DOT form generation</li>
                <li>✓ TSA pre-approval with Blue Checkmark</li>
                <li>✓ Health certificate tracking</li>
                <li>✓ International travel documentation</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🚗</span>
                <h3 className="text-xl font-bold text-navy-900">Rideshare Mode</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Optimized verification for Uber and Lyft. Reduces rejection rates by 90%. Shows ADA 2-question rule to drivers. Instant acceptance.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✓ Uber & Lyft optimized display</li>
                <li>✓ ADA compliance information</li>
                <li>✓ One-tap verification</li>
                <li>✓ Driver education cards</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🏥</span>
                <h3 className="text-xl font-bold text-navy-900">Vet Verification Workflow</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Seamless verification process with your veterinarian. E-signatures, document review, and instant Blue Checkmark status upon approval.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✓ Request verification from your vet</li>
                <li>✓ Electronic signatures</li>
                <li>✓ Document review workflow</li>
                <li>✓ 3-5 day review process</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">📋</span>
                <h3 className="text-xl font-bold text-navy-900">Health Records Vault</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Complete digital health vault with AI-powered document sorting, expiration alerts, and drag-and-drop uploads. Never lose a record again.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✓ AI document categorization</li>
                <li>✓ Expiration alerts (30 days)</li>
                <li>✓ Desktop drag-and-drop upload</li>
                <li>✓ Mobile camera scanning</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🛡️</span>
                <h3 className="text-xl font-bold text-navy-900">Staff Education</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Printable education cards for restaurant staff, rideshare drivers, and business owners. Reduces conflicts and builds understanding.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✓ "What is a Service Dog?" guide</li>
                <li>✓ ADA 2-question rule card</li>
                <li>✓ Allergy concerns protocol</li>
                <li>✓ Breed myths debunked</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🔒</span>
                <h3 className="text-xl font-bold text-navy-900">Security & Authentication</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Biometric login, encrypted storage, and strict authentication prevent false records. Federal penalty warnings ensure compliance.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✓ Face ID / Touch ID login</li>
                <li>✓ Encrypted document storage</li>
                <li>✓ Authentication guards</li>
                <li>✓ Federal compliance (18 U.S.C. § 1001)</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-navy-900 mb-4 text-center">Simple, Transparent Pricing</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Start free. Upgrade to Premium for Blue Checkmark verification trusted by airlines, rideshares, and businesses.
        </p>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="border-2">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-navy-900 mb-2">Free</h3>
              <p className="text-4xl font-bold text-navy-900 mb-4">$0<span className="text-lg text-gray-600">/forever</span></p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-sm text-gray-700">Yellow or Green Checkmark</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-sm text-gray-700">Basic QR code badge</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-sm text-gray-700">Document storage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span className="text-sm text-gray-700">Expiration alerts</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full">Current Plan</Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-500 bg-blue-50">
            <CardContent className="p-8">
              <div className="bg-blue-600 text-white text-center py-2 rounded-lg mb-4 text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-navy-900 mb-2">Premium</h3>
              <p className="text-4xl font-bold text-navy-900 mb-1">$99<span className="text-lg text-gray-600">/year</span></p>
              <p className="text-sm text-emerald-600 font-semibold mb-4">Save $21 vs monthly</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">✓</span>
                  <span className="text-sm text-gray-700 font-semibold">Blue Checkmark - Most trusted verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">✓</span>
                  <span className="text-sm text-gray-700">Accepted by airlines, rideshares, hotels</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">✓</span>
                  <span className="text-sm text-gray-700">Instant DOT form generation (2 clicks)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">✓</span>
                  <span className="text-sm text-gray-700">NFC tap verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">✓</span>
                  <span className="text-sm text-gray-700">Priority vet verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">✓</span>
                  <span className="text-sm text-gray-700">All premium features</span>
                </li>
              </ul>
              <Button className="w-full bg-forest-600 hover:bg-forest-700 text-white">Upgrade to Premium</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-4xl font-bold text-navy-900 mb-6">Ready to Get Your Dog's Passport?</h2>
        <p className="text-xl text-gray-600 mb-8">Start for free. Verify with your vet. Go anywhere with confidence.</p>
        <Button 
          size="lg" 
          onClick={() => router.push('/signup')}
          className="bg-forest-600 hover:bg-forest-700 text-white"
        >
          Get Your Dog's Passport
        </Button>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-navy-900 mb-12 text-center">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <Card className="border border-border">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-navy-900 mb-3">What is Dog Passport?</h3>
              <p className="text-gray-700">
                Dog Passport is a trusted digital identity and health vault for service dogs. It provides instant verification through QR codes and NFC technology, making it easy to prove your service dog's status at airports, restaurants, rideshare services, and everywhere you go.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-navy-900 mb-3">How does verification work?</h3>
              <p className="text-gray-700">
                Free accounts get Yellow (temporary) or Green (complete) checkmarks. Premium members ($99/year) get Blue Checkmark verification from licensed veterinarians. The Blue Checkmark is the most trusted verification, accepted by airlines, rideshares, hotels, and businesses nationwide.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-navy-900 mb-3">What documents do I need?</h3>
              <p className="text-gray-700">
                Required documents include: Service Dog Task Attestation from trainer, current vaccinations (rabies, DHPP), and photo ID matching your Dog Passport account. Optional but helpful: Training certificates, vet letter, and ADA rights documentation.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-navy-900 mb-3">Is Dog Passport legally required?</h3>
              <p className="text-gray-700">
                No, Dog Passport is not legally required. Under the ADA, businesses can only ask two questions: "Is this a service dog?" and "What task does it perform?" However, having Dog Passport verification makes access smoother, reduces discrimination, and provides instant credibility.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-navy-900 mb-3">How do I use the QR code badge?</h3>
              <p className="text-gray-700">
                Simply open your Dog Passport wallet on your phone and show the QR code to staff, security, or anyone who needs verification. They can scan it with any QR code reader to instantly verify your service dog's status. The QR code never expires.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-navy-900 mb-3">Can I have multiple dogs on one account?</h3>
              <p className="text-gray-700">
                Yes! You can add multiple dogs to your account. Each dog gets their own profile, badge, and document vault. Premium verification applies per dog.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-navy-900 mb-3">What is the difference between Free and Premium?</h3>
              <p className="text-gray-700">
                Free accounts include Yellow or Green checkmarks, basic QR code badge, document storage, and expiration alerts. Premium ($99/year) includes Blue Checkmark verification, acceptance by airlines/rideshares/hotels, instant DOT form generation, NFC tap verification, and priority vet verification.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-border">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-navy-900 mb-3">How secure is my information?</h3>
              <p className="text-gray-700">
                Dog Passport uses encrypted document storage, biometric login (Face ID / Touch ID), and strict authentication guards. Your medical information stays private - only your dog's health and verification status are shared when you show your badge.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <p className="font-bold mb-4">Dog Passport</p>
              <p className="text-ice-100 text-sm">Trusted digital identity for service dogs.</p>
            </div>
            <div>
              <p className="font-bold mb-4">Product</p>
              <ul className="space-y-2 text-sm text-ice-100">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
            <div>
              <p className="font-bold mb-4">Resources</p>
              <ul className="space-y-2 text-sm text-ice-100">
                <li><a href="#" className="hover:text-white">Education Library</a></li>
                <li><a href="#" className="hover:text-white">ADA Rights</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <p className="font-bold mb-4">Legal</p>
              <ul className="space-y-2 text-sm text-ice-100">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-navy-800 pt-8 text-center text-sm text-ice-100">
            <p>&copy; 2025 Dog Passport. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
