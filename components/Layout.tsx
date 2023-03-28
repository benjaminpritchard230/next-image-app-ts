// components/layout.js

import Head from "next/head";
import FloatingActionButtons from "./FloatingActionButtons";
import Footer from "./Footer";
import Navbar from "./Navbar";
import NewPostDialog from "./NewPostDialog";

export default function Layout({ children }: any) {
  return (
    <>
      <Head>
        <title>Next Image App</title>
        <meta name="Layout" content="Next Movie Website" />
      </Head>
      <Navbar />
      <main>{children}</main>
      <NewPostDialog />
      <FloatingActionButtons />
      <Footer />
    </>
  );
}
