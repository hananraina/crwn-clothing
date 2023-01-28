import { CartItemContainer, ItemDetails } from './cart-item.styles.jsx';

const CartItem = ({cartItems}) => {
    const {name,quantity,imageUrl,price}=cartItems;
    return (

        <CartItemContainer>
            
            <img src={imageUrl}/>
            
            <ItemDetails>
                <span className='name'>{name}</span>
                <span className='price'>{quantity} x ${price}</span>
            </ItemDetails>

        </CartItemContainer>
    )
}

export default CartItem;