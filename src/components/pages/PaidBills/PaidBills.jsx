"use client";

import { motion } from "framer-motion";
import { Download, Calendar, DollarSign, Trash2 } from "lucide-react";
import { fadeIn, stagger } from "@/utils/motion/motion";

const PaidBills = ({ bills, onDelete }) => {
  const downloadCSV = () => {
    const headers = [
      "Date",
      "Bill Period",
      "Bill From",
      "Bill Amount",
      "Due Date",
      "Payment Date",
      "Payment Amount",
      "Priority",
      "Remarks",
    ];

    const rows = bills.map((b) => [
      b.date,
      b.billPeriod,
      b.billFrom,
      b.billAmount,
      b.billDueDate,
      b.paymentDate,
      b.paymentAmount,
      b.priority,
      b.remarks || "",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = `paid-bills-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();

    window.URL.revokeObjectURL(url);
  };

  const totalPaid = bills.reduce(
    (sum, b) => sum + parseFloat(b.paymentAmount || 0),
    0
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Paid Bills</h2>
          <p className="text-sm text-gray-600 mt-1">
            Total Paid: ₹{totalPaid.toFixed(2)}
          </p>
        </div>

        {bills.length > 0 && (
          <button
            onClick={downloadCSV}
            className="btn-secondary flex items-center space-x-2"
          >
            <Download className="w-5 h-5" />
            <span>Download CSV</span>
          </button>
        )}
      </div>

      {bills.length === 0 ? (
        <div className="card text-center py-12 text-gray-500">
          <p className="text-lg">No paid bills yet</p>
        </div>
      ) : (
        <motion.div {...stagger} className="space-y-4">
          {bills.map((bill) => (
            <motion.div key={bill.id} {...fadeIn} className="card">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {bill.billFrom}
                      </h3>
                      <p className="text-sm text-gray-600">{bill.billPeriod}</p>
                    </div>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                      PAID
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="font-medium">Bill Amount:</span>
                      <span className="ml-2 text-gray-900">
                        ₹{parseFloat(bill.billAmount).toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign className="w-4 h-4 mr-2 text-emerald-600" />
                      <span className="font-medium">Paid:</span>
                      <span className="ml-2 text-emerald-600 font-semibold">
                        ₹{parseFloat(bill.paymentAmount).toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="font-medium">Due Date:</span>
                      <span className="ml-2 text-gray-900">
                        {new Date(bill.billDueDate).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-emerald-600" />
                      <span className="font-medium">Paid On:</span>
                      <span className="ml-2 text-emerald-600 font-semibold">
                        {new Date(bill.paymentDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {bill.remarks && (
                    <p className="text-sm text-gray-600 italic bg-gray-50 p-2 rounded mt-3">
                      {bill.remarks}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => onDelete(bill.id)}
                  className="mt-4 md:mt-0 md:ml-4 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center space-x-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default PaidBills;
