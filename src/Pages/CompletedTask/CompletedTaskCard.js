import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { FaUserEdit, FaTrashAlt } from "react-icons/fa";

const CompletedTaskCard = ({ task, refetch }) => {
  const [commentError, setCommentError] = useState("");

  const handleKeyDown = (event) => {
    setCommentError("");
    if (event.key === "Enter") {
      const comment = event.target.value;

      if (comment === "") {
        setCommentError("Comment cannot be empty!");
      } else {
        fetch(`http://localhost:5000/comment/${task._id}?comment=${comment}`, {
            method: "PUT",
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.modifiedCount > 0) {
                toast.success("Comment Added.");
                refetch();
              }
            });
      }
    }
  };

  const { _id, taskName, taskImage, taskUser, taskStatus } = task;
  const handleComplete = (id, taskStatus) => {
    fetch(`http://localhost:5000/tasks/${id}?status=${taskStatus}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Task successfuly Updated.");
          refetch();
        }
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
          toast.success(`Task deleted successfully`);
        }
      });
  };
  return (
    <div className="px-6 py-4 rounded-md shadow shadow-blue-100">
      <h2 className="font-medium ">{taskName}</h2>
      <img
        className="w-full rounded-md h-36 object-cover"
        src={taskImage}
        alt=""
      />
      <div className="flex my-4 items-center">
        <div className="w-1/2 flex gap-4">
          <FaUserEdit className="text-blue-500" />
          <FaTrashAlt
            className="text-red-500"
            onClick={() => handleDelete(_id)}
          />
        </div>
        <div className="w-1/2 text-right">
          {taskStatus === false ? (
            <button
              onClick={() => handleComplete(_id, taskStatus)}
              className="px-4 py-2 rounded-md text-xs bg-rose-500 text-white"
            >
              incomplete
            </button>
          ) : (
            <button
              onClick={() => handleComplete(_id, taskStatus)}
              className="px-4 py-2 rounded-md text-xs bg-green-500 text-white"
            >
              completed
            </button>
          )}
        </div>
      </div>
      <div>
        <input
          type="text"
          defaultValue={task.comment}
          onKeyDown={handleKeyDown}
          className="w-full border rounded-md p-4 text-sm"
          placeholder="Write your comment here"
        />
        <div>{commentError && <p className="text-red-600 text-xs">{commentError}</p>}</div>
      </div>
    </div>
  );
};

export default CompletedTaskCard;
