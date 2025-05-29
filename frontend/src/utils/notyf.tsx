import { Notyf } from "notyf";
import "notyf/notyf.min.css"; // Import the CSS

// Configure Notyf
const notyf = new Notyf({
  duration: 5000,
  position: { x: "right", y: "bottom" },
  types: [
    {
      type: "error",
      background: "#ef4444", // Tailwind red-500
      icon: {
        className: "fas fa-times-circle",
        tagName: "i",
        color: "white",
      },
      dismissible: true,
    },
    {
      type: "success",
      background: "#10b981", // Tailwind emerald-500
      icon: {
        className: "fas fa-check-circle",
        tagName: "i",
        color: "white",
      },
    },
  ],
});

export default notyf;
