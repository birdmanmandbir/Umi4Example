import type { UmiApiRequest, UmiApiResponse } from 'umi';
import { PrismaClient } from '@prisma/client';

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
  switch (req.method) {
    // 查询文章
    case 'GET':
      try {
        const prisma = new PrismaClient();
        const post = await prisma.post.findUnique({ include: { author: true }, where: { id: req.params.postId } });
        if (post) {
          res.status(200).json(post);
        } else {
          res.status(404).json({
            error: 'Page not found.',
          });
        }
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
    default:
      // 如果不是 POST 请求，代表他正在用错误的方式访问这个 API
      res.status(405).json({ error: 'Method not allowed' });
  }
}
