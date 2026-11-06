"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import api from '../../services/api';

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    setServerError(null);
    try {
      const response = await api.post('/auth/signup', data);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem(
          'user',
          JSON.stringify({
            id: response.data._id,
            name: response.data.name,
            email: response.data.email,
          })
        );
        router.push('/dashboard');
      }
    } catch (error: any) {
      setServerError(error.response?.data?.message || 'Registration failed. Please verify information.');
    }
  };

  return (
    <main className="min-h-screen bg-white text-[#151413] flex flex-col justify-between p-6 sm:p-12 font-sans selection:bg-[#0E0E0E] selection:text-white">
      
      {/* Top Header */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-light tracking-[0.25em] text-[#151413] uppercase hover:opacity-80 transition-opacity"
        >
          F I T C H E C K
        </Link>
        <span className="text-[10px] uppercase tracking-widest text-[#66625C] font-mono">
          CLIENT REGISTRATION
        </span>
      </div>

      {/* Main Authentication Card */}
      <div className="max-w-md w-full mx-auto my-12 border border-[#C8C8C8] p-8 sm:p-12 bg-white space-y-8">
        
        <div>
          <span className="editorial-subheading text-[#66625C] block mb-2">
            Join Fitcheck
          </span>
          <h1 className="text-3xl font-light tracking-tight text-[#151413]">
            Request Client Access
          </h1>
          <p className="text-xs text-[#66625C] font-light mt-2 leading-relaxed">
            Create an account to calibrate your personal style archetype and curate your runway archive.
          </p>
        </div>

        {/* Server Error Message */}
        {serverError && (
          <div className="p-4 bg-[#FFF8F8] border border-[#F0D0D0] text-xs text-[#8A2525] flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold uppercase tracking-wider block mb-0.5">
                Registration Error
              </span>
              <p className="font-light">{serverError}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#151413] block">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Julian Laurent"
              className={`w-full p-4 bg-white border text-xs text-[#151413] outline-none transition-colors ${
                errors.name ? 'border-red-500' : 'border-[#C8C8C8] focus:border-[#151413]'
              }`}
              {...register('name')}
            />
            {errors.name && (
              <p className="text-red-600 text-[11px] mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#151413] block">
              Email Address
            </label>
            <input
              type="email"
              placeholder="client@fitcheck.com"
              className={`w-full p-4 bg-white border text-xs text-[#151413] outline-none transition-colors ${
                errors.email ? 'border-red-500' : 'border-[#C8C8C8] focus:border-[#151413]'
              }`}
              {...register('email')}
            />
            {errors.email && (
              <p className="text-red-600 text-[11px] mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#151413] block">
              Password (Min 6 Characters)
            </label>
            <input
              type="password"
              placeholder="••••••••••••"
              className={`w-full p-4 bg-white border text-xs text-[#151413] outline-none transition-colors ${
                errors.password ? 'border-red-500' : 'border-[#C8C8C8] focus:border-[#151413]'
              }`}
              {...register('password')}
            />
            {errors.password && (
              <p className="text-red-600 text-[11px] mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4.5 bg-[#0E0E0E] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#2A2927] transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Create Account</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        <div className="pt-6 border-t border-[#DFDFDF] text-center">
          <p className="text-xs text-[#66625C] font-light">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-[#151413] font-medium underline underline-offset-4 hover:opacity-80"
            >
              Sign In
            </Link>
          </p>
        </div>

      </div>

      {/* Footer Info */}
      <div className="max-w-md w-full mx-auto text-center text-[10px] text-[#66625C] uppercase tracking-wider">
        Fitcheck Style Intelligence &bull; Secure Protocol
      </div>

    </main>
  );
}
