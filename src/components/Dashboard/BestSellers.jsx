import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const sellers = [
  {
    name: "Robert",
    avatar: "/avatars/01.png",
    purchases: "27 Purchases",
    category: "Kitchen, Pets",
    amount: "$1,000",
    progress: 100,
  },
  {
    name: "Calvin",
    avatar: "/avatars/02.png",
    purchases: "68 Purchases",
    category: "Health, Grocery",
    amount: "$4,000",
    progress: 100,
  },
  {
    name: "Dwight",
    avatar: "/avatars/03.png",
    purchases: "15,890 Purchases",
    category: "Electronics",
    amount: "$2,700",
    progress: 100,
  },
  {
    name: "Cody",
    avatar: "/avatars/04.png",
    purchases: "15 Purchases",
    category: "Movies, Music",
    amount: "$2,100",
    progress: 100,
  },
  {
    name: "Bruce",
    avatar: "/avatars/05.png",
    purchases: "157 Purchases",
    category: "Sports, Fitness",
    amount: "$4,400",
    progress: 100,
  },
];

export function BestSellers() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Best Shop Sellers</CardTitle>
        <span className="text-sm text-muted-foreground hover:underline cursor-pointer">
          View all
        </span>
      </CardHeader>
      <CardContent className="space-y-6">
        {sellers.map((seller) => (
          <div key={seller.name} className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={seller.avatar} alt={seller.name} />
              <AvatarFallback>{seller.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="font-medium">{seller.name}</p>
                <span className="text-sm text-muted-foreground">
                  {seller.amount}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{seller.category}</span>
                <span>{seller.purchases}</span>
              </div>
              <Progress value={seller.progress} className="h-1" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
