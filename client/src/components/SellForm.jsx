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
    }

    return (
        <form>
            <label htmlFor="title">Title:
                <input type="text" value={formData.title} onChange={handleChange} />
            </label>
            <label htmlFor="price">Price:
                <input type="text" value={formData.price} onChange={handleChange}/>
            </label>
            <label htmlFor="img">
                <input type="file" value={formData.img} onChange={handleChange} />
            </label>
        </form>
    )
}