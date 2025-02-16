import { client } from '@/lib/sanity';
import CommunityPost from './CommunityPost';
import CreatePostButton from './CreatePostButton';
import CategoryFilter from './CategoryFilter';

interface ContentBlock {
  _type: string;
  children: {
    text: string;
  }[];
}

interface Post {
  _id: string;
  title: string;
  slug: string;
  content: ContentBlock[];
  authorName: string;
  publishedAt: string;
  category: string;
}

async function getPosts(): Promise<Post[]> {
  const query = `*[_type == "communityPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    content,
    authorName,
    publishedAt,
    category
  }`;

  const posts = await client.fetch<Post[]>(query);
  return posts;
}

export default async function CommunityPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-gray-900 pt-24 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Community Hub</h1>
          <CreatePostButton />
        </div>

        <CategoryFilter />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
          {posts.map((post: Post) => (
            <CommunityPost key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}