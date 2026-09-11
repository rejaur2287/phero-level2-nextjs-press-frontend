import { Button } from "@/components/ui/button";
import { getMe } from "@/service/getMe";

export default async function HomePage() {


  return (
    <div>Hello, Next.js!
      <Button
        size={"xs"}
        variant={"destructive"}>Click Me!!!</Button>
    </div>
  );
}
