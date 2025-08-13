const LinkedInCard = () => {
  return (
    <article className="bg-white border rounded-xl p-4 space-y-4">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="h-12 w-12 rounded-full bg-blue-400 flex-shrink-0" />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Jane Doe</span>
            <span className="text-gray-400">•</span>
            <span className="text-sm text-gray-500">2h</span>
          </div>
          <div className="text-sm text-gray-500">
            Senior Frontend Engineer at Acme
          </div>
        </div>
        <button className="text-gray-400">•••</button>
      </div>

      {/* Body text */}
      <p className="text-gray-800 leading-relaxed">
        We just shipped a new feature that improves performance by 30%. Here’s a
        quick overview of how we approached it and what’s next.
      </p>

      {/* Media */}
      <div className="w-full h-60 bg-gray-200 rounded-lg" />

      {/* Stats */}
      <div className="flex justify-between text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-blue-500" />
          <div className="h-4 w-4 rounded-full bg-green-500 -ml-2" />
          <span>235</span>
        </div>
        <div className="flex items-center gap-4">
          <span>48 comments</span>
          <span>12 shares</span>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-4 gap-2 pt-2 border-t">
        <button className="h-10 rounded-md bg-gray-100">Like</button>
        <button className="h-10 rounded-md bg-gray-100">Comment</button>
        <button className="h-10 rounded-md bg-gray-100">Repost</button>
        <button className="h-10 rounded-md bg-gray-100">Send</button>
      </div>
    </article>
  );
};

export default LinkedInCard;
