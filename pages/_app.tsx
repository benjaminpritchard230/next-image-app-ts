// pages/_app.tsx

import Layout from "@/components/Layout";
import { EB_Garamond } from "next/font/google";

import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";

import { store } from "@/store/store";
import "@/styles/globals.scss";
import { Provider } from "react-redux";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const ebGaramond = EB_Garamond({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);
  return (
    <Provider store={store}>
      <main className={ebGaramond.className}>
        {getLayout(<Component {...pageProps} />)}
      </main>
    </Provider>
  );
}
