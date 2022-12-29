import React from "react";
import { FaUserEdit, FaTrashAlt } from "react-icons/fa";

const TaskCard = ({ task }) => {
  const { _id, taskName, taskImage, taskUser, taskStatus } = task;
  return (
    <div className="px-6 py-4 rounded-md shadow shadow-blue-100">
      <h2 className="font-medium ">{taskName}</h2>
      <img className="w-full rounded-md h-36 object-cover" src={taskImage} alt="" />
      <div className="flex my-4">
        <div className="w-1/2 flex gap-4">
          <FaUserEdit />
          <FaTrashAlt />
        </div>
        <div className="w-1/2">
          {taskStatus === false ? (
            <button className="px-4 py-2 rounded-md text-xs bg-rose-500 text-white">
              incomplete
            </button>
          ) : (
            <button className="px-4 py-2 rounded-md text-xs bg-green-500 text-white">
              complete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
