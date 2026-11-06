import { notFound } from "next/navigation";
import { getBusinessBySlug, getAllBusinesses } from "@/data/businessStore";
import { DEFAULT_BUSINESS_SLUG } from "@/data/mockBusinesses";
import CustomerReviewCard from "@/components/CustomerReviewCard";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const business = getBusinessBySlug(slug) || getBusinessBySlug(DEFAULT_BUSINESS_SLUG);

  return {
    title: `Leave a Google Review — ${business?.name || "Business"}`,
    description: `Help ${business?.name} grow by leaving your authentic Google review in 15 seconds. Generated with AI assistance.`
  };
}

export default async function CustomerReviewPage({ params }) {
  const { slug } = await params;
  const business = getBusinessBySlug(slug) || getBusinessBySlug(DEFAULT_BUSINESS_SLUG);

  if (!business) {
    notFound();
  }

  return (
    <main className="min-h-screen w-full bg-white flex flex-col justify-between">
      {/* Native Full-Screen Mobile Review Interface */}
      <CustomerReviewCard business={business} isFullPage={true} />
    </main>
  );
}
