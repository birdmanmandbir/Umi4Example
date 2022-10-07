import Button from '@/components/Button';
import TextInput from '@/components/TextInput';
import { useState } from 'react';
import { history } from 'umi';

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit() {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.status >= 400) {
        console.error(await res.text());
        return;
      }
      const data = await res.json();
      alert(`欢迎回来, ${data.name}`);
      history.push('/posts/create');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="w-full flex justify-center">
      <div className="container lg:px-64 px-8 pt-16">
        <p className="text-3xl font-extrabold">用户登入</p>
        <div className="mt-8">
          <p>邮箱</p>
          <TextInput value={email} onChange={setEmail}></TextInput>
          <p className="mt-4">密码</p>
          <TextInput value={password} onChange={setPassword}></TextInput>
          <Button onClick={submit}>登入</Button>
        </div>
      </div>
    </div>
  );
}
