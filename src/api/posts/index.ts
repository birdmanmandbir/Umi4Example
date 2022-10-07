import type { UmiApiRequest, UmiApiResponse } from 'umi';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/utils/jwt';

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
  switch (req.method) {
    // 查询所有文章
    case 'GET':
      try {
        const prisma = new PrismaClient();
        const allPosts = await prisma.post.findMany({ include: { author: true } });
        if (!Array.isArray(allPosts)) {
          return res.status(200).json([]);
        }
        res.status(200).json(allPosts);
        await prisma.$disconnect();
        break;
      } catch (e: any) {
        res.status(500).json({
          result: false,
          message:
            typeof e.code === 'string'
              ? 'https://www.prisma.io/docs/reference/api-reference/error-reference#' + e.code.toLowerCase()
              : e,
        });
      }
    // 新建一篇文章
    case 'POST':
      try {
        if (!req.cookies?.token) {
          return res.status(401).json({
            message: 'Unauthorized',
          });
        }

        const authorId: string = (await verifyToken(req.cookies.token)).id;
        const prisma = new PrismaClient();
        const newPost = await prisma.post.create({
          data: {
            createdAt: new Date(),
            title: req.body.title,
            content: req.body.content,
            authorId,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags.join(','),
          },
        });
        res.status(200).json(newPost);
        await prisma.$disconnect();
      } catch (e: any) {
        res.status(500).json({
          result: false,
          message:
            typeof e.code === 'string'
              ? 'https://www.prisma.io/docs/reference/api-reference/error-reference#' + e.code.toLowerCase()
              : e,
        });
      }
      break;
    default:
      // 如果不是 POST 请求，代表他正在用错误的方式访问这个 API
      res.status(405).json({ error: 'Method not allowed' });
  }
}
