import { 
  BlogPost, 
  ExtendedBlogPost,
  BlogCategory, 
  BlogTag, 
  CreateBlogPostInput, 
  UpdateBlogPostInput,
  BlogPostFilters,
  BlogPostsResponse 
} from '@/lib/types/blog';
import { v4 as uuidv4 } from 'uuid';

const POSTS_PER_PAGE = 10;

// Mock data for blog posts
const MOCK_POSTS: ExtendedBlogPost[] = [
  {
    id: '1',
    title: 'Sunday Worship Service Highlights',
    content: `<p>Experience the powerful moments from our latest Sunday worship service, featuring inspiring messages and uplifting praise.</p>
              <p>This week's service focused on community building and spiritual growth, with Pastor Jaco delivering a moving sermon on faith in challenging times.</p>
              <p>The worship team led us in beautiful renditions of both traditional hymns and contemporary worship songs, creating an atmosphere of reverence and joy.</p>
              <p>Several members shared powerful testimonies of God's work in their lives, encouraging everyone present to trust in His faithfulness.</p>`,
    excerpt: 'Experience the powerful moments from our latest Sunday worship service, featuring inspiring messages and uplifting praise.',
    featured_image: '/images/blog/church-worship.jpg',
    author_id: 'admin',
    category_id: '1',
    status: 'published',
    tags: ['Worship', 'Sermon', 'Sunday Service'],
    slug: 'sunday-worship-service-highlights',
    meta_title: 'Sunday Worship Service Highlights - Jaco Ministries',
    meta_description: 'Recap of our latest Sunday worship service with sermon highlights, worship moments, and community announcements.',
    views: 245,
    created_at: '2024-02-28T08:30:00Z',
    updated_at: '2024-02-28T08:30:00Z',
    published_at: '2024-02-28T08:30:00Z',
    category_name: 'Worship',
    author_name: 'Admin User'
  },
  {
    id: '2',
    title: 'Youth Ministry Update',
    content: `<p>Discover how our youth ministry is making a difference in young lives through faith, fellowship, and fun.</p>
              <p>Our recent youth retreat was a tremendous success, with over 50 young people participating in worship, Bible study, and team-building activities.</p>
              <p>The youth leadership team has been working hard to create engaging programs that address the real challenges our young people face today.</p>
              <p>We're excited to announce our upcoming youth-led service on the first Sunday of next month, where our teenagers will share their talents and testimonies.</p>
              <p>Parents are encouraged to get involved by volunteering, providing snacks, or simply encouraging their children to participate in our weekly youth gatherings.</p>`,
    excerpt: 'Discover how our youth ministry is making a difference in young lives through faith, fellowship, and fun.',
    featured_image: '/images/blog/church-youth.jpg',
    author_id: 'admin',
    category_id: '2',
    status: 'published',
    tags: ['Youth', 'Ministry', 'Teenagers'],
    slug: 'youth-ministry-update',
    meta_title: 'Youth Ministry Update - Jaco Ministries',
    meta_description: 'Learn about our thriving youth ministry programs, recent events, and upcoming activities for teenagers in our church community.',
    views: 189,
    created_at: '2024-02-27T14:20:00Z',
    updated_at: '2024-02-27T14:20:00Z',
    published_at: '2024-02-27T14:20:00Z',
    category_name: 'Youth',
    author_name: 'Admin User'
  },
  {
    id: '3',
    title: 'Community Outreach Program',
    content: `<h2>Community Outreach Program</h2>
              <p>Our church's commitment to serving the community continues to grow through various outreach programs.</p>
              <p>Our weekly soup kitchen continues to serve approximately 100 people each Saturday, providing not just meals but also companionship and prayer.</p>
              <p>The clothing ministry has expanded its operations and now offers professional attire for job interviews, helping community members secure employment.</p>
              <p>We invite all church members to consider how they might get involved in our outreach efforts, whether through donations, volunteering, or prayer support.</p>`,
    excerpt: 'Learn about our church\'s ongoing community service initiatives and how you can get involved in making a difference.',
    featured_image: '/images/blog/church-community.jpg',
    author_id: 'editor',
    category_id: '3',
    status: 'published',
    tags: ['Outreach', 'Community', 'Service', 'Volunteering'],
    slug: 'community-outreach-program',
    meta_title: 'Community Outreach Programs - Jaco Ministries',
    meta_description: 'Discover how our church is serving the local community through food drives, clothing ministry, and other outreach initiatives.',
    views: 132,
    created_at: '2024-02-25T11:45:00Z',
    updated_at: '2024-02-25T11:45:00Z',
    published_at: '2024-02-25T11:45:00Z',
    category_name: 'Outreach',
    author_name: 'Editor User'
  }
];

// Mock data for categories
const MOCK_CATEGORIES: BlogCategory[] = [
  {
    id: '1',
    name: 'Worship',
    slug: 'worship',
    description: 'Articles about our worship services and spiritual growth',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Youth',
    slug: 'youth',
    description: 'Updates and information about our youth ministry',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Outreach',
    slug: 'outreach',
    description: 'Information about our community service and outreach programs',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  }
];

// Mock data for tags
const MOCK_TAGS: BlogTag[] = [
  {
    id: '1',
    name: 'Worship',
    slug: 'worship',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Youth',
    slug: 'youth',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Outreach',
    slug: 'outreach',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  }
];

// Helper function to initialize localStorage with mock data
const initializeLocalStorage = () => {
  if (typeof window !== 'undefined') {
    // Always ensure we have the mock data in localStorage
    // This ensures the frontend and admin panel see the same data
    if (!localStorage.getItem('blog_posts')) {
      localStorage.setItem('blog_posts', JSON.stringify(MOCK_POSTS));
      console.log('Initialized blog posts with mock data');
    }
    if (!localStorage.getItem('blog_categories')) {
      localStorage.setItem('blog_categories', JSON.stringify(MOCK_CATEGORIES));
    }
    if (!localStorage.getItem('blog_tags')) {
      localStorage.setItem('blog_tags', JSON.stringify(MOCK_TAGS));
    }
  }
};

// Helper function to get posts from localStorage
const getPostsFromStorage = (): ExtendedBlogPost[] => {
  if (typeof window !== 'undefined') {
    initializeLocalStorage();
    const posts = localStorage.getItem('blog_posts');
    return posts ? JSON.parse(posts) : [];
  }
  return [];
};

// Helper function to save posts to localStorage
const savePostsToStorage = (posts: ExtendedBlogPost[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('blog_posts', JSON.stringify(posts));
  }
};

export class BlogService {
  static async createPost(input: CreateBlogPostInput, authorId: string): Promise<ExtendedBlogPost> {
    try {
      const posts = getPostsFromStorage();
      const slug = this.generateSlug(input.title);
      
      const newPost: ExtendedBlogPost = {
        id: uuidv4(),
        title: input.title,
        content: input.content,
        excerpt: input.excerpt || '',
        featured_image: input.featured_image || '',
          author_id: authorId,
        category_id: input.category_id,
        status: input.status,
        tags: input.tags || [],
          slug,
        meta_title: input.meta_title || '',
        meta_description: input.meta_description || '',
          views: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        published_at: input.status === 'published' ? new Date().toISOString() : null,
        category_name: MOCK_CATEGORIES.find(c => c.id === input.category_id)?.name || 'Uncategorized',
        author_name: authorId === 'admin' ? 'Admin User' : 'Editor User'
      };
      
      posts.unshift(newPost);
      savePostsToStorage(posts);
      
      return newPost;
    } catch (error) {
      console.error('Error creating blog post:', error);
      throw new Error('Failed to create blog post');
    }
  }

  static async updatePost(input: UpdateBlogPostInput): Promise<ExtendedBlogPost> {
    try {
      const posts = getPostsFromStorage();
      const postIndex = posts.findIndex(post => post.id === input.id);
      
      if (postIndex === -1) {
        throw new Error('Blog post not found');
      }
      
      // Create a copy of the existing post
      const existingPost = posts[postIndex];
      if (!existingPost) {
        throw new Error('Blog post not found');
      }
      
      const updatedPost: ExtendedBlogPost = { 
        ...existingPost,
        // Ensure all required properties have values
        id: existingPost.id,
        title: existingPost.title,
        content: existingPost.content,
        excerpt: existingPost.excerpt || '',
        featured_image: existingPost.featured_image || '',
        author_id: existingPost.author_id,
        category_id: existingPost.category_id,
        status: existingPost.status,
        tags: existingPost.tags,
        slug: existingPost.slug,
        meta_title: existingPost.meta_title || '',
        meta_description: existingPost.meta_description || '',
        views: existingPost.views,
        created_at: existingPost.created_at,
        updated_at: existingPost.updated_at,
        published_at: existingPost.published_at,
        category_name: existingPost.category_name || '',
        author_name: existingPost.author_name || ''
      };
      
      // Update fields if provided in input
      if (input.title) {
        updatedPost.title = input.title;
        updatedPost.slug = this.generateSlug(input.title);
      }
      if (input.content) updatedPost.content = input.content;
      if (input.excerpt !== undefined) updatedPost.excerpt = input.excerpt || '';
      if (input.featured_image !== undefined) updatedPost.featured_image = input.featured_image || '';
      if (input.status) {
        updatedPost.status = input.status;
        if (input.status === 'published' && !updatedPost.published_at) {
          updatedPost.published_at = new Date().toISOString();
        }
      }
      if (input.category_id) {
        updatedPost.category_id = input.category_id;
        // Update category name
        const categories = await this.getCategories();
        const category = categories.find(cat => cat.id === input.category_id);
        updatedPost.category_name = category?.name || '';
      }
      if (input.tags) updatedPost.tags = input.tags;
      if (input.meta_title !== undefined) updatedPost.meta_title = input.meta_title || '';
      if (input.meta_description !== undefined) updatedPost.meta_description = input.meta_description || '';
      
      updatedPost.updated_at = new Date().toISOString();
      
      posts[postIndex] = updatedPost;
      savePostsToStorage(posts);
      
      return updatedPost;
    } catch (error) {
      console.error('Error updating blog post:', error);
      throw new Error('Failed to update blog post');
    }
  }

  static async deletePost(id: string): Promise<void> {
    try {
      const posts = getPostsFromStorage();
      const filteredPosts = posts.filter(post => post.id !== id);
      savePostsToStorage(filteredPosts);
    } catch (error) {
      console.error('Error deleting blog post:', error);
      throw new Error('Failed to delete blog post');
    }
  }

  static async getPost(id: string): Promise<ExtendedBlogPost> {
    try {
      const posts = getPostsFromStorage();
      const post = posts.find(post => post.id === id);
      
      if (!post) {
        throw new Error('Blog post not found');
      }
      
      return post;
    } catch (error) {
      console.error('Error fetching blog post:', error);
      throw new Error('Failed to fetch blog post');
    }
  }

  static async getPostBySlug(slug: string): Promise<ExtendedBlogPost> {
    try {
      const posts = getPostsFromStorage();
      const post = posts.find(post => post.slug === slug);
      
      if (!post) {
        throw new Error('Blog post not found');
      }
      
      // Increment views
      setTimeout(() => {
        this.incrementViews(post.id).catch(console.error);
      }, 1000);

      return post;
    } catch (error) {
      console.error('Error fetching blog post by slug:', error);
      throw new Error('Failed to fetch blog post');
    }
  }

  static async getPosts(filters: BlogPostFilters = {}): Promise<BlogPostsResponse> {
    try {
      console.log('Starting to fetch blog posts with filters:', filters);
      
      // Initialize localStorage with mock data
      initializeLocalStorage();
      
      let posts = getPostsFromStorage();
      console.log('Retrieved posts from storage:', posts.length);
      
      // Apply status filter
      if (filters.status) {
        posts = posts.filter(post => post.status === filters.status);
      } else {
        // If no status filter is provided in the admin panel, show all posts
        // But for the frontend, default to published posts
        if (typeof window !== 'undefined' && window.location.pathname.includes('/admin')) {
          // In admin panel, show all posts
          console.log('Admin panel - showing all posts');
        } else {
          // In frontend, default to published posts
          console.log('Frontend - showing only published posts');
          posts = posts.filter(post => post.status === 'published');
        }
      }
      
      // Apply category filter
      if (filters.category_id) {
        posts = posts.filter(post => post.category_id === filters.category_id);
      }
      
      // Apply author filter
      if (filters.author_id) {
        posts = posts.filter(post => post.author_id === filters.author_id);
      }
      
      // Apply search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        posts = posts.filter(post => 
          post.title.toLowerCase().includes(searchTerm) ||
          (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm)) ||
          post.content.toLowerCase().includes(searchTerm)
        );
      }
      
      // Apply tag filter
      if (filters.tag) {
        posts = posts.filter(post => post.tags.includes(filters.tag as string));
      }
      
      // Sort posts
      const sortBy = filters.sort_by || 'created_at';
      const sortOrder = filters.sort_order || 'desc';
      
      posts.sort((a, b) => {
        const aValue = a[sortBy as keyof ExtendedBlogPost] || '';
        const bValue = b[sortBy as keyof ExtendedBlogPost] || '';
        
        if (sortOrder === 'asc') {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
      });

      // Apply pagination
      const page = filters.page || 1;
      const limit = filters.limit || POSTS_PER_PAGE;
      const start = (page - 1) * limit;
      const end = start + limit;
      
      const paginatedPosts = posts.slice(start, end);

      return {
        posts: paginatedPosts,
        total: posts.length,
        page,
        limit,
        total_pages: Math.ceil(posts.length / limit)
      };
    } catch (error) {
      console.error('Error in getPosts:', error);
      throw new Error('Failed to load blog posts. Please try again.');
    }
  }

  static async getCategories(): Promise<BlogCategory[]> {
    try {
      initializeLocalStorage();
      if (typeof window !== 'undefined') {
        const categories = localStorage.getItem('blog_categories');
        return categories ? JSON.parse(categories) : MOCK_CATEGORIES;
      }
      return MOCK_CATEGORIES;
    } catch (error) {
      console.error('Error fetching blog categories:', error);
      throw new Error('Failed to fetch blog categories');
    }
  }

  static async getTags(): Promise<BlogTag[]> {
    try {
      initializeLocalStorage();
      if (typeof window !== 'undefined') {
        const tags = localStorage.getItem('blog_tags');
        return tags ? JSON.parse(tags) : MOCK_TAGS;
      }
      return MOCK_TAGS;
    } catch (error) {
      console.error('Error fetching blog tags:', error);
      throw new Error('Failed to fetch blog tags');
    }
  }

  static async incrementViews(id: string): Promise<void> {
    try {
      const posts = getPostsFromStorage();
      const postIndex = posts.findIndex(post => post.id === id);
      
      if (postIndex !== -1) {
        const post = posts[postIndex];
        if (post) {
          post.views += 1;
          savePostsToStorage(posts);
        }
      }
    } catch (error) {
      console.error('Error incrementing blog views:', error);
      throw new Error('Failed to increment blog views');
    }
  }

  static async getRelatedPosts(slug: string, limit: number = 3): Promise<ExtendedBlogPost[]> {
    try {
      const posts = getPostsFromStorage();
      const currentPost = posts.find(post => post.slug === slug);
      
      if (!currentPost) {
        return [];
      }
      
      // Filter posts by same category or shared tags, excluding the current post
      const relatedPosts = posts.filter(post => {
        if (post.id === currentPost.id) return false;
        if (post.status !== 'published') return false;
        
        // Check if posts share the same category
        const sameCategory = post.category_id === currentPost.category_id;
        
        // Check if posts share any tags
        const sharedTags = post.tags.some(tag => currentPost.tags.includes(tag));
        
        return sameCategory || sharedTags;
      });
      
      // Sort by most recent
      relatedPosts.sort((a, b) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
      
      // Return limited number of related posts
      return relatedPosts.slice(0, limit);
    } catch (error) {
      console.error('Error fetching related posts:', error);
      return [];
    }
  }

  private static generateSlug(title: string): string {
    const baseSlug = title
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const posts = getPostsFromStorage();
    const existingSlugs = posts.map(post => post.slug);
    
    let slug = baseSlug;
    let counter = 1;

    while (existingSlugs.includes(slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    
    return slug;
  }
} 