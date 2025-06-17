import { Category } from "@/payload-types";
import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { SearchFilter } from "./search-filters";

import configPromise from "@payload-config";
import { getPayload } from "payload";

interface Props {
  children: React.ReactNode;
}

const payload = await getPayload({
  config: configPromise,
});

const data = await payload.find({
  collection: "categories",
  depth: 1,
  pagination: false,
  where: {
    parent: {
      exists: false,
    },
  },
});

const formatedData = data.docs.map((doc) => ({
  ...doc,
  subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
    //Because of depth :1 we are confident doc will be a type of Category
    ...(doc as Category),
    subcategories: undefined
  })),
}));

const Layout = async ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilter data={formatedData}></SearchFilter>
      <div className="flex-1 bg-[#F4F4F0]">{children}</div>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
