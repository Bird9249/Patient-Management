import { component$, useSignal } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import { eq } from "drizzle-orm";
import { db } from "~/lib/db/db";
import { appointment } from "~/lib/db/schema";
import background_admin from "/Background_admin.png";
import logo_image from "/logo project.png";

export const useAppointmentLoader = routeLoader$(async ({ params }) => {
  const res = await db.query.appointment.findFirst({
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
              gender: true,
              address: true,
              dateOfBirth: true,
              emergencyName: true,
              emergencyPhone: true,
              occupation: true,
            },
          },
        },
      },
    },
    where: eq(appointment.id, Number(params.id)),
  });

  console.log(res);

  return {
    data: res,
  };
});

export default component$(() => {
  const loader = useAppointmentLoader();
  const isOpen = useSignal<boolean>(false);

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
      <div class="flex min-h-screen w-screen justify-center ">
        <div class="container mx-auto my-8 space-y-4 px-8">
          {/* nav bar */}
          <nav class="mt-8 flex w-full justify-between ">
            {/* logo and name */}
            <div class="flex-none">
              <img width={84} height={54} src={logo_image} alt="" />
              <span class="ml-1 text-sm font-semibold">SnatBas Clinic</span>
            </div>
            {/* admin */}
            <div class="flex items-center">
              <button class="h-8 w-20 rounded-full bg-primary-600 text-sm text-white hover:bg-primary-700">
                Admin
              </button>
            </div>
          </nav>
          {/* back button */}
          <Link
            class="inline-flex items-center gap-x-1 text-lg text-gray-800 hover:cursor-pointer hover:text-primary-600 focus:text-primary-600"
            href={`/admin_page/`}
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
            Back
          </Link>
          {/* Details */}
          <p class="ml-10 text-2xl font-semibold text-black">
            Details of Patient
          </p>
          {/* main div */}
          <div class="container mx-auto flex w-full flex-col gap-x-5 space-y-4 rounded-xl bg-primary-100 p-5">
            <div class="flex h-10 items-center justify-start gap-5">
              {/* personal info */}
              <div class="flex-1 rounded-full bg-white px-4 py-2">
                <p class="text-lg">Personal Information</p>
              </div>
              {/* from request */}
              <div class="flex-1 rounded-full bg-white px-4 py-2">
                <p class="text-lg">From request</p>
              </div>
            </div>
            {/* info */}
            <div class="flex min-h-[350px] gap-5">
              <div class="flex-1 space-y-5 rounded-3xl bg-white px-4 py-3 text-sm">
                <p
                  class=" font-medium
                "
                >
                  Name:{" "}
                  <span class="ml-2 font-normal">
                    {loader.value.data?.account.name || ""}
                  </span>
                </p>
                <p
                  class=" font-medium
                "
                >
                  Gender:{" "}
                  <span class="ml-2 font-normal">
                    {loader.value.data!.account.userInfo.gender}
                  </span>
                </p>
                <p
                  class=" font-medium
                "
                >
                  Birth Date :{" "}
                  <span class="ml-2 font-normal">
                    {loader.value.data?.account.userInfo.dateOfBirth || ""}
                  </span>
                </p>
                <p
                  class=" font-medium
                "
                >
                  Occupation:{" "}
                  <span class="ml-2 font-normal">
                    {loader.value.data?.account.userInfo.occupation || ""}
                  </span>
                </p>
                <p
                  class=" font-medium
                "
                >
                  Address:{" "}
                  <span class="ml-2 font-normal">
                    {loader.value.data?.account.userInfo.address || ""}
                  </span>
                </p>
                <p
                  class=" font-medium
                "
                >
                  Email:{" "}
                  <span class="ml-2 font-normal">
                    {loader.value.data?.account.email || ""}
                  </span>
                </p>
                <p
                  class=" font-medium
                "
                >
                  Phone:{" "}
                  <span class="ml-2 font-normal">
                    {loader.value.data?.account.phone || ""}
                  </span>
                </p>
                <p
                  class=" font-medium
                "
                >
                  Emergency Name:{" "}
                  <span class="ml-2 font-normal">
                    {loader.value.data?.account.userInfo.emergencyName || ""}
                  </span>
                </p>
                <p
                  class=" font-medium
                "
                >
                  Emergency Phone:{" "}
                  <span class="ml-2 font-normal">
                    {loader.value.data?.account.userInfo.emergencyPhone || ""}
                  </span>
                </p>
              </div>
              {/* from request */}
              <div class="flex-1 items-center space-y-4 rounded-3xl bg-white px-4 py-3 text-sm">
                <div class="flex items-center">
                  <div class="font-medium">Doctor: </div>
                  <div class="ml-4 inline-block">
                    <img
                      src={
                        import.meta.env.PUBLIC_IMAGE_URL +
                        "/" +
                        loader.value.data?.doctor.image
                      }
                      alt={loader.value.data?.doctor.name}
                      class="size-6 rounded-full"
                      width={0}
                      height={0}
                    />
                  </div>
                  <div class="ml-2 font-normal">
                    {loader.value.data?.doctor.name}
                  </div>
                </div>
                <p
                  class="font-medium
                "
                >
                  Date of Appointment:{" "}
                  <span class="ml-2 font-normal">
                    {loader.value.data?.dateTime}
                  </span>
                </p>
                <p class="font-medium ">Reason of Appointment</p>
                <textarea
                  class="block h-20 w-full rounded-lg px-4 py-3 text-sm"
                  readOnly
                  value={loader.value.data?.reasonOfAppointment || ""}
                />
                <p>Additional comment\notes</p>
                <textarea
                  class="block h-20 w-full rounded-lg px-4 py-3 text-sm"
                  readOnly
                  value={loader.value.data?.comment || ""}
                />
              </div>
            </div>
          </div>
          <div class="flex items-center justify-center gap-5">
            <div class="flex-none items-center">
              <button
                class="h-8 w-24 rounded-full bg-emerald-400 text-base font-medium text-white hover:bg-teal-500 "
                onClick$={() => {
                  isOpen.value = true;
                }}
              >
                Schedule
              </button>
            </div>
            <div class="flex-none items-center">
              <button
                class="h-8 w-24 rounded-full bg-red-600 text-base font-medium text-white hover:bg-red-700"
                onClick$={() => {
                  isOpen.value = true;
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
