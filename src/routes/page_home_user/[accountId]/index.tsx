import { $, component$ } from "@builder.io/qwik";
import logo_image from "/logo project.png";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import { Button } from "~/components/button/Button";
import { LuArrowBigLeft, LuPlusCircle, LuUser } from "@qwikest/icons/lucide";
import { db } from "~/lib/db/db";
import { Table } from "~/components/table/Table";
import { useAccountLoader } from "~/routes/information/[accountId]";
import { count, eq } from "drizzle-orm";
import { appointment } from "~/lib/db/schema";

type AppointmentResponse = {
  status: "scheduled" | "pending" | "cancelled";
  id: number;
  dateTime: string;
  doctor: {
    name: string;
    image: string;
  };
};

export const useAppointmentHistoryLoader = routeLoader$(
  async ({ cookie, sharedMap }) => {
    const auth = sharedMap.get("auth");

    const res = await db.query.appointment.findMany({
      columns: {
        id: true,
        dateTime: true,
        status: true,
      },
      with: {
        doctor: {
          columns: {
            name: true,
            image: true,
          },
        },
      },
      where: eq(appointment.accountId, Number(auth.sub)),
    });

    const total = await db
      .select({ count: count() })
      .from(appointment)
      .where(eq(appointment.accountId, Number(auth.sub)));

    return {
      data: res,
      total,
    };
  },
);

export default component$(() => {
  const loader = useAppointmentHistoryLoader();

  console.log(loader.value);

  const doctorCol = $(({ doctor }: AppointmentResponse) => (
    <div class="flex gap-x-2 px-4 py-2">
      <img
        src={import.meta.env.PUBLIC_IMAGE_URL + "/" + doctor.image}
        alt={doctor.name}
        class="size-8 rounded-full"
      />
      <span>{doctor.name}</span>
    </div>
  ));

  return (
    <>
      {/* big box */}
      <div class="flex h-screen justify-center">
        <div class="container">
          {/* header */}
          <nav class="mt-8 flex w-full justify-between">
            {/* logo and name */}
            <div class="flex-none">
              <img width={84} height={54} src={logo_image} alt="" />
              <span class="ml-1 text-sm font-semibold">SnatBas Clinic</span>
            </div>
            {/* link */}

            <ul class="flex items-center gap-16">
              <li>
                <Link href="#">Home</Link>
              </li>
              <li>
                <Link href="#">My form</Link>
              </li>
              <li>
                <Link href="#">Contact us</Link>
              </li>
              <li class="flex items-center gap-1">
                <LuUser class="size-5" />
                <Link href="#">Log out</Link>
              </li>
            </ul>
          </nav>

          {/* this div gave 2 columns */}
          <div class="mx-10 mt-6 flex-col">
            {/* label Hi */}
            <div>
              <span class="text-2xl">Hi, wish you get well soon...</span>
              <p class="text-gray-500">Let us help you.</p>
            </div>
            {/* New appointment button */}
            <div class=" flex justify-end">
              <Button type="button" size="default">
                New appointment | <LuPlusCircle class="size-5" />
              </Button>
            </div>
            {/* table */}
            <div class="mt-4">
              <Table
                columns={[
                  { label: "Doctor", key: "doctor", content$: doctorCol },
                ]}
                data={loader}
                emptyState={{ title: "no data" }}
                onStateChange$={async (state) => {}}
              ></Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
