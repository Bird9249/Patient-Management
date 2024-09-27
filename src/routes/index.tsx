import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <button>hi</button>
      <p>Hello</p>
    </>
  );
});

export const head: DocumentHead = {
  title: "",
  meta: [
    {
      name: "description",
      content: "",
    },
  ],
};
