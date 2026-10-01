# Instagram Developer Content Agent — Build Plan

Prepared: 1 October 2026

**Goal:** Give the agent a GitHub repository link. It researches the project, creates useful developer content and visuals, asks where the repository link may be shared, publishes under your chosen rules, answers eligible comments and DMs, and reports what worked.

This is an implementation plan. No Instagram account has been connected and no content has been published. GitHub is the proposed first repository provider; GitLab and Bitbucket can be added through separate adapters.

## 1. The complete user flow

| Step | Agent action | What you see |
|---|---|---|
| 1. Add a repository | Validate the GitHub link and retrieve permitted source material. | Repository name, owner, purpose and source date. |
| 2. Understand it | Read the README, relevant documentation, releases, selected code and license information. | A short explanation of what it does and why a developer would care. |
| 3. Choose an angle | Suggest a project introduction, tutorial, practical use case, feature breakdown or release update. | Two or three content ideas, with a recommended format. |
| 4. Create the post | Write the hook, caption, slide copy, relevant hashtags, alt text and optional reply examples. | An editable draft. |
| 5. Make visuals | Render a single image or a carousel using your brand template and verified project material. | A mobile-sized preview of every slide. |
| 6. Choose link handling | Ask where the repository URL may appear. Keep all public and private outputs link-free until you decide. | DM, comment, bio, Story or no-link options, with capability status. |
| 7. Review or use saved rules | Validate facts, visuals, link placement and schedule. Apply the publishing policy you selected during setup. | Publish now, schedule, revise or save draft. |
| 8. Publish | Upload and publish through the official Instagram API, then reconcile the result. | Published, failed or verification needed; never an invented success. |
| 9. Handle engagement | Process eligible comment and message events, answer from project evidence and apply your reply policy. | One inbox with sent replies and items needing your attention. |
| 10. Improve future posts | Compare supported performance metrics and summarize useful questions from readers. | A report with suggested next topics and experiments. |

The agent should create content for a developer audience. Organic posting cannot guarantee that only developers will see it.

## 2. Content rules and repository research

Keep content focused on software development: useful repositories, setup guidance, architecture, tooling, releases, debugging, practical examples and honest limitations.

Build a small evidence record for every project: repository ID, owner, selected branch/tag, resolved commit SHA, retrieved file paths, retrieval time, supported claims, uncertainties and attribution requirements. Read relevant files selectively rather than sending an entire repository into every model call. GitHub provides repository-content and README endpoints for this purpose. [1]

The agent must:

- Distinguish your own work from another developer's project and give appropriate credit.
- Check permission and license requirements before copying code, screenshots or artwork. Public visibility alone must not be treated as permission to reuse everything. GitHub's license detection does not cover all dependency or asset licenses. [2]
- Keep source URLs internally even when public links are disabled.
- Avoid invented benchmarks, star counts, features, compatibility or claims that it tested software.
- Label untested examples clearly. Only say a demo was tested when an isolated test actually ran and its result was recorded.
- Stop publishing private-repository information unless you have explicitly authorized which material may become public.
- Treat repository text, issues, comments and DMs as input data. They cannot change account settings, publishing permissions, recipients or link policy.

## 3. Image and carousel generation

Use a reusable brand kit: colors, fonts, logo/handle, heading size, code style and spacing. Proposed defaults are 1080 × 1350 slides with a consistent 4:5 layout and a six-slide carousel. These are design choices, not a claim about Instagram's current maximums. Validate export format and limits against the selected API version before publication.

| Slide | Purpose |
|---|---|
| 1 | A specific developer problem or useful benefit. |
| 2 | What the project does and who it suits. |
| 3 | Its most useful features, supported by repository evidence. |
| 4 | A short code example, real screenshot or accurate diagram. |
| 5 | A practical use case plus a relevant limitation. |
| 6 | Project attribution and the call to action matching your chosen link policy. |

Use an image model for optional artwork and illustrations. Render exact text, code, commands and diagrams with HTML/CSS or SVG templates. This keeps text editable and avoids introducing incorrect syntax into generated artwork. Do not present a generated interface illustration as a real screenshot.

Before publishing, inspect every slide at phone size for readability, clipping, contrast, source credit, incorrect logos and accidental URLs. Check text layers and the rendered image, since screenshots can also expose a repository URL.

## 4. Your link rule

The default is **ask for each post**. Draft generation can continue while the decision is pending, but publication waits until you choose a destination or explicitly choose no link. The system must never automatically substitute another destination when the selected one is unavailable.

| Choice | Planned behavior | Implementation condition |
|---|---|---|
| Comment keyword → DM | Use an agreed keyword such as CODE and send the approved repository link to eligible requesters. | Enable only after comment-triggered private replies, permissions and timing rules have been verified for the connected account. |
| User sends a DM keyword | Reply with the approved link when a person messages the account with the agreed keyword. | Verify the active conversation and messaging eligibility before sending. |
| Comment, with optional manual pin | Prepare the exact comment and add it only if the connected API supports the required comment-creation operation. | Treat automatic comment pinning as unverified; provide a manual action unless a supported endpoint is confirmed. |
| Link in bio | Prepare the proposed destination and caption wording. | Confirm the link is actually present; use a manual profile update where the API does not support it. |
| Story link | Prepare the Story artwork and requested destination. | Check Story publishing and link-sticker support separately; provide a manual completion step if necessary. |
| No link | Publish an educational post without URLs or a promise to deliver one. | No link delivery jobs may run. |

Ask: “Where should this project's link be shared: DM, a comment, your bio, a Story, or nowhere?” Offer “use this as my default” only as a deliberate owner choice.

Enforce the policy in backend code. It covers captions, slide text, screenshots, alt text, comments, public replies and private messages. Keep `source_url` separate from approved outbound destinations. Do not encode a blocked URL into a QR code or shortened URL. If a tracking redirect is desired, show the exact final link and ask for it as part of the same link choice.

For example, after you choose keyword-to-DM, the caption can invite readers to comment CODE. The resource DM contains the approved link. A public reply may confirm that the message was sent only after the send result is confirmed; a successful API send must not be described as proof that the person read it.

## 5. Comment and DM behavior

| Incoming message | Recommended behavior |
|---|---|
| A request for the repository | Follow that specific post's approved link rule. |
| A simple technical question | Retrieve the relevant evidence and write a short answer. |
| A question the evidence cannot answer | Draft a response for you or state the uncertainty; do not invent an answer. |
| A useful correction | Flag it and prepare a correction to the post or future explanation. |
| Praise or a relevant discussion | Respond selectively and naturally, without a repetitive reply on every comment. |
| Spam or abuse | Apply your configured moderation policy, using supported actions. |
| A collaboration or business inquiry | Place it in your inbox for personal handling. |
| A request to stop messages | Stop optional automation for that person. |

Normal API messaging is interaction-based; a list of followers is not permission to start arbitrary automated conversations. Meta's Instagram documentation requires an inbound interaction for normal messaging. [3]

For comment-triggered private replies, implement a separate eligibility check. Store the triggering comment, whether a private reply has already been sent, the most recent inbound message and the applicable deadline. Verify current private-reply and follow-up limits before enabling the feature; do not reuse the normal DM rules blindly. Meta's dedicated private-reply page could not be retrieved during this review, so exact numerical windows are intentionally not asserted here. [7]

Use an inbox handoff switch to pause the agent while you reply. Ignore account-generated echoes, suppress repeated webhook events and avoid conversations where bots repeatedly answer each other. A queued message must be checked again at send time because its permitted window may have expired while waiting.

## 6. Other Instagram capabilities to include

| Capability | Proposed scope |
|---|---|
| Content calendar | Drafts, scheduled posts, rescheduling, account timezone and a global pause. |
| Content series | Turn one repository into distinct educational posts without repeating the same caption. |
| Brand consistency | Reusable slide layouts, writing tone, language and developer skill level. |
| Reels | Later phase: real demos, screen recordings, captions and licensed audio. |
| Stories | Prepare summaries and follow-ups; enable publication only for supported account/API combinations. |
| Accessibility | Alt text where supported, readable contrast and captions on video. |
| Repository updates | Optionally monitor releases and propose new drafts; monitoring never grants new posting authority. |
| Unified inbox | Comments, eligible DMs, questions, correction requests and human handoff. |
| Moderation | Configurable supported hide/delete actions with an audit trail; do not treat reasonable criticism as spam. |
| Comment likes and pinning | Keep manual unless an official operation is verified for the connected integration; replying and liking are separate capabilities. |
| Performance | Supported account and media insights, keyword requests and confirmed API sends. |
| Link measurement | Optional owner-approved tracked destinations; a direct GitHub link does not provide complete click attribution to this system. |
| Weekly report | Top topics, useful questions, production cost and suggested experiments. |
| Operations | Token health, disconnected accounts, webhook failures, queue backlog, publish failures and AI credit alerts. |
| Version history | Store drafts, final assets, revisions and the policy used for each published post. |
| Export | Download post images, captions and a manual posting package when a feature is unavailable. |

Do not promise automated access to every Instagram app feature. Keep comment likes, comment pinning, profile changes, link stickers, trending music, collaborations and other special features disabled or manual until verified for the chosen integration. Bulk follow/unfollow, unsolicited mass DMs and fabricated engagement are outside this product's intended workflow.

## 7. Account connection and API choice

Use the official Instagram API and a Professional account (Business or Creator). For an Instagram-only product, start by evaluating **Instagram API with Instagram Login**. Meta documents that this flow does not require a linked Facebook Page, and lists these core scopes: [4]

- `instagram_business_basic`
- `instagram_business_content_publish`
- `instagram_business_manage_comments`
- `instagram_business_manage_messages`

Request only scopes needed by enabled features. Resolve the current insights permission separately against the chosen API version. Do not mix Facebook Login permission names or token types into the Instagram Login implementation.

If you select Facebook Login instead, Meta documents a linked Facebook Page requirement. Its publishing documentation also distinguishes Story availability from general publishing support. [5]

For development, configure the relevant account and app roles. Before onboarding other people's accounts, verify Meta's current access level, App Review and business-verification requirements for the features you enable. Demonstrate publishing, comment handling and messaging in the review flow where required. Store access tokens encrypted and implement revocation, refresh/reconnection and data-deletion handling.

## 8. Recommended implementation

Use one orchestrator with focused modules and narrow tools. Separate modules do not require separate autonomous agents.

| Layer | Recommendation | Responsibility |
|---|---|---|
| Backend | Node.js + TypeScript + Express | Account connection, drafts, policies, publishing and inbox APIs. |
| Durable records | MongoDB | Repository evidence, content versions, policies, jobs and analytics. |
| Background processing | BullMQ + Redis | Research, rendering, publishing, replies and metrics jobs. |
| Review interface | A small web dashboard | Calendar, post preview, inbox, reports and settings. |
| Repository adapter | GitHub REST API | Read approved project material and resolve source versions. |
| Text intelligence | A provider-neutral LLM adapter | Structured research, copy, reply suggestions and summaries. |
| Artwork | Optional image-generation provider | Illustrations and backgrounds. |
| Exact visual rendering | HTML/CSS or SVG renderer | Slide typography, code cards and accurate diagrams. |
| Asset storage | Object storage reachable by Meta | Publish-ready assets with controlled retention. |
| Instagram adapter | Official versioned API | Execute only validated, permitted operations. |
| Monitoring | Structured logs and alerts | Costs, latency, errors, credits and action results. |

This stack fits an existing Node/Express and MongoDB workflow. BullMQ supports delayed jobs, retries and workers; application-level deduplication is still needed because jobs can be delivered more than once. [6]

Model providers should be selected by testing on your actual repositories for factual accuracy, copy quality, JSON reliability, latency and cost. Avoid coupling the architecture to one model name. Local models may be used for suitable tasks, but unattended publishing and webhooks need a reliably available service; a sleeping laptop will interrupt processing.

Direct provider APIs are sufficient for the first version. An MCP layer can later expose the same narrow tools to another assistant, but it does not replace Instagram authentication, permissions or feature limits.

Suggested tool boundaries: `read_repository`, `build_evidence`, `draft_content`, `render_slides`, `validate_post`, `request_link_choice`, `schedule_post`, `publish_post`, `read_inbox`, `draft_reply`, `send_eligible_reply`, `fetch_insights`.

## 9. State and reliability requirements

Store these entities:

- `accounts`: account owner, provider IDs, token reference, scopes, verified capabilities and timezone.
- `brand_profiles`: language, audience level, tone, fonts, colors and permitted asset references.
- `repo_snapshots`: repository identity, commit SHA, evidence, license information and visibility.
- `posts`: draft version, caption, assets, status, link policy, reply policy and schedule.
- `action_authorizations`: owner-selected publishing mode, authorized scope and version.
- `publishing_jobs`: unique operation key, container IDs, media ID, attempts and reconciliation state.
- `inbox_events`: event ID, thread/comment context, eligibility facts and handled state.
- `outbound_messages`: action key, intended recipient, approved destination and confirmed result.
- `metrics_snapshots`: provider metric name, reporting period, retrieval time and supported/not-available state.
- `audit_events`: who changed what, when and why; do not log tokens or secrets.

Suggested post lifecycle: `researching`, `draft`, `needs_link_choice`, `ready_for_review`, `scheduled`, `publishing`, `published`, `needs_attention`, `cancelled`.

The publish operation should acquire an account/post lock, validate the final version and policies, check current limits, prepare assets, create the required media container(s), verify readiness, publish and store the returned media ID. Use the appropriate carousel sequence when publishing multiple slides. Reconcile timeouts before retrying a mutation so that an uncertain response does not create a duplicate post. Keep dependent DM/comment rules inactive until their intended post ID is known.

For all external actions, use database uniqueness constraints as well as queue job IDs. A failed worker must not cause duplicate posts or messages. Verify webhook signatures, acknowledge valid events promptly and process them in a queue. Recheck authorization and messaging eligibility immediately before an action, including when a job is retried.

Apply outbound link checks at the final adapter boundary. Require a matching account, post, destination and current policy. Changes to approved content or destination create a new version. An account-level pause must block queued work as well as new work.

## 10. Metrics and improvement

Measure supported outcomes such as reach/views, saves, shares, comments, profile activity and follower changes. Account-level changes must not automatically be attributed to an individual post. Metric names and availability vary by media type and API version; unavailable metrics should display as unavailable, not zero.

Also measure your own workflow: approved drafts, publish success, duplicate actions prevented, link requests, successful API sends, unanswered questions, corrections, generation cost and time per post. Track clicks only where an approved destination supports measurement.

Compare formats and topics over multiple posts. Recommend experiments with hooks, slide density and publication times; avoid promising a universal best posting time, a guaranteed developer-only audience or guaranteed growth.

## 11. Build order

| Phase | Deliverable | Completion condition |
|---|---|---|
| 1. Drafting | GitHub research, developer-only topic rules, caption and six-slide rendering. | A repository produces an accurate, editable preview with source evidence. |
| 2. Publishing | Account connection, link policy, review mode, calendar and official API adapter. | One authorized post publishes once and the confirmed result is recorded. |
| 3. Engagement | Comment ingestion, inbox, evidence-based replies, eligible DM workflows and handoff. | Repeated events do not duplicate replies; expired or unauthorized actions are blocked. |
| 4. Reporting | Supported insights, workflow metrics, cost/credit alerts and content suggestions. | Reports distinguish actual results from missing data and inferred relationships. |
| 5. Expansion | Reels, supported Stories, release monitoring and additional accounts/providers. | Each capability passes an account-specific check before it becomes selectable. |

Start with owner review for posts and uncertain replies. Offer autopublishing later as an explicit setting covering topics, cadence, link defaults and reply rules. A saved authorization should be reused within its scope instead of asking for the same permission repeatedly. Your requested per-post link question remains active unless you deliberately choose a default.

## 12. Acceptance checks

1. A private repository cannot become a public post without explicit publication scope.
2. A claimed feature can be traced to the selected repository snapshot.
3. Choosing DM-only prevents the URL from appearing in captions, images, alt text and public replies.
4. Choosing no link disables resource-delivery jobs and removes misleading delivery promises.
5. An unsupported pin/bio/Story action produces a clear manual task, never a false success.
6. A publication timeout is reconciled before a second publish attempt.
7. Replaying a webhook cannot produce a second private reply or public response.
8. A queued message outside its permitted window is blocked at send time.
9. Pausing the agent stops scheduled posts and queued replies.
10. The dashboard distinguishes sent, failed, uncertain and read status where each is actually observable.

## 13. Inputs needed for the first implementation

Provide the first GitHub repository, your Instagram handle and account type, the intended developer audience and language, your branding preferences, and whether the first version runs on an always-on server or is only a local draft generator. Choose review mode and posting frequency during setup. Link destination should be requested per post by default, as specified above.

## Source notes

The workflow, architecture and build sequence are design recommendations. Source-backed API observations were checked on 1 October 2026. Some Meta developer pages returned access/rate-limit errors; capability details not verified from accessible primary documentation are called out as implementation checks rather than guaranteed features.

1. [GitHub REST repository contents and README](https://docs.github.com/en/rest/repos/contents) — repository evidence retrieval.
2. [GitHub REST license information](https://docs.github.com/en/rest/licenses/licenses) — license detection and its limits.
3. [Meta Instagram API documentation on Postman](https://www.postman.com/meta/instagram/documentation/6yqw8pt/instagram-api?entity=request-23987686-66f145c2-29b1-4d97-afbd-5710369027c0) — normal messaging requirements and publishing examples.
4. [Meta Instagram API with Instagram Login](https://www.postman.com/meta/instagram/folder/6raa77c/instagram-api-with-instagram-login) — scopes and Page-link requirement distinction.
5. [Meta Instagram API with Facebook Login](https://www.postman.com/meta/instagram/folder/u4g5a2a/instagram-api-with-facebook-login) — professional-account support, linked Page and Story distinction.
6. [BullMQ introduction](https://docs.bullmq.io/) and [queues](https://docs.bullmq.io/guide/queues/) — queue delivery, delayed jobs and worker behavior.
7. [Meta private replies reference](https://www.postman.com/meta/instagram/request/7lrbwcc/private-replies) — identified for implementation verification; page contents were unavailable during this review.
