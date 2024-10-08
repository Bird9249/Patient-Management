import { component$ } from "@builder.io/qwik";
import background_of_history from "/backgroud_of_history.png";

export default component$(() => {
  return (
    <>
      <img
        class="fixed -z-10 h-screen w-screen object-cover"
        src={background_of_history}
        alt="bg-history"
        width={0}
        height={0}
      />
    </>
  );
});
