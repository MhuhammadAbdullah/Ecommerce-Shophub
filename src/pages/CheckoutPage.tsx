import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Shield, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

type CheckoutStep = 'shipping' | 'payment' | 'review';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form states
  const [shippingForm, setShippingForm] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: '',
    email: ''
  });
  
  const [paymentForm, setPaymentForm] = useState({
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: ''
  });
  
  // Form errors
  const [shippingErrors, setShippingErrors] = useState<Record<string, string>>({});
  const [paymentErrors, setPaymentErrors] = useState<Record<string, string>>({});
  
  // Update form handlers
  const updateShippingForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingForm(prev => ({ ...prev, [name]: value }));
    // Clear error when typing
    if (shippingErrors[name]) {
      setShippingErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const updatePaymentForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentForm(prev => ({ ...prev, [name]: value }));
    // Clear error when typing
    if (paymentErrors[name]) {
      setPaymentErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  // Validation
  const validateShippingForm = () => {
    const errors: Record<string, string> = {};
    if (!shippingForm.firstName.trim()) errors.firstName = 'First name is required';
    if (!shippingForm.lastName.trim()) errors.lastName = 'Last name is required';
    if (!shippingForm.address.trim()) errors.address = 'Address is required';
    if (!shippingForm.city.trim()) errors.city = 'City is required';
    if (!shippingForm.state.trim()) errors.state = 'State is required';
    if (!shippingForm.zipCode.trim()) errors.zipCode = 'ZIP code is required';
    if (!shippingForm.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(shippingForm.email)) {
      errors.email = 'Email is invalid';
    }
    if (!shippingForm.phone.trim()) errors.phone = 'Phone number is required';
    
    setShippingErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const validatePaymentForm = () => {
    const errors: Record<string, string> = {};
    if (!paymentForm.cardName.trim()) errors.cardName = 'Name on card is required';
    if (!paymentForm.cardNumber.trim()) {
      errors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(paymentForm.cardNumber.replace(/\s/g, ''))) {
      errors.cardNumber = 'Card number must be 16 digits';
    }
    if (!paymentForm.expDate.trim()) {
      errors.expDate = 'Expiration date is required';
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentForm.expDate)) {
      errors.expDate = 'Use format MM/YY';
    }
    if (!paymentForm.cvv.trim()) {
      errors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(paymentForm.cvv)) {
      errors.cvv = 'CVV must be 3 or 4 digits';
    }
    
    setPaymentErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Step navigation
  const handleNext = () => {
    if (currentStep === 'shipping' && validateShippingForm()) {
      setCurrentStep('payment');
    } else if (currentStep === 'payment' && validatePaymentForm()) {
      setCurrentStep('review');
    }
  };
  
  const handlePrevious = () => {
    if (currentStep === 'payment') {
      setCurrentStep('shipping');
    } else if (currentStep === 'review') {
      setCurrentStep('payment');
    }
  };
  
  // Submit order
  const handleSubmitOrder = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Create order ID
    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    
    // Clear cart and redirect to confirmation
    clearCart();
    navigate(`/order-confirmation/${orderId}`);
  };
  
  // Calculate order summary
  const calculateShipping = () => {
    const subtotal = getTotalPrice();
    return subtotal >= 50 ? 0 : 4.99;
  };
  
  const calculateTax = () => {
    return getTotalPrice() * 0.07;
  };
  
  const shippingCost = calculateShipping();
  const tax = calculateTax();
  const total = getTotalPrice() + shippingCost + tax;
  
  if (items.length === 0) {
    navigate('/cart');
    return null;
  }
  
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Checkout</h1>
      
      {/* Checkout Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center">
          <div className={`flex items-center ${currentStep === 'shipping' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'}`}>
            <div className={`h-10 w-10 rounded-full flex items-center justify-center border-2 ${currentStep === 'shipping' ? 'border-primary-600 dark:border-primary-400 bg-primary-50 dark:bg-primary-900' : 'border-gray-300 dark:border-gray-700'}`}>
              <Truck className="h-5 w-5" />
            </div>
            <span className="ml-2 text-sm font-medium md:text-base">Shipping</span>
          </div>
          
          <div className={`w-12 md:w-24 h-1 mx-2 ${currentStep === 'shipping' ? 'bg-gray-300 dark:bg-gray-700' : 'bg-primary-600 dark:bg-primary-400'}`}></div>
          
          <div className={`flex items-center ${currentStep === 'payment' ? 'text-primary-600 dark:text-primary-400' : currentStep === 'review' ? 'text-gray-500 dark:text-gray-400' : 'text-gray-400 dark:text-gray-600'}`}>
            <div className={`h-10 w-10 rounded-full flex items-center justify-center border-2 ${
              currentStep === 'payment' 
                ? 'border-primary-600 dark:border-primary-400 bg-primary-50 dark:bg-primary-900' 
                : currentStep === 'review' 
                  ? 'border-gray-300 dark:border-gray-700' 
                  : 'border-gray-300 dark:border-gray-700'
            }`}>
              <CreditCard className="h-5 w-5" />
            </div>
            <span className="ml-2 text-sm font-medium md:text-base">Payment</span>
          </div>
          
          <div className={`w-12 md:w-24 h-1 mx-2 ${currentStep === 'review' ? 'bg-primary-600 dark:bg-primary-400' : 'bg-gray-300 dark:bg-gray-700'}`}></div>
          
          <div className={`flex items-center ${currentStep === 'review' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 dark:text-gray-600'}`}>
            <div className={`h-10 w-10 rounded-full flex items-center justify-center border-2 ${currentStep === 'review' ? 'border-primary-600 dark:border-primary-400 bg-primary-50 dark:bg-primary-900' : 'border-gray-300 dark:border-gray-700'}`}>
              <Shield className="h-5 w-5" />
            </div>
            <span className="ml-2 text-sm font-medium md:text-base">Review</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            {/* Shipping Information */}
            {currentStep === 'shipping' && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Shipping Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    name="firstName"
                    value={shippingForm.firstName}
                    onChange={updateShippingForm}
                    error={shippingErrors.firstName}
                  />
                  <Input
                    label="Last Name"
                    name="lastName"
                    value={shippingForm.lastName}
                    onChange={updateShippingForm}
                    error={shippingErrors.lastName}
                  />
                </div>
                
                <Input
                  label="Street Address"
                  name="address"
                  value={shippingForm.address}
                  onChange={updateShippingForm}
                  error={shippingErrors.address}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="City"
                    name="city"
                    value={shippingForm.city}
                    onChange={updateShippingForm}
                    error={shippingErrors.city}
                  />
                  <Input
                    label="State"
                    name="state"
                    value={shippingForm.state}
                    onChange={updateShippingForm}
                    error={shippingErrors.state}
                  />
                  <Input
                    label="ZIP Code"
                    name="zipCode"
                    value={shippingForm.zipCode}
                    onChange={updateShippingForm}
                    error={shippingErrors.zipCode}
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Country
                  </label>
                  <select 
                    name="country"
                    value={shippingForm.country}
                    onChange={(e) => setShippingForm(prev => ({ ...prev, country: e.target.value }))}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={shippingForm.email}
                    onChange={updateShippingForm}
                    error={shippingErrors.email}
                  />
                  <Input
                    label="Phone"
                    type="tel"
                    name="phone"
                    value={shippingForm.phone}
                    onChange={updateShippingForm}
                    error={shippingErrors.phone}
                  />
                </div>
              </div>
            )}
            
            {/* Payment Information */}
            {currentStep === 'payment' && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Payment Information</h2>
                
                <div className="mb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center mb-4">
                    <Shield className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
                    Your payment information is encrypted and secure
                  </p>
                  
                  <div className="flex space-x-2 mb-6">
                    <div className="w-12 h-8 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                    <div className="w-12 h-8 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                    <div className="w-12 h-8 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                    <div className="w-12 h-8 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                  </div>
                </div>
                
                <Input
                  label="Name on Card"
                  name="cardName"
                  value={paymentForm.cardName}
                  onChange={updatePaymentForm}
                  error={paymentErrors.cardName}
                />
                
                <Input
                  label="Card Number"
                  name="cardNumber"
                  placeholder="XXXX XXXX XXXX XXXX"
                  value={paymentForm.cardNumber}
                  onChange={updatePaymentForm}
                  error={paymentErrors.cardNumber}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Expiration Date"
                    name="expDate"
                    placeholder="MM/YY"
                    value={paymentForm.expDate}
                    onChange={updatePaymentForm}
                    error={paymentErrors.expDate}
                  />
                  <Input
                    label="CVV"
                    name="cvv"
                    placeholder="XXX"
                    value={paymentForm.cvv}
                    onChange={updatePaymentForm}
                    error={paymentErrors.cvv}
                  />
                </div>
              </div>
            )}
            
            {/* Review Order */}
            {currentStep === 'review' && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Review Your Order</h2>
                
                <div className="mb-8">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">Shipping Information</h3>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-gray-800 dark:text-gray-200">
                      {shippingForm.firstName} {shippingForm.lastName}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {shippingForm.address}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {shippingForm.city}, {shippingForm.state} {shippingForm.zipCode}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {shippingForm.country}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      {shippingForm.email}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {shippingForm.phone}
                    </p>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">Payment Information</h3>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-gray-800 dark:text-gray-200">
                      {paymentForm.cardName}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      **** **** **** {paymentForm.cardNumber.slice(-4)}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Expires: {paymentForm.expDate}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">Order Items</h3>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg divide-y divide-gray-200 dark:divide-gray-600">
                    {items.map((item) => (
                      <div key={item.product.id} className="py-3 flex justify-between">
                        <div className="flex items-center">
                          <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-600">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {item.product.name}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between">
              {currentStep !== 'shipping' ? (
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                >
                  Back
                </Button>
              ) : (
                <div></div>
              )}
              
              {currentStep !== 'review' ? (
                <Button
                  onClick={handleNext}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  onClick={handleSubmitOrder}
                  isLoading={isSubmitting}
                >
                  Place Order
                </Button>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 sticky top-20">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h2>
            
            <div className="space-y-1 mb-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {items.reduce((total, item) => total + item.quantity, 0)} item(s)
              </div>
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between py-1 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {item.quantity} x {item.product.name.length > 20 ? `${item.product.name.substring(0, 20)}...` : item.product.name}
                  </span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 space-y-3">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Shipping</span>
                <span>
                  {shippingCost === 0 ? (
                    <span className="text-green-600 dark:text-green-400">Free</span>
                  ) : (
                    `$${shippingCost.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Tax (7%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                <div className="flex justify-between font-semibold text-lg text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;