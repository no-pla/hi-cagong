import { useGetReviews } from "./Hooks/useGetReviews";

export const GetCafeAverageRate = (cafeId) => {
  const { reviews } = useGetReviews("cafeId", cafeId);
  function groupBy(objectArray) {
    return objectArray.reduce((acc, obj) => {
      return acc + obj.rate.length / 2;
    }, 0);
  }

  let groupedPeople = groupBy(reviews);
  return { totalRate: groupedPeople, averageRate: reviews.length };
};
