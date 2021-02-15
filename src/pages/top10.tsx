import { GetStaticProps } from "next";

interface IProduct {
    id: number;
    title: string;
    price: number;
    category_id: string;
    slug: string;
}

interface Top10Props {
    products: IProduct[];
}

const Top10 = ({ products }: Top10Props) => {
    return (
        <div>
            <h1>Top 10</h1>

            <ul>
                {products.map(recomendedProduct => {
                    return (
                        <li key={recomendedProduct.id}>
                            {recomendedProduct.title}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

const getStaticProps: GetStaticProps<Top10Props> = async (context) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
    const products = await response.json();

    return {
        props: {
            products
        },
        revalidate: 5,

    }
}

export default Top10;
export { getStaticProps };