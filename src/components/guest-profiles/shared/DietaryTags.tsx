import React from 'react';
import { Badge } from '@/components/ui/badge';

interface DietaryTagsProps {
  tags: string[];
}

const DietaryTags: React.FC<DietaryTagsProps> = ({ tags }) => {
  if (!tags.length) return null;

  return (
    <div className="flex gap-2 flex-wrap">
      {tags.map((tag) => (
        <Badge key={tag} variant="secondary" className="capitalize">
          {tag}
        </Badge>
      ))}
    </div>
  );
};

export default DietaryTags;