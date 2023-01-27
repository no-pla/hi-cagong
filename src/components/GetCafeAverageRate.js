import { useGetReviews } from "./Hooks/useGetReviews";

export const GetCageAverageRate = () => {
  const { reviews } = useGetReviews("cafeId", "카페이름"); //임시값
  function groupBy(objectArray) {
    return objectArray.reduce((acc, obj) => {
      return acc + obj.rate.length / 2;
    }, 0);
  }

  let groupedPeople = groupBy(reviews);
  return { totalRate: groupedPeople, averageRate: reviews.length };
};
