import { useGetReviews } from "./Hooks/useGetReviews";

export const GetCafeAverageRate = (cafeId) => {
  const { reviews } = useGetReviews("cafeId", cafeId);
  const groupBy = (reviewArray) => {
    return reviewArray.reduce((acc, obj) => {
      return acc + obj.rate;
    }, 0);
  };

  let totalRate = groupBy(reviews);
  return { totalRate, averageRate: reviews.length };
};
