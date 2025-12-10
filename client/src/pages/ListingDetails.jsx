import React, {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'

function ListingDetails(){
    const {itemId} = useParams()
    const [item, setItem] = useState(null)
    const [loading, setLoading] = useState(true)
    const {user} = useUser()

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/listings/${itemId}`)
            .then(res => res.json())
            .then(data => {
                setItem(data);
                setLoading(false);
            })
            .catch(err => console.error(err))
    }, [itemId])

    if (loading) return <div className='p-8 text-center'>Loading details...</div>
    if (!item) return <div className='p-8 text-center'>Item not found.</div>
    return (
        <div className='max-w-4xl mx-auto p-4 flex flex-col md:flex-row gap-8 mt-6'>
            {/* Left: Image */}
            <div className="w-full md:w-1/2">
                <div className="border rounded-lg overflow-hidden shadow-sm">
                    <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full h-96 object-cover bg-gray-100" 
                    />
                </div>
            </div>

            {/* Right: Details */}
            <div className="w-full md:w-1/2 flex flex-col gap-4">
                <div>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full uppercase font-bold">
                        {item.category}
                    </span>
                    <h1 className="text-3xl font-bold text-gray-900 mt-2">{item.title}</h1>
                    <p className="text-2xl text-blue-600 font-semibold mt-1">
                        ₱{item.price.toLocaleString()}
                    </p>
                    <p className="text-gray-500 text-sm mt-1">Posted at: {item.school}</p>
                </div>

                <div className="border-t pt-4">
                    <h3 className="font-bold text-gray-700 mb-2">Description</h3>
                    <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">
                        {item.description || "No description provided."}
                    </p>
                </div>

                {/* Seller Info & Safety Box */}
                <div className="bg-gray-50 p-4 rounded-lg border mt-4">
                    <h3 className="font-bold text-sm text-gray-500 uppercase mb-2">Seller Info</h3>
                    <div className="flex items-center gap-3 mb-4">
                        {item.sellerImage && (
                            <img src={item.sellerImage} alt="Seller" className="w-10 h-10 rounded-full" />
                        )}
                        <div>
                            <p className="font-medium text-gray-900">{item.sellerEmail}</p>
                            <p className="text-xs text-gray-500">Verified Student</p>
                        </div>
                    </div>

                    {/* Action Button */}
                    <a 
                        href={`mailto:${item.sellerEmail}?subject=Inquiry: ${item.title}`}
                        className="block w-full bg-black text-white text-center py-3 rounded-md font-bold hover:bg-gray-800 transition"
                    >
                        Email Seller
                    </a>
                </div>

                {/* The "Pinoy" Safety Tip */}
                <div className="text-xs text-gray-400 mt-2 text-center">
                    <p>💡 <strong>Kampus Tip:</strong> Meet up in safe areas inside the campus (Library, Cafeteria) for transactions.</p>
                </div>
            </div>
        </div>
    )
}

export default ListingDetails;