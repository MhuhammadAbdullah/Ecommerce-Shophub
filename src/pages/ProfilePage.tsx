import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { User, Package, CreditCard, LogOut, Settings, Edit2, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const ProfilePage: React.FC = () => {
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '555-123-4567', // Mock data
    address: '123 Main St, New York, NY 10001', // Mock data
  });
  
  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({});
  
  // Sample orders data
  const orders = [
    {
      id: 'ORD-123456',
      date: '2023-06-15',
      status: 'delivered',
      total: 129.99,
      items: 3
    },
    {
      id: 'ORD-789012',
      date: '2023-05-22',
      status: 'shipped',
      total: 79.95,
      items: 2
    },
    {
      id: 'ORD-345678',
      date: '2023-04-10',
      status: 'delivered',
      total: 245.50,
      items: 4
    }
  ];
  
  // Sample payment methods
  const paymentMethods = [
    {
      id: 1,
      type: 'credit_card',
      last4: '4242',
      expMonth: 12,
      expYear: 2025,
      isDefault: true
    },
    {
      id: 2,
      type: 'credit_card',
      last4: '1234',
      expMonth: 9,
      expYear: 2024,
      isDefault: false
    }
  ];
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-16rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  const updateProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
    if (profileErrors[name]) {
      setProfileErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateProfile = () => {
    const errors: Record<string, string> = {};
    if (!profile.name.trim()) errors.name = 'Name is required';
    if (!profile.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(profile.email)) {
      errors.email = 'Email is invalid';
    }
    if (!profile.phone.trim()) errors.phone = 'Phone is required';
    if (!profile.address.trim()) errors.address = 'Address is required';
    
    setProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateProfile()) {
      return;
    }
    
    // In a real app, this would call an API to update the user profile
    setIsEditing(false);
  };
  
  const getOrderStatusClass = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'shipped':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">Your Account</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-col items-center text-center">
                <div className="h-20 w-20 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mb-4">
                  <User className="h-10 w-10 text-primary-600 dark:text-primary-400" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{user?.name}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">{user?.email}</p>
                {user?.isAdmin && (
                  <span className="mt-2 px-2 py-1 text-xs font-medium rounded-full bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-300">
                    Admin
                  </span>
                )}
              </div>
            </div>
            
            <nav className="p-2">
              <button
                className={`w-full flex items-center px-4 py-2 rounded-md text-left ${
                  activeTab === 'profile'
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab('profile')}
              >
                <User className="h-5 w-5 mr-3" />
                Profile
              </button>
              
              <button
                className={`w-full flex items-center px-4 py-2 rounded-md text-left ${
                  activeTab === 'orders'
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab('orders')}
              >
                <Package className="h-5 w-5 mr-3" />
                Orders
              </button>
              
              <button
                className={`w-full flex items-center px-4 py-2 rounded-md text-left ${
                  activeTab === 'payment'
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab('payment')}
              >
                <CreditCard className="h-5 w-5 mr-3" />
                Payment Methods
              </button>
              
              <button
                className={`w-full flex items-center px-4 py-2 rounded-md text-left ${
                  activeTab === 'settings'
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab('settings')}
              >
                <Settings className="h-5 w-5 mr-3" />
                Settings
              </button>
              
              <button
                className="w-full flex items-center px-4 py-2 rounded-md text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                onClick={logout}
              >
                <LogOut className="h-5 w-5 mr-3" />
                Logout
              </button>
            </nav>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="md:col-span-3">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="animate-fade-in">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Profile Information</h2>
                  {isEditing ? (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  )}
                </div>
                
                <div className="p-6">
                  {isEditing ? (
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                          label="Full Name"
                          name="name"
                          value={profile.name}
                          onChange={updateProfile}
                          error={profileErrors.name}
                        />
                        
                        <Input
                          label="Email"
                          name="email"
                          type="email"
                          value={profile.email}
                          onChange={updateProfile}
                          error={profileErrors.email}
                        />
                        
                        <Input
                          label="Phone"
                          name="phone"
                          value={profile.phone}
                          onChange={updateProfile}
                          error={profileErrors.phone}
                        />
                        
                        <Input
                          label="Address"
                          name="address"
                          value={profile.address}
                          onChange={updateProfile}
                          error={profileErrors.address}
                        />
                      </div>
                      
                      <div className="mt-6">
                        <Button type="submit">
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</h3>
                          <p className="mt-1 text-base text-gray-900 dark:text-white">{profile.name}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h3>
                          <p className="mt-1 text-base text-gray-900 dark:text-white">{profile.email}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</h3>
                          <p className="mt-1 text-base text-gray-900 dark:text-white">{profile.phone}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</h3>
                          <p className="mt-1 text-base text-gray-900 dark:text-white">{profile.address}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="animate-fade-in">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Order History</h2>
                </div>
                
                <div className="overflow-x-auto">
                  {orders.length > 0 ? (
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Order ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Total
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {orders.map((order) => (
                          <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                              {order.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                              {new Date(order.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getOrderStatusClass(order.status)}`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                              ${order.total.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                              <button className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300">
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="p-6 text-center">
                      <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No orders yet</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        When you place an order, it will appear here.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Payment Methods Tab */}
            {activeTab === 'payment' && (
              <div className="animate-fade-in">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Payment Methods</h2>
                </div>
                
                <div className="p-6">
                  {paymentMethods.length > 0 ? (
                    <div className="space-y-4">
                      {paymentMethods.map((method) => (
                        <div 
                          key={method.id} 
                          className={`p-4 border rounded-lg ${
                            method.isDefault 
                              ? 'border-primary-500 dark:border-primary-400' 
                              : 'border-gray-200 dark:border-gray-700'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="h-10 w-14 bg-gray-200 dark:bg-gray-700 rounded-md mr-4"></div>
                              <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  •••• •••• •••• {method.last4}
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                  Expires {method.expMonth}/{method.expYear}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center">
                              {method.isDefault && (
                                <span className="mr-4 px-2 py-1 text-xs font-medium rounded-full bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-300">
                                  Default
                                </span>
                              )}
                              <button className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300 text-sm">
                                Edit
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <Button variant="outline" className="mt-4">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Add Payment Method
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <CreditCard className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No payment methods yet</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Add a payment method to make checkout faster.
                      </p>
                      
                      <Button>
                        <CreditCard className="h-4 w-4 mr-2" />
                        Add Payment Method
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="animate-fade-in">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Account Settings</h2>
                </div>
                
                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">Email Preferences</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          id="order_updates"
                          type="checkbox"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          defaultChecked
                        />
                        <label htmlFor="order_updates" className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                          Order updates and confirmations
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="marketing"
                          type="checkbox"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          defaultChecked
                        />
                        <label htmlFor="marketing" className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                          Marketing emails and promotions
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="newsletter"
                          type="checkbox"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <label htmlFor="newsletter" className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                          Weekly newsletter
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">Security</h3>
                    <Button variant="outline">
                      Change Password
                    </Button>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4">Delete Account</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Permanently delete your account and all your data. This action cannot be undone.
                    </p>
                    <Button variant="danger">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;