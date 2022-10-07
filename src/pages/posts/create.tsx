import Button from '@/components/Button';
import TextInput from '@/components/TextInput';
import { useEffect, useState } from 'react';
import { history } from 'umi';

export default function Page() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (!document.cookie.includes('token')) {
      alert('请先登录');
      history.push('/login');
    }
  }, []);

  async function submit() {
    const res = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        title,
        content,
        tags: tags.split(','),
        imageUrl,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.status >= 400) {
      console.error(await res.text());
      alert('发布失败');
      return;
    }
    history.push(`/posts/${(await res.json()).id}`);
  }

  return (
    <div className="w-full flex justify-center">
      <div className="container lg:px-64 px-8 pt-16">
        <p className="text-3xl font-extrabold">发表新文章</p>
        <p className="mt-8">标题</p>
        <TextInput value={title} onChange={setTitle}></TextInput>
        <p className="mt-8">正文</p>
        <TextInput value={content} onChange={setContent}></TextInput>
        <p className="mt-8">标签(以逗号隔开)</p>
        <TextInput value={tags} onChange={setTags}></TextInput>
        <p className="mt-8">封面图片地址</p>
        <TextInput value={imageUrl} onChange={setImageUrl} />
        <img src={imageUrl} alt="" />
        <Button onClick={submit}>发布</Button>
      </div>
    </div>
  );
}
