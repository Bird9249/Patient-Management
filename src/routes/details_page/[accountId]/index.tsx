import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { eq } from "drizzle-orm";
import { db } from "~/lib/db/db";
import { userInfo } from "~/lib/db/schema";

export const useUserInfoLoader = routeLoader$(async ({ params }) => {
  const res = await db.query.userInfo.findMany({
    columns: {
      id: true,
      address: true,
      dateOfBirth: true,
      gender: true,
      occupation: true,
      emergencyName: true,
      emergencyPhone: true,
    },
    with: {
      account: {
        columns: {
          name: true,
          phone: true,
          email: true,
        },
      },
    },
    where: eq(userInfo.accountId, Number(params.accountId)),
  });

  const appointment = await db.query.appointment.findMany({
    columns: {
      id: true,
      reasonOfAppointment: true,
      dateTime: true,
      comment: true,
    },
    with: {
      doctor: {
        columns: {
          name: true,
          image: true,
        },
      },
    },
  });

  return {
    data: res,
    appointment,
  };
});

export default component$(() => {
  const loader = useUserInfoLoader();

  console.log(loader.value.data);
  return (
    <>
      <h1>Hello world</h1>
    </>
  );
});
