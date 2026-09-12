import { Button, Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiExternalLink } from "react-icons/fi";
import { IoCalendarNumberOutline, IoLocationOutline } from "react-icons/io5";

const DestinationCard = ({ destination }) => {
  const { _id, imageUrl, country, destinationName, price, duration } =
    destination;
  return (
    <div>
      <Card className="p-2 rounded-xl border-1">
        <Image
          alt={destinationName}
          src={imageUrl}
          height={400}
          width={400}
          className="rounded-xl"
        ></Image>
        <p className="flex items-center gap-1">
          <IoLocationOutline />
          {country}
        </p>
        <div className="flex justify-between px-2 ">
          <h4 className="text-xl font-bold">{destinationName}</h4>
          <h4 className="text-xl font-bold">${price}</h4>
        </div>
        <p className="flex items-center gap-1">
          <IoCalendarNumberOutline />
          {duration}
        </p>
        <Link href={`/destinations/${_id}`}>
          <Button variant="outline" className="text-cyan-500">
            <FiExternalLink />
            Book Now
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default DestinationCard;
