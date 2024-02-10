import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Category = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.post('http://localhost:8000/fetchcategories');
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    
    <div className="h-auto w-full grid grid-cols-4 gap-y-4 mx-2">
      {categories.map((category) => (
        <div className="w-44 shadow-sm shadow-gray-400 rounded-lg text-center flex flex-col justify-center items-center gap-2 hover:scale-105 duration-500 cursor-pointer h-44" key={category._id} onClick={()=>navigate('/detailedcategory', { state: { key:category._id } })}>
          <img
            src={category.url}
            alt={category.name}
            className='w-2/3 h-1/2'
            onError={(e) => console.error("Image loading error:", e.target.src)}
          />
          <h2>{category.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default Category;
