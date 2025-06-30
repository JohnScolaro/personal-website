import Link from "next/link";

export default function Card({
  title,
  description,
  link,
  date,
  tags = [],
  tagColors = {},
  image,
}: {
  title: string;
  description: string;
  link?: string;
  date?: string;
  tags?: string[];
  tagColors?: Record<string, string>;
  image?: string;
}) {
  return (
    <div className="group relative block w-72 overflow-hidden rounded-lg border border-gray-200 bg-gray-100 p-2 hover:border-gray-300 hover:bg-gray-200 sm:p-4">
      {image && (
        <img
          src={image}
          alt={title}
          className="mb-2 h-full w-full overflow-hidden rounded-md bg-gray-300 sm:mb-4"
        />
      )}

      <h1 className="text-lg font-bold text-gray-900 sm:text-xl">
        {link ? (
          <Link href={link} className="static">
            {title}
            <span className="absolute inset-0 z-0" aria-hidden="true"></span>
          </Link>
        ) : (
          title
        )}
      </h1>

      <small>{date}</small>
      <div className="mt-2 md:mt-4">
        <p className="max-w-[40ch] text-sm text-gray-500">{description}</p>
      </div>

      <div className="relative z-10 mt-2 flex flex-wrap gap-2">
        {tags.map((tag) => {
          const tagColor = tagColors[tag] || "bg-gray-500";
          return (
            <Link
              key={tag}
              href={`/blog?tag=${encodeURIComponent(tag)}`}
              className={`px-2 py-1 text-xs font-semibold text-white ${tagColor} rounded-full hover:bg-opacity-80 transition`}
            >
              {tag}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
