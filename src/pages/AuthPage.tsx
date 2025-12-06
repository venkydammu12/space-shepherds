import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Rocket, ArrowLeft } from 'lucide-react';
import StarField from '@/components/StarField';
import { z } from 'zod';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  rollNumber: z.string().min(1, 'Roll number is required'),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least 1 symbol')
    .regex(/\s/, 'Password must contain at least 1 space'),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    rollNumber: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      if (isLogin) {
        // Validate login
        const result = loginSchema.safeParse({
          email: formData.email,
          password: formData.password,
        });

        if (!result.success) {
          const fieldErrors: Record<string, string> = {};
          result.error.errors.forEach((err) => {
            if (err.path[0]) {
              fieldErrors[err.path[0] as string] = err.message;
            }
          });
          setErrors(fieldErrors);
          setLoading(false);
          return;
        }

        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) {
          toast({
            variant: 'destructive',
            title: 'Login Failed',
            description: error.message,
          });
        } else {
          toast({
            title: 'Welcome back!',
            description: 'Redirecting to Mission Control...',
          });
          navigate('/dashboard');
        }
      } else {
        // Validate signup
        const result = signupSchema.safeParse(formData);

        if (!result.success) {
          const fieldErrors: Record<string, string> = {};
          result.error.errors.forEach((err) => {
            if (err.path[0]) {
              fieldErrors[err.path[0] as string] = err.message;
            }
          });
          setErrors(fieldErrors);
          setLoading(false);
          return;
        }

        const redirectUrl = `${window.location.origin}/`;

        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: redirectUrl,
            data: {
              name: formData.name,
              username: formData.username,
              roll_number: formData.rollNumber,
            },
          },
        });

        if (error) {
          toast({
            variant: 'destructive',
            title: 'Signup Failed',
            description: error.message,
          });
        } else if (data.user) {
          // Create profile
          const { error: profileError } = await supabase.from('profiles').insert({
            user_id: data.user.id,
            name: formData.name,
            username: formData.username,
            roll_number: formData.rollNumber,
          });

          if (profileError) {
            console.error('Profile creation error:', profileError);
          }

          toast({
            title: 'Account Created!',
            description: 'Welcome to AI Swarm Robotics. Redirecting...',
          });
          navigate('/dashboard');
        }
      }
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <StarField />

      {/* Back Button */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors z-20"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-space">Back to Home</span>
      </Link>

      {/* Auth Card */}
      <div className="w-full max-w-md relative z-10">
        <div className="glass-card rounded-2xl p-8 neon-border">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Rocket className="w-8 h-8 text-primary" />
              <span className="font-orbitron font-bold text-xl gradient-text">AI SWARM</span>
            </div>
            <h1 className="font-orbitron text-2xl font-bold text-foreground mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="font-inter text-muted-foreground">
              {isLogin ? 'Login to access Mission Control' : 'Join the space debris cleanup mission'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="font-space text-sm text-foreground mb-1 block">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-glow w-full"
                    placeholder="Enter your name"
                  />
                  {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="font-space text-sm text-foreground mb-1 block">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="input-glow w-full"
                    placeholder="Choose a username"
                  />
                  {errors.username && <p className="text-destructive text-sm mt-1">{errors.username}</p>}
                </div>

                <div>
                  <label className="font-space text-sm text-foreground mb-1 block">Roll Number</label>
                  <input
                    type="text"
                    name="rollNumber"
                    value={formData.rollNumber}
                    onChange={handleChange}
                    className="input-glow w-full"
                    placeholder="Enter your roll number"
                  />
                  {errors.rollNumber && <p className="text-destructive text-sm mt-1">{errors.rollNumber}</p>}
                </div>
              </>
            )}

            <div>
              <label className="font-space text-sm text-foreground mb-1 block">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-glow w-full"
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="font-space text-sm text-foreground mb-1 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-glow w-full pr-12"
                  placeholder={isLogin ? 'Enter password' : 'Min 8 chars, 1 symbol, 1 space'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-destructive text-sm mt-1">{errors.password}</p>}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full btn-primary-glow mt-6"
            >
              <span>{loading ? 'Please wait...' : isLogin ? 'Login' : 'Create Account'}</span>
            </Button>
          </form>

          {/* Toggle */}
          <div className="text-center mt-6">
            <p className="font-inter text-muted-foreground">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setErrors({});
                }}
                className="text-primary hover:underline ml-2 font-semibold"
              >
                {isLogin ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;