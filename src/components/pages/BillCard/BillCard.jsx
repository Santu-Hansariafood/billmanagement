"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  AlertCircle,
  CheckCircle,
  Trash2,
  Clock,
  Edit2,
  IndianRupee,
} from "lucide-react";
import { fadeIn } from "@/utils/motion/motion";

const BillCard = ({ bill, onMarkPaid, onDelete, onEdit }) => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentDate, setPaymentDate] = useState("");
  const [paymentAmount, setPaymentAmount] = useState(bill.billAmount);

  const priorityColors = {
    high: "bg-red-100 text-red-700 border-red-200",
    medium: "bg-amber-100 text-amber-700 border-amber-200",
    low: "bg-green-100 text-green-700 border-green-200",
  };

  const handleMarkPaid = () => {
    if (paymentDate && paymentAmount) {
      onMarkPaid(bill.id, paymentDate, paymentAmount);
      setShowPaymentForm(false);
    }
  };

  const daysUntilDue = Math.ceil(
    (new Date(bill.billDueDate) - new Date()) / (1000 * 60 * 60 * 24)
  );

  const isOverdue = daysUntilDue < 0;
  const isDueSoon = daysUntilDue >= 0 && daysUntilDue <= 3;

  return (
    <motion.div
      {...fadeIn}
      className={`card ${
        isOverdue ? "ring-2 ring-red-400 shadow-red-100" : ""
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">
            {bill.billFrom}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600">{bill.billPeriod}</p>
        </div>

        <span
          className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium border ${
            priorityColors[bill.priority]
          }`}
        >
          {bill.priority.toUpperCase()}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        {/* Amount */}
        <div className="flex items-center text-xs sm:text-sm text-gray-600">
          <IndianRupee className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="font-medium">Amount:</span>
          <span className="ml-2 text-gray-900 font-semibold">
            ₹{parseFloat(bill.billAmount).toFixed(2)}
          </span>
        </div>

        <div className="flex items-center text-xs sm:text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="font-medium">Due:</span>
          <span
            className={`ml-2 ${
              isOverdue
                ? "text-red-600 font-semibold"
                : isDueSoon
                ? "text-amber-600 font-semibold"
                : "text-gray-900"
            }`}
          >
            {new Date(bill.billDueDate).toLocaleDateString()}
          </span>
        </div>

        {isOverdue && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start text-xs sm:text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg"
          >
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">OVERDUE</p>
              <p className="text-xs mt-0.5">
                This bill is {Math.abs(daysUntilDue)} days past due. Please pay
                immediately to avoid penalties.
              </p>
            </div>
          </motion.div>
        )}

        {isDueSoon && !isOverdue && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start text-xs sm:text-sm text-amber-600 bg-amber-50 border border-amber-200 p-3 rounded-lg"
          >
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">DUE SOON</p>
              <p className="text-xs mt-0.5">
                Payment due in {daysUntilDue}{" "}
                {daysUntilDue === 1 ? "day" : "days"}
              </p>
            </div>
          </motion.div>
        )}

        {bill.remarks && (
          <p className="text-xs sm:text-sm text-gray-600 italic bg-gray-50 p-2 rounded">
            {bill.remarks}
          </p>
        )}
      </div>

      {showPaymentForm ? (
        <div className="space-y-3 pt-3 border-t border-gray-200">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Payment Date
            </label>
            <input
              type="date"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              className="input-field text-xs sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Payment Amount
            </label>
            <input
              type="number"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              className="input-field text-xs sm:text-sm"
              step="0.01"
            />
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleMarkPaid}
              className="btn-primary flex-1 text-xs sm:text-sm py-2"
            >
              Confirm
            </button>
            <button
              onClick={() => setShowPaymentForm(false)}
              className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex space-x-2 pt-3 border-t border-gray-200">
          <button
            onClick={() => setShowPaymentForm(true)}
            className="btn-primary flex-1 flex items-center justify-center space-x-2 text-xs sm:text-sm py-2"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Mark Paid</span>
          </button>

          <button
            onClick={() => onDelete(bill.id)}
            className="px-3 sm:px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => onEdit(bill)}
            className="px-3 sm:px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default BillCard;
