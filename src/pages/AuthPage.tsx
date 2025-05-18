import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, Mail, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

type AuthMode = 'login' | 'signup';

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  
  // Form states
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  // Form errors
  const [loginErrors, setLoginErrors] = useState<Record<string, string>>({});
  const [signupErrors, setSignupErrors] = useState<Record<string, string>>({});
  
  const updateLoginForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
    if (loginErrors[name]) {
      setLoginErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const updateSignupForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupForm(prev => ({ ...prev, [name]: value }));
    if (signupErrors[name]) {
      setSignupErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateLoginForm = () => {
    const errors: Record<string, string> = {};
    if (!loginForm.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(loginForm.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!loginForm.password) {
      errors.password = 'Password is required';
    } else if (loginForm.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setLoginErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const validateSignupForm = () => {
    const errors: Record<string, string> = {};
    if (!signupForm.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!signupForm.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(signupForm.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!signupForm.password) {
      errors.password = 'Password is required';
    } else if (signupForm.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (!signupForm.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (signupForm.password !== signupForm.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setSignupErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!validateLoginForm()) {
      return;
    }
    
    setIsLoading(true);
    try {
      const success = await login(loginForm.email, loginForm.password);
      if (success) {
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!validateSignupForm()) {
      return;
    }
    
    setIsLoading(true);
    try {
      const success = await signup(signupForm.name, signupForm.email, signupForm.password);
      if (success) {
        navigate('/');
      } else {
        setError('This email is already registered');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setError(null);
  };

  // Demo login credentials
  const handleDemoLogin = async () => {
    setIsLoading(true);
    try {
      const success = await login('user@example.com', 'password123');
      if (success) {
        navigate('/');
      } else {
        setError('Demo login failed. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center px-4 py-12 animate-fade-in">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {mode === 'login' 
              ? 'Sign in to your account to continue' 
              : 'Create a new account to get started'}
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 p-3 rounded-md text-sm">
            {error}
          </div>
        )}
        
        {mode === 'login' ? (
          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <div className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={loginForm.email}
                onChange={updateLoginForm}
                error={loginErrors.email}
                autoComplete="email"
              />
              
              <Input
                label="Password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={loginForm.password}
                onChange={updateLoginForm}
                error={loginErrors.password}
                autoComplete="current-password"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Remember me
                </label>
              </div>
              
              <div className="text-sm">
                <a href="#" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                  Forgot password?
                </a>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button
                type="submit"
                fullWidth
                isLoading={isLoading}
              >
                <LogIn className="h-5 w-5 mr-2" />
                Sign In
              </Button>
              
              <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                or
              </div>
              
              <Button
                variant="outline"
                fullWidth
                onClick={handleDemoLogin}
                disabled={isLoading}
              >
                <User className="h-5 w-5 mr-2" />
                Continue with Demo Account
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="mt-8 space-y-6">
            <div className="space-y-4">
              <Input
                label="Full Name"
                type="text"
                name="name"
                placeholder="John Doe"
                value={signupForm.name}
                onChange={updateSignupForm}
                error={signupErrors.name}
                autoComplete="name"
              />
              
              <Input
                label="Email Address"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={signupForm.email}
                onChange={updateSignupForm}
                error={signupErrors.email}
                autoComplete="email"
              />
              
              <Input
                label="Password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={signupForm.password}
                onChange={updateSignupForm}
                error={signupErrors.password}
                autoComplete="new-password"
              />
              
              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={signupForm.confirmPassword}
                onChange={updateSignupForm}
                error={signupErrors.confirmPassword}
                autoComplete="new-password"
              />
            </div>
            
            <div className="space-y-3">
              <Button
                type="submit"
                fullWidth
                isLoading={isLoading}
              >
                <Mail className="h-5 w-5 mr-2" />
                Create Account
              </Button>
            </div>
          </form>
        )}
        
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={toggleMode}
            className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
          >
            {mode === 'login' 
              ? 'Don\'t have an account? Sign up' 
              : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;