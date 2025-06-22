
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PricingPlansProps {
  onPlanSelect?: (planType: string) => void;
  showTitle?: boolean;
}

const PricingPlans = ({ onPlanSelect, showTitle = true }: PricingPlansProps) => {
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSelectPlan = (planType: string) => {
    setSelectedPlan(planType);
    
    if (planType === "free") {
      toast({
        title: "Free Plan Selected",
        description: "You're all set with the free plan!",
      });
    } else {
      toast({
        title: "Payment Integration Required",
        description: `${planType} plan will be available once Stripe is configured.`,
      });
    }
    
    onPlanSelect?.(planType);
  };

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for individuals getting started",
      badge: null,
      features: [
        "1 family member",
        "Basic medication tracking",
        "Simple appointment scheduling",
        "Basic health dashboard",
        "Email reminders"
      ],
      buttonText: "Get Started Free",
      buttonVariant: "outline" as const,
      popular: false
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "per month",
      description: "Ideal for growing families",
      badge: "Most Popular",
      features: [
        "Up to 5 family members",
        "Advanced medication tracking",
        "Smart appointment scheduling",
        "Detailed health analytics",
        "SMS & email reminders",
        "Doctor communication tools",
        "Health goal tracking"
      ],
      buttonText: "Start Pro Trial",
      buttonVariant: "default" as const,
      popular: true
    },
    {
      name: "Premium",
      price: "$19.99",
      period: "per month",
      description: "Complete family health solution",
      badge: "Best Value",
      features: [
        "Unlimited family members",
        "AI health insights",
        "Emergency contact system",
        "Telemedicine integration",
        "Priority customer support",
        "Advanced reporting",
        "Custom health plans",
        "Family health trends"
      ],
      buttonText: "Start Premium Trial",
      buttonVariant: "default" as const,
      popular: false
    }
  ];

  return (
    <div className="w-full">
      {showTitle && (
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Choose your perfect plan
          </h2>
          <p className="text-lg text-gray-600">
            Start free and upgrade as your family grows
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <Card 
            key={index} 
            className={`relative overflow-hidden transition-all hover:shadow-lg ${
              plan.popular ? 'border-2 border-blue-500 scale-105' : 'border border-gray-200'
            }`}
          >
            {plan.badge && (
              <div className="absolute top-0 right-0">
                <Badge className="rounded-l-none rounded-br-none bg-gradient-to-r from-blue-600 to-green-600">
                  {plan.badge}
                </Badge>
              </div>
            )}
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
              <div className="mt-3">
                <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-600 ml-2">/{plan.period}</span>
              </div>
              <CardDescription className="mt-3">
                {plan.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                className="w-full" 
                variant={plan.buttonVariant}
                onClick={() => handleSelectPlan(plan.name.toLowerCase())}
                disabled={selectedPlan === plan.name.toLowerCase()}
              >
                {selectedPlan === plan.name.toLowerCase() ? "Selected" : plan.buttonText}
              </Button>
              <ul className="space-y-2">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm">
                    <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PricingPlans;
