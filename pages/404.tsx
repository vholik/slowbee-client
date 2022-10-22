import { useEffect } from "react";
import Router from "next/router";

export default function Page() {
  useEffect(() => {
    Router.push("/");
  }, []);
  return <div></div>;
}
