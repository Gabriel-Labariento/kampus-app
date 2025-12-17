import React, {useEffect, useState, useCallback} from 'react'
import ListingCard from '../components/ListingCard'

function Home(){
    const [listings, setListings] = useState([])
    const [loading, setLoading] = useState(true)

    // Search states
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")

    // Reusable fetch function wrapped in useCallback for performance
    const fetchListings = useCallback(() => {
        setLoading(true);

        const params = new URLSearchParams();

        if (searchTerm) params.append('search', searchTerm)
        if (selectedCategory && selectedCategory !== "All") params.append('category', selectedCategory)
        
        let url = `${import.meta.env.VITE_API_URL}/api/listings?${params.toString()}`

        fetch(url)
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch");
                return res.json();
            })
            .then(data => {
                setListings(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Fetch error:", err);
                setLoading(false);
            });

    }, [searchTerm, selectedCategory])

    useEffect(() => {
        fetchListings();
    }, [selectedCategory, fetchListings])

    const handleSearch = (e) => {
        e.preventDefault();
        fetchListings();
    }

    const handleClear = () => {
        setSearchTerm("")
        setSelectedCategory("All")
        // fetchListings will be called automatically by useEffect when state changes
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
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {/* Show 8 fake cards while loading */}
                        {[...Array(8)].map((_, index) => (
                            <SkeletonCard key={index} />
                    ))}
                </div>
            ) : (
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {listings.length > 0 ? (
                        listings.map(listing => (
                            <ListingCard key={listing._id} listing={listing}></ListingCard>
                        ))
                    ) : (
                         <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                            <img src="/empty.svg" alt="No items" className="w-48 h-48 opacity-50 mb-4" />
                            <h3 className="text-xl font-bold text-gray-700">No items found</h3>
                            <p className="text-gray-500">Try changing your search terms or category.</p>
                            
                            <button 
                                type='button'
                                onClick={handleClear}
                                className="mt-4 text-blue-600 font-semibold hover:underline"
                            >
                                Clear Filters
                            </button>
                        </div>
                    ) }
                </div>
            )}
            
        </div>
        
    )
}

export default Home;