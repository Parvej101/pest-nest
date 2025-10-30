export const dynamic = "force-dynamic";

import CountdownTimer from "@/components/CountdownTimer";
import ProductCard from "@/components/shared/ProductCard";
import Link from "next/link";

import dbConnect from "../../../lib/dbConnect";
import Deal from "../../../models/Deal";

// --- ডেটা আনার জন্য Helper ফাংশন ---
async function getActiveDeal() {
  try {
    await dbConnect();

    const now = new Date();

    const activeDeal = await Deal.findOne({
      isFeatured: true,
      expiryDate: { $gt: now },
    }).populate("productIds");

    return activeDeal ? JSON.parse(JSON.stringify(activeDeal)) : null;
  } catch (error) {
    console.error("Failed to fetch active deal:", error);
    return null;
  }
}

// ===================================================================

const DealsPage = async () => {
  const deal = await getActiveDeal();

  if (!deal) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <h1 className="text-3xl font-bold">No Active Deals Right Now</h1>
        <p className="mt-2 text-base-content/70">
          Please check back later for exciting offers!
        </p>
        <Link href="/shop" className="btn btn-primary mt-6">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-base-200 mb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-base-100 p-6 md:p-10 rounded-2xl shadow-lg text-center mb-12">
          <h1 className="text-2xl md:text-5xl font-extrabold text-primary">
            {deal.title}
          </h1>
          <p className="mt-3 lg:text-base-content/60 text-sm">
            Don't miss out on these amazing prices! Offer ends in:
          </p>
          <div className="mt-6">
            <CountdownTimer expiryDate={deal.expiryDate} />
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Products on Sale
        </h2>
        {deal.productIds && deal.productIds.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 md:gap-x-6 md:gap-y-8">
            {deal.productIds.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-base-content/70 py-10">
            No products are available in this deal.
          </p>
        )}
      </div>
    </div>
  );
};

export default DealsPage;
