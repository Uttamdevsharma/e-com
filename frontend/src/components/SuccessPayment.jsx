import axios from 'axios';
import React, { useEffect, useState } from 'react';
// Assuming these imports are correct for your project structure
import { getBaseUrl } from '../utils/gateBaseUrl'; 
import Loading from './Loading';
import TimelineStep from './TimelineStep.jsx'; 

const steps = [
  {
    status: 'pending',
    label: 'Order Placed',
    description: 'Your order has been created and is awaiting processing.',
    icon: { iconName: 'edit-2-line', bgColor: 'red-500', textColor: 'gray-800' },
  },
  {
    status: 'processing',
    label: 'Processing Order',
    description: 'Your order is currently being prepared and packaged.',
    icon: { iconName: 'loader-line', bgColor: 'yellow-500', textColor: 'yellow-800' },
  },
  {
    status: 'shipped',
    label: 'Order Shipped',
    description: 'Your order has been handed over to the courier and is on its way.',
    icon: { iconName: 'truck-line', bgColor: 'blue-800', textColor: 'blue-100' },
  },
  {
    status: 'completed',
    label: 'Delivered',
    description: 'Your order has been successfully delivered and completed.',
    icon: { iconName: 'check-line', bgColor: 'green-800', textColor: 'white' },
  },
];

const SuccessPayment = () => {
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const sessionId = query.get("session_id");

    if (sessionId) {
      const confirmPayment = async () => {
        try {
          const response = await axios.post(`${getBaseUrl()}/api/orders/confirm-payment`, {
            session_id: sessionId
          }, {
            headers: { 'Content-Type': 'application/json' }
          });

          if (response?.data?.data) {
            setOrder(response.data.data);
          } else {
            console.error("Order data not found in response:", response.data);
          }
        } catch (error) {
          console.error("Failed to confirm payment:", error);
        } finally {
          setIsLoading(false);
        }
      }

      confirmPayment();
    } else setIsLoading(false);
  }, []);

  if (isLoading) return <Loading />;

  // Helper function: Checks if the step's status is *before* the current order status
  const isCompleted = (status) => {
    const statuses = ['pending', 'processing', 'shipped', 'completed'];
    // isCompleted is true if the status index is LESS THAN the current order status index
    return order && statuses.indexOf(status) < statuses.indexOf(order.status);
  }

  // Helper function: Checks if the step's status *matches* the current order status
  const isCurrent = (status) => order?.status === status;

  if (!order) {
    return (
      <div className="pt-24 flex justify-center">
        <h1 className="text-xl font-medium text-gray-700">
          Payment successful, but order details not found.
        </h1>
      </div>
    );
  }

  return (
    <div className="pt-24 px-4 md:px-10 max-w-screen-xl mx-auto mb-20">
      
      {/* ✅ Success Header Banner */}
      <div className="text-center mb-12 p-6 bg-green-50 border-t-4 border-green-500 rounded-lg shadow-lg">
        <i className="ri-checkbox-circle-fill text-5xl text-green-600 mb-3"></i>
        <h2 className="text-3xl font-bold mb-2 text-gray-800">Order Placed Successfully!</h2>
        <p className="text-lg text-gray-600">
          Thank you for your purchase. A confirmation email has been sent.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* 📝 Order Details Card (Left Side) */}
        <div className="lg:w-1/3 p-6 bg-white border border-gray-200 rounded-xl shadow-md h-fit">
          <h3 className="text-xl font-bold mb-4 border-b pb-2 text-gray-800">Order Summary</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Order ID:</span>
              <span className="font-semibold text-gray-800">{order.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Current Status:</span>
              {/* Dynamic badge based on status */}
              <span className={`font-bold uppercase text-xs px-3 py-1 rounded-full ${order.status === 'completed' ? 'bg-green-100 text-green-800' : order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                {order.status}
              </span>
            </div>
            {/* Display total if available */}
            {order.amount && (
                <div className="flex justify-between pt-3 border-t mt-3">
                    <span className="text-gray-700 font-bold">Order Total:</span>
                    <span className="text-lg font-bold text-gray-900">${order.amount.toFixed(2)}</span>
                </div>
            )}
            {/* Display Updated At */}
            <div className="flex justify-between">
              <span className="text-gray-500">Last Updated:</span>
              <span className="font-medium text-gray-600">{order.updatedAt ? new Date(order.updatedAt).toLocaleDateString() : 'N/A'}</span>
            </div>
          </div>
          
          <button className="w-full mt-6 py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300">
            View Full Order Details
          </button>
        </div>

        {/* ⏳ Order Tracking Timeline (Right Side) */}
        <div className="lg:w-2/3">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Order Tracking Timeline</h3>
          {/* Vertical Timeline Structure (border-s provides the main line) */}
          <ol className="relative border-s border-gray-300 dark:border-gray-700">
            {steps.map((step, index) => (
              <TimelineStep
                key={index}
                step={step}
                order={order}
                isCompleted={isCompleted(step.status)}
                isCurrent={isCurrent(step.status)}
                icon={step.icon}
                description={step.description}
              />
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default SuccessPayment;