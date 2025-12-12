import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Snowfall } from "@/components/Snowfall";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Gift,
  ArrowLeft,
  ArrowRight,
  Calendar,
  DollarSign,
  Plus,
  Trash2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BudgetTier {
  id: string;
  name: string;
  minBudget: number;
}

const CreateEvent = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  // Form state
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [description, setDescription] = useState("");
  const [baseBudget, setBaseBudget] = useState(500);
  const [budgetTiers, setBudgetTiers] = useState<BudgetTier[]>([
    { id: "1", name: "Standard", minBudget: 500 },
    { id: "2", name: "Premium", minBudget: 1500 },
    { id: "3", name: "Deluxe", minBudget: 2500 },
  ]);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        toast.error("Please sign in to create an event");
        navigate("/auth");
        return;
      }
      setUserId(session.user.id);
    };
    checkAuth();
  }, [navigate]);

  const generateEventCode = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const addBudgetTier = () => {
    const newTier: BudgetTier = {
      id: Date.now().toString(),
      name: `Tier ${budgetTiers.length + 1}`,
      minBudget: (budgetTiers[budgetTiers.length - 1]?.minBudget || 500) + 500,
    };
    setBudgetTiers([...budgetTiers, newTier]);
  };

  const removeBudgetTier = (id: string) => {
    if (budgetTiers.length <= 1) {
      toast.error("You need at least one budget tier");
      return;
    }
    setBudgetTiers(budgetTiers.filter((tier) => tier.id !== id));
  };

  const updateBudgetTier = (
    id: string,
    field: keyof BudgetTier,
    value: string | number
  ) => {
    setBudgetTiers(
      budgetTiers.map((tier) =>
        tier.id === id ? { ...tier, [field]: value } : tier
      )
    );
  };

  const handleCreateEvent = async () => {
    if (!eventName.trim()) {
      toast.error("Please enter an event name");
      return;
    }
    if (!eventDate) {
      toast.error("Please select an event date");
      return;
    }
    if (!userId) {
      toast.error("Please sign in to create an event");
      navigate("/auth");
      return;
    }

    setIsLoading(true);

    try {
      const eventCode = generateEventCode();
      
      // For now, show success and navigate
      toast.success(`Event created! Code: ${eventCode}`);
      navigate(`/admin/${eventCode}`);
    } catch (error: any) {
      toast.error("Failed to create event: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <Label htmlFor="eventName">Event Name</Label>
        <Input
          id="eventName"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Office Holiday Party 2024"
          className="h-12"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="eventDate">Event Date</Label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            id="eventDate"
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="pl-11 h-12"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description (Optional)</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add any special notes or instructions..."
          rows={4}
        />
      </div>

      <Button
        onClick={() => setStep(2)}
        variant="festive"
        size="lg"
        className="w-full"
      >
        Continue
        <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <Label htmlFor="baseBudget">Base Minimum Budget (₹)</Label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            id="baseBudget"
            type="number"
            value={baseBudget}
            onChange={(e) => setBaseBudget(Number(e.target.value))}
            className="pl-11 h-12"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Budget Tiers</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addBudgetTier}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Tier
          </Button>
        </div>

        <div className="space-y-3">
          {budgetTiers.map((tier, index) => (
            <Card key={tier.id} className="bg-muted/30">
              <CardContent className="p-4">
                <div className="flex gap-3 items-start">
                  <div className="flex-1 space-y-3">
                    <Input
                      value={tier.name}
                      onChange={(e) =>
                        updateBudgetTier(tier.id, "name", e.target.value)
                      }
                      placeholder="Tier name"
                      className="h-10"
                    />
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        ₹
                      </span>
                      <Input
                        type="number"
                        value={tier.minBudget}
                        onChange={(e) =>
                          updateBudgetTier(
                            tier.id,
                            "minBudget",
                            Number(e.target.value)
                          )
                        }
                        className="pl-8 h-10"
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeBudgetTier(tier.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={() => setStep(1)}
          variant="outline"
          size="lg"
          className="flex-1"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>
        <Button
          onClick={handleCreateEvent}
          variant="hero"
          size="lg"
          className="flex-1"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="animate-pulse">Creating...</span>
          ) : (
            <>
              Create Event
              <Gift className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Snowfall />

      <div className="relative z-10 max-w-xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
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
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-festive flex items-center justify-center">
                <Gift className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="font-display text-2xl">
                Create Your Event
              </CardTitle>
              <p className="text-muted-foreground">
                Step {step} of 2 - {step === 1 ? "Basic Details" : "Budget Setup"}
              </p>
            </CardHeader>
            <CardContent className="pt-2">
              {/* Progress bar */}
              <div className="mb-8">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-festive"
                    initial={{ width: "0%" }}
                    animate={{ width: step === 1 ? "50%" : "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {step === 1 ? renderStep1() : renderStep2()}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateEvent;
