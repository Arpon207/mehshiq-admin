import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const comments = [
  {
    name: "Kathryn Murphy",
    avatar: "/avatars/01.png",
    rating: 5,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec dolor vel est interdum",
  },
  {
    name: "Leslie Alexander",
    avatar: "/avatars/02.png",
    rating: 4,
    comment:
      "Cras nec viverra justo, a mattis lacus. Vestibulum efficitur, leo sit amet aliquam laoreet, turpis leo volutpat orci",
  },
  {
    name: "Devon Lane",
    avatar: "/avatars/03.png",
    rating: 5,
    comment:
      "Morbi eget commodo diam. Praesent dignissim purus ac turpis porta",
  },
];

export function Comments() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">New Comments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.name} className="flex items-start gap-4">
            <Avatar>
              <AvatarImage src={comment.avatar} alt={comment.name} />
              <AvatarFallback>{comment.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <p className="font-medium">{comment.name}</p>
                <div className="flex">
                  {Array.from({ length: comment.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{comment.comment}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
