import React from "react";

interface ChipProps {
  priority: "low" | "medium" | "high"; // Priority types
}

const priorityColors = {
  low: {
    bg: "bg-green-100", // Light background color
    border: "border-green-500", // Border color
    text: "text-green-700", // Text color
  },
  medium: {
    bg: "bg-yellow-100",
    border: "border-yellow-500",
    text: "text-yellow-700",
  },
  high: {
    bg: "bg-red-100",
    border: "border-red-500",
    text: "text-red-700",
  },
};

const Chip: React.FC<ChipProps> = ({ priority }) => {
  const colors = priorityColors[priority];

  return (
    <span
      className={`inline-block px-3 py-1 text-sm font-medium rounded-full border ${colors.bg} ${colors.border} ${colors.text}`}
    >
      {priority}
    </span>
  );
};

export default Chip;
