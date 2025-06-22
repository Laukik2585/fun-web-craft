
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Heart, Calendar, Bell, TrendingUp, AlertTriangle } from "lucide-react";

const HealthDashboard = () => {
  const upcomingReminders = [
    { id: 1, type: "medication", name: "Blood Pressure Pill", time: "8:00 AM", person: "Mom" },
    { id: 2, type: "appointment", name: "Cardiology Checkup", time: "2:00 PM", person: "Dad" },
    { id: 3, type: "medication", name: "Vitamin D", time: "6:00 PM", person: "Sarah" },
  ];

  const healthMetrics = [
    { name: "Medication Adherence", value: 85, color: "bg-green-500" },
    { name: "Appointment Attendance", value: 92, color: "bg-blue-500" },
    { name: "Health Goals Progress", value: 78, color: "bg-purple-500" },
  ];

  const recentActivity = [
    { id: 1, action: "Medication taken", person: "Mom", time: "2 hours ago", status: "completed" },
    { id: 2, action: "Blood pressure logged", person: "Dad", time: "4 hours ago", status: "completed" },
    { id: 3, action: "Appointment reminder sent", person: "Sarah", time: "6 hours ago", status: "pending" },
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Today's Medications</CardTitle>
            <Heart className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">12</div>
            <p className="text-xs text-blue-600 mt-1">8 completed, 4 pending</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Upcoming Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">3</div>
            <p className="text-xs text-green-600 mt-1">This week</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">Active Reminders</CardTitle>
            <Bell className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">7</div>
            <p className="text-xs text-orange-600 mt-1">2 overdue</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Reminders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Today's Reminders</span>
            </CardTitle>
            <CardDescription>Upcoming medications and appointments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingReminders.map((reminder) => (
              <div key={reminder.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    reminder.type === 'medication' ? 'bg-blue-500' : 'bg-green-500'
                  }`} />
                  <div>
                    <p className="text-sm font-medium">{reminder.name}</p>
                    <p className="text-xs text-gray-600">{reminder.person}</p>
                  </div>
                </div>
                <Badge variant="outline">{reminder.time}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Health Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Health Metrics</span>
            </CardTitle>
            <CardDescription>Family health performance overview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {healthMetrics.map((metric) => (
              <div key={metric.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{metric.name}</span>
                  <span className="text-gray-600">{metric.value}%</span>
                </div>
                <Progress value={metric.value} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5" />
            <span>Recent Activity</span>
          </CardTitle>
          <CardDescription>Latest health-related actions and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                  }`} />
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-gray-600">{activity.person} • {activity.time}</p>
                  </div>
                </div>
                <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'}>
                  {activity.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthDashboard;
