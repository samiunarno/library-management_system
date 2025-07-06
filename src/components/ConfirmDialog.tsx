// import React from "react";
// import { X, AlertTriangle } from "lucide-react";

// interface ConfirmDialogProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onConfirm: () => void;
//   title: string;
//   message: string;
//   confirmText?: string;
//   cancelText?: string;
// }

// export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
//   isOpen,
//   onClose,
//   onConfirm,
//   title,
//   message,
//   confirmText = "Confirm",
//   cancelText = "Cancel",
// }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg max-w-md w-full mx-4 p-6">
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center space-x-2">
//             <AlertTriangle className="h-6 w-6 text-red-500" />
//             <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
//           >
//             <X className="h-5 w-5 text-gray-500" />
//           </button>
//         </div>

//         <p className="text-gray-600 mb-6">{message}</p>

//         <div className="flex justify-end space-x-3">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             {cancelText}
//           </button>
//           <button
//             onClick={onConfirm}
//             className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//           >
//             {confirmText}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
