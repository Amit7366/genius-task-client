import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loginError, setLoginError] = useState('');
    const {providerLogin,signIn }  = useContext(AuthContext);
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const location = useLocation();
    const googleProvider = new GoogleAuthProvider();

    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const handleLogin = (data) =>{
        setLoginError('');
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                setLoginUserEmail(data.email);
                toast.success('User Created Successfully.');
                navigate(from,{replace: true});
            })
            .catch(error => {
                console.log(error.message)
                setLoginError(error.message);
            });
    }

    const handleGoogleSignIn = () => {
        providerLogin(googleProvider)
        .then((result) => {
          const user = result.user;
    
          const currentUser = {
            userId: user.uid,
          }
    
          setLoginUserEmail(user.email);
          fetch(`http://localhost:5000/users?email=${user.email}`)
          .then(res => res.json())
          .then(data =>{
            console.log(data);
            if(data.feedback < 1){
                saveUser(user.displayName, user.email);
                
            }
            navigate(from,{replace: true});
          })

        })
          .catch((error) => console.log(error));
        
      };

      const saveUser = (name, email,role) =>{
        const user ={name, email,role};
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data =>{
            // setCreatedUserEmail(email);
        })
    }

    return (
        <div className='flex justify-center'>
            <div className='w-96 p-7 border border-red-400 rounded-md'>
                <h2 className='text-xl text-center font-bold'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Email</span></label>
                        <input type="text"
                            {...register("email", {
                                required: "Email Address is required"
                            })}
                            className="border rounded-md py-2 w-full max-w-xs" />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Password</span></label>
                        <input type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: 'Password must be 6 characters or longer' }
                            })}
                            className="border rounded-md py-2 input input-bordered w-full max-w-xs" />
                        
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                    </div>
                    <input className='py-2 bg-green-800 text-white w-full' value="Login" type="submit" />
                    <div>
                        {loginError && <p className='text-red-600'>{loginError}</p>}
                    </div>
                </form>
                <p>New to Lap Hunter ? <Link className='text-cyan-400' to="/register">Create new Account</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full bg-red-400 text-white py-2' onClick={handleGoogleSignIn}>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;