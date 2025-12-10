import React, {useEffect, useState} from 'react'
import ListingCard from '../components/ListingCard'

function Home(){
    const [listings, setListings] = useState([])
    const [loading, setLoading] = useState(true)

    // Search states
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")

    // Reusable fetch function
    const fetchListings = () => {
        setLoading(true);

        let url = `${import.meta.env.VITE_API_URL}/api/listings?`

        if (searchTerm) url += `search=${searchTerm}`
        if (selectedCategory !== "All") url += `category=${selectedCategory}`

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setListings(data)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchListings();
    }, [])

    useEffect(() => {
        fetchListings();
    }, [selectedCategory])

    const handleSearch = (e) => {
        e.preventDefault();
        fetchListings();
    }

    if (loading) return <div className='p-8 text-center'>Loading Kampus items...</div>

    return (
        <div className='p-4 max-w-6xl mx-auto'>
            <h1 className='text-3xl font-bold mb-6 text-gray-800'>Fresh Finds</h1>
            
            {/* Search and Filter Section */}
            <div className='mb-8 flex flex-col md:flex-row gap-4'>
                <form onSubmit={handleSearch} className='flex-1 flex gap-2'>
                    <input  type="text"
                            placeholder='Search for items...'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='border p-2 rounded w-full' />
                    <button type="submit" className='bg-blue-600 text-white px-4 py-2 rounded'>Search</button>
                </form>

                {/* Category dropdown */}
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className='border p-2 rounded'
                >
                    <option value="All">All Categories</option>
                    <option value="Books">Books</option>
                    <option value="Uniforms">Uniforms</option>  
                    <option value="Electronics">Electronics</option>
                    <option value="Misc">Misc</option>
                </select>
            </div>

            {/* Results */}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {listings.length > 0 ? (
                        listings.map(listing => (
                            <ListingCard key={listing._id} listing={listing}></ListingCard>
                        ))
                    ) : (
                        <p className='col-span-full text-center text-gray-500'>
                            No items found matching "{searchTerm}"
                        </p>
                    ) }
                </div>
            )}
            
        </div>
        
    )
}

export default Home;