import './App.css';
import { useEffect, useState } from 'react';
import { history } from 'umi';
import { Post } from '@prisma/client';

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>();
  async function refresh() {
    try {
      const res = await fetch('/api/posts');
      if (res.status !== 200) {
        console.error(await res.text());
      }
      setPosts(
        (await res.json()).sort(
          (p1: Post, p2: Post) => new Date(p2.createdAt).getTime() - new Date(p1.createdAt).getTime(),
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
