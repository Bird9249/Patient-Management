import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { eq } from "drizzle-orm";
import { db } from "~/lib/db/db";
import { appointment } from "~/lib/db/schema";
import background_admin from "/Background_admin.png";

export const useAppointmentLoader = routeLoader$(async ({ params }) => {
  const res = await db.query.appointment.findMany({
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
      account: {
        columns: {
          name: true,
          email: true,
          phone: true,
        },
        with: {
          userInfo: {
            columns: {
              createdAt: false,
            },
          },
        },
      },
    },
    where: eq(appointment.id, Number(params.id)),
  });

  return {
    data: res,
  };
});

export default component$(() => {
  const loader = useAppointmentLoader();

  console.log(loader.value.data);

  return (
    <>
      {/* big box */}
      <img
        class="fixed -z-10 h-screen w-screen object-cover"
        src={background_admin}
        alt="bg-admin"
        width={0}
        height={0}
      />
      <div></div>
    </>
  );
});
