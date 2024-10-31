import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import {
  routeAction$,
  routeLoader$,
  useLocation,
  useNavigate,
  Link,
} from "@builder.io/qwik-city";
import {
  LuChevronRight,
  LuLogOut,
  LuPlusCircle,
  LuUser2,
} from "@qwikest/icons/lucide";
import { count, eq } from "drizzle-orm";
import { Button } from "~/components/button/Button";
import { Modal } from "~/components/modal/Modal";
import { Table } from "~/components/table/Table";
import { db } from "~/lib/db/db";
import { appointment } from "~/lib/db/schema";
import background_of_history from "/backgroud_of_history.png";
import logo_image from "/logo project.png";

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
  async ({ sharedMap, query }) => {
    const auth = sharedMap.get("auth");
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
      },
      where: eq(appointment.accountId, Number(auth.sub)),

      offset: offset ? Number(offset) : undefined,
      limit: limit ? Number(limit) : undefined,
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

export const useLogoutAction = routeAction$(async (values, { cookie }) => {
  cookie.delete("auth-token", { path: "/" });

  return {
    success: true,
  };
});

export default component$(() => {
  const loader = useAppointmentHistoryLoader();
  const nav = useNavigate();
  const {
    params,
    url: { searchParams },
  } = useLocation();
  const isOpen = useSignal<boolean>(false);
  const logoutAction = useLogoutAction();

  const doctorCol = $(({ doctor }: AppointmentResponse) => (
    <div class="flex gap-x-2 px-4 py-2">
      <img
        src={import.meta.env.PUBLIC_IMAGE_URL + "/" + doctor.image}
        alt={doctor.name}
        class="size-8 rounded-full"
        height={0}
        width={0}
      />
      <span>{doctor.name}</span>
    </div>
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

  const detailCol = $(({ id }: AppointmentResponse) => (
    <Link
      class="inline-flex items-center justify-center text-gray-500"
      href={`/page_home_user/${params.accountId}/detail/${id}`}
    >
      Detail
      <LuChevronRight />
    </Link>
  ));

  //track
  useVisibleTask$(async () => {
    const offset = searchParams.get("offset");
    const limit = searchParams.get("limit");

    if (!offset || !limit) {
      await nav(`/page_home_user/${params.accountId}/?offset=0&limit=10`);
    }
  });

  return (
    <>
      {/* big box */}
      <img
        class="fixed -z-10 h-screen w-screen object-cover"
        src={background_of_history}
        alt="bg-history"
        width={0}
        height={0}
      />
      <div class="flex h-screen justify-center">
        <div class="container mx-auto my-8 px-8">
          {/* header */}
          <nav class="flex w-full justify-between">
            {/* logo and name */}
            <div class="flex flex-col">
              <img width={84} height={54} src={logo_image} alt="" />
              <span class="ml-1 text-sm font-semibold">SnatBas Clinic</span>
            </div>
            {/* link */}

            <ul class="flex items-center gap-14 text-lg text-black ">
              <li class="hover:text-primary-800">
                <Link href="#">Home</Link>
              </li>
              <li class="hover:text-primary-800">
                <Link href={`/my_form/${params.accountId}/`}>My form</Link>
              </li>
              <li class="hover:text-primary-800">
                <Link href="#">Contact us</Link>
              </li>
              <li class="flex items-center gap-1 hover:text-primary-800">
                <LuUser2 />
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
                onStateChange$={async (state) => {
                  await nav(
                    `/page_home_user/${params.accountId}?offset=${state.offset}&limit=${state.limit}`,
                  );
                }}
              ></Table>
            </div>
          </div>

          {/* Model pop-up of logout */}
          <Modal isOpen={isOpen}>
            <div class="my-5 flex flex-col items-center justify-center space-y-12">
              <div>
                <LuLogOut class="size-20 text-red-500" />
              </div>
              <div>
                <p class="text-2xl">Do you confirm to LOG OUT?</p>
              </div>
              <div class="space-x-14">
                <button
                  type="button"
                  onClick$={() => {
                    isOpen.value = false;
                  }}
                  class="inline-flex h-11 w-28 items-center justify-center gap-x-2 rounded-full border border-transparent bg-red-500 px-4 py-3 text-sm font-medium text-white hover:bg-red-600 focus:bg-red-600 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick$={async () => {
                    const res = await logoutAction.submit();
                    console.log(res);

                    if (res.value.success) {
                      await nav("/log_in/");
                    }
                  }}
                  class="inline-flex h-11 w-28 items-center justify-center gap-x-2 rounded-full border border-transparent bg-gray-300 px-4 py-3 text-sm font-medium text-red-500 hover:bg-gray-400 focus:bg-gray-400  focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  disabled={logoutAction.isRunning}
                >
                  Log out
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
});
