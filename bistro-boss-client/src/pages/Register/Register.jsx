import React, {useContext, useEffect, useState} from 'react';
import {LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha} from "react-simple-captcha";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {AuthContext} from "../../Provider/AuthProvider.jsx";
import Swal from 'sweetalert2'

const Register = () => {
    const {createUser, updateUSerProfile} = useContext(AuthContext);
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [disable, setDisable] = useState(false);
    const navigate = useNavigate();

    const checkCaptcha = (e) => {
        const captchaValue = e.target.value;
        if (captchaValue.length === 6)
        {
            if (validateCaptcha(captchaValue)) {
                console.log('Captcha Matched');
                setDisable(false);
            }else{
                setDisable(true);
            }
        }
    }

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const onSubmit = data => {
        createUser(data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                updateUSerProfile(user, data.name, data.img)
                    .then(() => {
                        const UserInfo = {name: data.name, email: data.email, image: data.img}
                        fetch(`http://localhost:3000/users`, {
                            method: 'POST',
                            headers:{
                                'content-type' : 'application/json',
                            },
                            body: JSON.stringify(UserInfo),
                        })
                            .then(res => res.json())
                            .then(data => {
                                console.log(data)
                                if(data.insertedId)
                                {
                                    reset();
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: 'Profile created',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    navigate('/');
                                }
                            })
                    }).catch((error) => {
                        Swal.fire({
                            position: 'center',
                            icon: 'warning',
                            title: 'Something is wrong',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    });
            })
            .catch((error) => {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Something is wrong',
                    showConfirmButton: false,
                    timer: 1500
                })
            });
    };
    return (
        <div className="hero min-h-screen bg-base-200 ">
            <div className="hero-content">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Sign up!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shadow-2xl bg-base-100 w-2/3">
                    <div className="card-body">
                        <form  onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text"{...register("name", { required: true })} placeholder="Your Name" className="input input-bordered" />
                                {errors.name && <span>Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                                {errors.email && <span>Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type={showPassword ? "text" : "password"} {...register("password", { required: true })} placeholder="password" className="input input-bordered" />
                                {errors.password && <span>Password is required</span>}
                                <label className="label">
                                    <button onClick={() => setShowPassword(!showPassword)} className="label-text-alt">Show password</button>
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mb-3">
                                <label className="label">
                                    <span className="label-text">Profile Image</span>
                                </label>
                                <input type="text"{...register("img", { required: true })} placeholder="Your profile picture" className="input input-bordered" />
                                {errors.img && <span>Profile picture is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input onChange={checkCaptcha} type="text" name="captcha" placeholder="captcha" className="input input-bordered" />
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary" disabled={disable}>Registration</button>
                            </div>
                        </form>
                        <p>Have an account <Link to={'/login'}>Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;