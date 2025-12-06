import React, {useEffect, useState} from 'react'
import ListingCard from '../components/ListingCard'

function Home(){
    const [listings, setListings] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`http:localhost://localhost:{}/api/listings`)
            .then(res => res.json())
            .then(data => {
                setListings(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching listings:", err);
                setLoading(false);
            })
    }, [])

    if (loading) return <div className='p-8 text-center'>Loading Kampus items...</div>

    return (
        <div className='p-4 max-w-6xl mx-auto'>
            <h1 className='text-3xl font-bold mb-6 text-gray-800'>Fresh Finds</h1>
            
            {/* Grid Layout */}
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {listings.map(listing => (
                    <ListingCard key={listing._id} listing={listing}></ListingCard>
                ))}
            </div>

            {listings.length === 0 && (
                <p className='text-center col-span-full text-gray-500'>
                    No items yet. Be the first to sell!
                </p>
            )}
        </div>
        
    )
}

export default Home;