// app/page.tsx
import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export default function Home() {
  const files = fs
    .readdirSync(path.join(process.cwd(), 'episodes'))
    .filter((f) => f.endsWith('.md'));

  return (
    <main className='p-8 prose'>
      <h1>💬 Developer Joke Series</h1>
      <ul>
        {files.map((file) => {
          const slug = file.replace('.md', '');
          return (
            <li key={slug}>
              <Link href={`/jokes/${slug}`}>{slug}</Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
