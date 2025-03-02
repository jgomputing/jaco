export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  featured_image: string | null;
  author_id: string;
  category_id: string;
  status: 'draft' | 'published';
  tags: string[];
  slug: string;
  meta_title: string | null;
  meta_description: string | null;
  views: number;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

export interface ExtendedBlogPost extends BlogPost {
  category_name: string;
  author_name: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface CreateBlogPostInput {
  title: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  category_id: string;
  status: 'draft' | 'published';
  tags: string[];
  meta_title?: string;
  meta_description?: string;
}

export interface UpdateBlogPostInput extends Partial<CreateBlogPostInput> {
  id: string;
}

export interface BlogPostFilters {
  status?: 'draft' | 'published';
  category_id?: string;
  tag?: string;
  search?: string;
  author_id?: string;
  page?: number;
  limit?: number;
  sort_by?: 'created_at' | 'updated_at' | 'published_at' | 'views';
  sort_order?: 'asc' | 'desc';
}

export interface BlogPostsResponse {
  posts: ExtendedBlogPost[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
} 