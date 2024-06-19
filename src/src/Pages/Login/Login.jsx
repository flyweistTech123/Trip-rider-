import React, { useEffect, useState } from 'react';
import './Login.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import img from '../../Images/img.png';
import google from '../../Images/img1.png';
import { BaseUrl } from '../../Components/BaseUrl/BaseUrl';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('admin');
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState(false);


    useEffect(() => {
        localStorage.clear();
    }, [])

    const handleLogin = async () => {
        try {
            if (!email) {
                setEmailError(true);
                toast.error('Please input your email!');
                return;
            }

            if (!password) {
                toast.error('Password is required.');
                return;
            }
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
            console.error('Error:', error.message);
            if (error.response && error.response.data && error.response.data.message === 'user not found ! not registered') {
                toast.error('Admin not exists. Please use a different email.');
            } else {
                toast.error('Something went wrong. Please try again.');
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
                        <p>Login an Account</p>
                        <h5>Welcome Back, Lorem ipsum dolor sit amet.</h5>
                    </div>
                    {/* <div className='login3'>
                        <button> <img src={google} alt="" />Sign-in with google</button>
                    </div> */}
                    <div className='login4'>
                        <div className='login20'>
                            <label htmlFor="">Email</label>
                            <input
                                type="email"
                                name=""
                                id=""
                                placeholder='ex. email@domain.com'
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setEmailError(false);
                                }}
                                required
                            />
                            {emailError && <span className='login50'>Please input your email!</span>}
                        </div>
                        <div className='login20'>
                            <label htmlFor="">Password*</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name=""
                                    id=""
                                    placeholder='Enter password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
                                >
                                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                </span>
                            </div>
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
                        <span onClick={() => navigate('/register')}>Signup Here</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
