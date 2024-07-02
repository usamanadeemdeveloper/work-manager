'use client';
import React, { useContext, useState } from "react";
import { logout } from "@/services/userService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import UserContext from "@/context/userContext";
import MobileNavbar from "./MobileNavbar";
import MobileMenuItems from "./MobileMenuItems";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


const CustomNavbar = (): JSX.Element => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const context = useContext(UserContext);
    const router = useRouter();

    const toggleMenu = (): void => {
        setIsMenuOpen(!isMenuOpen);
    };

    const doLogout = async (): Promise<void> => {
        try {
            const result = await logout();
            toast.success(result?.message);
            context?.setUser(null);
            router.push('/login');
        } catch (error) {
            toast.error('Error: ' + error);
        }
    };

    return (
        <>
            {/* Desktop Navbar */}
            <nav className="bg-blue-600 h-16 py-2 px-6 flex justify-between items-center hidden sm:flex shadow-lg">
                <div className="brand">
                    <h1 className="text-3xl font-bold text-white">
                        <Link href={'/'}>Work Manager</Link>
                    </h1>
                </div>
                <div>
                    <ul className="flex space-x-6 text-lg text-white">
                        {context?.user && (
                            <>
                                <li>
                                    <Link href={'/'} className="hover:text-gray-300">Home</Link>
                                </li>
                                <li>
                                    <Link href={'/add-task'} className="hover:text-gray-300">Add Task</Link>
                                </li>
                                <li>
                                    <Link href={'/show-task'} className="hover:text-gray-300">Show Task</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
                <div>
                    <ul className="flex space-x-6 text-lg text-white">
                        {context?.user ? (
                            <>
                                <li className="font-semibold pt-1">
                                    {context?.user?.name ? context?.user?.name : context?.user?.user?.name}
                                </li>
                                <li>
                                    <button
                                        onClick={doLogout}
                                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded flex items-center">
                                        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link href={'/login'} className="hover:text-gray-300">Login</Link>
                                </li>
                                <li>
                                    <Link href={'/signup'} className="hover:text-gray-300">SignUp</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>

            {/* Mobile Navbar */}
            <MobileNavbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

            {/* Mobile Menu */}
            <MobileMenuItems isMenuOpen={isMenuOpen} />
        </>
    );
};

export default CustomNavbar;
