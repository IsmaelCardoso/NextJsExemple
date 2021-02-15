import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router";

interface ICategory {
    id: number;
    title: string;
}

interface IProduct {
    id: number;
    title: string;
    price: number;
    category_id: string;
    slug: string;
}

interface CategoryProps {
    products: IProduct[];
}

const Category = ({ products }: CategoryProps) => {
    const router = useRouter();

    if (router.isFallback) {
        return <p>Carregando...</p>
    }

    return (
        <>
            <h1>Category</h1>
            <h1>{router.query.slug}</h1>

            <ul>
                {products.map(product => {
                    return (
                        <li key={product.id}>
                            {product.title}
                        </li>
                    )
                })}
            </ul>
        </>
    );
}

const getStaticPaths: GetStaticPaths = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
    const categories = await response.json();

    const paths = categories.map((category: ICategory) => {
        return {
            params: { slug: category.id }
        }
    })

    return {
        paths,
        fallback: true,
    }
}


const getStaticProps: GetStaticProps<CategoryProps> = async (context) => {
    const { slug } = context.params;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?category_id=${slug}`)
    const products = await response.json();

    return {
        props: {
            products
        },
        revalidate: 60,

    }
}

export default Category;
export { getStaticPaths, getStaticProps };