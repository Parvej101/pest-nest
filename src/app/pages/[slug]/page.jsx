async function getPageContent(slug) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/pages/${slug}`,
      { next: { revalidate: 3600 } }
    ); // 1 hour cache
    if (!res.ok) return null;
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (error) {
    return null;
  }
}

export default async function DynamicPage({ params }) {
  const { slug } = params;
  const page = await getPageContent(slug);

  if (!page) {
    return (
      <div className="text-center py-20">
        <h1>404 - Page Not Found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">{page.title}</h1>
      {/* dangerouslySetInnerHTML ব্যবহার করে HTML কন্টেন্ট রেন্ডার করা হচ্ছে */}
      <div
        className="prose lg:prose-xl max-w-none"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </div>
  );
}

// মেটাডেটা ডাইনামিকভাবে জেনারেট করা
export async function generateMetadata({ params }) {
  const page = await getPageContent(params.slug);
  return { title: page?.title ? `${page.title} - PetNest` : "PetNest" };
}
