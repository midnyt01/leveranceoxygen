import { useContext } from "react";
import { ProductsContext } from "../../../context/admin/products.context";
import ProductCard from "../product-card/product-card.component";
import '../see-all-products/product-list.css'

const SeeAllProducts = () => {

    const {allProducts} = useContext(ProductsContext)

    
    return (
        <div>
            <div className="container-fluid m-auto">
            <h2>All Products</h2>
                {
                    allProducts.map((product) => {
                        return <ProductCard product={product} key={product.MFID}/>
                    })
                }
            </div>
        </div>
    )
}

export default SeeAllProducts;