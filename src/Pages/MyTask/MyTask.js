import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import TaskCard from "./TaskCard";
const MyTask = () => {
  const {
    data: tasks = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/tasks`
      );
      const data = await res.json();
      return data;
    },
  });

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {
            tasks.map(task => <TaskCard key={task._id} task={task} refetch={refetch}></TaskCard>)
        }
      
    </div>
  );
};

export default MyTask;
