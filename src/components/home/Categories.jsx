import Image from "next/image";
import Link from "next/link";

async function getCategories() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      console.error("Failed to fetch categories. Status:", res.status);
      return [];
    }
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

const Categories = async () => {
  // সার্ভারেই ডেটাবেস থেকে ক্যাটাগরিগুলো আনা হচ্ছে
  const categories = await getCategories();

  return (
    <section className="py-12 md:py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="lg:text-3xl text-xl font-bold mb-8 text-center md:text-left">
          Explore Our Collections
        </h2>

        {categories.length === 0 ? (
          <p className="text-center text-base-content/60">
            No collections to display.
          </p>
        ) : (
          /* --- হরিজন্টাল স্ক্রলিং কন্টেইনার --- */
          <div className="flex space-x-4 md:space-x-6 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map((category) => (
              <Link
                href={`/shop?category=${encodeURIComponent(category.name)}`}
                key={category._id}
                className="group block shrink-0 w-40 md:w-48"
              >
                <div className="relative rounded-lg overflow-hidden h-56 md:h-64 shadow-md group-hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 768px) 30vw, 15vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  />
                  {/* আবরণের (Overlay) জন্য div */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>

                  {/* ক্যাটাগরির নাম */}
                  <div className="absolute bottom-0 left-0 p-3 md:p-4">
                    <h3 className="text-white font-bold text-lg leading-tight">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;
