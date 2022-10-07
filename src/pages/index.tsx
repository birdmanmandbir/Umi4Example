import './App.css';
import { useEffect, useState } from 'react';
import { history } from 'umi';
import { PostDto } from './models/PostDto';

export default function HomePage() {
  const [posts, setPosts] = useState<PostDto[]>();
  async function refresh() {
    try {
      const res = await fetch('/api/posts');
      if (res.status !== 200) {
        console.error(await res.text());
      }
      setPosts(
        (await res.json()).sort(
          (p1: PostDto, p2: PostDto) => new Date(p2.createdAt).getTime() - new Date(p1.createdAt).getTime(),
        ),
      );
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div>
      {!posts && <p>Loading...</p>}
      {posts && (
        <div>
          {posts.map((post) => (
            <div key={post.id}>
              <div onClick={() => history.push(`/posts/${post.id}`)}>
                <p>{post.title}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
