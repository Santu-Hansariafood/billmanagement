"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion/motion";

const StatCard = ({ title, value, icon: Icon, color, onClick }) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-emerald-100 text-emerald-600",
    yellow: "bg-amber-100 text-amber-600",
  };

  const isClickable = Boolean(onClick);

  return (
    <motion.div
      {...fadeIn}
      onClick={onClick}
      className={`card ${
        isClickable
          ? "cursor-pointer hover:shadow-xl hover:scale-105 transform transition-all duration-300"
          : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">
            {title}
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">
            {value}
          </p>

          {isClickable && (
            <p className="text-xs text-gray-500 mt-1">Click to view</p>
          )}
        </div>

        <div
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center ${
            colorClasses[color]
          } transition-transform duration-300 ${
            isClickable ? "group-hover:scale-110" : ""
          }`}
        >
          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
