import React, {useState} from 'react'

function SellForm() {
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        category: 'Uniforms',
        img: null
    })
    
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        const {name, value, files} = e.target

        if (name === "img") {
            // Store the file object
            setFormData(prev => ({
                ...prev,
                [name]: files[0]
            }))
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }

    async function handleSubmit(e) {
        e.preventDefaule();
        setLoading(true)

        try {
            // Uplaod image to Cloudinary
            const imageFormData = new FormData()
            imageFormData.append("file", formData.img)
            imageFormData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET) 
            
            // Send to Cloudinary API
            const cloudName = import.meta.env.VITE_CLOUD_NAME
            const cloudinaryRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: "POST",
                body: imageFormData
            }) 

            const cloudinaryData = await cloudinaryRes.json()
            const imageUrl = cloudinaryData.secure_url;

            console.log("Image Uploaded:", imageUrl);

            // Send data to backend
            const res = await fetch('', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    title: formData.title,
                    price: formData.price,
                    category: formData.category,
                    imageUrl: imageUrl,
                    school: 'UP Diliman'
                })
            })

            if (res.ok) {
                alert("Item listed successfully!")
                setFormData({title: '', price: '', img: null, category: 'Uniforms'})
            }

        } catch (error) {
            console.error("Error uploading:", error)
            alert("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-4 border rounded shadow-md max-w-sm'>
            <h2 className='text-xl font-bold'>Sell an Item</h2>
            <label className="flex flex-col" htmlFor="title">Title:
                <input  name='title' 
                        type="text" 
                        value={formData.title} 
                        onChange={handleChange}
                        className='border p-2 rounded'
                        required />
            </label>

            <label className="flex flex-col" htmlFor="price">Price:
                <input  name='price'
                        type="number" 
                        value={formData.price} 
                        onChange={handleChange}
                        className='border p-2 rounded'
                        required/>
            </label>

            <label className='flex flex-col' htmlFor="category">Category:
                <select name="category" id="category" value={formData.category} onChange={handleChange} className='border p-2 rounded'>
                    <option value="Uniforms">Uniforms</option>
                    <option value="Books">Books</option>
                    <option value="Electronics">Electronics</option>
                </select>
            </label>

            <label className="flex flex-col" htmlFor="img">Image:
                <input  name="img"
                        type="file" 
                        onChange={handleChange}
                        className='borded p-2'
                        accept='image/*'
                        required
                />
            </label>

            <button
                type='submit'
                disabled={loading}
                className='bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400'>
                    {loading ? "Uploading..." : "List Item"}
            </button>
        </form>
    )
}

export default SellForm