import Head from 'next/head';
import Date from '../../../components/date';
import { getPostData } from '../../../lib/posts';

export default async function Post({params}) {
  const postData = await getPostData(params.id);

  return (<>
      <Head>
      </Head>
      <article>
        <h1>{postData.title}</h1>
        <div>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
  </>);
}