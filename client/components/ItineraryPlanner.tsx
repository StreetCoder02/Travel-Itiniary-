import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, MapPin, Calendar, Users, Plane, Hotel, Utensils, Camera, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ItineraryRequest {
  city: string;
  budget: number;
  days: number;
  travelers: number;
  interests: string[];
  accommodation: string;
  transportation: string;
}

interface ItineraryDay {
  day: number;
  activities: string[];
  meals: string[];
  accommodation: string;
  estimatedCost: number;
}

interface ItineraryResponse {
  city: string;
  summary: string;
  totalBudget: number;
  days: ItineraryDay[];
  tips: string[];
  emergencyContacts: string[];
}

export function ItineraryPlanner() {
  const [formData, setFormData] = useState<ItineraryRequest>({
    city: '',
    budget: 0,
    days: 1,
    travelers: 1,
    interests: [],
    accommodation: 'hotel',
    transportation: 'public'
  });

  const [itinerary, setItinerary] = useState<ItineraryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const interestOptions = [
    'Culture & History', 'Food & Dining', 'Nature & Outdoors', 
    'Shopping', 'Adventure Sports', 'Art & Museums', 'Nightlife',
    'Relaxation', 'Photography', 'Local Experiences'
  ];

  const accommodationOptions = [
    { value: 'budget', label: 'Budget Hostels' },
    { value: 'hotel', label: 'Mid-range Hotels' },
    { value: 'luxury', label: 'Luxury Hotels' },
    { value: 'apartment', label: 'Vacation Rentals' },
    { value: 'camping', label: 'Camping' }
  ];

  const transportationOptions = [
    { value: 'public', label: 'Public Transport' },
    { value: 'walking', label: 'Walking' },
    { value: 'bike', label: 'Bicycle' },
    { value: 'taxi', label: 'Taxis' },
    { value: 'rental', label: 'Car Rental' }
  ];

  const handleInputChange = (field: keyof ItineraryRequest, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const generateItinerary = async () => {
    if (!formData.city || formData.budget <= 0 || formData.days <= 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields with valid values.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Use production API endpoint when deployed, fallback to localhost for development
      const apiUrl = window.location.hostname === 'localhost' 
        ? '/api/generate-itinerary'
        : '/.netlify/functions/generate-itinerary';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate itinerary');
      }

      const data = await response.json();
      setItinerary(data);
      
      toast({
        title: "Success!",
        description: `Your ${formData.days}-day itinerary for ${formData.city} is ready!`,
      });
    } catch (error) {
      console.error('Error generating itinerary:', error);
      toast({
        title: "Error",
        description: "Failed to generate itinerary. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-10 md:py-14">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Triply-AI itinerary builder
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Clean, personalized plans for every trip.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Build a practical itinerary with a calm interface that keeps the focus on destination, budget, and the experience you actually want.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <Card className="border-border bg-card/90 shadow-2xl shadow-black/10 backdrop-blur-xl">
            <CardHeader className="space-y-2 border-b border-border pb-6">
              <CardTitle className="flex items-center gap-2 text-xl">
                <MapPin className="h-5 w-5 text-primary" />
                Trip details
              </CardTitle>
              <CardDescription>
                Tell us where you’re going and Triply-AI will shape the rest.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2">
                <Label htmlFor="city">Destination city *</Label>
                <Input
                  id="city"
                  placeholder="e.g., Paris, Tokyo, New York"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="h-12 rounded-2xl border-border bg-muted/40"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget (INR) *</Label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₹</span>
                    <Input
                      id="budget"
                      type="number"
                      placeholder="50000"
                      value={formData.budget || ''}
                      onChange={(e) => handleInputChange('budget', parseInt(e.target.value) || 0)}
                      className="h-12 rounded-2xl border-border bg-muted/40 pl-9"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="days">Days *</Label>
                  <div className="relative">
                    <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="days"
                      type="number"
                      min="1"
                      max="30"
                      placeholder="7"
                      value={formData.days || ''}
                      onChange={(e) => handleInputChange('days', parseInt(e.target.value) || 1)}
                      className="h-12 rounded-2xl border-border bg-muted/40 pl-9"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="travelers">Travelers</Label>
                  <div className="relative">
                    <Users className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="travelers"
                      type="number"
                      min="1"
                      max="10"
                      placeholder="2"
                      value={formData.travelers || ''}
                      onChange={(e) => handleInputChange('travelers', parseInt(e.target.value) || 1)}
                      className="h-12 rounded-2xl border-border bg-muted/40 pl-9"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Accommodation</Label>
                  <Select value={formData.accommodation} onValueChange={(value) => handleInputChange('accommodation', value)}>
                    <SelectTrigger className="h-12 rounded-2xl border-border bg-muted/40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {accommodationOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Transportation</Label>
                <Select value={formData.transportation} onValueChange={(value) => handleInputChange('transportation', value)}>
                  <SelectTrigger className="h-12 rounded-2xl border-border bg-muted/40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {transportationOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Interests</Label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {interestOptions.map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => handleInterestToggle(interest)}
                      className={`rounded-2xl border px-3 py-2 text-left text-sm transition ${
                        formData.interests.includes(interest)
                          ? 'border-primary/40 bg-primary/10 text-foreground'
                          : 'border-border bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={generateItinerary}
                disabled={isLoading}
                size="lg"
                className="h-12 w-full rounded-2xl bg-foreground text-background hover:bg-foreground/90"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating itinerary...
                  </>
                ) : (
                  <>
                    <Plane className="mr-2 h-4 w-4" />
                    Generate itinerary
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {itinerary ? (
              <>
                <Card className="border-border bg-card/90 shadow-2xl shadow-black/10 backdrop-blur-xl">
                  <CardHeader className="border-b border-border pb-6">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span className="rounded-full border border-border bg-muted/40 px-3 py-1">{formData.days} days</span>
                      <span className="rounded-full border border-border bg-muted/40 px-3 py-1">₹{itinerary.totalBudget.toLocaleString('en-IN')}</span>
                      <span className="rounded-full border border-border bg-muted/40 px-3 py-1">
                        {formData.travelers} traveler{formData.travelers > 1 ? 's' : ''}
                      </span>
                    </div>
                    <CardTitle className="pt-2 text-2xl">{itinerary.city}</CardTitle>
                    <CardDescription className="text-base leading-7">
                      {itinerary.summary}
                    </CardDescription>
                  </CardHeader>
                </Card>

                <div className="space-y-4">
                  {itinerary.days.map((day) => (
                    <Card key={day.day} className="border-border bg-card/90 shadow-lg shadow-black/5 backdrop-blur-xl">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Calendar className="h-4 w-4 text-primary" />
                          Day {day.day}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-5">
                        <div>
                          <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                            <Camera className="h-4 w-4" />
                            Daily schedule
                          </h4>
                          <ul className="space-y-2">
                            {day.activities.map((activity, index) => (
                              <li key={index} className="flex items-start gap-3 rounded-2xl border border-border bg-muted/40 p-3 text-sm text-muted-foreground">
                                <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                                <span className="text-foreground/90">{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                            <Utensils className="h-4 w-4" />
                            Meals
                          </h4>
                          <ul className="space-y-2">
                            {day.meals.map((meal, index) => (
                              <li key={index} className="flex items-start gap-3 rounded-2xl border border-border bg-muted/40 p-3 text-sm text-muted-foreground">
                                <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-400" />
                                <span className="text-foreground/90">{meal}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex flex-col gap-2 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Hotel className="h-4 w-4 text-primary" />
                            {day.accommodation}
                          </div>
                          <div className="text-sm font-semibold text-foreground">
                            ₹{day.estimatedCost.toLocaleString('en-IN')}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card className="border-border bg-card/90 shadow-lg shadow-black/5 backdrop-blur-xl">
                    <CardHeader>
                      <CardTitle className="text-lg">Travel tips</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {itinerary.tips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm leading-6 text-muted-foreground">
                            <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-amber-400" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                    <Card className="border-border bg-card/90 shadow-lg shadow-black/5 backdrop-blur-xl">
                    <CardHeader>
                      <CardTitle className="text-lg">Emergency contacts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {itinerary.emergencyContacts.map((contact, index) => (
                          <li key={index} className="text-sm leading-6 text-muted-foreground">
                            {contact}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </>
            ) : (
              <Card className="flex min-h-[32rem] items-center justify-center border-border bg-card/90 shadow-2xl shadow-black/10 backdrop-blur-xl">
                <div className="max-w-sm text-center">
                  <Plane className="mx-auto mb-4 h-14 w-14 text-primary/60" />
                  <p className="text-lg font-medium text-foreground">Your itinerary will appear here</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Fill in the form and generate a plan to see your days, meals, and budget in one clean view.
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
