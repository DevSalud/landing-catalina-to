// Queries GROQ para obtener datos del blog desde Sanity

export const POSTS_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  mainImage,
  author->{name, image},
  categories[]->{title, slug}
}`

export const POST_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  body,
  excerpt,
  publishedAt,
  mainImage,
  author->{name, image, bio},
  categories[]->{title, slug}
}`

export const CATEGORIES_QUERY = `*[_type == "category"] | order(title asc) {
  _id,
  title,
  description
}`