import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import img from '../../Images/img.png';
import { BaseUrl } from '../../Components/BaseUrl/BaseUrl';

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('admin'); // Default role is set to 'admin'
    useEffect(() => {
        localStorage.removeItem('token');
    }, []);

    const handleRegister = async () => {
        try {
            if (role !== 'admin' && role !== 'superAdmin') {
                toast.error('Invalid role selected. Please select a valid role.');
                return;
            }

            const response = await axios.post(`${BaseUrl}api/v1/admin/register`, {
                email: email,
                password: password,
                role: role
            });

            const { token, newUser } = response.data.data;
            localStorage.setItem('token', token);
            localStorage.setItem('role', newUser.role);
            toast.success("Registration successful");
            navigate('/dashboard');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                toast.error(`Error: ${error.response.data.error}`);
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
                        <p>Create an Account</p>
                        <h5>Welcome! Please fill in the form to register.</h5>
                    </div>
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

                    <div className='login5' onClick={handleRegister}>
                        <button >Register</button>
                    </div>
                    <div className='login6'>
                        <span>Already have an account?</span>
                        <span onClick={() => navigate('/login')}>Login Here</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
