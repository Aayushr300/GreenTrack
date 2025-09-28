// // import React, { useState, useEffect } from "react";
// // import { offsetAPI } from "../../services/api";

// // const OffsetCalculator = () => {
// //   const [carbonAmount, setCarbonAmount] = useState(100);
// //   const [cost, setCost] = useState(0);
// //   const [loading, setLoading] = useState(false);
// //   const [history, setHistory] = useState([]);

// //   useEffect(() => {
// //     calculateCost();
// //     fetchOffsetHistory();
// //   }, [carbonAmount]);

// //   const calculateCost = async () => {
// //     try {
// //       const response = await offsetAPI.calculateCost(carbonAmount);
// //       setCost(response.data.data.cost);
// //     } catch (error) {
// //       console.error("Error calculating cost:", error);
// //     }
// //   };

// //   const fetchOffsetHistory = async () => {
// //     try {
// //       const response = await offsetAPI.getHistory();
// //       setHistory(response.data.data);
// //     } catch (error) {
// //       console.error("Error fetching offset history:", error);
// //     }
// //   };

// //   const handleOffsetPurchase = async () => {
// //     setLoading(true);
// //     try {
// //       // Simulate payment process
// //       const paymentResponse = await offsetAPI.createPayment({
// //         carbonAmount,
// //         project: "Renewable Energy Project",
// //       });

// //       // Confirm payment
// //       await offsetAPI.confirmPayment({
// //         paymentIntentId: paymentResponse.data.data.paymentIntent.id,
// //         carbonAmount,
// //         amount: paymentResponse.data.data.paymentIntent.amount,
// //         project: "Renewable Energy Project",
// //       });

// //       alert(`Successfully offset ${carbonAmount} kg CO₂!`);
// //       fetchOffsetHistory();
// //     } catch (error) {
// //       console.error("Error purchasing offset:", error);
// //       alert("Error purchasing offset. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="space-y-6">
// //       {/* Offset Calculator */}
// //       <div className="bg-white rounded-lg shadow p-6">
// //         <h2 className="text-xl font-semibold mb-4">Purchase Carbon Offsets</h2>

// //         <div className="space-y-4">
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-2">
// //               Carbon Amount to Offset (kg CO₂)
// //             </label>
// //             <input
// //               type="range"
// //               min="10"
// //               max="1000"
// //               step="10"
// //               value={carbonAmount}
// //               onChange={(e) => setCarbonAmount(parseInt(e.target.value))}
// //               className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
// //             />
// //             <div className="flex justify-between text-sm text-gray-600 mt-2">
// //               <span>10 kg</span>
// //               <span className="font-semibold">{carbonAmount} kg</span>
// //               <span>1000 kg</span>
// //             </div>
// //           </div>

// //           <div className="bg-green-50 border border-green-200 rounded-lg p-4">
// //             <div className="flex justify-between items-center">
// //               <div>
// //                 <p className="text-green-800 font-semibold">
// //                   Offset {carbonAmount} kg CO₂
// //                 </p>
// //                 <p className="text-green-600 text-sm">
// //                   Supports renewable energy projects
// //                 </p>
// //               </div>
// //               <div className="text-right">
// //                 <p className="text-2xl font-bold text-green-800">${cost}</p>
// //                 <p className="text-green-600 text-sm">USD</p>
// //               </div>
// //             </div>
// //           </div>

// //           <button
// //             onClick={handleOffsetPurchase}
// //             disabled={loading}
// //             className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 disabled:opacity-50 font-semibold"
// //           >
// //             {loading
// //               ? "Processing..."
// //               : `Offset ${carbonAmount} kg CO₂ for $${cost}`}
// //           </button>
// //         </div>
// //       </div>

// //       {/* Offset History */}
// //       <div className="bg-white rounded-lg shadow p-6">
// //         <h2 className="text-xl font-semibold mb-4">Offset History</h2>
// //         {history.length === 0 ? (
// //           <p className="text-gray-500 text-center py-4">
// //             No offset purchases yet. Start by offsetting your carbon emissions
// //             above!
// //           </p>
// //         ) : (
// //           <div className="space-y-3">
// //             {history.map((offset) => (
// //               <div
// //                 key={offset._id}
// //                 className="flex justify-between items-center p-3 border border-gray-200 rounded-lg"
// //               >
// //                 <div>
// //                   <p className="font-semibold">{offset.carbonAmount} kg CO₂</p>
// //                   <p className="text-sm text-gray-600">{offset.project}</p>
// //                   <p className="text-xs text-gray-500">
// //                     {new Date(offset.createdAt).toLocaleDateString()}
// //                   </p>
// //                 </div>
// //                 <div className="text-right">
// //                   <p className="font-semibold text-green-600">
// //                     ${offset.amount}
// //                   </p>
// //                   <span
// //                     className={`px-2 py-1 text-xs rounded-full ${
// //                       offset.status === "completed"
// //                         ? "bg-green-100 text-green-800"
// //                         : "bg-yellow-100 text-yellow-800"
// //                     }`}
// //                   >
// //                     {offset.status}
// //                   </span>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default OffsetCalculator;

// import React, { useState, useEffect } from 'react';
// import { offsetAPI } from '../../services/api';

// const OffsetCalculator = () => {
//   const [carbonAmount, setCarbonAmount] = useState(100);
//   const [cost, setCost] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [history, setHistory] = useState([]);

//   useEffect(() => {
//     calculateCost();
//     fetchOffsetHistory();
//   }, [carbonAmount]);

//   const calculateCost = async () => {
//     try {
//       // Calculate locally instead of API call for demo
//       const calculatedCost = (carbonAmount / 1000) * 10;
//       setCost(Math.round(calculatedCost * 100) / 100);
//     } catch (error) {
//       console.error('Error calculating cost:', error);
//     }
//   };

//   const fetchOffsetHistory = async () => {
//     try {
//       const response = await offsetAPI.getHistory();
//       setHistory(response.data.data);
//     } catch (error) {
//       console.error('Error fetching offset history:', error);
//     }
//   };

//   const handleOffsetPurchase = async () => {
//     setLoading(true);
//     try {
//       // Simulate payment process with timeout
//       await new Promise(resolve => setTimeout(resolve, 2000));

//       // Create offset record directly
//       const response = await offsetAPI.confirmPayment({
//         paymentIntentId: `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
//         carbonAmount,
//         amount: cost * 100, // Convert to cents
//         project: 'Renewable Energy Project'
//       });

//       alert(`Successfully offset ${carbonAmount} kg CO₂! Thank you for your contribution!`);
//       fetchOffsetHistory();
//     } catch (error) {
//       console.error('Error purchasing offset:', error);
//       alert('Error purchasing offset. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Offset Calculator */}
//       <div className="bg-white rounded-lg shadow p-6">
//         <h2 className="text-xl font-semibold mb-4">Purchase Carbon Offsets</h2>

//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Carbon Amount to Offset (kg CO₂)
//             </label>
//             <input
//               type="range"
//               min="10"
//               max="1000"
//               step="10"
//               value={carbonAmount}
//               onChange={(e) => setCarbonAmount(parseInt(e.target.value))}
//               className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//             />
//             <div className="flex justify-between text-sm text-gray-600 mt-2">
//               <span>10 kg</span>
//               <span className="font-semibold">{carbonAmount} kg</span>
//               <span>1000 kg</span>
//             </div>
//           </div>

//           <div className="bg-green-50 border border-green-200 rounded-lg p-4">
//             <div className="flex justify-between items-center">
//               <div>
//                 <p className="text-green-800 font-semibold">
//                   Offset {carbonAmount} kg CO₂
//                 </p>
//                 <p className="text-green-600 text-sm">
//                   Supports renewable energy projects
//                 </p>
//               </div>
//               <div className="text-right">
//                 <p className="text-2xl font-bold text-green-800">${cost.toFixed(2)}</p>
//                 <p className="text-green-600 text-sm">USD</p>
//               </div>
//             </div>
//           </div>

//           <button
//             onClick={handleOffsetPurchase}
//             disabled={loading || carbonAmount <= 0}
//             className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 disabled:opacity-50 font-semibold transition duration-200"
//           >
//             {loading ? (
//               <div className="flex items-center justify-center">
//                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                 Processing...
//               </div>
//             ) : (
//               `Offset ${carbonAmount} kg CO₂ for $${cost.toFixed(2)}`
//             )}
//           </button>

//           <p className="text-xs text-gray-500 text-center">
//             💡 This is a demo. No real payment will be processed.
//           </p>
//         </div>
//       </div>

//       {/* Offset History */}
//       <div className="bg-white rounded-lg shadow p-6">
//         <h2 className="text-xl font-semibold mb-4">Offset History</h2>
//         {history.length === 0 ? (
//           <p className="text-gray-500 text-center py-4">
//             No offset purchases yet. Start by offsetting your carbon emissions above!
//           </p>
//         ) : (
//           <div className="space-y-3">
//             {history.map((offset) => (
//               <div key={offset._id} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
//                 <div>
//                   <p className="font-semibold">{offset.carbonAmount} kg CO₂</p>
//                   <p className="text-sm text-gray-600">{offset.project}</p>
//                   <p className="text-xs text-gray-500">
//                     {new Date(offset.createdAt).toLocaleDateString()}
//                   </p>
//                 </div>
//                 <div className="text-right">
//                   <p className="font-semibold text-green-600">${offset.amount}</p>
//                   <span className={`px-2 py-1 text-xs rounded-full ${
//                     offset.status === 'completed'
//                       ? 'bg-green-100 text-green-800'
//                       : 'bg-yellow-100 text-yellow-800'
//                   }`}>
//                     {offset.status}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OffsetCalculator;

import React, { useState, useEffect } from "react";
import { offsetAPI } from "../../services/api";

const OffsetCalculator = () => {
  const [carbonAmount, setCarbonAmount] = useState(500);
  const [cost, setCost] = useState(5.0);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    calculateCost();
    fetchOffsetHistory();
  }, [carbonAmount]);

  const calculateCost = () => {
    // Calculate locally: $10 per 1000 kg CO2
    const calculatedCost = (carbonAmount / 1000) * 10;
    setCost(Math.round(calculatedCost * 100) / 100);
  };

  const fetchOffsetHistory = async () => {
    try {
      const response = await offsetAPI.getHistory();
      setHistory(response.data.data);
    } catch (error) {
      console.error("Error fetching offset history:", error);
    }
  };

  const handleOffsetPurchase = async () => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Create payment intent (simulated)
      const paymentResponse = await offsetAPI.createPayment({
        carbonAmount,
        project: "Renewable Energy Project",
      });

      // Confirm payment with the created intent
      const confirmResponse = await offsetAPI.confirmPayment({
        paymentIntentId: paymentResponse.data.data.paymentIntent.id,
        carbonAmount,
        amount: paymentResponse.data.data.paymentIntent.amount,
        project: "Renewable Energy Project",
      });

      // Show success message
      alert(
        `🎉 Success! You've offset ${carbonAmount} kg CO₂!\nThank you for supporting renewable energy projects!`
      );

      // Refresh history
      fetchOffsetHistory();
    } catch (error) {
      console.error("Payment error:", error);
      alert("❌ Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Purchase Carbon Offsets</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Carbon Amount to Offset (kg CO₂)
            </label>
            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              value={carbonAmount}
              onChange={(e) => setCarbonAmount(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>10 kg</span>
              <span className="font-semibold text-green-600">
                {carbonAmount} kg
              </span>
              <span>1000 kg</span>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-green-800 font-semibold">
                  Offset {carbonAmount} kg CO₂
                </p>
                <p className="text-green-600 text-sm">
                  Supports renewable energy projects
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-800">
                  ${cost.toFixed(2)}
                </p>
                <p className="text-green-600 text-sm">USD</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleOffsetPurchase}
            disabled={loading}
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 disabled:bg-green-400 font-semibold transition duration-200 flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processing Payment...
              </>
            ) : (
              `Offset ${carbonAmount} kg CO₂ for $${cost.toFixed(2)}`
            )}
          </button>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              💡 Demo: This simulates carbon offset purchase. No real payment
              processed.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Offset History</h2>
        {history.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">🌱</div>
            <p className="text-gray-500">No offset purchases yet.</p>
            <p className="text-gray-400 text-sm">
              Your offset purchases will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((offset) => (
              <div
                key={offset._id}
                className="flex justify-between items-center p-4 border border-green-100 rounded-lg bg-green-50"
              >
                <div>
                  <p className="font-semibold text-green-800">
                    {offset.carbonAmount} kg CO₂
                  </p>
                  <p className="text-sm text-green-600">{offset.project}</p>
                  <p className="text-xs text-green-500">
                    {new Date(offset.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-700">
                    ${offset.amount}
                  </p>
                  <span className="px-2 py-1 text-xs bg-green-200 text-green-800 rounded-full">
                    Completed
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OffsetCalculator;
