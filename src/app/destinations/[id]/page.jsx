import BookingCard from "@/components/BookingCard";
import { DeleteAlert } from "@/components/DeleteAlert";
import { DestinationModal } from "@/components/DestinationModal";
import { auth } from "@/lib/auth";
import { Card } from "@heroui/react";
import { headers } from "next/headers";
import Image from "next/image";

import React from "react";

import { IoCalendarNumberOutline, IoLocationOutline } from "react-icons/io5";

const DestinationDetails = async ({ params }) => {
  const { id } = await params;

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  console.log(token);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  const destinations = await res.json();
  const { imageUrl, country, destinationName, duration, description } =
    destinations;
  // console.log(destinations);
  return (
    <div className="w-9/12 mx-auto">
      <div className="flex items-center justify-end gap-3 my-5">
        <DestinationModal destinations={destinations}></DestinationModal>
        <DeleteAlert destinations={destinations}></DeleteAlert>
      </div>

      <Card className="p-2 rounded-xl border-1 flex justify-between">
        <Image
          alt={destinationName}
          src={imageUrl}
          height={500}
          width={800}
          className="rounded-xl w-full"
        ></Image>
        <p className="flex items-center gap-1">
          <IoLocationOutline />
          {country}
        </p>
        <div className="flex justify-between">
          <div className=" ">
            <h4 className="text-xl font-bold">{destinationName}</h4>

            <p className="flex items-center gap-1">
              <IoCalendarNumberOutline />
              {duration}
            </p>

            <p className="max-w-1/2">{description}</p>
          </div>
          <BookingCard destinations={destinations}></BookingCard>
        </div>
      </Card>
    </div>
  );
};

export default DestinationDetails;
