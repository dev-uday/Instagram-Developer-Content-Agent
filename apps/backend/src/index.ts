import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'Instagram Developer Content Agent Backend', timestamp: new Date().toISOString() });
});

// Endpoint to research GitHub repository and draft content
app.post('/api/research', async (req: Request, res: Response) => {
  const { repoUrl, linkPolicy = 'ask_per_post' } = req.body;

  if (!repoUrl || typeof repoUrl !== 'string') {
    return res.status(400).json({ error: 'Valid repoUrl is required' });
  }

  try {
    // Parse GitHub repository owner and name
    const urlPattern = /github\.com\/([^\/]+)\/([^\/]+)/;
    const match = repoUrl.match(urlPattern);

    if (!match) {
      return res.status(400).json({ error: 'Invalid GitHub repository URL format' });
    }

    const owner = match[1];
    const repoName = match[2].replace(/\.git$/, '');

    // Return structured draft proposal based on repository evidence plan
    const sampleDraft = {
      id: `draft_${Date.now()}`,
      repoUrl,
      status: 'ready_for_review',
      linkPolicy,
      evidence: {
        repoId: `${owner}/${repoName}`,
        owner,
        repoName,
        branch: 'main',
        commitSha: 'latest',
        retrievedAt: new Date().toISOString(),
        summary: `Instagram Developer Content Agent helps developers generate carousels, manage link policies, and automate Instagram engagement from GitHub repos.`,
        keyFeatures: [
          'GitHub repository research engine',
          'HTML/CSS carousel slide renderer',
          'Enforced outbound link policies (DM, bio, comment, story, none)',
          'Official Instagram Graph API integration'
        ],
        codeSnippets: [
          {
            path: 'packages/shared/src/index.ts',
            snippet: `export interface PostDraft {\n  id: string;\n  repoUrl: string;\n  status: PostStatus;\n  linkPolicy: LinkPolicyChoice;\n}`,
            language: 'typescript'
          }
        ],
        limitations: [
          'Requires official Instagram Professional account connected via API'
        ]
      },
      angle: 'Project Overview & Developer Automation',
      hook: 'Automate your developer content workflow directly from your GitHub repositories! 🚀',
      caption: `Managing Instagram content for open-source software shouldn't require manual graphics work.\n\nThe Instagram Developer Content Agent researches your repo, drafts structured slide carousels, enforces strict link policies (keyword-to-DM or bio), and handles comments.\n\nDrop a comment with CODE to get the GitHub link sent directly to your DMs! 💬👇`,
      hashtags: ['#developer', '#opensource', '#github', '#coding', '#softwareengineering', '#tech'],
      slides: [
        {
          slideNumber: 1,
          type: 'problem',
          title: 'Struggling to share your developer projects on Instagram?',
          content: 'Creating visual carousels and writing technical captions for software repositories takes hours of manual effort.'
        },
        {
          slideNumber: 2,
          type: 'overview',
          title: 'Meet Instagram Developer Content Agent',
          content: 'An autonomous agent that inspects your repository evidence, builds multi-slide developer carousels, and manages outbound link policies.'
        },
        {
          slideNumber: 3,
          type: 'features',
          title: 'Key Capabilities',
          content: '• Evidence-based post drafting\n• Rendered code syntax cards\n• DM keyword link delivery\n• Official Meta API publishing'
        },
        {
          slideNumber: 4,
          type: 'code',
          title: 'Clean Modular Architecture',
          content: 'Structured models for drafts, evidence tracking, and strict link policy enforcement.',
          codeSnippet: `interface PostDraft {\n  repoUrl: string;\n  linkPolicy: LinkPolicyChoice;\n  slides: CarouselSlide[];\n}`,
          language: 'typescript'
        },
        {
          slideNumber: 5,
          type: 'use_case',
          title: 'Practical Use Case',
          content: 'Perfect for open-source maintainers and developer advocates looking to share project releases and tutorial guides consistently.'
        },
        {
          slideNumber: 6,
          type: 'cta',
          title: 'Get the Repo Link',
          content: 'Comment "CODE" below to receive the repository link in your DMs!'
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return res.json({ success: true, draft: sampleDraft });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
