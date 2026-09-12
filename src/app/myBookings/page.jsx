import { BookingCancelAlert } from "@/components/BookingCancelAlert";
import { auth } from "@/lib/auth";
import { Button, Card } from "@heroui/react";
import { headers } from "next/headers";
import Image from "next/image";
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

const MyBookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  const user = session?.user;

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${user?.id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  const bookings = await res.json();
  console.log(bookings);
  return (
    <div className="w-8/12 mx-auto">
      <h1 className="text-4xl font-bold text-center my-5">My Bookings</h1>
      {bookings.map((booking) => (
        <div key={booking._id} className="flex gap-5 border-2 p-5 mb-5">
          <Image
            src={booking.imageUrl}
            alt={booking.destinationName}
            height={200}
            width={200}
          ></Image>
          <div>
            <h1 className="text-2xl font-bold">{booking.destinationName}</h1>

            <p>
              Departure:
              {new Date(booking.departureDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p>Booking ID : {booking._id}</p>
            <h1 className="text-3xl font-bold text-teal-500">
              ${booking.price}
            </h1>
          </div>
          <BookingCancelAlert bookingsId={booking._id}></BookingCancelAlert>
        </div>
      ))}
    </div>
  );
};

export default MyBookingsPage;
