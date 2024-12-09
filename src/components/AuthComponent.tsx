import React, { FormEvent, useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify'; // Optional: Include toast notifications

import authImage from '../assets/images/authimage.png';
import { useAuth } from '../hooks/useAuth';
import { useUser } from '../hooks/useUser';
import { Student, StudentType } from '../types/student';
import { User } from '../types/user';

const AuthComponent: React.FC = () => {
    const {signIn, signUp} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [student, setStudent] = useState({
        student_type: '',
    });
    const [instructor, setInstructor] = useState({});
    const [isSignIn, setSignIn] = useState(true);
    const {userRole} = useUser();
    const currentState = useSelector((state) => state);
    console.log('Current State from Selector:', currentState);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSignIn) {
            try {
                await signIn(email, password, userRole);
                toast.success("Welcome back! You've signed in.");
            } catch (error) {
                toast.error(
                    'Failed to sign in. Please check your credentials.',
                );
                console.error('Error during sign-in:', error);
            }
        } else {
            const defaultUserProfile: Omit<User, 'uid'> & {password: string} = {
                email,
                password,
                username,
                firstname,
                lastname,
                role: userRole,
                profile_image: '../assets/images/userProfile.png',
                created_at: new Date(),
                updated_at: new Date(),
                student: {},
                instructor: {
                    hasRegister: false,
                },
            };

            try {
                await signUp(defaultUserProfile);
                toast.success('Account created successfully! Please sign in.');
                setSignIn(true);
            } catch (error) {
                toast.error('Failed to create account. Please try again.');
                console.error('Error during sign-up:', error);
            }
        }
    };

    return (
        <div className='min-h-screen flex flex-col items-center justify-center bg-white p-4'>
            {/* Brand Text */}
            <div className='font-abhaya text-center mb-2'>
                <h1 className='text-6xl font-bold'>
                    <span className='text-primary'>Learn</span>
                    <span className='text-tertiary'>Hub.</span>
                </h1>
            </div>

            {/* Main Form Container */}
            <div className='w-full max-w-lg bg-white p-8 rounded-lg'>
                <form onSubmit={handleSubmit} className='space-y-6'>
                    <h2 className='font-abhaya text-4xl font-bold text-center mb-4'>
                        {isSignIn ? 'Sign In' : 'Sign Up'}
                    </h2>

                    {!isSignIn && (
                        <div className='space-y-4'>
                            <div className='flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0'>
                                <div className='flex-1'>
                                    <label className='font-abhaya font-bold text-lg mb-1 block'>
                                        First Name
                                    </label>
                                    <input
                                        className='w-full border border-gray-300 p-3 bg-transparent font-abhaya focus:outline-none focus:ring-2 focus:ring-primary rounded'
                                        type='text'
                                        placeholder='First Name'
                                        value={firstname}
                                        onChange={(e) =>
                                            setFirstName(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className='flex-1'>
                                    <label className='font-abhaya text-lg font-bold mb-1 block'>
                                        Last Name
                                    </label>
                                    <input
                                        className='w-full border border-gray-300 p-3 bg-transparent font-abhaya focus:outline-none focus:ring-2 focus:ring-primary rounded'
                                        type='text'
                                        placeholder='Last Name'
                                        value={lastname}
                                        onChange={(e) =>
                                            setLastName(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className='font-abhaya text-lg font-bold mb-1 block'>
                                    Username
                                </label>
                                <input
                                    className='w-full border border-gray-300 p-3 bg-transparent font-abhaya focus:outline-none focus:ring-2 focus:ring-primary rounded'
                                    type='text'
                                    placeholder='Username'
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <div className='space-y-4'>
                        <div>
                            <label className='font-abhaya text-lg font-bold mb-1 block'>
                                Email
                            </label>
                            <input
                                className='w-full border border-gray-300 p-3 bg-transparent font-abhaya focus:outline-none focus:ring-2 focus:ring-primary rounded'
                                type='email'
                                placeholder='Email@example.com'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className='font-abhaya text-lg font-bold mb-1 block'>
                                Password
                            </label>
                            <input
                                className='w-full border border-gray-300 p-3 bg-transparent font-abhaya focus:outline-none focus:ring-2 focus:ring-primary rounded'
                                type='password'
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className='space-y-4'>
                        <button
                            className='w-full py-3 bg-primary text-white text-lg active:scale-95 font-abhaya rounded transition-transform'
                            type='submit'
                        >
                            {isSignIn ? 'Sign In' : 'Sign Up'}
                        </button>
                        <div className='text-center font-abhaya text-lg'>
                            {isSignIn ? (
                                <p>
                                    Don't have an account?{' '}
                                    <button
                                        type='button'
                                        className='text-secondary font-bold hover:underline'
                                        onClick={() => setSignIn(false)}
                                    >
                                        Sign Up
                                    </button>
                                </p>
                            ) : (
                                <p>
                                    Already have an account?{' '}
                                    <button
                                        type='button'
                                        className='text-secondary font-bold hover:underline'
                                        onClick={() => setSignIn(true)}
                                    >
                                        Sign In
                                    </button>
                                </p>
                            )}
                        </div>
                    </div>

                    <div className='flex items-center'>
                        <hr className='flex-grow border-t border-gray-300' />
                        <span className='px-4 text-gray-500 font-medium font-abhaya'>
                            or
                        </span>
                        <hr className='flex-grow border-t border-gray-300' />
                    </div>

                    <button
                        type='button'
                        className='w-full flex items-center justify-center py-3 border border-gray-300 hover:bg-gray-50 rounded transition-colors'
                        onClick={() => {
                            /* Handle Google sign-in */
                        }}
                    >
                        <FaGoogle className='text-xl mr-3' />
                        <span className='text-lg font-abhaya'>
                            Continue with Google
                        </span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AuthComponent;
