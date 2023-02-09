
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectCategoriesMap } from '../../../store/category/category.selector';
import ProductCard from '../../product-card/product-card.component';
import { CategoryContainer, Title } from './category.styles.jsx';

import './category.styles.jsx';

const Category = () => {
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap)
    const [products,setProducts] = useState(categoriesMap[category]);

    useEffect(()=>{
        setProducts(categoriesMap[category])
    },[category,categoriesMap]);

    return(<>
            <Title>{category.toUpperCase()}</Title>

            <CategoryContainer>
            {products && products.map(product => (
                <ProductCard key={product.id} product={product}/>
                ))}
            </CategoryContainer>
        </>
    )
}

export default Category;