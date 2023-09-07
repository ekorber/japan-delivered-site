import ProductList from "@/features/products/components/productList"
import Header from "@/components/header"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <Header />
      <div className="px-10 my-10">
        <h2 className="text-3xl text-center mb-5">Straight from Japan!</h2>
        <h4 className="text-xl text-center mb-10">Go on a digital treasure hunt to find that special item you always wanted, shipped straight from Japan.</h4>
        <h4 className="text-lg text-center mb-10">Can't find what you're looking for? Send us a <Link href='/custom-request' className="text-blue-600 underline">custom request!</Link></h4>
      </div>
      <ProductList />
    </>
  )
}