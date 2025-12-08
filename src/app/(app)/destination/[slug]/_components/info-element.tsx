import { Info } from "@/src/lib/mock-data/destinations";
import { Card, CardHeader, CardTitle } from "@/src/components/ui/card";

export function InfoElement({ data }: { data: Info }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
      </CardHeader>
    </Card>
  );
}
