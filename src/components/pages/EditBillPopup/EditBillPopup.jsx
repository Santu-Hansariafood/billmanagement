"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save } from "lucide-react";
import dynamic from "next/dynamic";
import { PrimaryButton, SecondaryButton } from "@/components/common/Form/FormButton/FormButton";
const FormHeading = dynamic(() => import("@/components/common/Form/FormHeading/FormHeading"));
const FormInput = dynamic(() => import("@/components/common/Form/FormInput/FormInput"));
const FormSelect = dynamic(() => import("@/components/common/Form/FormSelect/FormSelect"));

const EditBillPopup = ({ bill, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    date: bill.date,
    billPeriod: bill.billPeriod,
    billFrom: bill.billFrom,
    billAmount: bill.billAmount,
    billDueDate: bill.billDueDate,
    priority: bill.priority,
    remarks: bill.remarks || "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...bill, ...formData });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Heading */}
          <FormHeading title="Edit Bill" onClose={onClose} />

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <FormInput
                label="Date *"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
              />

              <FormInput
                label="Bill Period *"
                name="billPeriod"
                value={formData.billPeriod}
                onChange={handleChange}
                placeholder="e.g., January 2024"
                required
              />

              <FormInput
                label="Bill From *"
                name="billFrom"
                value={formData.billFrom}
                onChange={handleChange}
                placeholder="Provider name"
                required
              />

              <FormInput
                label="Bill Amount *"
                name="billAmount"
                type="number"
                value={formData.billAmount}
                onChange={handleChange}
                placeholder="0.00"
                required
              />

              <FormInput
                label="Due Date *"
                name="billDueDate"
                type="date"
                value={formData.billDueDate}
                onChange={handleChange}
                required
              />

              <FormSelect
                label="Priority *"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                required
                options={[
                  { value: "low", label: "Low" },
                  { value: "medium", label: "Medium" },
                  { value: "high", label: "High" },
                ]}
              />

            </div>

            <div>
              <FormInput
                label="Remarks"
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                placeholder="Additional notes..."
              />
            </div>

            <div className="flex space-x-3 pt-4 border-t border-gray-200">
              <PrimaryButton type="submit" icon={Save}>
                Save Changes
              </PrimaryButton>

              <SecondaryButton type="button" onClick={onClose}>
                Cancel
              </SecondaryButton>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EditBillPopup;
