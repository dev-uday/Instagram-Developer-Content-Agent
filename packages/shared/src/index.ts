export type PostStatus = 
  | 'researching'
  | 'draft'
  | 'needs_link_choice'
  | 'ready_for_review'
  | 'scheduled'
  | 'publishing'
  | 'published'
  | 'needs_attention'
  | 'cancelled';

export type LinkPolicyChoice = 
  | 'ask_per_post'
  | 'comment_keyword_dm'
  | 'dm_keyword'
  | 'comment_pin'
  | 'link_in_bio'
  | 'story_link'
  | 'no_link';

export interface RepositoryEvidence {
  repoId: string;
  owner: string;
  repoName: string;
  branch: string;
  commitSha: string;
  retrievedAt: string;
  license?: string;
  summary: string;
  keyFeatures: string[];
  codeSnippets: Array<{ path: string; snippet: string; language: string }>;
  limitations: string[];
}

export interface CarouselSlide {
  slideNumber: number;
  title: string;
  content: string;
  codeSnippet?: string;
  language?: string;
  type: 'problem' | 'overview' | 'features' | 'code' | 'use_case' | 'cta';
}

export interface PostDraft {
  id: string;
  repoUrl: string;
  angle: string;
  hook: string;
  caption: string;
  hashtags: string[];
  slides: CarouselSlide[];
  status: PostStatus;
  linkPolicy: LinkPolicyChoice;
  keyword?: string;
  evidence: RepositoryEvidence;
  createdAt: string;
  updatedAt: string;
}
