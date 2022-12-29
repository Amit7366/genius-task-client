import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [nameError, setNameError] = useState("");
    const navigate = useNavigate();
  
    const handleKeyDown = (event) => {
      setNameError('');
      if (event.key === "Enter") {
        const name = event.target.value;
  
        if (name === "") {
          setNameError("Task name cannot be empty!");
        } else {
          navigate("/add-task",{ state: { name: name } });
        }
      }
    };
    return (
        <div className="grid justify-center">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 my-32">
          <div className="mb-4">
            <label className="block text-grey-darker text-sm font-bold mb-2">
              Task Name
            </label>
            <input
              onKeyDown={handleKeyDown}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Task Name"
            />
          </div>
          <div>{nameError && <p className="text-red-600 text-xs">{nameError}</p>}</div>
          
        </div>
      </div>
    );
};

export default Home;