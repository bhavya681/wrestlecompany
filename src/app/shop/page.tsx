import Image from "next/image";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Button";

const merchandise = [
  {
    id: "apparel-1",
    name: "IM Heritage Hoodie",
    category: "Apparel",
    price: "$89",
    image: "https://picsum.photos/seed/shop-hoodie/400/500",
  },
  {
    id: "apparel-2",
    name: "IM Monogram Tee",
    category: "Apparel",
    price: "$42",
    image: "https://picsum.photos/seed/shop-tee/400/500",
  },
  {
    id: "apparel-3",
    name: "IM Championship Varsity",
    category: "Apparel",
    price: "$125",
    image: "https://picsum.photos/seed/shop-varsity/400/500",
  },
  {
    id: "accessories-1",
    name: "IM World Championship Belt Replica",
    category: "Collectibles",
    price: "$350",
    image: "/images/belt-world.svg",
  },
  {
    id: "accessories-2",
    name: "IM Snapback Cap",
    category: "Accessories",
    price: "$38",
    image: "https://picsum.photos/seed/shop-cap/400/500",
  },
  {
    id: "accessories-3",
    name: "IM Steel Cage Keychain",
    category: "Accessories",
    price: "$24",
    image: "https://picsum.photos/seed/shop-keychain/400/500",
  },
];

export default function ShopPage() {
  return (
    <>
      <PageHeader
        title="SHOP"
        subtitle="Official Indus Matworks merchandise. Wear the legacy."
        overline="THE IM STORE"
        backgroundImage="https://picsum.photos/seed/shop-hero/1920/1080"
      />

      <section className="py-12">
        <div className="container-wide">
          <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {["Apparel", "Accessories", "Collectibles"].map((cat) => (
              <button
                key={cat}
                type="button"
                className="border border-border px-4 py-2 font-display text-xs font-bold tracking-widest uppercase text-foreground-muted transition-all hover:border-accent-red hover:text-accent-red"
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {merchandise.map((item) => (
              <div key={item.id} className="border border-border">
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-background-secondary">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover grayscale transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <Badge variant="muted" size="sm">
                    {item.category}
                  </Badge>
                  <h3 className="mt-2 font-display text-lg font-bold text-foreground">
                    {item.name}
                  </h3>
                  <p className="mt-1 font-display text-xl font-bold text-accent-red">
                    {item.price}
                  </p>
                  <button
                    type="button"
                    className="mt-3 w-full border border-accent-red px-4 py-2 font-body text-xs font-bold tracking-widest uppercase text-accent-red transition-colors hover:bg-accent-red hover:text-background"
                  >
                    COMING SOON
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-12 text-center font-body text-sm text-foreground-muted">
            The IM Store is launching soon. Sign up for notifications in the
            footer.
          </p>
        </div>
      </section>
    </>
  );
}
