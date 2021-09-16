import Head from "next/head";
import Ad from "../components/Ad";

export default function Home() {
  return (
    <div>
      <Head>
        <title>MyAdbooker Demo</title>
        <meta name="description" content="MyAdbooker Demo" />
      </Head>

      <Ad />
    </div>
  );
}
