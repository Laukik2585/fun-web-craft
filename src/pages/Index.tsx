
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

  const handleQuickAction = (action: string, targetTab: string) => {
    setActiveTab(targetTab);
    // Trigger the add dialog for the specific component
    setTimeout(() => {
      const addButton = document.querySelector(`[data-action="${action}"]`) as HTMLButtonElement;
      if (addButton) {
        addButton.click();
      }
    }, 100);
  };

  const handleBackToLanding = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-emerald-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleBackToLanding}
                className="mr-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">CareSync</h1>
                <p className="text-sm text-gray-600">Smart Family Health Scheduler</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-50">
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
          <h2 className="text-lg font-semibold text-emerald-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col space-y-2 hover:bg-emerald-50 border-emerald-200 text-emerald-700 transform hover:scale-105 transition-all shadow-md"
              onClick={() => handleQuickAction("add-medication", "medications")}
            >
              <Plus className="w-6 h-6" />
              <span>Add Medication</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col space-y-2 hover:bg-teal-50 border-teal-200 text-teal-700 transform hover:scale-105 transition-all shadow-md"
              onClick={() => handleQuickAction("add-appointment", "appointments")}
            >
              <Calendar className="w-6 h-6" />
              <span>Schedule Appointment</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col space-y-2 hover:bg-cyan-50 border-cyan-200 text-cyan-700 transform hover:scale-105 transition-all shadow-md"
              onClick={() => handleQuickAction("add-family", "family")}
            >
              <Users className="w-6 h-6" />
              <span>Add Family Member</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col space-y-2 hover:bg-green-50 border-green-200 text-green-700 transform hover:scale-105 transition-all shadow-md"
              onClick={() => setActiveTab("dashboard")}
            >
              <Activity className="w-6 h-6" />
              <span>View Health Data</span>
            </Button>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-emerald-50 border border-emerald-200">
            <TabsTrigger 
              value="dashboard" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white transition-all"
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="family"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white transition-all"
            >
              Family
            </TabsTrigger>
            <TabsTrigger 
              value="medications"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white transition-all"
            >
              Medications
            </TabsTrigger>
            <TabsTrigger 
              value="appointments"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white transition-all"
            >
              Appointments
            </TabsTrigger>
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
