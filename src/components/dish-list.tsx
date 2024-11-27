// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import { Link } from "@/i18n/routing";
// import AutoPagination from "@/components/auto-pagination";
// import { formatCurrency, generateSlugUrl } from "@/lib/utils";
// import { DishListResType } from "@/schemaValidations/dish.schema";
// import { useSearchParams } from "next/navigation";
// import { useHomePagination } from "@/queries/useDish";

// interface DishListProps {
//   dishList: DishListResType["data"];
//   page: number;
//   pageSize: number;
//   totalItems: number;
//   t: (key: string) => string;
// }

// const PAGE_SIZE = 10;

// const DishList = () => {
//   const searchParam = useSearchParams();
//   const page = searchParam.get("page") ? Number(searchParam.get("page")) : 1;
//   const pageIndex = page - 1;
//   // const dishListQuery = useHomePagination({ page });

//   const [pagination, setPagination] = useState({
//     pageIndex, // Gía trị mặc định ban đầu, không có ý nghĩa khi data được fetch bất đồng bộ
//     pageSize: PAGE_SIZE, //default page size
//   });

//   return (
//     <>
//       <section className="space-y-10 py-16 px-2 w-full">
//         <h2 className="text-center text-2xl font-bold">{t("h2")}</h2>
//         {dishList.length === 0 ? (
//           <div className="text-center text-gray-500">{t("noDishesFound")}</div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
//             {dishList.map((dish) => (
//               <Link
//                 key={dish.id}
//                 href={`/dishes/${generateSlugUrl({
//                   name: dish.name,
//                   id: dish.id,
//                 })}`}
//                 className="flex flex-col border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
//               >
//                 <div className="relative w-full aspect-square">
//                   <Image
//                     src={dish.image}
//                     fill
//                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                     alt={dish.name}
//                     className="object-cover"
//                   />
//                 </div>
//                 <div className="p-4 space-y-2">
//                   <h3 className="text-xl font-semibold truncate">
//                     {dish.name}
//                   </h3>
//                   <p className="text-gray-600 line-clamp-2">
//                     {dish.description}
//                   </p>
//                   <p className="text-primary font-bold text-lg">
//                     {formatCurrency(dish.price)}
//                   </p>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         )}
//       </section>
//       <div className="flex justify-center mt-8">
//         <AutoPagination page={page} pageSize={pageSize} pathname="/" />
//       </div>
//     </>
//   );
// };

// export default DishList;
