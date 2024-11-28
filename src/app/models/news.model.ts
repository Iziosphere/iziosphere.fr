export interface Post {
    id: number;
    title: string;
    content: string;
    type: PostType;
    image: string;
    slug: string;
    publishedAt: Date;
    updatedAt: Date;
    category: Category;
    author: string;
}

export interface Category{
  id: number;
  name: string;
}

export interface NewsBySlug{
  nextTitle: string | null;
  previousTitle: string | null;
  post: Post;
  previousSlug: string | null;
  nextSlug: string | null;
}
export interface NewsFiltered{
  data: Post[];
  totalItems: number;
  categories: Category[];
}


export enum PostType {
  NEWS = 'news',
  RESOURCE = 'resource',
  PUBLICATION = 'publication',
}

export interface PostCreateDto{
  title: string;
  content: string;
  slug: string;
  image: string;
  categoryId: number;
  type: PostType;
  publishedAt: Date;
}
