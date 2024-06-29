import Link from 'next/link';
import React from 'react'

const MobileMenuItems = ({ isMenuOpen }: { isMenuOpen: boolean }) => {
    return (
        <div>
            {isMenuOpen && (
                <div className="sm:hidden">
                    <div className="bg-blue-600 py-2 px-3 space-y-2">
                        <Link
                            href={'/'}
                            className="block text-white hover:bg-blue-700 rounded px-2 py-1"
                        >
                            Home
                        </Link>
                        <Link
                            href={'/'}
                            className="block text-white hover:bg-blue-700 rounded px-2 py-1"
                        >
                            Add Task
                        </Link>
                        <Link
                            href={'/'}
                            className="block text-white hover:bg-blue-700 rounded px-2 py-1"
                        >
                            Show Task
                        </Link>
                        <Link
                            href={'/'}
                            className="block text-white hover:bg-blue-700 rounded px-2 py-1"
                        >
                            Login
                        </Link>
                        <Link
                            href={'/'}
                            className="block text-white hover:bg-blue-700 rounded px-2 py-1"
                        >
                            SignUp
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MobileMenuItems;
