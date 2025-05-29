import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTask,
  deleteTask,
  fetchTasks,
  updateTask,
} from "./DashboardSlice";
import type { AppDispatch } from "../../app/store";
import Popup from "../../components/Popup";
import notyf from "../../utils/notyf";
import type { TaskForm } from "../../types/task.types";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import Navbar from "../../components/NavBar";
import { LogoutUser } from "../signin/SigninSlice";
import DeleteConfirmationPopup from "../../components/DeleteConfirmationPopup";
import { TrashIcon } from "@heroicons/react/24/outline";
import Chip from "../../components/Chip";
import { useNavigate } from "react-router-dom";

// Import TaskForm type from a single source of truth

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const naviagate = useNavigate()
  const { tasks, loading, error } = useSelector((state: any) => state.tasks);
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);

  const handleOpenPopup = () => {
    setSelectedTask(null); // Reset selected task when opening popup
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setDeletePopupOpen(false);
    setSelectedTask(null); // Reset selected task when closing popup
  };
  const handleEditClick = (task: any) => {
    setSelectedTask(task); // Set the selected task
    setIsPopupOpen(true); // Open the popup
  };

  const handleLogout = () => {
    dispatch(LogoutUser());
    naviagate("/signin");
  };

  const handleTaskSubmit = (task: TaskForm) => {
    // Normalize priority and status to lowercase before using
    const normalizedTask = {
      ...task,
      priority: task.priority.toLowerCase() as "low" | "medium" | "high",
      status: task.status.toLowerCase() as
        | "pending"
        | "in_progress"
        | "completed",
    };

    (async () => {
      try {
        if (normalizedTask.id) {
          // Update Task
          await dispatch(
            updateTask({ id: normalizedTask.id, task: normalizedTask })
          ).unwrap();
          notyf.success("Task updated successfully!");
        } else {
          // Create Task
          await dispatch(createTask(normalizedTask)).unwrap();
          notyf.success("Task created successfully!");
        }
      } catch (error: any) {
        notyf.error(error.message || "An error occurred. Please try again.");
      }
    })();
  };
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  const handleDeleteClick = (taskId: number) => {
    setTaskToDelete(taskId);
    setDeletePopupOpen(true);
  };

  const handleConfirmDelete = () => {
    // Add your deletion logic here (e.g., API call)
    setDeletePopupOpen(false);
    setTaskToDelete(null);
    if (!taskToDelete) {
      notyf.error("No task selected for deletion.");
      return;
    }
    dispatch(deleteTask(taskToDelete?.toString()));
    dispatch(fetchTasks());
    notyf.success("Task deleted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Navbar */}
      <Navbar onAddTask={handleOpenPopup} onLogout={handleLogout} />
      {/* Add Task Popup */}
      <Popup
        title="Add New Task"
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onSubmit={handleTaskSubmit}
        initialData={selectedTask}
      ></Popup>
      <DeleteConfirmationPopup
        isOpen={deletePopupOpen}
        onClose={handleClosePopup}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this task?"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-8 px-0">
        {tasks.map((task: any, index: any) => (
          <div className="relative p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="absolute top-2 right-2 flex space-x-2">
              <Chip priority={task.priority} />

              <button
                onClick={() => handleEditClick(task)}
                className="hover:text-gray-700 cursor-pointer"
              >
                <PencilSquareIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleDeleteClick(task.id)}
                className="hover:text-red-700 cursor-pointer"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
            <h2 className="text-lg font-semibold mb-2">{task.title}</h2>
            <p className="text">{task.description}</p>
            <p className="text-sm text-gray-500 mt-2">
              Due:{" "}
              {new Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              }).format(new Date(task.due_date))}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Status:{" "}
              <span
                className={`${
                  task.status === "completed"
                    ? "text-green-600"
                    : task.status === "in_progress"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {task.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
