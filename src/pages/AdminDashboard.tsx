import { useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Snowfall } from "@/components/Snowfall";
import { toast } from "sonner";
import {
  Gift,
  ArrowLeft,
  Users,
  Shuffle,
  Mail,
  Download,
  Plus,
  Check,
  X,
  Trash2,
  Edit2,
  Copy,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Participant {
  id: string;
  name: string;
  email: string;
  wishlist: string[];
  budgetTier: string;
  status: "signed_up" | "pending";
  isWfh: boolean;
  assignedTo?: string;
}

const AdminDashboard = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [isShuffling, setIsShuffling] = useState(false);
  const [isSendingEmails, setIsSendingEmails] = useState(false);
  const [showAddParticipant, setShowAddParticipant] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newTier, setNewTier] = useState("");

  // Mock data
  const eventData = {
    name: "Office Holiday Party 2024",
    date: "December 25, 2024",
    code: code || "SANTA2024",
    baseBudget: 500,
  };

  const budgetTiers = [
    { id: "1", name: "Standard", minBudget: 500, count: 15 },
    { id: "2", name: "Premium", minBudget: 1500, count: 6 },
    { id: "3", name: "Deluxe", minBudget: 2500, count: 3 },
  ];

  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: "1",
      name: "Alice Smith",
      email: "alice@example.com",
      wishlist: ["Book", "Headphones", "Plant"],
      budgetTier: "Standard",
      status: "signed_up",
      isWfh: false,
    },
    {
      id: "2",
      name: "Bob Johnson",
      email: "bob@example.com",
      wishlist: ["Watch", "Wallet"],
      budgetTier: "Premium",
      status: "signed_up",
      isWfh: true,
    },
    {
      id: "3",
      name: "Carol Williams",
      email: "carol@example.com",
      wishlist: [],
      budgetTier: "Standard",
      status: "pending",
      isWfh: false,
    },
    {
      id: "4",
      name: "David Brown",
      email: "david@example.com",
      wishlist: ["Coffee Maker", "Books", "Art Supplies"],
      budgetTier: "Deluxe",
      status: "signed_up",
      isWfh: true,
    },
  ]);

  const [assignments, setAssignments] = useState<
    { santa: string; giftee: string }[]
  >([]);

  const signedUpCount = participants.filter((p) => p.status === "signed_up").length;
  const totalCount = participants.length;
  const progressPercentage = (signedUpCount / totalCount) * 100;

  const copyEventLink = () => {
    const link = `${window.location.origin}/join/${eventData.code}`;
    navigator.clipboard.writeText(link);
    toast.success("Event link copied to clipboard!");
  };

  const handleShuffle = async () => {
    if (signedUpCount < 3) {
      toast.error("You need at least 3 signed up participants to shuffle");
      return;
    }

    setIsShuffling(true);

    // Simulate shuffle algorithm
    setTimeout(() => {
      const signedUp = participants.filter((p) => p.status === "signed_up");
      const shuffled = [...signedUp].sort(() => Math.random() - 0.5);

      const newAssignments = signedUp.map((santa, index) => ({
        santa: santa.name,
        giftee: shuffled[(index + 1) % shuffled.length].name,
      }));

      setAssignments(newAssignments);
      setIsShuffling(false);
      toast.success("Secret Santa assignments created!");
    }, 2000);
  };

  const handleSendEmails = async () => {
    if (assignments.length === 0) {
      toast.error("Please shuffle first before sending emails");
      return;
    }

    setIsSendingEmails(true);

    // Simulate email sending
    setTimeout(() => {
      setIsSendingEmails(false);
      toast.success("Assignment emails sent to all participants!");
    }, 2000);
  };

  const handleAddParticipant = () => {
    if (!newName.trim() || !newEmail.trim()) {
      toast.error("Please fill in name and email");
      return;
    }

    const newParticipant: Participant = {
      id: Date.now().toString(),
      name: newName,
      email: newEmail,
      wishlist: [],
      budgetTier: newTier || "Standard",
      status: "pending",
      isWfh: false,
    };

    setParticipants([...participants, newParticipant]);
    setNewName("");
    setNewEmail("");
    setNewTier("");
    setShowAddParticipant(false);
    toast.success("Participant added!");
  };

  const handleRemoveParticipant = (id: string) => {
    setParticipants(participants.filter((p) => p.id !== id));
    toast.success("Participant removed");
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Snowfall />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">
                {eventData.name}
              </h1>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-muted-foreground">{eventData.date}</span>
                <Badge variant="outline" className="font-mono">
                  {eventData.code}
                </Badge>
                <Button variant="ghost" size="sm" onClick={copyEventLink}>
                  <Copy className="w-4 h-4 mr-1" />
                  Copy Link
                </Button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="festive"
                onClick={handleShuffle}
                disabled={isShuffling}
              >
                <Shuffle className="w-4 h-4 mr-2" />
                {isShuffling ? "Shuffling..." : "Shuffle Assignments"}
              </Button>
              <Button
                variant="gold"
                onClick={handleSendEmails}
                disabled={isSendingEmails || assignments.length === 0}
              >
                <Mail className="w-4 h-4 mr-2" />
                {isSendingEmails ? "Sending..." : "Send Emails"}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-4 gap-4 mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Participants</p>
                  <p className="text-2xl font-bold text-foreground">
                    {totalCount}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Check className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Wishlists</p>
                  <p className="text-2xl font-bold text-foreground">
                    {signedUpCount}/{totalCount}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-2">
                Wishlist Progress
              </p>
              <Progress value={progressPercentage} className="h-3" />
              <p className="text-sm text-muted-foreground mt-2">
                {signedUpCount} of {totalCount} participants submitted wishlists
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Participants Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-display">Participants</CardTitle>
                  <div className="flex gap-2">
                    <Dialog
                      open={showAddParticipant}
                      onOpenChange={setShowAddParticipant}
                    >
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Plus className="w-4 h-4 mr-1" />
                          Add
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Participant</DialogTitle>
                          <DialogDescription>
                            Manually add a participant to this event
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Name</Label>
                            <Input
                              value={newName}
                              onChange={(e) => setNewName(e.target.value)}
                              placeholder="John Doe"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Email</Label>
                            <Input
                              type="email"
                              value={newEmail}
                              onChange={(e) => setNewEmail(e.target.value)}
                              placeholder="john@example.com"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Budget Tier</Label>
                            <Select value={newTier} onValueChange={setNewTier}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select tier" />
                              </SelectTrigger>
                              <SelectContent>
                                {budgetTiers.map((tier) => (
                                  <SelectItem key={tier.id} value={tier.name}>
                                    {tier.name} (₹{tier.minBudget})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setShowAddParticipant(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="festive"
                            onClick={handleAddParticipant}
                          >
                            Add Participant
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      Export CSV
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Tier</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Wishlist</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {participants.map((participant) => (
                        <TableRow key={participant.id}>
                          <TableCell className="font-medium">
                            {participant.name}
                            {participant.isWfh && (
                              <Badge
                                variant="secondary"
                                className="ml-2 text-xs"
                              >
                                WFH
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {participant.email}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {participant.budgetTier}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {participant.status === "signed_up" ? (
                              <Badge className="bg-primary/20 text-primary">
                                <Check className="w-3 h-3 mr-1" />
                                Signed Up
                              </Badge>
                            ) : (
                              <Badge variant="secondary">
                                <X className="w-3 h-3 mr-1" />
                                Pending
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {participant.wishlist.length > 0 ? (
                              <span className="text-sm text-muted-foreground">
                                {participant.wishlist.length} items
                              </span>
                            ) : (
                              <span className="text-sm text-muted-foreground">
                                —
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                handleRemoveParticipant(participant.id)
                              }
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Budget Tiers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="font-display">Budget Tiers</CardTitle>
                  <CardDescription>
                    Participant distribution by tier
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {budgetTiers.map((tier) => (
                    <div
                      key={tier.id}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-foreground">
                          {tier.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          ₹{tier.minBudget.toLocaleString()} min
                        </p>
                      </div>
                      <Badge variant="secondary">{tier.count}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Assignments Preview */}
            {assignments.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="font-display">Assignments</CardTitle>
                    <CardDescription>
                      Secret Santa pairings (admin only)
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {assignments.map((assignment, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg"
                      >
                        <span className="font-medium text-foreground">
                          {assignment.santa}
                        </span>
                        <Gift className="w-4 h-4 text-cranberry" />
                        <span className="text-muted-foreground">
                          {assignment.giftee}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
