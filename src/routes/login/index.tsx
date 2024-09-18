import { component$ } from "@builder.io/qwik";
import { AdvancedSelect } from "~/components/forms/advanced-select/AdvancedSelect";

export default component$(() => {
  const options = [
    {
      label: "Option 1",
      value: "1",
      img: "https://api.dicebear.com/7.x/pixel-art/svg",
    },
    {
      label: "Option 2",
      value: "2",
      img: "https://api.dicebear.com/7.x/bottts/png",
    },
    {
      label: "Option 3",
      value: "3",
      img: "https://api.dicebear.com/7.x/lorelei/svg",
    },
  ];

  return (
    <>
      <AdvancedSelect
        name="tet"
        value={["1", "2"]}
        options={options}
        placeholder="Select an option"
        label="Select Label"
        onSelected$={(value) => {
          console.log(value);
        }}
        required
        multiple={true}
      />
    </>
  );
});
