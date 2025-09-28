// import React from "react";

// const MetricCard = ({
//   title,
//   value,
//   unit,
//   subtitle,
//   trend,
//   change,
//   progress,
//   action,
// }) => {
//   return (
//     <div className="bg-white rounded-lg shadow p-6">
//       <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
//       <div className="flex items-baseline mb-1">
//         <span className="text-2xl font-bold text-gray-900">{value}</span>
//         {unit && <span className="text-gray-500 text-sm ml-1">{unit}</span>}
//       </div>

//       {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}

//       {trend && change && (
//         <div
//           className={`flex items-center mt-2 ${
//             trend === "up" ? "text-red-500" : "text-green-500"
//           }`}
//         >
//           <span className="text-sm">{trend === "up" ? "↗" : "↘"}</span>
//           <span className="text-sm ml-1">{change}</span>
//         </div>
//       )}

//       {progress !== undefined && (
//         <div className="mt-3">
//           <div className="w-full bg-gray-200 rounded-full h-2">
//             <div
//               className="bg-green-500 h-2 rounded-full transition-all duration-300"
//               style={{ width: `${progress}%` }}
//             ></div>
//           </div>
//         </div>
//       )}

//       {action && (
//         <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition text-sm font-medium">
//           {action}
//         </button>
//       )}
//     </div>
//   );
// };

// export default MetricCard;

import React from "react";

const MetricCard = ({
  title,
  value,
  unit,
  subtitle,
  trend,
  change,
  progress,
  action,
  onAction,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
      <div className="flex items-baseline mb-1">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        {unit && <span className="text-gray-500 text-sm ml-1">{unit}</span>}
      </div>

      {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}

      {trend && change && (
        <div
          className={`flex items-center mt-2 ${
            trend === "up" ? "text-red-500" : "text-green-500"
          }`}
        >
          <span className="text-sm">{trend === "up" ? "↗" : "↘"}</span>
          <span className="text-sm ml-1">{change}</span>
        </div>
      )}

      {progress !== undefined && (
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {action && onAction && (
        <button
          onClick={onAction}
          className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition text-sm font-medium"
        >
          {action}
        </button>
      )}
    </div>
  );
};

export default MetricCard;
