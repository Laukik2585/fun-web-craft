
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Calendar, Bell, Heart, Users, Activity, Shield, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FamilyMembers from "@/components/FamilyMembers";
import MedicationTracker from "@/components/MedicationTracker";
import AppointmentScheduler from "@/components/AppointmentScheduler";
import HealthDashboard from "@/components/HealthDashboard";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleQuickAction = (action: string) => {
    toast({
      title: "Feature activated",
      description: `${action} feature is ready to use!`,
    });
  };

  const handleBackToLanding = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleBackToLanding}
                className="mr-2"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">CareSync</h1>
                <p className="text-sm text-gray-600">Smart Family Health Scheduler</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Shield className="w-4 h-4 mr-2" />
                Emergency
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col space-y-2 hover:bg-blue-50"
              onClick={() => handleQuickAction("Add Medication")}
            >
              <Plus className="w-6 h-6" />
              <span>Add Medication</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col space-y-2 hover:bg-green-50"
              onClick={() => handleQuickAction("Schedule Appointment")}
            >
              <Calendar className="w-6 h-6" />
              <span>Schedule Appointment</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col space-y-2 hover:bg-purple-50"
              onClick={() => handleQuickAction("Add Family Member")}
            >
              <Users className="w-6 h-6" />
              <span>Add Family Member</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col space-y-2 hover:bg-orange-50"
              onClick={() => handleQuickAction("Log Health Data")}
            >
              <Activity className="w-6 h-6" />
              <span>Log Health Data</span>
            </Button>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="family">Family</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <HealthDashboard />
          </TabsContent>

          <TabsContent value="family" className="space-y-6">
            <FamilyMembers />
          </TabsContent>

          <TabsContent value="medications" className="space-y-6">
            <MedicationTracker />
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <AppointmentScheduler />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
