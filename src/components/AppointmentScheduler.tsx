import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Calendar, Clock, MapPin, Phone, User, Stethoscope } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AppointmentScheduler = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      title: "Cardiology Checkup",
      doctor: "Dr. Smith",
      date: "2024-01-15",
      time: "2:00 PM",
      person: "Sarah Johnson",
      location: "Heart Center, Room 201",
      phone: "+1 (555) 123-4567",
      type: "Cardiology",
      notes: "Regular checkup for hypertension management",
      status: "confirmed"
    },
    {
      id: 2,
      title: "General Physical",
      doctor: "Dr. Johnson",
      date: "2024-01-22",
      time: "10:00 AM",
      person: "Michael Johnson",
      location: "Family Medicine, Room 105",
      phone: "+1 (555) 234-5678",
      type: "General",
      notes: "Annual physical examination",
      status: "pending"
    },
    {
      id: 3,
      title: "Pediatric Checkup",
      doctor: "Dr. Williams",
      date: "2024-01-28",
      time: "3:30 PM",
      person: "Emma Johnson",
      location: "Pediatric Clinic, Room 302",
      phone: "+1 (555) 345-6789",
      type: "Pediatric",
      notes: "Routine checkup and vaccination updates",
      status: "confirmed"
    }
  ]);

  const [newAppointment, setNewAppointment] = useState({
    title: "",
    doctor: "",
    date: "",
    time: "",
    person: "",
    location: "",
    phone: "",
    type: "",
    notes: ""
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddAppointment = () => {
    if (!newAppointment.title || !newAppointment.doctor || !newAppointment.date || !newAppointment.person) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const appointment = {
      id: appointments.length + 1,
      title: newAppointment.title,
      doctor: newAppointment.doctor,
      date: newAppointment.date,
      time: newAppointment.time || "9:00 AM",
      person: newAppointment.person,
      location: newAppointment.location || "TBD",
      phone: newAppointment.phone || "TBD",
      type: newAppointment.type || "General",
      notes: newAppointment.notes || "",
      status: "pending"
    };

    setAppointments([...appointments, appointment]);
    setNewAppointment({ title: "", doctor: "", date: "", time: "", person: "", location: "", phone: "", type: "", notes: "" });
    setIsDialogOpen(false);
    
    toast({
      title: "Success",
      description: `Appointment scheduled for ${newAppointment.person}.`
    });
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'confirmed': 'bg-green-100 text-green-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'Cardiology': 'bg-red-100 text-red-800',
      'General': 'bg-blue-100 text-blue-800',
      'Pediatric': 'bg-purple-100 text-purple-800',
      'Dermatology': 'bg-orange-100 text-orange-800',
      'Orthopedic': 'bg-green-100 text-green-800'
    };
    return colors[type as keyof typeof colors] || colors.General;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const familyMembers = ["Sarah Johnson", "Michael Johnson", "Emma Johnson"];
  const appointmentTypes = ["General", "Cardiology", "Pediatric", "Dermatology", "Orthopedic", "Ophthalmology"];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Appointment Scheduler</h2>
          <p className="text-gray-600">Manage family medical appointments</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              data-action="add-appointment"
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Schedule Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Schedule New Appointment</DialogTitle>
              <DialogDescription>
                Add a new medical appointment for a family member.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Appointment Title *</Label>
                  <Input
                    id="title"
                    value={newAppointment.title}
                    onChange={(e) => setNewAppointment({...newAppointment, title: e.target.value})}
                    placeholder="e.g., Annual Checkup"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="doctor">Doctor *</Label>
                  <Input
                    id="doctor"
                    value={newAppointment.doctor}
                    onChange={(e) => setNewAppointment({...newAppointment, doctor: e.target.value})}
                    placeholder="e.g., Dr. Smith"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="person">Family Member *</Label>
                <Select onValueChange={(value) => setNewAppointment({...newAppointment, person: value})}>
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
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newAppointment.date}
                    onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newAppointment.time}
                    onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Appointment Type</Label>
                <Select onValueChange={(value) => setNewAppointment({...newAppointment, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {appointmentTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newAppointment.location}
                  onChange={(e) => setNewAppointment({...newAppointment, location: e.target.value})}
                  placeholder="e.g., Main Hospital, Room 201"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newAppointment.phone}
                  onChange={(e) => setNewAppointment({...newAppointment, phone: e.target.value})}
                  placeholder="e.g., +1 (555) 123-4567"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={newAppointment.notes}
                  onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                  placeholder="Additional notes or preparation instructions"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddAppointment}>Schedule Appointment</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-800">Total Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{appointments.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-green-800">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">2</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-yellow-800">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-900">
              {appointments.filter(apt => apt.status === 'pending').length}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-purple-800">Next Appointment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold text-purple-900">Jan 15</div>
          </CardContent>
        </Card>
      </div>

      {/* Appointments List */}
      <div className="grid gap-6">
        {appointments.map((appointment) => (
          <Card key={appointment.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="flex items-center space-x-3">
                    <Stethoscope className="w-5 h-5 text-blue-600" />
                    <span>{appointment.title}</span>
                  </CardTitle>
                  <CardDescription className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{appointment.person}</span>
                    </span>
                    <span>with {appointment.doctor}</span>
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Badge className={getTypeColor(appointment.type)}>
                    {appointment.type}
                  </Badge>
                  <Badge className={getStatusColor(appointment.status)}>
                    {appointment.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="font-medium">{formatDate(appointment.date)}</p>
                      <p className="text-sm text-gray-600 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {appointment.time}
                      </p>
                    </div>
                  </div>
                  {appointment.location && (
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{appointment.location}</span>
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  {appointment.phone && (
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{appointment.phone}</span>
                    </div>
                  )}
                  {appointment.notes && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-700">Notes:</p>
                      <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                        {appointment.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-2 border-t">
                <Button variant="outline" size="sm">
                  Reschedule
                </Button>
                <Button variant="outline" size="sm">
                  Cancel
                </Button>
                <Button size="sm">
                  Confirm
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AppointmentScheduler;
