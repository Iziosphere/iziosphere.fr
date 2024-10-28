export interface News {
    id: number;
    title: string;
    content: string;
    image: string;
    slug: string;
    publishedAt: Date;
    updatedAt: Date;
}
export interface NewsBySlug{
  post: News;
  previousSlug: string | null;
  nextSlug: string | null;
}
export interface NewsFiltered{
  data: News[];
  totalItems: number;
}
