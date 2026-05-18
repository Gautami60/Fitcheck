"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';
import api from '../../services/api';

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setServerError(null);
    try {
      const response = await api.post('/auth/login', data);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify({ 
          id: response.data._id, 
          name: response.data.name, 
          email: response.data.email 
        }));
        router.push('/dashboard');
      }
    } catch (error: any) {
      setServerError(error.response?.data?.message || 'Authentication failed. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-[#070707] flex flex-col justify-center items-center p-6 relative overflow-hidden">
      {/* Cinematic Ambient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <Link href="/" className="inline-block text-2xl font-bold tracking-tighter mb-12 text-white hover:opacity-80 transition-opacity">
          FITCHECK<span className="text-violet-500">.</span>
        </Link>

        <div className="glass-panel p-10 rounded-[2rem] shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <h1 className="text-3xl font-light tracking-tight mb-2 text-white">Welcome Back</h1>
          <p className="text-zinc-400 mb-8 text-sm">Enter your credentials to access your intelligence dashboard.</p>
          
          {serverError && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm backdrop-blur-md"
            >
              {serverError}
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 relative z-10">
            <div>
              <input 
                type="email" 
                placeholder="Email Address" 
                className={`w-full p-4 bg-white/5 border ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-violet-500/50'} rounded-xl text-white placeholder:text-zinc-500 outline-none focus:bg-white/10 transition-all duration-300 focus:glow-effect`}
                {...register('email')} 
              />
              {errors.email && <p className="text-red-400 text-xs mt-2 ml-2">{errors.email.message}</p>}
            </div>

            <div>
              <input 
                type="password" 
                placeholder="Password" 
                className={`w-full p-4 bg-white/5 border ${errors.password ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-violet-500/50'} rounded-xl text-white placeholder:text-zinc-500 outline-none focus:bg-white/10 transition-all duration-300 focus:glow-effect`}
                {...register('password')} 
              />
              {errors.password && <p className="text-red-400 text-xs mt-2 ml-2">{errors.password.message}</p>}
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full mt-4 p-4 bg-white text-black rounded-xl font-medium hover:bg-zinc-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 group/btn"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sign In 
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
        
        <p className="mt-8 text-center text-zinc-500 text-sm">
          Don't have an account? <Link href="/signup" className="text-white hover:text-violet-400 transition-colors">Request Access</Link>
        </p>
      </motion.div>
    </main>
  );
}
