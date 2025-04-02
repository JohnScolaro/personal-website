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
  link: string;
  date?: string;
  tags?: string[];
  tagColors?: Record<string, string>;
  image?: string;
}) {
  return (
    <Link href={link} className="block">
      <div className="p-2 sm:p-4 relative block overflow-hidden rounded-lg border border-gray-200 bg-gray-100 hover:bg-gray-200 hover:border-gray-300 w-72">
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full h-full w-full overflow-hidden rounded-md bg-gray-300 mb-2 sm:mb-4"
          />
        )}
        <h1 className="text-lg font-bold text-gray-900 sm:text-xl">{title}</h1>
        <small>{date}</small>
        <div className="mt-2 md:mt-4">
          <p className="max-w-[40ch] text-sm text-gray-500">{description}</p>
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
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
    </Link>
  );
}
