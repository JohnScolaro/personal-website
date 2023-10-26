import Link from 'next/link';
import Date from '../../components/date';
import { getSortedPostsData } from '../../lib/posts';

export default function Page() {
  const allPostsData = getSortedPostsData();


    return (
    <>
    <section>
    <h2>Blog</h2>
    <ul>
      {allPostsData.map(({ id, date, title }) => (
        <li key={id}>
          <Link href={`/posts/${id}`}>{title}</Link>
          <br />
          <small>
            <Date dateString={date} />
          </small>
        </li>
      ))}
    </ul>
  </section>
  </>
  )
}