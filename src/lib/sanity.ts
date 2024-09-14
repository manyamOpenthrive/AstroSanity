import { useSanityClient, groq, createImageBuilder } from 'astro-sanity';

export async function getFirstBlogPost() {
  const query = groq`  *[_type == 'blog'] | order(_createdAt desc){
      title,
          smallDescription,
          "currentSlug": slug.current,
          titleImage,
  }`;
  const firstPost = await useSanityClient().fetch(query);
  return firstPost;
}

export const imageBuilder = createImageBuilder(useSanityClient());

export function urlForImage(source){
  return imageBuilder.image(source);
}

export async function getBlogPostBySlug(slug) {
  const query = groq`
    *[_type == "blog" && slug.current == $slug]{
      title,
      titleImage,
      smallDescription,
      content
    }[0]
  `;
  const post = await useSanityClient().fetch(query, { slug });
  return post;
}

// Fetch all slugs for generating dynamic paths
export async function getAllBlogSlugs() {
  const query = groq`
    *[_type == "blog"]{
      "currentSlug": slug.current
    }
  `;
  const slugs = await useSanityClient().fetch(query);
  return slugs.map(post => post.currentSlug);
}