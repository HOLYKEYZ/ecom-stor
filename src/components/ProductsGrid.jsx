import ProductCard from "./ProductCard";

export default function ProductsGrid({ products = [], addToCart }) {
  return (
    <section className="products-grid" aria-label="Products">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          id={p.id}
          image={p.image}
          name={p.name}
          rating={p.rating?.stars || 5}
          ratingCount={p.rating?.count || 0}
          price={p.priceCents}
          addToCart={addToCart}
        />
      ))}
    </section>
  );
}
