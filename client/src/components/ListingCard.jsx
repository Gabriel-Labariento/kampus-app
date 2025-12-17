import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const ListingCard = memo(function ListingCard({listing}){
    return (
        <div className='group border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full cursor-pointer'>
            
            {/* Image Section */}
            <Link to={`/listing/${listing._id}`} className='h-48 overflow-hidden bg-gray-100 relative'>
                <img 
                    src={listing.imageUrl} 
                    alt={listing.title}
                    loading="lazy"
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300' 
                />
            </Link>
            
            {/* Details Section */}
            <div className='p-4'>
                <span className='text-xs text-blue-600 font-bold uppercase tracking-wider'>
                    {listing.category}
                </span>
                <h3 className='font-bold text-lg text-gray-800 truncate'>
                    {listing.title}
                </h3>
                <p className='text-gray-900 font-semibold mt-1'>
                      ₱{listing.price.toLocaleString()} 
                </p>
                <p className='text-sm text-gray-500 mt-2 truncate'>
                    {listing.school}
                </p>
                <Link   to={`/listing/${listing._id}`}
                        className="mt-auto block text-center border border-blue-600 text-blue-600 py-2 rounded hover:bg-blue-50 text-sm font-semibold">
                            View Details
                </Link>
            </div>
        </div>
    )
})

export default ListingCard;