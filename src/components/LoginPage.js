import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './LoginPage.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [userCategory, setUserCategory] = useState('Individual');
    const [isSignup, setIsSignup] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPostalDetails = async () => {
            if (pinCode.length === 6) {
                try {
                    const response = await fetch(`https://api.postalpincode.in/pincode/${pinCode}`);
                    const data = await response.json();
                    if (data[0].Status === 'Success' && data[0].PostOffice && data[0].PostOffice.length > 0) {
                        const postOffice = data[0].PostOffice[0];
                        setCity(postOffice.District || '');
                        setState(postOffice.State || '');
                        setCountry(postOffice.Country || '');
                        setErrorMessage('');
                    } else {
                        setCity('');
                        setState('');
                        setCountry('');
                        setErrorMessage('Invalid PIN code or no data found');
                    }
                } catch (error) {
                    console.error('Error fetching postal details:', error);
                    setErrorMessage('Failed to fetch postal details.');
                }
            } else {
                setCity('');
                setState('');
                setCountry('');
            }
        };
        fetchPostalDetails();
    }, [pinCode]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        if (isSignup && password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        try {
            if (isSignup) {
                const response = await api.post('/register/', {
                    email,
                    password,
                    first_name: firstName,
                    last_name: lastName,
                    phone_number: phoneNumber,
                    address,
                    pin_code: pinCode,
                    city,
                    country,
                    state,
                    user_category: userCategory
                });
                console.log('Signup successful:', response.data);

                // Clear form fields after successful signup
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setFirstName('');
                setLastName('');
                setPhoneNumber('');
                setAddress('');
                setPinCode('');
                setCity('');
                setCountry('');
                setState('');
                setUserCategory('Individual');

                alert('Signup successful! Please log in.');
                navigate('/login');
            } else {
                const response = await api.post('token/', { email, password });
                console.log('Login successful:', response.data);

                localStorage.setItem('accessToken', response.data.access);
                localStorage.setItem('refreshToken', response.data.refresh);

                navigate('/home');
            }
        } catch (error) {
            console.error('Error:', error);
            if (error.response && error.response.status === 400 && error.response.data.email) {
                setErrorMessage('Email already exists.');
            } else {
                setErrorMessage('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h1>{isSignup ? 'Sign Up' : 'Login'}</h1>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <form onSubmit={handleSubmit}>
                    {isSignup && (
                        <>
                            <input
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </>
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {isSignup && (
                        <>
                            <input
                                type="text"
                                placeholder="Phone Number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Pin Code"
                                value={pinCode}
                                onChange={(e) => setPinCode(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="State"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                required
                            />
                            <select
                                value={userCategory}
                                onChange={(e) => setUserCategory(e.target.value)}
                                required
                            >
                                <option value="Individual">Individual</option>
                                <option value="Enterprise">Enterprise</option>
                                <option value="Government">Government</option>
                            </select>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </>
                    )}
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
                </form>
                <div className="toggle-link">
                    <a href="#" onClick={() => setIsSignup(!isSignup)}>
                        {isSignup ? 'Already have an account? Login' : 'Need an account? Sign Up'}
                    </a>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;