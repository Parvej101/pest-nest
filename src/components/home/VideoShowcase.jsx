import Link from "next/link";

// --- ডাটাবেস এবং মডেল ইম্পোর্ট ---
import dbConnect from "../../../lib/dbConnect";
import Setting from "../../../models/Setting";

async function getVideoSettings() {
  try {
    await dbConnect();

    const settingsDoc = await Setting.findOne({});

    return settingsDoc ? JSON.parse(JSON.stringify(settingsDoc)) : null;
  } catch (error) {
    console.error("Error fetching video settings:", error);
    return null;
  }
}

const VideoShowcase = async () => {
  const settings = await getVideoSettings();

  if (!settings || !settings.videoShowcaseId) {
    return null;
  }

  const videoSrc = `https://www.youtube.com/embed/${settings.videoShowcaseId}?autoplay=1&mute=1&loop=1&playlist=${settings.videoShowcaseId}&controls=0&fs=0&showinfo=0&modestbranding=1&rel=0`;

  return (
    <section className="py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4 lg:mb-12">
          <h2 className="lg:text-3xl text-xl font-bold tracking-tight">
            See Our Products in Action
          </h2>
          <p className="lg:text-base-content/70 text-base-content/40 mt-2">
            Fun, engaging, and loved by pets!
          </p>
        </div>

        <div className="relative rounded-lg overflow-hidden shadow-2xl aspect-video">
          <iframe
            src={videoSrc}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        </div>

        <div className="z-10 m-auto text-center py-8">
          <Link href={settings.videoShowcaseLink || "/shop"}>
            <button className="btn btn-outline btn-primary animate-pulse rounded-full px-8">
              Shop These Products
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
