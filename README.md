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