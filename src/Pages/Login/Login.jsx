import React, { useEffect, useState } from 'react';
import './Login.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import img from '../../Images/img.png';
import google from '../../Images/img1.png';
import { BaseUrl } from '../../Components/BaseUrl/BaseUrl';



const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('admin');
    useEffect(() => {
        localStorage.removeItem('token')
    }, [])

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${BaseUrl}api/v1/admin/login`, {
                email: email,
                password: password,
                role: role
            });

            const { token, user } = response.data.data;
            localStorage.setItem('token', token);
            localStorage.setItem('role', user.role);
            toast.success("Login successfully");
            navigate('/dashboard');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                toast.error(`error: ${error.response.data.error}`);
            } else {
                console.error('Error:', error.message);
                toast.error(`Error: ${error.message}`);
            }
        }
    };



    return (
        <>
            <div className='login'>
                <div className='login1'>
                    <div className='login9'>
                        <img src={img} alt="" />
                    </div>
                    <div className='login10'>
                        <h3>Explore new ways to travel with Trip Rider</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non sollicitudin leo, et egestas diam.</p>
                    </div>
                </div>

                <div className='login2'>
                    <div className='login7'>
                        <p>Welcome Back !!</p>
                        <h5>Welcome Back, Lorem ipsum dolor sit amet.</h5>
                    </div>
                    <div className='login3'>
                        <button> <img src={google} alt="" />Sign-in with google</button>
                    </div>
                    <div className='login4'>
                        <div className='login20'>
                            <label htmlFor="">Email</label>
                            <input type="email" name="" id="" placeholder='ex. email@domain.com' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='login20'>
                            <label htmlFor="">Password*</label>
                            <input type="password" name="" id="" placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className='login20'>
                            <label htmlFor="">Role</label>
                            <select value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="admin">Admin</option>
                                <option value="superAdmin">Super Admin</option>
                            </select>
                        </div>
                    </div>

                    <div className='login5' onClick={handleLogin}>
                        <button >Login</button>
                    </div>
                    <div className='login6'>
                        <span>Don’t have an account?</span>
                        <span onClick={() => navigate('/')}>Signup Here</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
