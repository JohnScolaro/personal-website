import { parseISO, format } from "date-fns";

export default function Date({ dateString }) {
  const date = parseISO(dateString);
  return (
    <time className="text-sm text-gray-500 text-center" dateTime={dateString}>
      {format(date, "LLLL d, yyyy")}
    </time>
  );
}
