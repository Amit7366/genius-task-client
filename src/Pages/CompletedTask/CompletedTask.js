import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider";
import CompletedTaskCard from "./CompletedTaskCard";



const CompletedTask = () => {
  const { user } = useContext(AuthContext);
  const {
    data: tasks = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["uid"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/completed/tasks?uid=${user.uid}`);
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
    <div>
      {tasks.length === 0 ? (
        <h2 className="text-center">No Completed Task</h2>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {tasks.map((task) => (
            <CompletedTaskCard key={task._id} task={task} refetch={refetch}></CompletedTaskCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompletedTask;
