import { useSelector } from 'react-redux';

import CategoryPreview from '../../category-preview/category-preview.component'
import { selectCategoriesMap } from '../../../store/category/category.selector';

const CategoriesPreview = () => {
    
    const categoriesMap = useSelector(selectCategoriesMap)
    return(
        <>
            { Object.keys(categoriesMap).map(title => {
                const products = categoriesMap[title];
                return <CategoryPreview key={title} products={products} title={title}/>
            })}
        </>
    );
};

export default CategoriesPreview;