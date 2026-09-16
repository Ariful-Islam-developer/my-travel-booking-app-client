import React from "react";
import DestinationCard from "./DestinationCard";

const Featured = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/featured`);
  const destinations = await res.json();
  console.log(destinations);
  return (
    <div className="w-9/12 mx-auto">
      <h1 className="mt-10 text-4xl font-bold ">Featured Destinations</h1>
      <div className="grid grid-cols-4 gap-5">
        {destinations.map((destination) => (
          <DestinationCard
            key={destination._id}
            destination={destination}
          ></DestinationCard>
        ))}
      </div>
    </div>
  );
};

export default Featured;
