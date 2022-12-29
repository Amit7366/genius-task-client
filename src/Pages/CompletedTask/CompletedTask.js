import { useQuery } from "@tanstack/react-query";
import React from "react";
import TaskCard from "../MyTask/TaskCard";

const CompletedTask = () => {
  const {
    data: tasks = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/completed/tasks`);
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return (
      <iframe
        title="Loading"
        src="https://embed.lottiefiles.com/animation/98742"
      ></iframe>
    );
  }
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
       { tasks.length === 0 ? 
       <h2>No Completed Task</h2> : 
       tasks.map(task => (
        <TaskCard key={task._id} task={task} refetch={refetch}></TaskCard>
      ))
      } 
    
    </div>
  );
};

export default CompletedTask;
