export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: string | null;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export type PostPreview = Pick<Post, 'id' | 'title' | 'excerpt' | 'featuredImage' | 'category' | 'slug' | 'createdAt'>;

export interface BlogListResponse {
  posts: PostPreview[];
  totalPages: number;
  currentPage: number;
} 