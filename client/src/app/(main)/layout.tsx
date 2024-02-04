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
    <Tabs defaultValue="home" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="home">Home</TabsTrigger>
        <TabsTrigger value="pending">Pending</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>
      <TabsContent value="home">{home}</TabsContent>
      <TabsContent value="pending">{pending}</TabsContent>
      <TabsContent value="completed">{completed}</TabsContent>
    </Tabs>
  );
}
