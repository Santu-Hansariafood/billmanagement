"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import { fadeIn } from "@/utils/motion/motion";
import dynamic from "next/dynamic";

const FormHeading = dynamic(() => import("@/components/common/Bill/FormHeading/FormHeading"));
const InputField = dynamic(() => import("@/components/common/Bill/InputField/InputField"));
const SelectField = dynamic(() => import("@/components/common/Bill/SelectField/SelectField"));
const TextArea = dynamic(() => import("@/components/common/Bill/TextArea/TextArea"));
const FormButtons = dynamic(() => import("@/components/common/Bill/FormButtons.jsx/FormButtons"));

const BillForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    date: "",
    billPeriod: "",
    billFrom: "",
    billAmount: "",
    billDueDate: "",
    priority: "medium",
    remarks: "",
    isPaid: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div {...fadeIn} className="card">
      <FormHeading title="Add New Bill" onClose={onCancel} />

      <form onSubmit={handleSubmit} className="space-y-4">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <InputField
            label="Date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <InputField
            label="Bill Period"
            name="billPeriod"
            value={formData.billPeriod}
            onChange={handleChange}
            placeholder="e.g., January 2024"
            required
          />

          <InputField
            label="Bill From"
            name="billFrom"
            value={formData.billFrom}
            onChange={handleChange}
            placeholder="e.g., Electric Company"
            required
          />

          <InputField
            label="Bill Amount"
            type="number"
            name="billAmount"
            value={formData.billAmount}
            onChange={handleChange}
            placeholder="0.00"
            required
          />

          <InputField
            label="Due Date"
            type="date"
            name="billDueDate"
            value={formData.billDueDate}
            onChange={handleChange}
            required
          />

          <SelectField
            label="Priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            options={[
              { value: "low", label: "Low" },
              { value: "medium", label: "Medium" },
              { value: "high", label: "High" },
            ]}
          />
        </div>

        <TextArea
          label="Remarks"
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
          placeholder="Additional notes..."
        />

        <FormButtons onCancel={onCancel} submitLabel="Save Bill" />
      </form>
    </motion.div>
  );
};

export default BillForm;
