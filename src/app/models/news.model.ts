export interface News {
    id: number;
    title: string;
    content: string;
    image: string;
    slug: string;
    publishedAt: Date;
    updatedAt: Date;
    category: Category;
}

export interface Category{
  id: number;
  name: string;
}
export interface NewsBySlug{
  nextTitle: string | null;
  previousTitle: string | null;
  post: News;
  previousSlug: string | null;
  nextSlug: string | null;
}
export interface NewsFiltered{
  data: News[];
  totalItems: number;
  categories: Category[];
}
