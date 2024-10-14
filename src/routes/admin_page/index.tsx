import type { JSXChildren } from "@builder.io/qwik";
import { $, component$, useVisibleTask$ } from "@builder.io/qwik";
import {
  Link,
  routeLoader$,
  useLocation,
  useNavigate,
} from "@builder.io/qwik-city";
import { LuChevronRight } from "@qwikest/icons/lucide";
import { asc, sql } from "drizzle-orm";
import { Table } from "~/components/table/Table";
import { db } from "~/lib/db/db";
import { appointment } from "~/lib/db/schema";
import background_admin from "/Background_admin.png";
import background_cancelled from "/background_cancelled.png";
import background_pending from "/background_pending.png";
import background_scheduled from "/background_scheduled.png";
import image_logo from "/logo project.png";

type AppointmentResponse = {
  status: "scheduled" | "pending" | "cancelled";
  scheduledCount: number;
  pendingCount: number;
  cancelledCount: number;
  id: number;
  dateTime: string;
  doctor: {
    name: string;
    image: string;
  };
  account: {
    id: number;
    name: string;
  };
};

export const useAppointmentLoader = routeLoader$(async ({ query }) => {
  const offset = query.get("offset");
  const limit = query.get("limit");

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
      account: {
        columns: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: asc(appointment.dateTime),
    offset: offset ? Number(offset) : undefined,
    limit: limit ? Number(limit) : undefined,
  });

  return {
    data: res,
  };
});

export const useAppointmentStatusLoader = routeLoader$(async () => {
  const statusCounts = await db
    .select({
      status: appointment.status,
      count: sql`count(*)`.as("count"),
    })
    .from(appointment)
    .groupBy(appointment.status);

  return {
    statusCounts,
  };
});

export default component$(() => {
  const loader = useAppointmentLoader();
  const statusLoader = useAppointmentStatusLoader();
  const nav = useNavigate();
  const {
    url: { searchParams },
  } = useLocation();

  // Accessing the status counts from the loader
  const statusCounts = statusLoader.value.statusCounts;

  // Finding the counts for each status
  const scheduledCount =
    statusCounts.find((s) => s.status === "scheduled")?.count || 0;
  const pendingCount =
    statusCounts.find((s) => s.status === "pending")?.count || 0;
  const cancelledCount =
    statusCounts.find((s) => s.status === "cancelled")?.count || 0;

  const doctorCol = $(({ doctor }: AppointmentResponse) => (
    <div class="flex gap-x-2 px-4 py-2">
      <img
        src={import.meta.env.PUBLIC_IMAGE_URL + "/" + doctor.image}
        alt={doctor.name}
        class="size-8 rounded-full"
        width={0}
        height={0}
      />
      <span>{doctor.name}</span>
    </div>
  ));
  const accountCol = $(({ account }: AppointmentResponse) => (
    <div class="flex justify-center gap-x-2 px-4 py-2">
      <span>{account.name}</span>
    </div>
  ));

  const detailCol = $(({ id }: AppointmentResponse) => (
    <Link
      class="flex items-center justify-center gap-1 text-sm text-gray-600 hover:cursor-pointer"
      href={`/admin_page/details_page/${id}/`}
    >
      Detial
      <LuChevronRight />
    </Link>
  ));

  const statusCol = $(({ status }: AppointmentResponse) =>
    status === "pending" ? (
      <span class=" inline-flex items-center gap-x-1.5 rounded-full bg-cyan-300 px-3 py-1.5 text-xs font-medium text-cyan-700">
        <svg
          width="15"
          height="18"
          viewBox="0 0 15 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.5 13H9.5M2.5 5H9.5M8.5 13V11.3312C8.49994 11.119 8.39455 10.9156 8.207 10.7656L6 9M6 9L3.793 10.7656C3.60545 10.9156 3.50006 11.119 3.5 11.3312V13M6 9L3.793 7.2344C3.60545 7.08441 3.50006 6.88096 3.5 6.6688V5M6 9L8.207 7.2344C8.39455 7.08441 8.49994 6.88096 8.5 6.6688V5"
            stroke="#0E7790"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        pending
      </span>
    ) : status === "scheduled" ? (
      <span class=" inline-flex items-center gap-x-1.5 rounded-full bg-emerald-400 px-3 py-1.5 text-xs font-medium text-emerald-900">
        <svg
          width="14"
          height="18"
          viewBox="0 0 14 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 6.25L4.5 11.75L2 9.25"
            stroke="#006F51"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        scheduled
      </span>
    ) : (
      <span class=" inline-flex items-center gap-x-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white">
        <svg
          width="14"
          height="18"
          viewBox="0 0 14 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.00501 7.50462V9.50306M7.00501 11.5015H7.01M11.8661 12.0011L7.86932 5.00655C7.78217 4.85278 7.65579 4.72487 7.50307 4.63588C7.35035 4.54689 7.17676 4.5 7.00001 4.5C6.82326 4.5 6.64967 4.54689 6.49695 4.63588C6.34423 4.72487 6.21785 4.85278 6.1307 5.00655L2.13389 12.0011C2.0458 12.1537 1.99961 12.3268 2 12.503C2.00039 12.6792 2.04735 12.8521 2.13611 13.0043C2.22488 13.1564 2.35229 13.2824 2.50544 13.3695C2.65859 13.4565 2.83204 13.5015 3.00819 13.5H11.0018C11.1771 13.4998 11.3493 13.4535 11.5011 13.3657C11.6528 13.2779 11.7788 13.1518 11.8664 12.9999C11.954 12.848 12 12.6758 12 12.5005C12 12.3252 11.9538 12.153 11.8661 12.0011Z"
            stroke="#FEF2F2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        cancelled
      </span>
    ),
  );

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    const offset = searchParams.get("offset");
    const limit = searchParams.get("limit");

    if (!offset || !limit) {
      await nav(`/admin_page/?offset=0&limit=10`);
    }
  });

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
      <div class="flex min-h-screen  justify-center">
        <div class="container mx-auto my-8 px-8">
          {/* nav bar */}
          <nav class="flex w-full justify-between ">
            {/* logo and name */}
            <div class="flex flex-col">
              <img width={84} height={54} src={image_logo} alt="" />
              <span class="ml-1 text-sm font-semibold">SnatBas Clinic</span>
            </div>
            {/* admin */}
            <div class="flex items-center">
              <button class="h-8 w-20 rounded-full bg-primary-600 text-sm text-white hover:bg-primary-700">
                Admin
              </button>
            </div>
          </nav>

          {/* 2 div */}
          <div class="mx-auto mt-6 flex-col">
            {/* welcome, admin*/}
            <div class="mx-16">
              <span class="text-2xl font-semibold">Welcome, Admin</span>
              <p class="mt-2 text-sm text-black">
                Start day with managing new appointments
              </p>
            </div>
            {/* Count Status Cards */}
            <div class="container mx-auto my-10 flex items-center justify-center gap-8">
              {/* scheduledCount */}
              <div class="relative h-40 flex-1 shrink-0 space-y-4 rounded-lg bg-white p-5 shadow">
                <img
                  class="absolute inset-0 z-20 h-40 w-96 object-cover"
                  src={background_scheduled}
                  alt="background_scheduled"
                  width={0}
                  height={0}
                />
                <div class="grid grid-cols-2 gap-y-10">
                  {/* icon */}
                  <div class="grid justify-items-center">
                    <svg
                      width="32"
                      height="31"
                      viewBox="0 0 32 31"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.6667 2.58337V7.75004M21.3333 2.58337V7.75004M28 18.0834V7.75004C28 7.0649 27.719 6.40782 27.219 5.92335C26.7189 5.43888 26.0406 5.16671 25.3333 5.16671H6.66667C5.95942 5.16671 5.28115 5.43888 4.78105 5.92335C4.28095 6.40782 4 7.0649 4 7.75004V25.8334C4 26.5185 4.28095 27.1756 4.78105 27.6601C5.28115 28.1445 5.95942 28.4167 6.66667 28.4167H17.3333M4 12.9167H28M21.3333 25.8334L24 28.4167L29.3333 23.25"
                        stroke="#22C6EE"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  {/* countStatus */}
                  <div class="text-2xl font-bold text-black">
                    {scheduledCount as JSXChildren}
                  </div>
                  {/* description */}
                  <div class="col-span-2 text-center text-sm font-semibold text-gray-500">
                    <p>Total number of scheduled appointments</p>
                  </div>
                </div>
              </div>
              {/* pendingCount */}
              <div class="relative h-40 flex-1 shrink-0 space-y-4 rounded-lg bg-white p-5 shadow">
                <img
                  class="absolute inset-0 z-20 h-40 w-96 object-cover"
                  src={background_pending}
                  alt="bg_pending"
                  width={0}
                  height={0}
                />
                <div class="grid grid-cols-2 gap-y-10">
                  {/* icon */}
                  <div class="grid justify-items-center">
                    <svg
                      width="29"
                      height="28"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.66675 22H19.6667M5.66675 2H19.6667M17.6667 22V17.828C17.6666 17.2976 17.4558 16.789 17.0807 16.414L12.6667 12M12.6667 12L8.25275 16.414C7.87765 16.789 7.66686 17.2976 7.66675 17.828V22M12.6667 12L8.25275 7.586C7.87765 7.21101 7.66686 6.70239 7.66675 6.172V2M12.6667 12L17.0807 7.586C17.4558 7.21101 17.6666 6.70239 17.6667 6.172V2"
                        stroke="#FFBE44"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  {/* countStatus */}
                  <div class=" text-2xl font-bold text-black">
                    {pendingCount as JSXChildren}
                  </div>
                  {/* description */}
                  <div class="col-span-2 text-center text-sm font-semibold text-gray-500">
                    <p>Total number of pending appointments</p>
                  </div>
                </div>
              </div>
              {/* cancelledCount */}
              <div class="relative h-40 flex-1 shrink-0 space-y-4 rounded-lg bg-white p-5 shadow">
                <img
                  class="absolute inset-0 z-20 h-40 w-96 object-cover"
                  src={background_cancelled}
                  alt="bg_cancelled"
                  width={0}
                  height={0}
                />
                <div class="grid grid-cols-2 gap-y-10">
                  {/* icon */}
                  <div class="grid justify-items-center ">
                    <svg
                      width="29"
                      height="28"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.3334 8.99998V13M12.3334 17H12.3434M22.0634 18L14.0634 3.99998C13.889 3.69218 13.636 3.43617 13.3303 3.25805C13.0247 3.07993 12.6772 2.98608 12.3234 2.98608C11.9696 2.98608 11.6222 3.07993 11.3165 3.25805C11.0108 3.43617 10.7579 3.69218 10.5834 3.99998L2.58343 18C2.40711 18.3053 2.31465 18.6519 2.31543 19.0045C2.31622 19.3571 2.4102 19.7032 2.58787 20.0078C2.76554 20.3124 3.02057 20.5646 3.32712 20.7388C3.63367 20.9131 3.98083 21.0032 4.33343 21H20.3334C20.6843 20.9996 21.029 20.9069 21.3327 20.7313C21.6365 20.5556 21.8886 20.3031 22.0639 19.9991C22.2392 19.6951 22.3315 19.3504 22.3314 18.9995C22.3313 18.6486 22.2389 18.3039 22.0634 18Z"
                        stroke="#FF0000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  {/* countStatus */}
                  <div class=" text-2xl font-bold text-black ">
                    {cancelledCount as JSXChildren}
                  </div>
                  {/* description */}
                  <div class="col-span-2 text-center text-sm font-semibold text-gray-500">
                    <p>Total number of canceled appointments</p>
                  </div>
                </div>
              </div>
            </div>
            {/* table */}
            <div class="mt-6">
              <Table
                columns={[
                  { label: "Patient", key: "patient", content$: accountCol },
                  { label: "Date", key: "dateTime" },
                  { label: "Doctor", key: "doctor", content$: doctorCol },
                  { label: "Status", key: "status", content$: statusCol },
                  { label: "Details", key: "details", content$: detailCol },
                ]}
                data={loader}
                emptyState={{ title: "no data" }}
                onStateChange$={async (state) => {
                  await nav(
                    `/admin_page/?offset=${state.offset}&limit=${state.limit}`,
                  );
                }}
              ></Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
