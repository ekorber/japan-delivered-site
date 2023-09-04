import ProductForm from "@/features/products/components/productForm"

export default function UploadProductPage() {
    return (
        <>
            <h1 className="text-center mt-12 mb-20 text-3xl">Upload A New Product</h1>

            <ProductForm requestMethod='POST' cancelHref='/admin/dashboard' />
        </>
    );
}