import Link from "next/link";

export default function Card({
  title,
  description,
  link,
}: {
  title: string;
  description: string;
  link: string;
}) {
  return (
    <>
      <Link
        href={link}
        className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
      >
        <div className="sm:flex sm:justify-between sm:gap-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
              {title}
            </h3>
          </div>
        </div>

        <div className="mt-4">
          <p className="max-w-[40ch] text-sm text-gray-500">{description}</p>
        </div>
      </Link>
    </>
  );
}
