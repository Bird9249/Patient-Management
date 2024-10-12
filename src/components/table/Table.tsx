/* eslint-disable qwik/valid-lexical-scope */
import type { JSXOutput, PropFunction, QRL, Signal } from "@builder.io/qwik";
import { Slot, component$, useStore } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import { LuChevronLeft, LuChevronRight, LuPlus } from "@qwikest/icons/lucide";
import { Button } from "~/components/button/Button";

export interface IColumn {
  label: string;
  key: string;
  content$?: QRL<(record: any) => JSXOutput>;
}

export interface TableState {
  offset: number;
  limit: number;
}

export interface TableProps {
  data: Readonly<Signal<any>>;
  emptyState: {
    icon?: JSXOutput;
    title: string;
    description?: string;
    link?: string;
  };
  columns: IColumn[];
  onStateChange$: PropFunction<(state: TableState) => Promise<void>>;
  isLoading?: boolean;
}

export const Table = component$<TableProps>(
  ({ data, emptyState, columns, onStateChange$, isLoading }) => {
    const nav = useNavigate();
    const {
      url: { searchParams },
    } = useLocation();

    console.log(data.value.data.length);

    const tableState = useStore<TableState>({
      offset: searchParams.get("offset")
        ? Number(searchParams.get("offset"))
        : 0,
      limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : 10,
    });

    return (
      <div class="-m-1.5 overflow-x-auto">
        <div class="inline-block min-w-full p-1.5 align-middle">
          <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <Slot name="header" />

            <div class="relative flex items-center justify-center sm:col-span-2 md:grow">
              {isLoading ? (
                <div class="absolute left-0 top-0 z-10 size-full bg-gray-400/30">
                  <div class="flex min-h-[300px] w-full flex-col items-center justify-center px-6 py-4">
                    <div class="flex flex-col items-center">
                      <span
                        class="inline-block size-8 animate-spin rounded-full border-[4px] border-current border-t-transparent text-gray-700"
                        role="status"
                        aria-label="loading"
                      ></span>

                      <p class="mt-2 text-gray-700">Loading...</p>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
              {data.value.data.length <= 0 ? (
                <div class="flex min-h-[300px] w-full flex-col items-center justify-center px-6 py-4">
                  <div>
                    {emptyState.icon ? (
                      <div class="flex size-[46px] items-center justify-center rounded-lg bg-gray-100">
                        {emptyState.icon}
                      </div>
                    ) : (
                      <> </>
                    )}

                    <h2 class="mt-5 font-semibold text-gray-800">
                      ບໍ່ພົບ{emptyState.title}
                    </h2>
                    <p class="mt-2 text-sm text-gray-600">
                      {emptyState.description}
                    </p>

                    {emptyState.link ? (
                      <div class="mt-5 grid gap-2 sm:flex">
                        <Button
                          size="small"
                          onClick$={() => {
                            nav(emptyState.link);
                          }}
                        >
                          <LuPlus class="size-4 flex-shrink-0" />
                          ເພີ່ມ{emptyState.title}ໃໝ່
                        </Button>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              ) : (
                <div class="flex min-h-[300px] w-full flex-col justify-between">
                  <table class="min-w-full divide-y divide-neutral-200">
                    <thead class="text-nowrap bg-gray-50">
                      <tr>
                        {columns.map((col, idx) => (
                          <th
                            scope="col"
                            class="px-6 py-3 text-start"
                            key={idx}
                          >
                            <div class="flex items-center justify-center gap-x-2">
                              <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                                {col.label}
                              </span>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody class="divide-y divide-gray-200 text-center">
                      {data.value.data.map((_: any, index: number) => (
                        <tr key={index} class="bg-white hover:bg-gray-50">
                          {columns.map((col, idx) => (
                            <td class="size-px" key={idx}>
                              {col.content$ ? (
                                col.content$(_)
                              ) : (
                                <span class="block px-6 py-2">
                                  <span class="text-sm text-gray-500 ">
                                    {_[col.key]}
                                  </span>
                                </span>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div class="grid gap-3 border-t border-gray-200 px-6 py-4 md:flex md:items-center md:justify-between">
                    <div class="max-w-sm space-y-3">
                      <select
                        onChange$={async (_, target) => {
                          tableState.limit = Number(target.value);
                          await onStateChange$(tableState);
                        }}
                        class="block w-full rounded-lg border-gray-200 px-3 py-2 pe-9 text-sm focus:border-primary-500 focus:ring-primary-500"
                      >
                        {[5, 10, 25, 50, 100].map((val, idx) => (
                          <option
                            key={idx}
                            value={val}
                            selected={val === tableState.limit}
                          >
                            {String(val)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <div class="inline-flex gap-x-2">
                        <Button
                          size="small"
                          variant="white"
                          type="button"
                          disabled={tableState.offset <= 0}
                          onClick$={async () => {
                            tableState.offset = Math.max(
                              tableState.offset - tableState.limit,
                              0,
                            );
                            await onStateChange$(tableState);
                          }}
                        >
                          <LuChevronLeft class="size-3" />
                          Prev
                        </Button>

                        <Button
                          size="small"
                          variant="white"
                          type="button"
                          disabled={
                            tableState.offset + tableState.limit >=
                            data.value.total
                          }
                          onClick$={async () => {
                            tableState.offset =
                              tableState.offset + tableState.limit;

                            await onStateChange$(tableState);
                          }}
                        >
                          Next
                          <LuChevronRight class="size-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
);
