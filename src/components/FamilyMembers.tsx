import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, User, Heart, Calendar, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FamilyMembers = () => {
  const [familyMembers, setFamilyMembers] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      relationship: "Self",
      age: 34,
      avatar: "",
      healthConditions: ["Diabetes", "Hypertension"],
      emergencyContact: "+1 (555) 123-4567",
      nextAppointment: "Cardiology - Dec 28",
      medicationCount: 3
    },
    {
      id: 2,
      name: "Michael Johnson",
      relationship: "Spouse",
      age: 36,
      avatar: "",
      healthConditions: ["Asthma"],
      emergencyContact: "+1 (555) 123-4567",
      nextAppointment: "General Checkup - Jan 5",
      medicationCount: 1
    },
    {
      id: 3,
      name: "Emma Johnson",
      relationship: "Daughter",
      age: 8,
      avatar: "",
      healthConditions: [],
      emergencyContact: "+1 (555) 987-6543",
      nextAppointment: "Pediatric Checkup - Jan 12",
      medicationCount: 0
    }
  ]);

  const [newMember, setNewMember] = useState({
    name: "",
    relationship: "",
    age: "",
    emergencyContact: ""
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddMember = () => {
    if (!newMember.name || !newMember.relationship || !newMember.age) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const member = {
      id: familyMembers.length + 1,
      name: newMember.name,
      relationship: newMember.relationship,
      age: parseInt(newMember.age),
      avatar: "",
      healthConditions: [],
      emergencyContact: newMember.emergencyContact,
      nextAppointment: "No appointments scheduled",
      medicationCount: 0
    };

    setFamilyMembers([...familyMembers, member]);
    setNewMember({ name: "", relationship: "", age: "", emergencyContact: "" });
    setIsDialogOpen(false);
    
    toast({
      title: "Success",
      description: `${newMember.name} has been added to your family.`
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRelationshipColor = (relationship: string) => {
    const colors: { [key: string]: string } = {
      'Self': 'bg-blue-100 text-blue-800',
      'Spouse': 'bg-pink-100 text-pink-800',
      'Parent': 'bg-green-100 text-green-800',
      'Child': 'bg-purple-100 text-purple-800',
      'Daughter': 'bg-purple-100 text-purple-800',
      'Son': 'bg-purple-100 text-purple-800',
      'Other': 'bg-gray-100 text-gray-800'
    };
    return colors[relationship] || colors['Other'];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Family Members</h2>
          <p className="text-gray-600">Manage your family's health profiles</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              data-action="add-family"
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Family Member
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Family Member</DialogTitle>
              <DialogDescription>
                Add a new family member to track their health information.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={newMember.name}
                  onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                  placeholder="Enter full name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="relationship">Relationship *</Label>
                <Select onValueChange={(value) => setNewMember({...newMember, relationship: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Self">Self</SelectItem>
                    <SelectItem value="Spouse">Spouse</SelectItem>
                    <SelectItem value="Parent">Parent</SelectItem>
                    <SelectItem value="Child">Child</SelectItem>
                    <SelectItem value="Daughter">Daughter</SelectItem>
                    <SelectItem value="Son">Son</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  value={newMember.age}
                  onChange={(e) => setNewMember({...newMember, age: e.target.value})}
                  placeholder="Enter age"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="emergency">Emergency Contact</Label>
                <Input
                  id="emergency"
                  value={newMember.emergencyContact}
                  onChange={(e) => setNewMember({...newMember, emergencyContact: e.target.value})}
                  placeholder="Phone number"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddMember}>Add Member</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {familyMembers.map((member) => (
          <Card key={member.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
                    {getInitials(member.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge className={getRelationshipColor(member.relationship)}>
                      {member.relationship}
                    </Badge>
                    <span className="text-sm text-gray-600">Age {member.age}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span className="text-sm font-medium">Medications</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{member.medicationCount}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium">Next Visit</span>
                  </div>
                  <p className="text-xs text-gray-600">{member.nextAppointment}</p>
                </div>
              </div>

              {member.healthConditions.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Health Conditions</p>
                  <div className="flex flex-wrap gap-1">
                    {member.healthConditions.map((condition, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {member.emergencyContact && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{member.emergencyContact}</span>
                </div>
              )}

              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <User className="w-4 h-4 mr-1" />
                  View Profile
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FamilyMembers;
