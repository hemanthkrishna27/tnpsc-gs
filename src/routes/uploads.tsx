import { createFileRoute } from "@tanstack/react-router";
import { AdSlot } from "@/components/ad-slot";
import { VideoGrid } from "@/components/video-card";
import { CHANNEL } from "@/lib/data";
import { catalogueFallback, fetchChannelUploads } from "@/lib/uploads";

export const Route = createFileRoute("/uploads")({
  loader: async () => {
    try {
      return await fetchChannelUploads();
    } catch {
      return catalogueFallback();
    }
  },
  component: UploadsPage,
});

function UploadsPage() {
  const data = Route.useLoaderData();
  const live = data.source === "youtube";

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
        {live ? "Live from YouTube" : "Catalogue"}
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
        New on {CHANNEL.handle}
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
        {live
          ? "This list is the channel’s Videos tab. Upload a class on YouTube and it lands here on the next refresh — usually within ten minutes."
          : "Could not reach YouTube just now, so the desk catalogue is showing instead."}
      </p>
      <p className="mt-2 text-xs text-faint tabular-nums">
        {data.videos.length} video{data.videos.length === 1 ? "" : "s"}
        {live ? " · refreshes from YouTube" : ""}
      </p>
      <div className="mt-10">
        <VideoGrid videos={data.videos.slice(0, 8)} />
      </div>
      <div className="mt-10">
        <AdSlot placement="infeed" />
      </div>
      {data.videos.length > 8 && (
        <div className="mt-10">
          <VideoGrid videos={data.videos.slice(8)} />
        </div>
      )}
    </div>
  );
}
