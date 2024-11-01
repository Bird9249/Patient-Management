/* eslint-disable qwik/no-use-visible-task */
import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { Link, useNavigate } from "@builder.io/qwik-city";
import { formAction$, useForm, valiForm$ } from "@modular-forms/qwik";
import { Button } from "~/components/button/Button";
import { TextInput } from "~/components/forms/text-input/TextInput";

export default component$(() => {
  return (
    <div>
      {/* whole sign in section*/}
      <div class="flex h-screen items-center justify-center overflow-hidden">
        <div class=" grid w-full grid-cols-2">
          {/* left section: sign in page */}

          <div class="container px-28 py-14 "></div>
          {/* right section: image */}
          <div class="grid-span-1">
            <img
              height={0}
              width={0}
              src={"/sign_up_page.jpg"}
              alt=""
              class="h-screen w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
});
