export const getPublicNews = async ({
  query,
}: {
  query?: { [key: string]: string | string[] | undefined };
}) => {
  const params = new URLSearchParams();

  if (query?.searchTerm) {
    params.set("searchTerm", query.searchTerm as string);
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/posts?${params.toString()}`,
    {
      cache: "no-store",
    },
  );

  const result = await res.json();

  return result;
};
