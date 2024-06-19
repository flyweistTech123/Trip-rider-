import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import img from '../../Images/logo.png';
import { BaseUrl } from '../../Components/BaseUrl/BaseUrl';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';


const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('admin');
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState(false);

    useEffect(() => {
        localStorage.clear();
    }, []);

    const handleRegister = async () => {
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

            if (role !== 'admin' && role !== 'superAdmin') {
                toast.error('Invalid role selected. Please select a valid role.');
                return;
            }

            const response = await axios.post(`${BaseUrl}api/v1/admin/register`, {
                email,
                password,
                role
            });

            const { token, newUser } = response.data.data;
            localStorage.setItem('token', token);
            localStorage.setItem('role', newUser.role);
            toast.success("Registration successful");
            navigate('/dashboard');
        } catch (error) {
            console.error('Error:', error.message);
            if (error.response && error.response.data && error.response.data.message === 'admin already exists') {
                toast.error('Admin already exists. Please use a different email.');
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
                        <p>Create an Account</p>
                        <h5>Welcome! Please fill in the form to register.</h5>
                    </div>
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

                    <div className='login5' onClick={handleRegister}>
                        <button >Register</button>
                    </div>
                    <div className='login6'>
                        <span>Already have an account?</span>
                        <span onClick={() => navigate('/')}>Login Here</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
