// components/layout.js

import Head from "next/head";
import FloatingActionButtons from "./FloatingActionButtons";
import Navbar from "./Navbar";
import NewPostDialog from "./NewPostDialog";

export default function Layout({ children }: any) {
  return (
    <>
      <Head>
        <title>Next Image App</title>
        <meta name="Layout" content="Next Movie Website" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <Navbar />
      <main>{children}</main>
      <NewPostDialog />
      <FloatingActionButtons />
    </>
  );
}
