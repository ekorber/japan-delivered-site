import PrimaryButton from "@/components/primaryButton"
import ProductList from "@/components/productList"
import Header from "@/components/header"

export default function Home() {
  return (
    <>
      <Header />
      <ProductList />
      <PrimaryButton buttonText="Add to Cart" />
      <PrimaryButton buttonText="Something Similar..." />
    </>
  )
}