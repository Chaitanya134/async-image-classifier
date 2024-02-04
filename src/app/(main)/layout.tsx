import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type MainLayoutProps = {
  home: React.ReactNode;
  pending: React.ReactNode;
  completed: React.ReactNode;
};

export default function MainLayout({
  home,
  pending,
  completed,
}: MainLayoutProps) {
  return (
    <main className="h-screen p-4">
      <Tabs defaultValue="home" className="h-full">
        <TabsList className="w-full">
          <TabsTrigger className="grow" value="home">
            Home
          </TabsTrigger>
          <TabsTrigger className="grow" value="pending">
            Pending
          </TabsTrigger>
          <TabsTrigger className="grow" value="completed">
            Completed
          </TabsTrigger>
        </TabsList>
        <TabsContent value="home" className="h-[calc(100%-2.25rem-0.5rem)]">
          {home}
        </TabsContent>
        <TabsContent value="pending" className="h-[calc(100%-2.25rem-0.5rem)]">
          {pending}
        </TabsContent>
        <TabsContent
          value="completed"
          className="h-[calc(100%-2.25rem-0.5rem)]"
        >
          {completed}
        </TabsContent>
      </Tabs>
    </main>
  );
}
