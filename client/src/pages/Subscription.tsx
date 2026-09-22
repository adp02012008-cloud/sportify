import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Sparkles, Shield, Zap, Heart, Star, CreditCard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { api } from '../services/api';

export const Subscription: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUser, isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const [processingPlan, setProcessingPlan] = useState<string | null>(null);

  const plans = [
    {
      id: 'free',
      name: 'Free Starter',
      price: '₹0',
      period: 'forever',
      amount: 0,
      description: 'Stream with occasional interludes and standard audio quality.',
      features: [
        'Over 50+ hand-curated tracks',
        'Standard audio quality (160 kbps)',
        'Basic playlist creation',
        'Mobile & desktop streaming',
      ],
      current: user?.role === 'USER' && !user?.isPremium,
      buttonText: 'Current Plan',
      gradient: 'from-gray-700 to-gray-900',
    },
    {
      id: 'student',
      name: 'Student Premium',
      price: '₹59',
      period: 'per month',
      amount: 59,
      description: 'Discounted premium audio experience for enrolled students.',
      features: [
        'Ad-free uninterrupted streaming',
        'High-fidelity 320 kbps audio',
        'Unlimited track skips & queueing',
        'Offline caching simulation',
        '1 verified student account',
      ],
      current: false,
      buttonText: 'Get Student Plan',
      gradient: 'from-blue-600 to-indigo-900',
    },
    {
      id: 'individual',
      name: 'Individual Premium',
      price: '₹119',
      period: 'per month',
      amount: 119,
      popular: true,
      description: 'The ultimate sound experience with lossless audio and Blend.',
      features: [
        'Completely ad-free listening',
        'Studio Lossless Audio (320 kbps)',
        'SoundWave Blend collaborative mixes',
        'Seamless dynamic crossfade',
        'Synchronized realtime lyrics',
        'Cancel anytime with 1 click',
      ],
      current: user?.role === 'PREMIUM_USER',
      buttonText: user?.role === 'PREMIUM_USER' ? 'Active Plan' : 'Subscribe Now',
      gradient: 'from-cyan-500 via-purple-600 to-pink-600',
    },
    {
      id: 'family',
      name: 'Family Sound',
      price: '₹179',
      period: 'per month',
      amount: 179,
      description: 'Premium streaming for up to 6 family members under one roof.',
      features: [
        'Up to 6 separate individual accounts',
        'Explicit content toggle filter',
        'Shared Family Mix playlist',
        'All Individual Premium features',
        'Separate listening history for all',
      ],
      current: false,
      buttonText: 'Get Family Plan',
      gradient: 'from-purple-700 to-pink-900',
    },
  ];

  const handleSubscribe = async (plan: (typeof plans)[0]) => {
    if (plan.amount === 0) {
      addToast('You are already on the Free tier.', 'info');
      return;
    }

    if (!isAuthenticated) {
      addToast('Please log in to upgrade your subscription', 'warning');
      navigate('/login');
      return;
    }

    try {
      setProcessingPlan(plan.id);

      // 1. Call server to create Razorpay order
      const orderRes = await api.payments.createOrder({
        amount: plan.amount,
        planName: plan.name,
      });

      const { order, keyId } = orderRes.data;

      // 2. Check if Razorpay checkout script is available on window
      const Razorpay = (window as any).Razorpay;

      if (Razorpay) {
        const options = {
          key: keyId,
          amount: order.amount,
          currency: order.currency,
          name: 'SoundWave Music',
          description: `${plan.name} Subscription`,
          order_id: order.id,
          handler: async (response: any) => {
            try {
              // 3. Verify payment signature on backend
              const verifyRes = await api.payments.verify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                planName: plan.name,
                amount: plan.amount,
              });

              if (verifyRes.data.success) {
                updateUser({ role: 'PREMIUM_USER', isPremium: true });
                addToast(`Congratulations! You are now subscribed to ${plan.name}`, 'success');
                navigate('/payments');
              }
            } catch (err) {
              console.error('Payment verification failed', err);
              addToast('Payment verification failed. Please check your credentials.', 'error');
            }
          },
          prefill: {
            name: user?.name || 'SoundWave Listener',
            email: user?.email || 'user@soundwave.io',
          },
          theme: {
            color: '#06b6d4',
          },
        };

        const rzp = new Razorpay(options);
        rzp.on('payment.failed', function (response: any) {
          addToast(`Payment failed: ${response.error.description}`, 'error');
        });
        rzp.open();
      } else {
        // Fallback simulation if razorpay.js is prevented from loading in sandbox/offline
        addToast('Razorpay initialized in Test Simulator Mode', 'info');
        const simulatedPaymentId = `pay_sim_${Date.now()}`;
        const verifyRes = await api.payments.verify({
          razorpay_order_id: order.id,
          razorpay_payment_id: simulatedPaymentId,
          razorpay_signature: 'test_signature_valid',
          planName: plan.name,
          amount: plan.amount,
        });

        if (verifyRes.data.success) {
          updateUser({ role: 'PREMIUM_USER', isPremium: true });
          addToast(`Upgraded to ${plan.name}! Enjoy Lossless SoundWave.`, 'success');
          navigate('/payments');
        }
      }
    } catch (err: any) {
      console.error('Subscription order error', err);
      addToast(err.response?.data?.message || 'Could not initiate checkout', 'error');
    } finally {
      setProcessingPlan(null);
    }
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3 pt-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
          <Sparkles size={14} />
          <span>SoundWave Premium Access</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Sound like you've never heard before.
        </h1>
        <p className="text-sm text-gray-400">
          Unleash 320 kbps high-fidelity audio, ad-free listening, dynamic crossfade, and collaborative blend playlists.
        </p>
      </div>

      {/* Plan Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-3xl p-6 flex flex-col justify-between border transition-all duration-300 ${
              plan.popular
                ? 'bg-[#15172d] border-cyan-400/60 shadow-2xl shadow-cyan-500/15 ring-2 ring-cyan-400/40 -translate-y-1'
                : 'bg-[#131424] hover:bg-[#18192e] border-[#25284b] shadow-xl'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 text-black text-[11px] font-bold shadow-md">
                MOST POPULAR
              </div>
            )}

            <div>
              <h3 className="text-lg font-bold text-white">{plan.name}</h3>
              <p className="text-xs text-gray-400 mt-1 min-h-[32px]">{plan.description}</p>

              {/* Price */}
              <div className="mt-4 pb-4 border-b border-[#242749]">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">{plan.price}</span>
                  <span className="text-xs text-gray-400">{plan.period}</span>
                </div>
              </div>

              {/* Features List */}
              <ul className="mt-5 space-y-2.5">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-gray-300">
                    <Check size={16} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Subscribe Action Button */}
            <button
              onClick={() => handleSubscribe(plan)}
              disabled={plan.current || processingPlan === plan.id}
              className={`w-full mt-6 py-3 rounded-xl text-xs font-bold transition-all shadow-lg ${
                plan.current
                  ? 'bg-[#1e213b] text-gray-400 border border-[#2b2f54] cursor-default'
                  : plan.popular
                  ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-black hover:opacity-90 active:scale-95 shadow-cyan-500/25'
                  : 'bg-white text-black hover:bg-gray-200 active:scale-95'
              }`}
            >
              {processingPlan === plan.id ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Connecting Razorpay...</span>
                </span>
              ) : (
                plan.buttonText
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Trust & Guarantee Banner */}
      <div className="p-6 rounded-3xl bg-[#121425] border border-[#232749] flex flex-col sm:flex-row items-center justify-around gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <Shield size={24} className="text-cyan-400 flex-shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-white">Razorpay Secured Checkout</h4>
            <p className="text-[11px] text-gray-400">All payments processed with 256-bit SSL encryption</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Zap size={24} className="text-purple-400 flex-shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-white">Instant Activation</h4>
            <p className="text-[11px] text-gray-400">Your account upgrades immediately upon transaction</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <CreditCard size={24} className="text-pink-400 flex-shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-white">Cancel Anytime</h4>
            <p className="text-[11px] text-gray-400">No lock-ins. Switch plans or cancel anytime in settings</p>
          </div>
        </div>
      </div>
    </div>
  );
};
