const InstagramCard = () => {
  return (
    <article className="bg-white border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-pink-400" />
          <div className="flex flex-col">
            <span className="font-semibold">@acme_studio</span>
            <span className="text-xs text-gray-500">Paris, France</span>
          </div>
        </div>
        <button className="text-gray-400">•••</button>
      </div>

      {/* Image */}
      <div className="w-full h-96 bg-gray-200" />

      {/* Actions */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <button className="h-9 w-16 rounded-md bg-gray-100">Like</button>
          <button className="h-9 w-24 rounded-md bg-gray-100">Comment</button>
          <button className="h-9 w-16 rounded-md bg-gray-100">Share</button>
        </div>
        <button className="h-9 w-16 rounded-md bg-gray-100">Save</button>
      </div>

      {/* Meta */}
      <div className="px-4 pb-4 space-y-2">
        <div className="text-sm font-semibold">1,482 likes</div>
        <div className="text-sm">
          <span className="font-semibold">acme_studio</span> Spring palette,
          minimal vibes.
        </div>
        <button className="text-sm text-gray-500">View all 126 comments</button>
        <div className="flex items-center gap-3 pt-2">
          <div className="h-8 w-8 rounded-full bg-gray-300" />
          <input
            className="flex-1 h-10 rounded-md border px-3"
            placeholder="Add a comment..."
          />
        </div>
      </div>
    </article>
  );
};

export default InstagramCard;
