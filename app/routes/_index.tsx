import type { MetaFunction } from "@remix-run/node";
import { Card, CardHeader, CardDescription, CardTitle, CardContent, CardFooter } from "~/components/ui/card";
import { Toggle } from "~/components/ui/toggle"

export const meta: MetaFunction = () => {
  return [
    { title: "Meteo Remix App" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <div className="flex flex-row items-center gap-4">
          <Toggle pressed={false}>Vilnius</Toggle>
          <Toggle pressed={false}>Kaunas</Toggle>
          <Toggle pressed={false}>Klaipėda</Toggle>
          <Toggle pressed={false}>Šiauliai</Toggle>
          <Toggle pressed={false}>Panevėžys</Toggle>
        </div>

        <div className="grid w-full gap-6 sm:grid-cols-1 lg:max-w-[42rem] md:grid-cols-2 xl:max-w-[42rem]">
          <Card
            className="lg:max-w-md" x-chunk="charts-01-chunk-0"
          >
            <CardHeader className="space-y-0 pb-2">
              <CardDescription>Today</CardDescription>
              <CardTitle className="text-4xl tabular-nums">
                12,584{" "}
                <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                  steps
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
          <Card
            className="lg:max-w-md" x-chunk="charts-01-chunk-0"
          >
            <CardHeader className="space-y-0 pb-2">
              <CardDescription>Today</CardDescription>
              <CardTitle className="text-4xl tabular-nums">
                12,584{" "}
                <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                  steps
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </div>
        <div className="flex gap-4">
          Place Holder
        </div>

      </div>
    </div>
  );
}
