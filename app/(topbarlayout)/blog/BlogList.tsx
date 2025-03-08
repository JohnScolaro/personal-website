"use client";

import { useSearchParams } from "next/navigation";
import Card from "../../../components/card";

export default function BlogList({ allPosts, filterTag, tagColors }: { allPosts: any[]; filterTag?: string, tagColors: Record<string, string> }) {
    const searchParams = useSearchParams();
    const selectedTag = searchParams.get("tag") || filterTag;

    // Sort posts by date
    const sortedAllPosts = allPosts.sort((a, b) => (a.date < b.date ? 1 : -1));

    // Filter posts by tag if a tag is selected
    const filteredPosts = selectedTag
        ? sortedAllPosts.filter((post) => post.tags.includes(selectedTag))
        : sortedAllPosts;

    return (
        <div className="flex flex-col items-center mt-4 gap-4">
            {filteredPosts.map(({ id, date, title, description, tags }) => (
                <Card title={title} description={description} link={`/blog/${id}`} date={date} tags={tags} key={id} tagColors={tagColors} />
            ))}
        </div>
    );
}
