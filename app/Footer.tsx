"use client";
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Processing...');

    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    
    if (res.ok) {
      setStatus('Welcome to the syndicate.');
      setEmail(''); 
    } else {
      setStatus(data.error || 'Something went wrong.');
    }
  };

  return (
    <footer className="w-full border-t border-gray-800 bg-black py-12 mt-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h3 className="text-2xl font-bold tracking-widest text-white mb-4">THE SYNDICATE</h3>
        <p className="text-gray-400 mb-6">Gain early access to Drop 002. No spam, only heat.</p>
        
        {/* Subscription Form */}
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 justify-center max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 bg-transparent border border-gray-600 text-white px-4 py-3 focus:outline-none focus:border-white transition-colors"
            required
          />
          <button type="submit" className="bg-white text-black px-8 py-3 font-bold hover:bg-gray-200 transition-colors">
            JOIN
          </button>
        </form>
        
        {/* Success/Error Message */}
        {status && (
          <p className="text-sm mt-4 text-gray-300 font-mono tracking-wide">{status}</p>
        )}

        {/* Support Link */}
        <div className="mt-10 pt-8 border-t border-gray-900">
          <a 
            href="mailto:support@crazystreetwears.in" 
            className="text-gray-500 hover:text-white transition-colors text-xs uppercase tracking-widest"
          >
            Support / Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
}