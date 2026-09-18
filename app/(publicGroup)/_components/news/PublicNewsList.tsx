/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewsCard } from "@/app/(publicGroup)/_components/news/NewsCard";
import { IPost } from "@/lib/types";
import { getPublicNews } from "../../_actions/getPublicNews";

export async function PublicNewsList({
    searchParams,
}: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const query = await searchParams;
    const result = await getPublicNews({ query });


    if (!result.success || !result.data?.length) {
        return (
            <p className="py-12 text-center text-muted-foreground">
                No news found.
            </p>
        );
    }

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {result.data.map((post: IPost | any) => (
                    <NewsCard key={post.id} post={post} />
                ))}
            </div>

        </div>
    );
}