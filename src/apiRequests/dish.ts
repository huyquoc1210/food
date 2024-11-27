import http from "@/lib/http";
import {
  CreateDishBodyType,
  DishListResType,
  DishListWithPaginationQueryType,
  DishListWithPaginationResType,
  DishResType,
  UpdateDishBodyType,
} from "@/schemaValidations/dish.schema";
import queryString from "query-string";

const dishApiRequest = {
  // Note: Next.js 15 thì mặc định fetch sẽ là { cache: 'no-store' } (dynamic rendering page)
  // Hiện tại next.js 14 mặc định fetch sẽ là { cache: 'force-cache' } nghĩa là cache (static rendering page)
  list: () =>
    http.get<DishListResType>("dishes", { next: { tags: ["dishes"] } }),
  add: (body: CreateDishBodyType) => http.post<DishResType>("dishes", body),
  getDish: (id: number) => http.get<DishResType>(`dishes/${id}`),
  updateDish: (id: number, body: UpdateDishBodyType) =>
    http.put<DishResType>(`dishes/${id}`, body),
  deleteDish: (id: number) => http.delete<DishResType>(`dishes/${id}`),
  pagination: (queryParams: DishListWithPaginationQueryType) =>
    http.get<DishListWithPaginationResType>(
      `dishes/pagination?` +
        queryString.stringify({
          page: queryParams.page,
          limit: queryParams.limit,
        })
    ),
};

export default dishApiRequest;
