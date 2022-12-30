import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../Contexts/AuthProvider";
import TaskCard from "./TaskCard";
const MyTask = () => {
  const { user } = useContext(AuthContext);
  const {
    data: tasks = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["uid"],
    queryFn: async () => {
      const res = await fetch(
        `https://genius-task-server.vercel.app/tasks?uid=${user.uid}`
      );
      const data = await res.json();
      return data;
    },
  });

  if(isLoading){
    return <iframe title="Loading" src="https://embed.lottiefiles.com/animation/98742"></iframe>
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {
            tasks.map(task => <TaskCard key={task._id} task={task} refetch={refetch}></TaskCard>)
        }
      
    </div>
  );
};

export default MyTask;
