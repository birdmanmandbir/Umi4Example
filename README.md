planetscale: 快速部署， 管理mysql数据库

`pnpm umi g`: 快速添加mock, tailwindcss等能力

## prisma

[client API](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)

[schema API](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)

注意: mongo的主键和外键都要加`@db.ObjectId`, 主键需额外添加`@map("_id")`

例如:

```prisma
model Post {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  title     String
  content   String?
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String   @db.ObjectId
  imageUrl  String?
  tags      String

  @@index(authorId)
}

model User {
  id           String  @id @default(auto()) @map("_id") @db.ObjectId
  email        String  @unique
  passwordHash String
  name         String?
  posts        Post[]
  avatarUrl    String?
}
```

[[翻译] Prisma & MongoDB 全栈开发入门教程 - 掘金](https://juejin.cn/post/7109714480791027748#heading-9)

## TODO

- [ ] 尚不清楚为啥vercel部署上去接口都不通, 本地是没问题的, 云函数是正常编译, 按说加到ignore也没问题, 不过确实vercel上的云函数都没识别出来