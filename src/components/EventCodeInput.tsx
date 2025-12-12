import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Gift, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const EventCodeInput = () => {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleJoinEvent = async () => {
    if (!code.trim()) {
      toast.error("Please enter an event code");
      return;
    }
    
    setIsLoading(true);
    // For now, navigate to the join page with the code
    setTimeout(() => {
      navigate(`/join/${code.toUpperCase()}`);
      setIsLoading(false);
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-card/80 backdrop-blur-md rounded-2xl p-8 shadow-card border border-border/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-festive flex items-center justify-center">
            <Gift className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-foreground">
              Join an Event
            </h3>
            <p className="text-sm text-muted-foreground">
              Enter your event code below
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="SANTA-2024"
              className="h-14 text-center text-xl font-mono tracking-widest uppercase bg-background/50 border-2 border-border focus:border-primary transition-colors"
              maxLength={12}
            />
          </div>

          <Button
            onClick={handleJoinEvent}
            disabled={isLoading}
            variant="hero"
            size="xl"
            className="w-full"
          >
            {isLoading ? (
              <span className="animate-pulse">Joining...</span>
            ) : (
              <>
                Join Event
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </Button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have a code?{" "}
            <button
              onClick={() => navigate("/create")}
              className="text-primary font-medium hover:underline"
            >
              Create your own event
            </button>
          </p>
        </div>
      </div>
    </motion.div>
  );
};
