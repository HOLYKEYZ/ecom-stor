import ProductCard from "./ProductCard";

export default function ProductsGrid({ products = [], addToCart }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          id={p.id}
          image={p.image}
          name={p.name}
          price={p.priceCents}
          addToCart={addToCart}
        />
      ))}
    </section>
  );
}
