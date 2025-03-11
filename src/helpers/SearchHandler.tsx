// "use client";

// import { useSearchParams, useRouter } from "next/navigation";
// import SearchBar from "@/components/searchBar/SearchBar";

// export default function SearchHandler() {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const currentQuery = searchParams.get("name") || "";

//   const handleSearch = (query: string) => {
//     const params = new URLSearchParams(searchParams.toString());
//     if (query) {
//       params.set("name", query);
//     } else {
//       params.delete("name");
//     }
//     router.push(`/characters?${params.toString()}`);
//   };

//   return <SearchBar onSearch={handleSearch} currentQuery={currentQuery} />;
// }

