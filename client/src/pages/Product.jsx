import ProductCard from "../components/ProductCard";

const Products = () => {
  return (
    <div>
      <div>
        <h1 className="text-white font-semibold text-3xl">PRODUCTS</h1>
        <p className="text-white text-sm">See your list of products</p>
      </div>
      <ProductCard />
    </div>
  );
};

export default Products;
