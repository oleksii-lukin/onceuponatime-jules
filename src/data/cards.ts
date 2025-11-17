export interface StoryCard {
  type: 'Story';
  id: string;
  title: string;
  icon: string;
}

export interface EndingCard {
  type: 'Ending';
  id: string;
  title: string;
  icon: string;
}

export type GameCard = StoryCard | EndingCard;

export const storyCards: StoryCard[] = [
  { type: 'Story', id: 'story-1', title: 'A Hidden Castle', icon: 'fort' },
  { type: 'Story', id: 'story-2', title: 'A Loyal Companion', icon: 'pets' },
  { type: 'Story', id: 'story-3', title: 'A Sword', icon: 'swords' },
  { type: 'Story', id: 'story-4', title: 'A Mysterious Forest', icon: 'forest' },
  { type: 'Story', id: 'story-5', title: 'A Secret Map', icon: 'map' },
  { type: 'Story', id: 'story-6', title: 'A Magical Potion', icon: 'science' },
];

export const endingCards: EndingCard[] = [
  { type: 'Ending', id: 'ending-1', title: 'The King Returns', icon: 'auto_stories' },
  { type: 'Ending', id: 'ending-2', title: 'Happily Ever After', icon: 'auto_stories' },
];
