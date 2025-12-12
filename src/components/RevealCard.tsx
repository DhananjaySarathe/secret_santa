import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RevealCardProps {
  assignedPerson: {
    name: string;
    wishlist: string[];
    budgetTier: string;
    minBudget: number;
  };
  onReveal?: () => void;
}

export const RevealCard = ({ assignedPerson, onReveal }: RevealCardProps) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    setIsRevealed(true);
    onReveal?.();
  };

  return (
    <div className="perspective-1000 w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {!isRevealed ? (
          <motion.div
            key="front"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, rotateY: 90 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-festive rounded-2xl p-8 shadow-card text-center"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary-foreground/10 flex items-center justify-center animate-pulse-glow">
              <Gift className="w-12 h-12 text-primary-foreground" />
            </div>
            
            <h3 className="font-display text-2xl font-bold text-primary-foreground mb-2">
              Your Secret Assignment
            </h3>
            <p className="text-primary-foreground/80 mb-8">
              Ready to discover who you'll be gifting?
            </p>

            <Button
              onClick={handleReveal}
              variant="gold"
              size="xl"
              className="w-full"
            >
              <Sparkles className="w-5 h-5" />
              Reveal My Person
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="back"
            initial={{ opacity: 0, rotateY: -90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-card rounded-2xl p-8 shadow-card border border-border"
          >
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-warm flex items-center justify-center"
              >
                <User className="w-10 h-10 text-primary-foreground" />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-sm text-muted-foreground mb-1">You're gifting to</p>
                <h2 className="font-display text-3xl font-bold text-foreground">
                  {assignedPerson.name}
                </h2>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-4"
            >
              <div className="bg-muted/50 rounded-xl p-4">
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Budget Tier: {assignedPerson.budgetTier}
                </p>
                <p className="text-lg font-semibold text-accent">
                  Minimum: ₹{assignedPerson.minBudget.toLocaleString()}
                </p>
              </div>

              <div className="bg-muted/50 rounded-xl p-4">
                <p className="text-sm font-medium text-muted-foreground mb-3">
                  Their Wishlist
                </p>
                <ul className="space-y-2">
                  {assignedPerson.wishlist.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="flex items-center gap-2 text-foreground"
                    >
                      <Gift className="w-4 h-4 text-cranberry" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
