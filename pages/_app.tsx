import { store } from "@/store/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { EB_Garamond } from "next/font/google";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  const ebGaramond = EB_Garamond({ subsets: ["latin"] });
  return (
    <Provider store={store}>
      <main className={ebGaramond.className}>
        <Component {...pageProps} />
      </main>
    </Provider>
  );
}
