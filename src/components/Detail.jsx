import { useState } from "react";
import { DetailContent } from "./DetailContent";
import Review from "./Detailthings/Review";

export const Detail = () => {
  return (
    <div
      style={{
        display: "grid",
        position: "absolute",
        left: "25%",
      }}
    >
      <DetailContent />
      <Review />
    </div>
  );
};
