// app/jokes/[slug]/page.tsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

type Params = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), 'episodes'));
  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => ({
      slug: file.replace('.md', ''),
    }));
}

export default async function Page({ params }: Params) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'episodes', `${slug}.md`);
  const file = fs.readFileSync(filePath, 'utf-8');
  const { content, data } = matter(file);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return (
    <div className='prose mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>{data.title}</h1>
      <article dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </div>
  );
}
