import React from "react";
import { toast } from "react-hot-toast";
import { FaUserEdit, FaTrashAlt } from "react-icons/fa";

const TaskCard = ({ task,refetch }) => {
  const { _id, taskName, taskImage, taskUser, taskStatus } = task;
  const handleComplete = id =>{
    fetch(`http://localhost:5000/tasks/${id}`, {
        method: "PUT",
        headers: {},
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount > 0) {
            toast.success("Task successfuly Completed.");
            refetch();
          }
        });

  }
  return (
    <div className="px-6 py-4 rounded-md shadow shadow-blue-100">
      <h2 className="font-medium ">{taskName}</h2>
      <img className="w-full rounded-md h-36 object-cover" src={taskImage} alt="" />
      <div className="flex my-4 items-center">
        <div className="w-1/2 flex gap-4">
          <FaUserEdit className="text-blue-500"/>
          <FaTrashAlt className="text-red-500"/>
        </div>
        <div className="w-1/2 text-right">
          {taskStatus === false ? (
            <button onClick={()=>handleComplete(_id)} className="px-4 py-2 rounded-md text-xs bg-rose-500 text-white">
              incomplete
            </button>
          ) : (
            <button disabled className="px-4 py-2 rounded-md text-xs bg-green-500 text-white">
              completed
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
