import React from 'react'
import {useUser, SignOutButton} from '@clerk/clerk-react'
import { isStudentEmail } from '../utils/allowedDomains'

function StudentRoute({children}) {
    const {isLoaded, isSignedIn, user} = useUser();

    if (!isLoaded) {
        return <div className='h-screen flex items-center justify-center'>Loading...</div>
    }

    if (!isSignedIn) return children

    const email = user.primaryEmailAddress?.emailAddress;

    if (!isStudentEmail(email)){
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
                <div className="bg-white p-8 rounded-xl shadow-lg max-w-md border border-red-100">
                    <span className="text-4xl">🚫</span>
                    <h1 className="text-2xl font-bold text-gray-800 mt-4">Access Restricted</h1>
                    <p className="text-gray-600 mt-2">
                        Sorry, <strong>{email}</strong> is not a valid university email. 
                    </p>
                    <p className="text-sm text-gray-500 mt-4 mb-6">
                        We're sorry, it appears your email isn't recognized by our system.
                    </p>
                    
                    <div className="flex gap-3 justify-center">
                        <SignOutButton>
                            <button className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition">
                                Sign Out
                            </button>
                        </SignOutButton>
                    </div>
                </div>
            </div>
        )
    }
    return children
}

export default StudentRoute;