import { component$, useSignal } from "@builder.io/qwik";
import background_of_history from "/backgroud_of_history.png";
import logo_image from "/logo project.png";
import {
  Link,
  routeLoader$,
  useLocation,
  useNavigate,
} from "@builder.io/qwik-city";
import { LuUser } from "@qwikest/icons/lucide";
import { Column } from "drizzle-orm";
import { db } from "~/lib/db/db";
import { appointment } from "~/lib/db/schema";
import { eq } from "drizzle-orm";

type AppointmentResponse = {
  status: "scheduled" | "pending" | "cancelled";
  id: number;
  dateTime: string;
  doctor: {
    name: string;
    image: string;
  };
  reasonOfAppointment: string;
  createdAt: string;
  comment: string;
  reasonOfScheduled: string;
  reasonOfCancelled: string;
  updatedAt: string;
};

//load data in database
export const useAppointmentHistoryLoader = routeLoader$(async ({ params }) => {
  const res = await db.query.appointment.findFirst({
    columns: {
      id: true,
      dateTime: true,
      status: true,
      reasonOfAppointment: true,
      createdAt: true,
      comment: true,
      reasonOfScheduled: true,
      reasonOfCancelled: true,
      updatedAt: true,
    },
    with: {
      doctor: {
        columns: {
          name: true,
          image: true,
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
  const loader = useAppointmentHistoryLoader();
  const isOpen = useSignal<boolean>(false);
  const nav = useNavigate();
  const { params } = useLocation();

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

  return (
    <>
      {/* Bubble background */}
      <img
        class="fixed -z-10 h-screen w-screen object-cover"
        src={background_of_history}
        alt="bg-history"
        width={0}
        height={0}
      />

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

          {/* session*/}
          <div class="mx-10 mt-10 flex-col space-y-3">
            {/* back to home button and appointment detail, created time */}
            <div class="flex-col space-y-5">
              {/* back to home button */}
              <div>
                <Link
                  class="inline-flex cursor-pointer items-center gap-x-1 text-xl text-gray-800 hover:text-primary-600 hover:underline focus:text-primary-600 focus:outline-none "
                  onClick$={() => {
                    nav(`/page_home_user/${params.accountId}`);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="34"
                    height="34"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-circle-arrow-left"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M16 12H8" />
                    <path d="m12 8-4 4 4 4" />
                  </svg>
                  Back to home
                </Link>
              </div>
              {/* text and created time */}
              <div class="flex justify-between">
                <span class="text-2xl">Appointment details</span>
                <p class="text-sm">
                  create time wait for accessing data from database
                </p>
              </div>
            </div>

            {/* detail table */}
            <div class="flex flex-auto flex-row justify-center gap-8 rounded bg-cyan-100 p-5">
              {/* left */}
              <div class="w-full rounded bg-white p-2">
                <div>
                  Doctor: <div></div>
                </div>
                <p></p>
              </div>
              {/* right */}
              <div class="w-full rounded bg-white">hello</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
