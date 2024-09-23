
import { component$ } from "@builder.io/qwik";
import logo_image from "./image/logo_SnatBas.jpg";
import { TextInput } from "~/components/forms/text-input/TextInput";
import { Button } from "~/components/button/Button";
import { Input } from "postcss";

export default component$(() => {
  return <>
    {/* whole sign in section*/}
    <div class=" h-screen flex flex-row gap-5">

        {/* left section: sign in page */}
        <div class="">
          {/* logo tag */}
          <div class=" mb-10">
            <img class="w-20" src={logo_image} alt="" />
            <span class="text-xl">SnatBas Clinic</span>
          </div>

          {/* sign in section */}
          <div class="">
            <h1 class="text-2xl">Hi there, ...</h1>
            <p class="text-slate-500 mb-10">Get started with apppintment</p>
            <p>Full name</p>
            <TextInput value="" type="text" name="">insert this</TextInput>
            <Button>click me</Button>
          </div>
        </div>

        {/* right section: image */}
        <div class="">
          <div>hello</div>
        </div>

      </div>



 

  </>


});
