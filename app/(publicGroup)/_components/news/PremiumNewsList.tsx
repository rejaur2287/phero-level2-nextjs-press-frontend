/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewsCard } from "@/app/(publicGroup)/_components/news/NewsCard";
import { IPost } from "@/lib/types";

// import { getPremiumNews } from "../../_actions/getPremiumNews";

// export async function PremiumNewsList({
//     searchParams,
// }: {
//     searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
// }) {
//     const query = await searchParams;
//     const result = await getPremiumNews({ query });

//     if (!result.success || !result.data?.length) {
//         return (
//             <p className="py-12 text-center text-muted-foreground">
//                 No premium news found.
//             </p>
//         );
//     }

//     return (
//         <div className="space-y-8">
//             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//                 {result.data.map((post: IPost) => (
//                     <NewsCard key={post.id} post={post} />
//                 ))}
//             </div>
//         </div>
//     );
// }

export async function PremiumNewsList() {

    const result = {
        success: true,
        data: [
            {
                id: '1',
                title: "Premium News 1",
                content: 'This is the content of premium news 1.',
                thumbnail: 'https://via/placeholder.com/150',
                isFeatured: true,
                status: "DRAFT",
                tags: ['tag1', 'tag2'],
                views: 100,
                isPremium: true,
                authorId: '1',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        ]
    }

    if (!result.success || !result.data?.length) {
        return (
            <p className="py-12 text-center text-muted-foreground">
                No premium news found.
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