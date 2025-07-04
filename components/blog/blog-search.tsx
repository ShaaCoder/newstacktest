'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

export function BlogSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchTerm, 'in category:', category);
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="web-development">Web Development</SelectItem>
            <SelectItem value="mobile-development">Mobile Development</SelectItem>
            <SelectItem value="ui-ux-design">UI/UX Design</SelectItem>
            <SelectItem value="seo-marketing">SEO & Marketing</SelectItem>
            <SelectItem value="tutorials">Tutorials</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </form>
    </div>
  );
}