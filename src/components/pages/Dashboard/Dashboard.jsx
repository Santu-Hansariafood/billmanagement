"use client";

import { useState, useReducer, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import {
  Plus,
  LogOut,
  FileText,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import {
  getBills,
  addBill,
  updateBill,
  deleteBill as apiDeleteBill,
} from "@/utils/api/bills";
import { fadeIn, stagger } from "@/utils/motion/motion";
const StatCard = dynamic(() => import("../StatCard/StatCard"));
const BillCard = dynamic(() => import("../BillCard/BillCard"));
const BillForm = dynamic(() => import("../BillForm/BillForm"));
const PaidBills = dynamic(() => import("../PaidBills/PaidBills"));
const EditBillPopup = dynamic(() => import("../EditBillPopup/EditBillPopup"));
const Register = dynamic(() => import("../Register/Register"));

const billReducer = (state, action) => {
  switch (action.type) {
    case "SET_BILLS":
      return action.payload;
    case "ADD_BILL":
      return [...state, action.payload];

    case "UPDATE_BILL":
      return state.map((bill) =>
        bill.id === action.payload.id ? action.payload : bill
      );

    case "DELETE_BILL":
      return state.filter((bill) => bill.id !== action.payload);

    case "MARK_PAID":
      return state.map((bill) =>
        bill.id === action.payload.id
          ? {
              ...bill,
              isPaid: true,
              paymentDate: action.payload.paymentDate,
              paymentAmount: action.payload.paymentAmount,
            }
          : bill
      );

    default:
      return state;
  }
};

const Dashboard = ({ onLogout }) => {
  const [bills, dispatch] = useReducer(billReducer, []);
  const [showForm, setShowForm] = useState(false);
  const [showPaid, setShowPaid] = useState(false);
  const [editingBill, setEditingBill] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await getBills();
      dispatch({ type: "SET_BILLS", payload: data });
    })();
  }, []);

  const unpaidBills = bills.filter((b) => !b.isPaid);
  const paidBills = bills.filter((b) => b.isPaid);

  const totalAmount = unpaidBills.reduce(
    (sum, b) => sum + parseFloat(b.billAmount || 0),
    0
  );
  const paidAmount = paidBills.reduce(
    (sum, b) => sum + parseFloat(b.paymentAmount || 0),
    0
  );

  const handleAddBill = async (bill) => {
    const created = await addBill(bill);
    dispatch({ type: "ADD_BILL", payload: created });
    setShowForm(false);
  };

  const handleMarkPaid = async (id, paymentDate, paymentAmount) => {
    const updated = await updateBill(id, {
      isPaid: true,
      paymentDate,
      paymentAmount,
    });
    dispatch({ type: "UPDATE_BILL", payload: updated });
  };

  const handleDeleteBill = async (id) => {
    await apiDeleteBill(id);
    dispatch({ type: "DELETE_BILL", payload: id });
  };

  const handleEditBill = async (updatedBill) => {
    const { id, userId, ...patch } = updatedBill;
    const saved = await updateBill(id, patch);
    dispatch({ type: "UPDATE_BILL", payload: saved });
    setEditingBill(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 flex flex-col">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>

              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                  Hansaria Bill Tracker
                </h1>
                <p className="text-xs text-gray-500 hidden sm:block">
                  Manage bills efficiently
                </p>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline font-medium">Logout</span>
            </button>
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full">
        <motion.div
          {...stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8"
        >
          <StatCard
            title="Total Bills"
            value={unpaidBills.length}
            icon={FileText}
            color="blue"
            onClick={() => setShowPaid(false)}
          />

          <StatCard
            title="Paid Bills"
            value={paidBills.length}
            icon={CheckCircle}
            color="green"
            onClick={() => setShowPaid(true)}
          />

          <StatCard
            title="Amount to Pay"
            value={`₹${totalAmount.toFixed(2)}`}
            icon={FileText}
            color="yellow"
          />
        </motion.div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            {showPaid ? "Paid Bills" : "Unpaid Bills"}
          </h2>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
            <button
              onClick={() => setShowPaid(!showPaid)}
              className="btn-secondary flex items-center justify-center space-x-2"
            >
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>{showPaid ? "View Unpaid" : "View Paid"} Bills</span>
            </button>

            <button
              onClick={() => setShowForm(true)}
              className="btn-primary flex items-center justify-center space-x-2"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Add Bill</span>
            </button>

            <button
              onClick={() => setShowRegister(!showRegister)}
              className="btn-secondary flex items-center justify-center space-x-2"
            >
              <span>{showRegister ? "Close" : "Register User"}</span>
            </button>
          </div>
        </div>
        {showRegister && (
          <motion.div {...fadeIn} className="mb-8">
            <Register />
          </motion.div>
        )}
        {showForm && (
          <motion.div {...fadeIn} className="mb-8">
            <BillForm
              onSubmit={handleAddBill}
              onCancel={() => setShowForm(false)}
            />
          </motion.div>
        )}
        {showPaid ? (
          <PaidBills bills={paidBills} onDelete={handleDeleteBill} />
        ) : (
          <motion.div
            {...stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {unpaidBills.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg">No unpaid bills</p>
              </div>
            ) : (
              unpaidBills.map((bill) => (
                <BillCard
                  key={bill.id}
                  bill={bill}
                  onMarkPaid={handleMarkPaid}
                  onDelete={handleDeleteBill}
                  onEdit={setEditingBill}
                />
              ))
            )}
          </motion.div>
        )}
        {editingBill && (
          <EditBillPopup
            bill={editingBill}
            onSave={handleEditBill}
            onClose={() => setEditingBill(null)}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
