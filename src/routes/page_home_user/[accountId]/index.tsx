import { $, component$, useSignal } from "@builder.io/qwik";
import logo_image from "/logo project.png";
import {
  Link,
  RequestHandler,
  routeLoader$,
  useLocation,
  useNavigate,
} from "@builder.io/qwik-city";
import { Button } from "~/components/button/Button";
import {
  LuArrowBigLeft,
  LuCheck,
  LuChevronLeft,
  LuChevronRight,
  LuHourglass,
  LuLogOut,
  LuPlusCircle,
  LuTimer,
  LuUser,
  LuX,
} from "@qwikest/icons/lucide";
import { db } from "~/lib/db/db";
import { Table } from "~/components/table/Table";
import { useAccountLoader } from "~/routes/information/[accountId]";
import { count, eq } from "drizzle-orm";
import { appointment } from "~/lib/db/schema";
import { datetime } from "drizzle-orm/mysql-core";
import { Modal } from "~/components/modal/Modal";
import { isoDate } from "valibot";

type AppointmentResponse = {
  status: "scheduled" | "pending" | "cancelled";
  id: number;
  dateTime: string;
  doctor: {
    name: string;
    image: string;
  };
};

// export const useUserLoader = routeLoader$(({ sharedMap }) => {
//   return sharedMap.get("auth");
// });

//prevent access by id in path
export const onRequest: RequestHandler = async ({
  params,
  redirect,
  sharedMap,
  next,
}) => {
  const accountId = params.accountId;
  const auth = sharedMap.get("auth");

  if (accountId === auth.sub) {
    await next();
  } else {
    throw redirect(301, `/page_home_user/${auth.sub}/`);
  }
};

//load data in database by cookie and shareMap
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
    console.log(auth);
    return {
      data: res,
      total,
    };
  },
);

export default component$(() => {
  const loader = useAppointmentHistoryLoader();
  const nav = useNavigate();
  const { params, prevUrl } = useLocation();
  const isOpen = useSignal<boolean>(false);

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

  const statusCol = $(({ status }: AppointmentResponse) =>
    status === "pending" ? (
      <span class="inline-flex items-center gap-x-1.5 rounded-full bg-blue-600 px-3 py-1.5 text-xs font-medium text-white dark:bg-blue-500">
        <LuHourglass />
        pending
      </span>
    ) : status === "scheduled" ? (
      <span class="inline-flex items-center gap-x-1.5 rounded-full bg-teal-500 px-3 py-1.5 text-xs font-medium text-white">
        <LuCheck />
        scheduled
      </span>
    ) : (
      <span class="inline-flex items-center gap-x-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white">
        <LuX />
        cancelled
      </span>
    ),
  );

  const detailCol = $(({ id }: AppointmentResponse) => (
    <Link
      class="flex items-center gap-x-4 "
      href={`/page_home_user/${params.accountId}/${id}/`}
    >
      detail
      <LuChevronRight />
    </Link>
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
                <Link
                  href="#"
                  onClick$={() => {
                    isOpen.value = true;
                  }}
                >
                  Log out
                </Link>
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
              <Button
                type="button"
                size="default"
                onClick$={() => {
                  nav(`/appointment/${params.accountId}/`);
                }}
              >
                New appointment | <LuPlusCircle class="size-5" />
              </Button>
            </div>
            {/* table */}
            <div class="mt-6">
              <Table
                columns={[
                  { label: "Doctor", key: "doctor", content$: doctorCol },
                  { label: "Date", key: "dateTime" },
                  { label: "Status", key: "status", content$: statusCol },
                  { label: "Detail", key: "detail", content$: detailCol },
                ]}
                data={loader}
                emptyState={{ title: "no data" }}
              ></Table>
            </div>
          </div>

          {/* Model pop-up of logout */}
          <Modal isOpen={isOpen}>
            <div class="size-16 flex-col items-center">
              <div>
                <LuLogOut />
              </div>
              <div></div>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
});
