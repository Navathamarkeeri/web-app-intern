import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ApplicationStats() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['/api/applications/stats'],
    queryFn: async () => {
      const response = await fetch('/api/applications/stats?userId=default-user');
      if (!response.ok) throw new Error('Failed to fetch stats');
      return response.json();
    },
  });

  const statCards = [
    {
      title: "Total Applications",
      value: stats?.total || 0,
      color: "text-foreground",
      testId: "stat-total"
    },
    {
      title: "Interviews",
      value: stats?.interviews || 0,
      color: "text-green-600",
      testId: "stat-interviews"
    },
    {
      title: "Under Review",
      value: stats?.underReview || 0,
      color: "text-yellow-600",
      testId: "stat-under-review"
    },
    {
      title: "Response Rate",
      value: `${stats?.responseRate || 0}%`,
      color: "text-blue-600",
      testId: "stat-response-rate"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-testid="container-application-stats">
      {statCards.map((stat) => (
        <Card key={stat.title} className="text-center">
          <CardContent className="pt-6">
            {isLoading ? (
              <>
                <Skeleton className="h-8 w-16 mx-auto mb-2" />
                <Skeleton className="h-4 w-24 mx-auto" />
              </>
            ) : (
              <>
                <div className={`text-2xl font-bold mb-2 ${stat.color}`} data-testid={stat.testId}>
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm">{stat.title}</div>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
