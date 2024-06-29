"use client";
import Link from 'next/link';
import React, { useState } from 'react'

const MobileNavbar = ({ isMenuOpen, toggleMenu }: { isMenuOpen: boolean, toggleMenu: () => void }) => {

    return (
        <nav className="bg-blue-600 h-14 py-2 px-3 flex justify-between items-center sm:hidden">
            <div className="brand">
                <h1 className="text-xl font-semibold">
                    <Link href={'/'}>Work Manager</Link>
                </h1>
            </div>
            <div>
                <button
                    type="button"
                    className="text-white focus:outline-none"
                    onClick={toggleMenu}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                    {isMenuOpen ? (
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    )}
                </button>
            </div>
        </nav>
    )
}

export default MobileNavbar;
