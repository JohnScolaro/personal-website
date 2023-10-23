import Head from 'next/head';
import Image from 'next/image';

import Link from 'next/link';

const name = 'John Scolaro';
export const siteTitle = "John's Website";

export default function Layout({ children, home }) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="A personal website for John Scolaro"
        />
      </Head>
      <header>
        {home ? (
          <>
            <Image
              priority
              src="/images/profile.jpg"
            
              height={144}
              width={144}
              alt={name}
            />
            <h1 >{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <Image
                priority
                src="/images/profile.jpg"
              
                height={108}
                width={108}
                alt={name}
              />
            </Link>
            <h2 >
              <Link href="/" >
                {name}
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div>
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  );
}
