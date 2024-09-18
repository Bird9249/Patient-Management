import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Button } from "~/components/router-head/button/Button";

export default component$(() => {
  return (
    <>
      <Button>Hi</Button>
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
