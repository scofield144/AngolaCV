'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, User, Briefcase, MapPin, Mail, ArrowUpRight, MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

// Mock data for Angolan provinces and industries
const angolanProvinces = [
  'Bengo', 'Benguela', 'Bié', 'Cabinda', 'Cuando Cubango', 'Cuanza Norte', 
  'Cuanza Sul', 'Cunene', 'Huambo', 'Huíla', 'Luanda', 'Lunda Norte', 
  'Lunda Sul', 'Malanje', 'Moxico', 'Namibe', 'Uíge', 'Zaire'
];
const industries = ['Oil & Gas', 'Mining', 'Agriculture', 'Construction', 'Telecommunications', 'Banking', 'IT & Technology'];

// Mock candidate data
const candidates = [
  {
    id: 1,
    name: 'Ana Silva',
    title: 'Geologist',
    location: 'Luanda',
    industry: 'Oil & Gas',
    skills: ['Petroleum Geology', 'Seismic Interpretation', 'Reservoir Modeling'],
    avatar: 'https://picsum.photos/seed/candidate1/100/100',
    initials: 'AS',
  },
  {
    id: 2,
    name: 'Bruno Costa',
    title: 'Civil Engineer',
    location: 'Benguela',
    industry: 'Construction',
    skills: ['AutoCAD', 'Project Management', 'Structural Analysis'],
    avatar: 'https://picsum.photos/seed/candidate2/100/100',
    initials: 'BC',
  },
  {
    id: 3,
    name: 'Carla Gomes',
    title: 'IT Support Specialist',
    location: 'Huambo',
    industry: 'IT & Technology',
    skills: ['Network Administration', 'Cybersecurity', 'Cloud Computing (AWS)'],
    avatar: 'https://picsum.photos/seed/candidate3/100/100',
    initials: 'CG',
  },
   {
    id: 4,
    name: 'Diogo Martins',
    title: 'Agronomist',
    location: 'Huíla',
    industry: 'Agriculture',
    skills: ['Crop Management', 'Soil Science', 'Sustainable Farming'],
    avatar: 'https://picsum.photos/seed/candidate4/100/100',
    initials: 'DM',
  }
];


export default function CandidateSearchPage() {
  const [filters, setFilters] = useState({
    keywords: '',
    location: '',
    industry: '',
  });
  
  const [searchResults, setSearchResults] = useState(candidates);

  const handleSearch = () => {
    // In a real application, this would trigger an API call.
    // Here, we just filter the mock data.
    const filtered = candidates.filter(candidate => 
      (filters.keywords ? (candidate.name.toLowerCase().includes(filters.keywords.toLowerCase()) || candidate.skills.some(s => s.toLowerCase().includes(filters.keywords.toLowerCase()))) : true) &&
      (filters.location ? candidate.location === filters.location : true) &&
      (filters.industry ? candidate.industry === filters.industry : true)
    );
    setSearchResults(filtered);
  };


  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Candidate Search</CardTitle>
          <CardDescription>
            Use advanced filters to find the perfect talent for your open roles.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label htmlFor="keywords" className="text-sm font-medium">Keywords</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="keywords" placeholder="e.g., Engineer, React, Sales" className="pl-10" onChange={e => setFilters({...filters, keywords: e.target.value})} />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium">Location</label>
               <Select onValueChange={value => setFilters({...filters, location: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a province" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Provinces</SelectItem>
                  {angolanProvinces.map(province => (
                    <SelectItem key={province} value={province}>{province}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="industry" className="text-sm font-medium">Industry</label>
               <Select onValueChange={value => setFilters({...filters, industry: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Industries</SelectItem>
                  {industries.map(industry => (
                    <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter>
            <Button onClick={handleSearch}>
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
        </CardFooter>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Search Results ({searchResults.length} found)</h2>
         <div className="grid gap-6 md:grid-cols-2">
          {searchResults.map(candidate => (
            <Card key={candidate.id}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border">
                    <AvatarImage src={candidate.avatar} alt={candidate.name} data-ai-hint="person face" />
                    <AvatarFallback>{candidate.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-xl">{candidate.name}</CardTitle>
                    <CardDescription>{candidate.title} &middot; {candidate.location}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium mb-2">Top Skills:</p>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map(skill => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                <Button asChild size="sm" className="flex-1">
                    <Link href="#">View Profile <ArrowUpRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                 <Button asChild variant="outline" size="sm" className="flex-1">
                    <Link href="#">Message <MessageSquare className="ml-2 h-4 w-4" /></Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        {searchResults.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed bg-card p-12 text-center min-h-[200px]">
                <Search className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground">No Candidates Found</h3>
                <p className="text-sm text-muted-foreground">Try adjusting your search filters to find more results.</p>
            </div>
        )}
      </div>
    </div>
  );
}