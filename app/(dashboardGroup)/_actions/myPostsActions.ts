/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

type PostState = {
  success: true;
  statusCode: number;
  message: string;
  data: Record<string, any>;
};

/*
    data:{
        title,
        content
    }
*/

export const createPost = async (prevState: PostState, formData: FormData) => {
  console.log({
    title: formData.get("title"),
    content: formData.get("content"),
    thumbnail: formData.get("thumbnail"),
    tags: (formData.get("tags") as string).split(", "),
    isPremium: formData.get("isPremium") === "on",
  });

  const payload = {
    title: formData.get("title"),
    content: formData.get("content"),
    thumbnail: formData.get("thumbnail"),
    tags: (formData.get("tags") as string).split(", "),
    isPremium: formData.get("isPremium") === "on",
  };

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    // throw new Error("User not Logged In!");
    return {
      success: false,
      message: "User not Logged In!",
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/posts`, {
    method: "POST",
    headers: {
      //   Authorization: accessToken as unknown as string,
      //   Authorization: `${accessToken}`,
      //   Authorization: `Bearer${accessToken}`,

      Cookie: `accessToken = ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result.success) {
    revalidateTag("my-posts", "max");
  }
  if (result.success && result.data.isPremium) {
    revalidateTag("premium-posts", "max");
  } else {
    revalidateTag("public-posts", "max");
  }

  // console.log(result);

  return result;
};

export const getMyPosts = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    // throw new Error("User not Logged In!");
    return {
      success: false,
      message: "User not Logged In!",
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/posts/my-posts`, {
    headers: {
      //   Authorization: accessToken as unknown as string,
      //   Authorization: `${accessToken}`,
      //   Authorization: `Bearer${accessToken}`,

      Cookie: `accessToken = ${accessToken}`,
    },
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 24,
      tags: ["my-posts"],
    },
  });

  const result = res.json();

  // console.log(result);

  return result;
};
