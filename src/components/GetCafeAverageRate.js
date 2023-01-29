import { useGetReviews } from "./Hooks/useGetReviews";

export const GetCafeAverageRate = (cafeId) => {
  const { reviews } = useGetReviews("cafeId", cafeId);
  const getTotal = (reviewArray) => {
    return reviewArray.reduce((acc, obj) => {
      return acc + obj.rate;
    }, 0);
  };

  let totalRate = getTotal(reviews);
  return { totalRate, averageRate: reviews.length };
};
