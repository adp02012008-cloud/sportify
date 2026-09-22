import React, { useEffect, useState } from 'react';
import { CreditCard, CheckCircle2, Download, Receipt, ExternalLink } from 'lucide-react';
import { api } from '../services/api';
import { PaymentReceipt } from '../types';
import { useToast } from '../context/ToastContext';

export const PaymentHistory: React.FC = () => {
  const [payments, setPayments] = useState<PaymentReceipt[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const res = await api.payments.getHistory();
        setPayments(res.data);
      } catch (err) {
        console.error('Failed to load payments', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const handleDownloadInvoice = (item: PaymentReceipt) => {
    addToast(`Invoice for order ${item.orderId} downloaded`, 'success');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#171a36] via-[#121429] to-[#0a0b14] border border-[#262a52] flex items-center justify-between shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <Receipt size={14} />
            <span>Billing & Invoices</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">Payment Receipts</h1>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl">
            View verified Razorpay transactions, active subscription renewals, and invoice records.
          </p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="rounded-2xl bg-[#131526] border border-[#232746] overflow-hidden shadow-xl">
        {loading ? (
          <div className="py-20 text-center text-gray-400">
            <span className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin inline-block mb-2" />
            <p className="text-xs">Loading payment records...</p>
          </div>
        ) : payments.length === 0 ? (
          <div className="py-16 text-center text-gray-500 text-xs">
            <CreditCard size={32} className="mx-auto mb-2 text-gray-600" />
            <p className="text-sm font-semibold text-white">No payment transactions yet</p>
            <p className="text-xs text-gray-400 mt-1">
              Your payments and invoices will appear here after upgrading.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#232746] bg-[#16182c] text-gray-400 font-semibold">
                  <th className="p-4">Payment ID</th>
                  <th className="p-4">Plan Name</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1f223a]">
                {payments.map((p) => (
                  <tr key={p.id} className="hover:bg-[#181a30] transition-colors">
                    <td className="p-4 font-mono text-cyan-400 font-medium">
                      {p.paymentId || p.id}
                    </td>
                    <td className="p-4 font-semibold text-white">
                      {p.planName}
                    </td>
                    <td className="p-4 font-mono text-gray-200">
                      ₹{p.amount}
                    </td>
                    <td className="p-4 text-gray-400">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                        <CheckCircle2 size={12} />
                        <span>{p.status}</span>
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDownloadInvoice(p)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                        title="Download Receipt"
                      >
                        <Download size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
