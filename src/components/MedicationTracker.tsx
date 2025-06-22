
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Pill, Clock, AlertCircle, CheckCircle, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MedicationTracker = () => {
  const [medications, setMedications] = useState([
    {
      id: 1,
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      time: "8:00 AM",
      person: "Sarah Johnson",
      taken: true,
      nextDue: "Tomorrow 8:00 AM",
      condition: "Hypertension"
    },
    {
      id: 2,
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      time: "8:00 AM, 8:00 PM",
      person: "Sarah Johnson",
      taken: false,
      nextDue: "Today 8:00 PM",
      condition: "Diabetes"
    },
    {
      id: 3,
      name: "Albuterol Inhaler",
      dosage: "2 puffs",
      frequency: "As needed",
      time: "When needed",
      person: "Michael Johnson",
      taken: false,
      nextDue: "As needed",
      condition: "Asthma"
    },
    {
      id: 4,
      name: "Children's Tylenol",
      dosage: "80mg",
      frequency: "As needed",
      time: "When needed",
      person: "Emma Johnson",
      taken: false,
      nextDue: "As needed",
      condition: "Pain/Fever"
    }
  ]);

  const [newMedication, setNewMedication] = useState({
    name: "",
    dosage: "",
    frequency: "",
    time: "",
    person: "",
    condition: ""
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddMedication = () => {
    if (!newMedication.name || !newMedication.dosage || !newMedication.person) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const medication = {
      id: medications.length + 1,
      name: newMedication.name,
      dosage: newMedication.dosage,
      frequency: newMedication.frequency || "Once daily",
      time: newMedication.time || "8:00 AM",
      person: newMedication.person,
      taken: false,
      nextDue: "Today " + (newMedication.time || "8:00 AM"),
      condition: newMedication.condition || "General"
    };

    setMedications([...medications, medication]);
    setNewMedication({ name: "", dosage: "", frequency: "", time: "", person: "", condition: "" });
    setIsDialogOpen(false);
    
    toast({
      title: "Success",
      description: `${newMedication.name} has been added to medication list.`
    });
  };

  const toggleMedicationTaken = (id: number) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, taken: !med.taken } : med
    ));
    
    const medication = medications.find(med => med.id === id);
    if (medication) {
      toast({
        title: medication.taken ? "Medication unmarked" : "Medication taken",
        description: `${medication.name} for ${medication.person}`
      });
    }
  };

  const getStatusColor = (taken: boolean, nextDue: string) => {
    if (taken) return "bg-green-100 text-green-800";
    if (nextDue.includes("Today")) return "bg-red-100 text-red-800";
    return "bg-yellow-100 text-yellow-800";
  };

  const getStatusIcon = (taken: boolean, nextDue: string) => {
    if (taken) return <CheckCircle className="w-4 h-4" />;
    if (nextDue.includes("Today")) return <AlertCircle className="w-4 h-4" />;
    return <Clock className="w-4 h-4" />;
  };

  const familyMembers = ["Sarah Johnson", "Michael Johnson", "Emma Johnson"];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Medication Tracker</h2>
          <p className="text-gray-600">Manage medications and track adherence</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Medication
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Medication</DialogTitle>
              <DialogDescription>
                Add a new medication to track for a family member.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="medName">Medication Name *</Label>
                <Input
                  id="medName"
                  value={newMedication.name}
                  onChange={(e) => setNewMedication({...newMedication, name: e.target.value})}
                  placeholder="e.g., Lisinopril"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dosage">Dosage *</Label>
                <Input
                  id="dosage"
                  value={newMedication.dosage}
                  onChange={(e) => setNewMedication({...newMedication, dosage: e.target.value})}
                  placeholder="e.g., 10mg"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="person">Family Member *</Label>
                <Select onValueChange={(value) => setNewMedication({...newMedication, person: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select family member" />
                  </SelectTrigger>
                  <SelectContent>
                    {familyMembers.map((member) => (
                      <SelectItem key={member} value={member}>{member}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="frequency">Frequency</Label>
                <Select onValueChange={(value) => setNewMedication({...newMedication, frequency: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Once daily">Once daily</SelectItem>
                    <SelectItem value="Twice daily">Twice daily</SelectItem>
                    <SelectItem value="Three times daily">Three times daily</SelectItem>
                    <SelectItem value="As needed">As needed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={newMedication.time}
                  onChange={(e) => setNewMedication({...newMedication, time: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="condition">Condition</Label>
                <Input
                  id="condition"
                  value={newMedication.condition}
                  onChange={(e) => setNewMedication({...newMedication, condition: e.target.value})}
                  placeholder="e.g., Hypertension"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddMedication}>Add Medication</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-800">Total Medications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{medications.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-green-800">Taken Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">
              {medications.filter(med => med.taken).length}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-50 to-red-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-red-800">Pending Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900">
              {medications.filter(med => !med.taken && med.nextDue.includes("Today")).length}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-purple-800">Adherence Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">85%</div>
          </CardContent>
        </Card>
      </div>

      {/* Medications List */}
      <div className="grid gap-4">
        {medications.map((medication) => (
          <Card key={medication.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Checkbox
                    checked={medication.taken}
                    onCheckedChange={() => toggleMedicationTaken(medication.id)}
                    className="w-5 h-5"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <Pill className="w-5 h-5 text-blue-600" />
                      <div>
                        <h3 className="font-semibold text-lg">{medication.name}</h3>
                        <p className="text-sm text-gray-600">{medication.dosage} • {medication.frequency}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{medication.person}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{medication.time}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {medication.condition}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={getStatusColor(medication.taken, medication.nextDue)}>
                    {getStatusIcon(medication.taken, medication.nextDue)}
                    <span className="ml-1">
                      {medication.taken ? "Taken" : medication.nextDue.includes("Today") ? "Due Now" : "Scheduled"}
                    </span>
                  </Badge>
                  <div className="text-right">
                    <p className="text-sm font-medium">Next Due</p>
                    <p className="text-xs text-gray-600">{medication.nextDue}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MedicationTracker;
