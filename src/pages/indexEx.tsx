import { useEffect, useState } from 'react';
import { Title } from '@/styles/pages/Home'

interface IProduct {
  id: string;
  title: string;
}

const Home = () => {
  const [recomendedProducts, setRecomendedProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommended`).then(response => {
      response.json().then(data => {
        setRecomendedProducts(data);
      })
    })
  }, [])

  return (
    <div>

      <section>
        <Title>Hello Word</Title>

        <ul>
          {recomendedProducts.map(recomendedProduct => {
            return (
              <li key={recomendedProduct.id}>
                {recomendedProduct.title}
              </li>
            )
          })}
        </ul>

      </section>
    </div>
  )
}

export default Home
