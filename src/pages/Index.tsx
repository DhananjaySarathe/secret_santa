import { motion } from "framer-motion";
import { Snowfall } from "@/components/Snowfall";
import { FloatingOrnaments } from "@/components/FloatingOrnaments";
import { EventCodeInput } from "@/components/EventCodeInput";
import { Button } from "@/components/ui/button";
import { Gift, Sparkles, Users, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: "Easy Participant Management",
      description: "Add participants manually, via CSV, or let them self-signup",
    },
    {
      icon: Gift,
      title: "Smart Matching",
      description: "Fair assignments with no self-matches or reciprocal pairs",
    },
    {
      icon: Sparkles,
      title: "Budget Tiers",
      description: "Create custom budget categories for different groups",
    },
    {
      icon: Mail,
      title: "Email Notifications",
      description: "Automatic emails with assignments and wishlists",
    },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Snowfall />
      <FloatingOrnaments />

      {/* Hero Section */}
      <section className="relative z-10 pt-12 pb-16 md:pt-20 md:pb-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-cranberry/10 text-cranberry px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            The magical gift exchange organizer
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="text-foreground">Secret</span>{" "}
            <span className="text-gradient-warm">Santa</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Create magical gift exchanges with smart matching, budget tiers, and
            automatic email notifications. Making holiday gifting joyful and
            stress-free.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button
              onClick={() => navigate("/create")}
              variant="hero"
              size="xl"
            >
              <Gift className="w-5 h-5" />
              Create Event
            </Button>
            <Button
              onClick={() => navigate("/auth")}
              variant="outline"
              size="xl"
            >
              Sign In
            </Button>
          </motion.div>

          {/* Event Code Input */}
          <EventCodeInput />
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-16 md:py-24 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Powerful features to make your Secret Santa event unforgettable
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-card border border-border/50 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-festive flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            Made with ❤️ for spreading holiday joy
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
