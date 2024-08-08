import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

// 添加登录功能
// 您可以使用authorize函数来处理身份验证逻辑。与服务器操作类似，您可以使用zod验证电子邮件和密码，然后再检查数据库中是否存在用户：
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  // 凭证提供程序Credentials providers允许用户使用用户名和密码登录。
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});


// 在seed.js文件中，您使用了一个名为bcrypt的包对用户密码进行哈希处理，然后将其存储到数据库中。您将在本章后面再次使用它来比较用户输入的密码与数据库中的密码是否匹配。
// 但是，您需要为bcrypt包创建一个单独的文件。这是因为bcrypt依赖于 Next.js 中间件中不可用的 Node.js API。
// 创建一个名为auth.ts的新文件来传播您的authConfig对象


// 需要为 NextAuth.js 添加providers选项。 providers是一个数组，您可以在其中列出不同的登录选项，例如 Google 或 GitHub。在本课程中，我们将重点关注使用凭证提供程序仅有的。
// 凭证提供程序允许用户使用用户名和密码登录。

// 尽管我们使用的是凭据提供程序，但通常建议使用替代提供程序，例如OAuth或电子邮件提供商。请参阅NextAuth.js 文档以获得完整的选项列表。