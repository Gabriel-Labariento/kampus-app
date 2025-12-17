import React, {useEffect, useState, useCallback} from 'react'
import { useUser } from '@clerk/clerk-react'
import ListingCard from '../components/ListingCard'
import toast from 'react-hot-toast'
import { confirmToast } from '../components/confirmToast'

function MyListings(){
    const {user, isLoaded} = useUser()
    const [myItems, setMyItems] = useState([])
    const [loading, setLoading] = useState(true);

    const fetchMyListings = useCallback(() => {
        if (!isLoaded || !user) return;

        fetch(`${import.meta.env.VITE_API_URL}/api/listings/user/${user.id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setMyItems(data)
            setLoading(false)
        })
        .catch(err => console.error(err)); 
    }, [isLoaded, user])

    useEffect(() => {
        fetchMyListings();
    }, [fetchMyListings])

    const handleDelete = useCallback(async(itemId) => {
        const confirmed = await confirmToast("Are you sure you want to remove this listing?")
        if (!confirmed) return;

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/listings/${itemId}`, {
                method: 'DELETE'
            })

            if (res.ok) {
                setMyItems(prev => prev.filter(item => item._id !== itemId))
                toast.success("Successfully deleted item!")
            }
        } catch {
            toast.error("Failed to delete")
        }
    }, [])

    if (!isLoaded) return <div className='p-10 text-center'>Loading account...</div>
    if (loading) return <div className='p-8'>Loading your stash...</div>
    
    console.log('myItems :>> ', myItems);
    return (
        <div className='p-4 max-w-6xl mx-auto'>
            <h1 className='text-3xl font-bold mb-6'>My Inventory</h1>

            {myItems.length === 0 ? (
                <p>You haven't listed anything yet.</p>
            ) : (
                <div className='grid grid-cols-2 md:grid=cols-3 lg:grid-cols-4 gap-6'>
                    {myItems.map(item => {
                        return (<div key={item._id} className='relative group'>
                            <ListingCard listing={item}></ListingCard>
                            <button onClick={() => handleDelete(item._id)} className='absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded shadow hover:bg-red-700 z-10'> Mark Sold (Delete)</button>
                        </div>)
                    })}
                </div>
            )}
        </div>
    )
}

export default MyListings;