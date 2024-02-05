"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useRouter } from "next/navigation";

export default function MainLayout({ children }: React.PropsWithChildren) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <main className="h-screen p-4">
      <Tabs defaultValue={pathname.slice(1)} className="h-full">
        <TabsList className="w-full">
          <TabsTrigger
            className="grow"
            value="home"
            onClick={() => router.push("/home")}
          >
            Home
          </TabsTrigger>
          <TabsTrigger
            className="grow"
            value="pending"
            onClick={() => router.push("/pending")}
          >
            Pending
          </TabsTrigger>
          <TabsTrigger
            className="grow"
            value="completed"
            onClick={() => router.push("/completed")}
          >
            Completed
          </TabsTrigger>
        </TabsList>
        <TabsContent value="home" className="h-[calc(100%-2.25rem-0.5rem)]">
          {children}
        </TabsContent>
        <TabsContent value="pending" className="h-[calc(100%-2.25rem-0.5rem)]">
          {children}
        </TabsContent>
        <TabsContent
          value="completed"
          className="h-[calc(100%-2.25rem-0.5rem)]"
        >
          {children}
        </TabsContent>
      </Tabs>
    </main>
  );
}
