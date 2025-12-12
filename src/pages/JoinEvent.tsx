import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Snowfall } from "@/components/Snowfall";
import { toast } from "sonner";
import {
  Gift,
  ArrowLeft,
  User,
  Mail,
  MapPin,
  Sparkles,
  Check,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const JoinEvent = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [wishlist1, setWishlist1] = useState("");
  const [wishlist2, setWishlist2] = useState("");
  const [wishlist3, setWishlist3] = useState("");
  const [budgetTier, setBudgetTier] = useState("");
  const [isWfh, setIsWfh] = useState(false);

  // Mock event data (will be fetched from DB)
  const eventData = {
    name: "Office Holiday Party 2024",
    date: "December 25, 2024",
    budgetTiers: [
      { id: "1", name: "Standard", minBudget: 500 },
      { id: "2", name: "Premium", minBudget: 1500 },
      { id: "3", name: "Deluxe", minBudget: 2500 },
    ],
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      toast.error("Please fill in your name and email");
      return;
    }

    if (!wishlist1.trim()) {
      toast.error("Please add at least one wishlist item");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      toast.success("You've joined the Secret Santa event!");
    } catch (error: any) {
      toast.error("Failed to join event: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center px-4">
        <Snowfall />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-festive flex items-center justify-center"
          >
            <Check className="w-12 h-12 text-primary-foreground" />
          </motion.div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-3">
            You're In!
          </h1>
          <p className="text-muted-foreground mb-8 max-w-md">
            You've successfully joined <strong>{eventData.name}</strong>. We'll
            email you when the Secret Santa assignments are ready!
          </p>
          <Button onClick={() => navigate("/")} variant="festive" size="lg">
            <Gift className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Snowfall />

      <div className="relative z-10 max-w-xl mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-card/90 backdrop-blur-md border-border/50">
            <CardHeader className="text-center">
              <div className="inline-flex items-center gap-2 bg-accent/20 text-accent-foreground px-3 py-1 rounded-full text-sm font-medium mx-auto mb-4">
                <Sparkles className="w-4 h-4" />
                Event Code: {code}
              </div>
              <CardTitle className="font-display text-2xl">
                {eventData.name}
              </CardTitle>
              <p className="text-muted-foreground">{eventData.date}</p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="pl-11 h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="pl-11 h-12"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Your Wishlist (up to 3 items)</Label>
                  <div className="space-y-3">
                    <div className="relative">
                      <Gift className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                      <Input
                        value={wishlist1}
                        onChange={(e) => setWishlist1(e.target.value)}
                        placeholder="Wishlist item 1 (required)"
                        className="pl-11 h-12"
                      />
                    </div>
                    <div className="relative">
                      <Gift className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                      <Input
                        value={wishlist2}
                        onChange={(e) => setWishlist2(e.target.value)}
                        placeholder="Wishlist item 2 (optional)"
                        className="pl-11 h-12"
                      />
                    </div>
                    <div className="relative">
                      <Gift className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                      <Input
                        value={wishlist3}
                        onChange={(e) => setWishlist3(e.target.value)}
                        placeholder="Wishlist item 3 (optional)"
                        className="pl-11 h-12"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budgetTier">Preferred Budget Tier</Label>
                  <Select value={budgetTier} onValueChange={setBudgetTier}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select a tier" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventData.budgetTiers.map((tier) => (
                        <SelectItem key={tier.id} value={tier.id}>
                          {tier.name} (₹{tier.minBudget.toLocaleString()})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">
                        Working from Home?
                      </p>
                      <p className="text-sm text-muted-foreground">
                        This helps with gift delivery
                      </p>
                    </div>
                  </div>
                  <Switch checked={isWfh} onCheckedChange={setIsWfh} />
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="xl"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="animate-pulse">Joining...</span>
                  ) : (
                    <>
                      Join Secret Santa
                      <Sparkles className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default JoinEvent;
