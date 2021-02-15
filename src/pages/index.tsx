import { GetServerSideProps } from 'next';
import { useCallback, useEffect, useState } from 'react';
import SEO from '@/components/SEO'
import { Title } from '@/styles/pages/Home'

interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProduct[];
}

const Home = ({ recommendedProducts }: HomeProps) => {
  const handleSum = useCallback(async () => {

    console.log(process.env.NEXT_PUBLIC_API_URL)

    const math = (await import("@/lib/math")).default
    alert(math.sum(3, 5));
  }, [])

  return (
    <div>
      <SEO title="DevCommerce, your best e-commerce!" sholldExcludeTitleSuffix />
      <section>
        <Title>Hello Word</Title>

        <ul>
          {recommendedProducts.map(recomendedProduct => {
            return (
              <li key={recomendedProduct.id}>
                {recomendedProduct.title}
              </li>
            )
          })}
        </ul>

        <button onClick={handleSum}>Sum</button>

      </section>
    </div>
  )
}

const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommended`)
  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts
    }
  }
}

export default Home
export { getServerSideProps }
