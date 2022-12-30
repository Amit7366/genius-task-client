import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { toast } from "react-hot-toast";
import AuthProvider, { AuthContext } from "../../Contexts/AuthProvider";

const AddTask = () => {
  const [processing,setProcessing] = useState(false);
  const {user} = useContext(AuthContext);
  // console.log(user);
  let {state} = useLocation();
  if(!state){
    state = {name:''}
  }
  const {name} = state;
  const navigate = useNavigate();
  const imageHostKey = process.env.REACT_APP_imgbb_key;
  const { register, handleSubmit,reset, formState: { errors } } = useForm();



  const handleAddTask = data =>{
    setProcessing(true);
    const image = data.image[0];
    const formData = new FormData();
    formData.append('image', image);

    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;

    fetch(url,{
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(imageData => {
      if(imageData.success){
        const task = {
          taskName: data.taskName,
          taskImage: imageData.data.url,
          taskUser: user.uid,
          taskStatus: false,
        }

        fetch('https://genius-task-server.vercel.app/tasks', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json', 
                    },
                    body: JSON.stringify(task)
                })
                .then(res => res.json())
                .then(result =>{
                    console.log(result);
                    setProcessing(false);
                    reset();
                    toast.success(`${data.taskName} is added successfully`);
                    navigate('/')
                })

      }
    })


  }

  return (
    <div className="grid justify-center">
      <form onSubmit={handleSubmit(handleAddTask)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 my-32">
        <div className="mb-4">
          <label className="block text-grey-darker text-sm font-bold mb-2">
            Task Name
          </label>
          <input
          {...register("taskName", {
            required: "Task Name is Required"
        })}
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
            {...register("image")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
            type="file"
          />
        </div>
        <div className="flex items-center justify-between">
         
          {
            processing ? <iframe title="Loading" src="https://embed.lottiefiles.com/animation/98742" className="w-24 mx-auto"></iframe> : 
            <button
            className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Task
          </button>

          }
          
        </div>
      </form>
    </div>
  );
};

export default AddTask;
