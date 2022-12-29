import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AddTask = () => {
  const {state} = useLocation();
  const {name} = state;
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

  };

  return (
    <div className="grid justify-center">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 my-32">
        <div className="mb-4">
          <label className="block text-grey-darker text-sm font-bold mb-2">
            Task Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            defaultValue={name}
            placeholder="Task Name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-grey-darker text-sm font-bold mb-2">
            Image
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
            type="file"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
