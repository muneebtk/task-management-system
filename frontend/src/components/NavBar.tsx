import React from "react";

interface NavbarProps {
  onAddTask: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onAddTask, onLogout }) => {
  return (
    <nav className="bg-blue-400 text-white py-4 shadow-md">
      <div className="container mx-auto flex  items-cente">
        <div className="text-2xl font-bold">Task Management</div>
        <ul className="flex justify-end space-x-4 ml-auto">
          <li>
            <button
              className="hover:text-gray-200 cursor-pointer"
              onClick={onAddTask}
            >
              Add Task
            </button>
          </li>
          <li>
            <button
              className="hover:text-gray-200 cursor-pointer"
              onClick={onLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
