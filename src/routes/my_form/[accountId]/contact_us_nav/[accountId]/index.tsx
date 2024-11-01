/* eslint-disable qwik/no-use-visible-task */
import { component$ } from "@builder.io/qwik";
import { Form, Link, useLocation } from "@builder.io/qwik-city";

export default component$(() => {
  const { params } = useLocation();
  return (
    <Form>
      {/* whole sign in section*/}
      <div class="flex h-screen items-center justify-center overflow-hidden">
        <div class=" grid w-full grid-cols-2">
          {/* left section: sign in page */}

          <div class="container px-28 py-14 ">
            <div class="grid-span-1 w-full ">
              {/* logo tag */}
              <div class="flex flex-col">
                <img width={84} height={54} src={"/logo_project.png"} alt="" />
                <span class="ml-1 text-sm font-semibold">SnatBas Clinic</span>
              </div>

              {/* back button */}
              <div>
                <Link
                  class=" mt-5 inline-flex items-center gap-x-1 text-lg text-gray-800 hover:cursor-pointer hover:text-primary-600 focus:text-primary-600"
                  href={`/my_form/${params.accountId}`}
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
              </div>

              {/* sign in section */}
              <div class="p-5">
                <h1 class="text-2xl">Give us take care your.</h1>
                {/* 4 boxs */}
                <div class="mt-10 grid grid-cols-2 grid-rows-2 gap-x-10 gap-y-10">
                  <div class="space-y-3 rounded-xl border border-gray-300 bg-gray-50 p-5">
                    <svg
                      class="size-10"
                      width="30"
                      height="29"
                      viewBox="0 0 30 29"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        y="0.565186"
                        width="30"
                        height="28"
                        rx="10"
                        fill="#7EE7FF"
                      />
                      <path
                        d="M12.8339 6.06519C8.83474 6.06519 5.5 8.7223 5.5 12.088C5.5 13.8098 6.47541 15.3105 7.86079 16.406C7.77062 16.9878 7.52576 17.5372 7.15013 18.0003C6.99678 18.1903 6.8363 18.3749 6.66903 18.5536C6.58251 18.6417 6.50559 18.7381 6.43948 18.8413C6.39767 18.9072 6.3324 18.9809 6.30233 19.1297C6.27226 19.2785 6.31333 19.5215 6.43948 19.7051L6.53115 19.8602L6.7145 19.9488C7.35622 20.2584 8.04927 20.2039 8.68586 20.0374C9.32171 19.8702 9.93336 19.5839 10.5193 19.2842C11.1053 18.9845 11.6612 18.672 12.1005 18.4431C12.1621 18.4112 12.2017 18.4034 12.2611 18.3765C13.4177 19.9127 15.5357 20.945 17.8987 20.945C17.9215 20.9479 17.9427 20.945 17.9677 20.945C18.9211 20.945 22.0013 23.9876 23.8348 22.7831C23.9082 22.5003 22.2228 21.7911 22.1385 19.6831C23.5737 18.7031 24.5 17.2456 24.5 15.6308C24.5 13.2415 22.5374 11.2675 19.9163 10.5603C19.0868 7.9528 16.2031 6.06519 12.8339 6.06519ZM12.8339 7.48232C16.1687 7.48232 18.7011 9.64344 18.7011 12.088C18.7011 14.5325 16.1687 16.6937 12.8339 16.6937C12.2384 16.6937 11.8966 16.9289 11.4126 17.1812C10.9286 17.4334 10.3734 17.7452 9.83142 18.0222C9.36205 18.2617 8.91468 18.4459 8.50251 18.5756C8.90367 18.0158 9.32244 17.2796 9.39578 16.2508L9.41925 15.8519L9.07529 15.6088C7.76838 14.7238 6.96679 13.4506 6.96679 12.088C6.96679 9.64344 9.49919 7.48232 12.8339 7.48232Z"
                        fill="black"
                      />
                    </svg>
                    <h1 class="text-lg ">Chat to Support</h1>
                    <p class="text-sm text-gray-500">We're here to helps</p>
                    <a
                      class="block truncate text-sm text-cyan-500 underline"
                      href="mailto: supportSnatbas@clinic.com"
                    >
                      supportSnatbas@clinic.com
                    </a>
                  </div>
                  <div class=" space-y-3 rounded-xl border border-gray-300 bg-gray-50 p-5">
                    <svg
                      class="size-10"
                      width="29"
                      height="29"
                      viewBox="0 0 29 29"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        y="0.565186"
                        width="29"
                        height="28"
                        rx="10"
                        fill="#9AFD99"
                      />
                      <path
                        d="M20.9746 18.7136C20.4473 18.1511 19.1703 17.3302 18.5507 16.9994C17.7439 16.569 17.6775 16.5339 17.0433 17.0328C16.6203 17.3657 16.3391 17.6631 15.844 17.5513C15.349 17.4395 14.2732 16.8092 13.3312 15.8149C12.3892 14.8207 11.7594 13.6486 11.6534 13.1262C11.5475 12.6038 11.8331 12.3095 12.1445 11.8606C12.5835 11.2278 12.5503 11.1223 12.1751 10.268C11.8825 9.60354 11.0847 8.26409 10.5514 7.70862C9.981 7.11202 9.981 7.21748 9.61344 7.3792C9.31419 7.51248 9.02711 7.67453 8.75581 7.8633C8.22456 8.23702 7.92971 8.54745 7.72352 9.01397C7.51733 9.48049 7.42469 10.5742 8.48952 12.6224C9.55434 14.6706 10.3014 15.7179 11.8477 17.3506C13.3939 18.9832 14.583 19.8611 16.3211 20.8933C18.4714 22.1684 19.2961 21.9198 19.7381 21.7019C20.18 21.4839 20.4745 21.1745 20.8281 20.612C21.0069 20.3252 21.1603 20.0216 21.2863 19.705C21.4394 19.3172 21.539 19.3172 20.9746 18.7136Z"
                        stroke="black"
                        stroke-miterlimit="10"
                      />
                    </svg>

                    <h1 class="my-3 text-lg ">Call Us</h1>
                    <p class="text-sm text-gray-500">Mon-Sat 7am to 5pm</p>
                    <a
                      class="block truncate text-sm text-cyan-500 underline"
                      href="#"
                    >
                      (+856) 20 965 523 45
                    </a>
                  </div>
                  <div class="space-y-3 rounded-xl border border-gray-300 bg-gray-50 p-5">
                    <svg
                      class="size-10"
                      width="28"
                      height="29"
                      viewBox="0 0 28 29"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        y="0.565186"
                        width="28"
                        height="28"
                        rx="10"
                        fill="url(#paint0_linear_725_1439)"
                      />
                      <path
                        d="M14 16.0652C15.6545 16.0652 17 14.7197 17 13.0652C17 11.4107 15.6545 10.0652 14 10.0652C12.3455 10.0652 11 11.4107 11 13.0652C11 14.7197 12.3455 16.0652 14 16.0652ZM14 11.5652C14.8273 11.5652 15.5 12.2379 15.5 13.0652C15.5 13.8924 14.8273 14.5652 14 14.5652C13.1727 14.5652 12.5 13.8924 12.5 13.0652C12.5 12.2379 13.1727 11.5652 14 11.5652Z"
                        fill="white"
                      />
                      <path
                        d="M13.5649 21.9257C13.692 22.0161 13.844 22.0647 13.9999 22.0647C14.1559 22.0647 14.3079 22.0161 14.4349 21.9257C14.6629 21.7644 20.0217 17.8952 19.9999 13.0652C19.9999 9.75694 17.3082 7.06519 13.9999 7.06519C10.6917 7.06519 7.99994 9.75694 7.99994 13.0614C7.97819 17.8952 13.3369 21.7644 13.5649 21.9257ZM13.9999 8.56519C16.4817 8.56519 18.4999 10.5834 18.4999 13.0689C18.5157 16.3974 15.2089 19.3862 13.9999 20.3664C12.7917 19.3854 9.48419 16.3959 9.49994 13.0652C9.49994 10.5834 11.5182 8.56519 13.9999 8.56519Z"
                        fill="white"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_725_1439"
                          x1="28"
                          y1="14.5652"
                          x2="0"
                          y2="14.5652"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#FF8668" />
                          <stop offset="1" stop-color="#9900FF" />
                        </linearGradient>
                      </defs>
                    </svg>

                    <h1 class="my-3 text-lg ">Visit Us</h1>
                    <p class="text-sm text-gray-500">
                      Visit our clinic Phontong village, Chanthabuly district
                    </p>
                    <a
                      class="block truncate text-sm text-cyan-500 underline"
                      href="https://www.google.com/maps/place/Houng+Ah+Loun+Technology/@18.0014849,102.6431831,2807m/data=!3m1!1e3!4m6!3m5!1s0x312469150d4b6549:0xc9474117b2457843!8m2!3d18.0017052!4d102.6440346!16s%2Fg%2F11sq4wp8cz?entry=ttu&g_ep=EgoyMDI0MTAyNy4wIKXMDSoASAFQAw%3D%3D"
                    >
                      View on Google Map
                    </a>
                  </div>
                  <div class="space-y-3 rounded-xl border border-gray-300 bg-gray-50 p-5">
                    <svg
                      class="size-10"
                      width="30"
                      height="31"
                      viewBox="0 0 30 31"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        y="0.565186"
                        width="30"
                        height="30"
                        rx="10"
                        fill="#FF6868"
                      />
                      <path
                        d="M9.16671 22.2319V20.5652H10.5L12.1459 15.086C12.257 14.7249 12.462 14.4369 12.7609 14.2219C13.0598 14.0069 13.3895 13.8991 13.75 13.8985H16.25C16.6112 13.8985 16.9412 14.0063 17.24 14.2219C17.5389 14.4374 17.7437 14.7255 17.8542 15.086L19.5 20.5652H20.8334V22.2319H9.16671ZM12.25 20.5652H17.75L16.25 15.5652H13.75L12.25 20.5652ZM14.1667 12.2319V8.06519H15.8334V12.2319H14.1667ZM19.125 14.2944L17.9375 13.1069L20.8959 10.1694L22.0625 11.336L19.125 14.2944ZM20 18.0652V16.3985H24.1667V18.0652H20ZM10.875 14.2944L7.93754 11.336L9.10421 10.1694L12.0625 13.1069L10.875 14.2944ZM5.83337 18.0652V16.3985H10V18.0652H5.83337Z"
                        fill="white"
                      />
                    </svg>

                    <h1 class="my-3 text-lg ">Ambulance Phone</h1>
                    <p class="text-sm text-gray-500">
                      In case of emergency, you can call an ambulance
                    </p>
                    <a
                      class="block truncate text-sm text-cyan-500 underline"
                      href="#"
                    >
                      1624
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* right section: image */}
          <div class="grid-span-1">
            <img
              height={832}
              width={691}
              src={"/sign_up_page.jpg"}
              alt=""
              class="h-screen w-full object-cover"
            />
          </div>
        </div>
      </div>
    </Form>
  );
});
