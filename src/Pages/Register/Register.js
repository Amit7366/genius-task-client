import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      const {createUser, updateUser} = useContext(AuthContext);
    
      const [signUpError, setSignUPError] = useState("");
      const [createdUserEmail, setCreatedUserEmail] = useState("");
      const navigate = useNavigate();

    const handleSignUp = (data) => {
        console.log(data);
        setSignUPError('');
    
        createUser(data.email,data.password)
        .then(result => {
            const user = result.user;
            console.log(user);
            toast.success('User Created Successfully.')
            const userInfo = {
                displayName: data.name
            }
            updateUser(userInfo)
                .then(() => {
                    saveUser(data.name, data.email,data.role);
                    navigate("/login");
                })
                .catch(err => console.log(err));
        })
        .catch(err =>{
            console.log(err);
            setSignUPError(err.message);
        })
      };
    
      const saveUser = (name, email,role) =>{
        const user ={name, email,role};
        fetch('https://genius-task-server.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data =>{
            setCreatedUserEmail(email);
        })
    }
    return (
        <div className="flex justify-center">
      <div className="w-96 p-7 border border-red-400 rounded-md">
        <h2 className="text-xl text-center font-bold">Sign Up</h2>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register("name", {
                required: "Name is Required",
              })}
              className="border rounded-md py-2 w-full max-w-xs"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register("email", {
                required: true,
              })}
              className="border rounded-md py-2 w-full max-w-xs"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be 6 characters long",
                },
                pattern: {
                  value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                  message:
                    "Password must have uppercase, number and special characters",
                },
              })}
              className="border rounded-md py-2 w-full max-w-xs"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <input
            className="py-2 bg-green-800 text-white w-full"
            value="Sign Up"
            type="submit"
          />
          {signUpError && <p className="text-red-600">{signUpError}</p>}
        </form>
        <p>
          Already have an account{" "}
          <Link className="text-red-400" to="/login">
            Please Login
          </Link>
        </p>
       
      </div>
    </div>
    );
};

export default Register;