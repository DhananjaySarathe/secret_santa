import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Snowfall } from "@/components/Snowfall";
import { CountdownTimer } from "@/components/CountdownTimer";
import { RevealCard } from "@/components/RevealCard";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Gift,
  LogOut,
  Plus,
  Calendar,
  CheckCircle2,
  Clock,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for demonstration
  const hasAssignment = true;
  const assignedPerson = {
    name: "Alex Johnson",
    wishlist: ["Wireless Headphones", "Coffee Table Book", "Scented Candles"],
    budgetTier: "Premium",
    minBudget: 1500,
  };

  const userEvents = [
    {
      id: "1",
      name: "Office Holiday Party 2024",
      code: "SANTA2024",
      date: new Date("2024-12-25"),
      status: "active",
      participantCount: 24,
      wishlistSubmitted: true,
    },
    {
      id: "2",
      name: "Family Gift Exchange",
      code: "FAM2024",
      date: new Date("2024-12-24"),
      status: "pending",
      participantCount: 8,
      wishlistSubmitted: false,
    },
  ];

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (!session?.user) {
          navigate("/auth");
        }
        setIsLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Snowfall />

      {/* Header */}
      <header className="relative z-10 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-festive flex items-center justify-center">
              <Gift className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-lg font-semibold text-foreground">
                Secret Santa
              </h1>
              <p className="text-sm text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="festive"
              onClick={() => navigate("/create")}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Button>
            <Button variant="ghost" onClick={handleSignOut}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="font-display text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.user_metadata?.full_name || "Santa"}!
          </h2>
          <p className="text-muted-foreground">
            Here's what's happening with your Secret Santa events
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Events */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                Your Events
              </h3>
              <div className="space-y-4">
                {userEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="font-display text-lg font-semibold text-foreground">
                              {event.name}
                            </h4>
                            <p className="text-sm text-muted-foreground font-mono">
                              Code: {event.code}
                            </p>
                          </div>
                          <Badge
                            variant={
                              event.status === "active" ? "default" : "secondary"
                            }
                          >
                            {event.status === "active" ? (
                              <>
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Active
                              </>
                            ) : (
                              <>
                                <Clock className="w-3 h-3 mr-1" />
                                Pending
                              </>
                            )}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {event.date.toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {event.participantCount} participants
                          </div>
                        </div>

                        {!event.wishlistSubmitted && (
                          <div className="mt-4 p-3 bg-accent/20 rounded-lg">
                            <p className="text-sm text-accent-foreground font-medium">
                              You haven't submitted your wishlist yet!
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Assignment & Countdown */}
          <div className="space-y-6">
            {/* Countdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="font-display text-lg">
                    Next Event
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Office Holiday Party 2024
                  </p>
                  <CountdownTimer targetDate={new Date("2024-12-25")} />
                </CardContent>
              </Card>
            </motion.div>

            {/* Assignment Reveal */}
            {hasAssignment && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <RevealCard assignedPerson={assignedPerson} />
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
