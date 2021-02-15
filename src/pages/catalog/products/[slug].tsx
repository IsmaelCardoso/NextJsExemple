import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { useState } from 'react';

const AddToCartModal = dynamic(
    () => import('@/components/addToCardModal'),
    { loading: () => <p>Carregando...</p> }
);

const Products = () => {
    const router = useRouter();
    const [isAddToCartModalVisible, setIsAddToCartModalVisible] = useState<boolean>(false);

    const handleAddToCart = () => {
        setIsAddToCartModalVisible(true);
    }

    return (
        <>
            <h1>Products</h1>
            <h1>{router.query.slug}</h1>

            <button onClick={handleAddToCart}>Add to cart</button>

            {isAddToCartModalVisible && <AddToCartModal />}
        </>
    );
}

export default Products;