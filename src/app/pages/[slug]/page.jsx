import dbConnect from "../../../lib/dbConnect";
import Page from "../../../models/Page";

async function getPageContent(slug) {
  try {
    await dbConnect();

    const pageDoc = await Page.findOne({ slug });
    return pageDoc ? JSON.parse(JSON.stringify(pageDoc)) : null;
  } catch (error) {
    console.error(`Error fetching page content for slug: ${slug}`, error);
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
      <div
        className="prose lg:prose-xl max-w-none"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </div>
  );
}

export async function generateMetadata({ params }) {
  const page = await getPageContent(params.slug);
  if (!page) {
    return { title: "Not Found - PetNest" };
  }
  return {
    title: `${page.title} | PetNest`,
  };
}

export async function generateStaticParams() {
  try {
    await dbConnect();
    const pages = await Page.find({}, "slug");

    return pages.map((page) => ({
      slug: page.slug,
    }));
  } catch (error) {
    console.error("Error generating static params for pages:", error);
    return [];
  }
}
