import Link from "next/link";

export default function Card({
  title,
  description,
  link,
  date,
}: {
  title: string;
  description: string;
  link: string;
  date?: string;
}) {
  return (
    <>
      <Link
        href={link}
        className="p-2 sm:p-4 relative block overflow-hidden rounded-lg border border-gray-200 bg-gray-100 hover:bg-gray-200 hover:border-gray-300 w-72"
      >
        <h1 className="text-lg font-bold text-gray-900 sm:text-xl">{title}</h1>
        <small>{date}</small>
        <div className="mt-2 md:mt-4">
          <p className="max-w-[40ch] text-sm text-gray-500">{description}</p>
        </div>
      </Link>
    </>
  );
}
