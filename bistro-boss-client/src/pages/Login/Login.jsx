import React, {useContext, useEffect, useState} from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {AuthContext} from "../../Provider/AuthProvider.jsx";
import Swal from 'sweetalert2'

const Login = () => {
    const {signIn} = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [disable, setDisable] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const redirect = location.state?.from?.pathname || '/';
    console.log(location.state?.from?.pathname)

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

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
    const handelLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then((userCredential) => {
                navigate(redirect);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Profile created',
                    showConfirmButton: false,
                    timer: 1500
                })
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
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shadow-2xl bg-base-100 w-2/3">
                    <div className="card-body">
                        <form onSubmit={handelLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type={showPassword ? "text" : "password"} name="password" placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <button onClick={() => setShowPassword(!showPassword)} className="label-text-alt">Show password</button>
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input onChange={checkCaptcha} type="text" name="captcha" placeholder="captcha" className="input input-bordered" />
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary" >Login</button>
                                {/*disabled={disable}*/}
                            </div>
                        </form>
                        <p>Don't have any account <Link to={'/registration'}>Registration</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;