A 26-billion-parameter model that fits in 20 gigabytes just tied Alibaba’s 27-billion-parameter Qwen 3.8 on the Artificial Analysis index, using about a fifth of the active parameters. And the trick sounds like cheating: for every single token it produces, it runs the middle of its own network three times in a row.

It’s called Inkling 2 Mini. If you run a local coding model, you need to know whether it’s a real upgrade, or just a very good week for one benchmark table.

We went through the launch post, the model card, the Hugging Face and Unsloth guides, and the independent evals, and checked the numbers one by one. By the end of this video, you’ll know four things. How the looping trick actually works, and what it costs you. Which of the lab’s benchmark scores you can trust, and which you can’t. What hardware it needs, and what breaks today. And a ten-ticket test you can run on your own repos before you switch.

And stay for the middle. One benchmark behind the headline claim was flagged as flawed by an outside group, and in one row, the lab’s own text contradicts the lab’s own table.

First, what actually shipped.

Inkling 2 Mini comes from Thinking Machines Lab, the company started and led by Mira Murati, the former chief technology officer of OpenAI. It follows Inkling 2 Small, the lab’s much larger model, at 594 billion parameters. Small debuted on November 5th on the lab’s own platform with closed weights, and its weights went public on November 12th. Eight days after that, Mini arrived, with open weights under the Apache 2.0 license.

Mini has 26.4 billion parameters in total, but only 3.4 billion are active for any given token. That’s because it’s a mixture of experts. In every layer, a router picks eight experts out of a pool of 128, and only those eight do the work. It reads text and images, it writes text, and it supports a context window of up to a million tokens.

Now the headline claim, and it comes from the lab itself. Inkling 2 Mini leads every open-weights model under 100 billion total parameters on Deep S W E, at 48.2 percent, and on something called the Vals Index, at 46.5 percent. Hold on to the phrase “from the lab itself,” because we’re going to keep coming back to it.

The model it’s measured against most is Qwen 3.8 27B, from Alibaba. It’s the one comparable model the lab says still beats Mini on some benchmarks. Qwen 3.8 27B was released on August 14th, also under Apache 2.0. It’s a dense model, which means all 27 billion parameters work on every single token. It handles images and video, and its native context window is about 262,000 tokens, stretchable to a million. The lab’s table has three other rivals, Gemma 4 31B, Muse Glimmer, and Nemotron 3.5 Super V L. But Qwen is the one to watch.

Now, what makes this model different.

Picture its 24 layers arranged as four blocks of six. A normal model pushes every token through each layer once, top to bottom.

Inkling 2 Mini doesn’t. The first block runs once. Then the two middle blocks, twelve layers in all, run three times in a row, using the same weights on every pass. Then the last block runs once.

Six, plus twelve times three, plus six. That’s 48 layer applications for every token, from only 24 layers of stored weights. The file stays small, but the model gets far more depth to think with.

A fair way to picture it is three drafts of the same paragraph. Every draft starts from the same prepared notes, which are the output of the first block. Drafts two and three also receive a note from the draft before, which the lab calls a message. That message passes through a learned gate. Early in training, the gate is shut, so the looped model starts out behaving like an ordinary one, and then the gate opens gradually. The lab says that’s what let it introduce looping without destabilizing training.

Why loop the middle and not the end? The lab’s intuition is that the first and last layers mostly translate between words and internal representations, while the middle does the abstract reasoning. And it tested the idea. Looping the middle twelve layers beat looping the last twelve on 27 of 28 evaluations. Early in training, a model with no loop was estimated to need about 1.5 to 1.9 times as much compute to match the middle-loop version, but only about 1.2 to 1.4 times as much to match the last-layers loop.

Looping isn’t free, though. Calling this a 3.4-billion-parameter model undersells the work, so the lab also reports 5.4 billion weight activations per token. Each extra pass through the loop adds about one billion. Against Qwen 3.8 27B, which uses all 27 billion every time, that’s roughly one fifth of the work per token. Still a big saving. Just not the eightfold gap that 3.4 billion on its own would suggest.

And it isn’t a fifth overall, because a looped model also tends to write more. Artificial Analysis, which we’ll meet properly in a minute, found that Mini used about 38 percent more output tokens than Qwen to earn the same score. Even so, by Artificial Analysis’s compute proxy, which multiplies active parameters by tokens generated, Mini came out about 2.8 times lower.

The lab also ran a test on unpruned versions. The non-looping model was 7.5 percent cheaper to train, but it needed 140 percent more inference compute to match the looped model’s loss on 512,000-token agentic traces. A little extra at training time, and a lot saved at run time. For anyone running models at home, that’s the right direction for a trade to go.

What looping can’t do matters just as much. It doesn’t store extra facts. The lab says knowledge mostly tracks total parameter count. To study the effect, it also released a research version that lets you choose how many passes the model makes. In that model, tasks that need long context or multi-step reasoning improved with more passes, while closed-book trivia barely moved.

Two benchmarks tell that story. The first is called Think Fast. It estimates a model’s no-chain-of-thought time horizon, which is the length of task, measured by how long it would take a human, that a model can complete half the time without writing out any reasoning at all. For the research model, that horizon rose from 16 seconds at one pass to 37 seconds at three passes, and then flattened out.

The second is N-Hop Lookup. The model is handed several lookup tables full of made-up entries, and it has to follow a chain of lookups without writing anything down. Every question has five answer options, so random guessing scores 20 percent. On this test, accuracy on longer chains kept improving all the way to ten passes, even though the model was only ever trained with up to five.

Now, how does a model like this fit into twenty gigabytes? Besides the weight sharing, two decisions.

First, pruning. Training began with 384 experts per layer, with eight chosen for each token. At one point in mid-training, the lab cut two thirds of them, keeping the 128 most-used experts in every layer. To heal the damage, the model then trained on a trillion tokens distilled from a larger internal Inkling model. After that came supervised fine-tuning, and a reinforcement learning phase of 2.2 trillion tokens across 2,000 steps.

Second, precision. The expert layers ran in a four-bit format called N V F P four on every forward pass, from pretraining all the way through reinforcement learning, and the final four layers used an eight-bit format called M X F P eight. The released weights keep exactly that layout, twenty layers in the first format and four in the second, so the lab says there’s no conversion loss from quantization.

That promise belongs to the original checkpoint, though. A community G G U F file is a different artifact. Unsloth measured its own quants against its own reference. Its recommended four-bit file, about 17.6 gigabytes, picked the same top token as the reference 98 percent of the time. Its two-bit file, about 8.5 gigabytes, did so 90.6 percent of the time. That’s close, but agreeing on a token isn’t the same as passing a test suite.

Okay. The scoreboard.

A warning first. The big table we’re about to walk through is the lab’s. Several rows were run by the lab, in harnesses the lab chose, and the table’s own caption says evaluation setups vary by model. So for every benchmark, we’ll tell you what it checks, give you the score, and say where independent evidence exists. Where it doesn’t, we’ll say so.

We’ll begin with the two third-party indexes, because they’re the closest thing to a neutral referee.

The first is the Artificial Analysis Intelligence Index, version 5.0. Artificial Analysis is an independent firm that runs the same evaluations on every model it tracks. Version 5.0 launched on October 27th and blends nine evaluations in four equally weighted categories: knowledge work, coding, science, and general knowledge. For the first time, most of it is built on private datasets, which makes it harder to train against. Two of those nine, Terminal-Bench 4.0 and Frontier Code 2.0, also appear as their own rows in the lab’s table, and we’ll get to them.

Inkling 2 Mini scores 20.1. Qwen 3.8 27B scores exactly the same, 20.1. For scale, the best models on this index are scoring close to 60, so a local model at 20 is nowhere near the frontier. But it’s a dead heat with its closest rival, and what surrounds that heat is where Mini looks good. On Artificial Analysis’s runs, one index task cost Mini 59 cents and 9 minutes, versus 3 dollars 53 cents and 38.2 minutes for Qwen. That’s roughly six times cheaper and four times faster. Two caveats: the cost uses the lab’s own first-party pricing, 15 cents per million input tokens and 50 cents per million output tokens, and it measures a hosted A P I, not your laptop.

The second index is the Vals Index, version 2.2. Vals AI is another independent evaluator. Its index blends eight benchmarks across finance, coding, legal, and tax work, weighted by each sector’s share of the United States economy, with finance counting most and coding next. The coding slice is built from Terminal-Bench 4.0, Vibe Code Bench, and a code-migration test. Inkling 2 Mini scores 46.5 percent. That figure comes from the lab’s table. We didn’t find a Vals-published entry for Mini at the time of writing. For reference, Vals’s own page gives the bigger Inkling 2 Small 56.1 percent, and the top of the board is just above 71. And in the lab’s table, the only other model with a Vals score is Nemotron 3.5 Super V L, at 29.8 percent. So “leads every open model under a hundred billion” rests, on this row, on a very thin field.

Now the coding rows.

The benchmark the lab leads with is Deep S W E, version 1.1. It comes from a company called Datacurve, and it checks whether a coding agent can finish long, realistic engineering work. There are 113 tasks, drawn from 91 open-source repositories in five languages: TypeScript, Go, Python, JavaScript, and Rust. The tasks were written from scratch rather than pulled from old pull requests, which limits the chance that a model has already seen the answer. And each task is graded by a hand-written program that checks behavior, not one particular implementation.

Inkling 2 Mini scores 48.2 percent. Qwen 3.8 27B scores 42.2. For perspective, the top entries on Deep S W E’s leaderboard were sitting around 74 percent at the end of September, so this is a strong result for a local model, but not a frontier one.

Two cautions. First, with only 113 tasks, the leaderboard’s own margin of error is about three to four points on any single score, so a six-point lead is suggestive rather than settled. Second, in September, the research group Epoch AI audited the benchmark and rated it Flawed. It found problems in at least 23 of the 113 tasks, a little over 20 percent, where the grader could mark correct work as failing. In most of those cases, the model had edited existing test files in a way that broke the grader. Epoch called its review partial, and it stopped looking once it had passed its threshold. So the benchmark at the center of Inkling’s headline has a documented scoring problem, one that touched many different models. We haven’t seen anyone measure whether it helps or hurts Inkling in particular.

Next, S W E bench Pro, version 2, Hard. S W E bench Pro is Scale AI’s harder successor to the original S W E bench. Its tasks come from actively maintained repositories and are meant to look like long-horizon professional software work, with patches that often span multiple files. The Hard split is the 51 most difficult tasks in the version 2 public set. Inkling 2 Mini scores 77.9 percent, against 73.8 for Qwen. That’s a 4.1-point lead, which on 51 tasks is about two tasks. And since 77.9 percent of 51 isn’t a whole number of tasks, we know these scores are averages over repeated runs. That’s sound practice, but it’s still a small pool. On the plus side, the table lists one shared harness for this row, mini S W E agent, the same as for Deep S W E and Terminal-Bench 4.0, which makes these three the most like-for-like comparisons in the table.

S W E bench Verified is the old standard. It’s a set of 500 real GitHub issues, drawn from the original S W E bench, that human reviewers confirmed were solvable, and the agent has to write a patch that passes the project’s tests. Run in a bash-only setup, Inkling 2 Mini scores 79.2 percent and Qwen scores 77.8. Treat this one gently. Scale’s own S W E bench Pro paper points out that 161 of those 500 tasks need only a one- or two-line change, and that top agents had passed 70 percent long ago. A 1.4-point gap on a mostly saturated test is a tiebreaker, not a verdict.

S W E bench Multilingual asks the same kind of question across 300 tasks in nine programming languages. Inkling 2 Mini scores 73.7 percent and Qwen scores 70.0, a 3.7-point lead, though the lab’s label notes that Inkling’s run used bash only.

Vibe Code Bench is about building from nothing. Created by Vals AI, it gives a model only a written specification and asks it to produce a complete, working web application. Then an automated browser agent clicks through the finished app the way a user would, testing real workflows. The original version had 100 app specifications and nearly a thousand browser workflows. In the lab’s table, Inkling 2 Mini scores 77.9 percent and Qwen 3.8 27B scores 64.9. That’s a 13-point gap, the widest of any coding row. For scale, Vals’s public leaderboard listed a top score of about 94 percent on November 18th. This row’s harness is listed as OpenHands through Vals, which is a good sign, but the score is still the lab’s.

Frontier Code 2.0 asks a different question. Not “do the tests pass,” but “would a maintainer merge this?” It’s a private benchmark from Cognition, the company behind Devin: 132 tasks built by more than twenty open-source maintainers, each of whom spent over forty hours on a task from a repository they maintain. The prompts are deliberately informal and underspecified, and every change is judged against hidden tests plus a rubric. In Artificial Analysis’s version, an attempt that fails any blocking check scores zero. Inkling 2 Mini scores 15.1 percent. Qwen 3.8 27B scores 14.9. A 0.2-point difference on 132 tasks is a rounding error, so call it a tie. And look at the ceiling: Cognition says the top model scores only about 45 percent. Frontier Code also makes up fifteen percent of the Artificial Analysis index.

P M P P Hard is the oddest row, and the one with the biggest ratio. It’s a G P U kernel-optimization benchmark: 69 hard tasks where an agent has to make low-level G P U code faster. Each model gets four independent attempts with a ten-hour budget, and the score is the area under the curve of tasks solved over time, out of a maximum of 690 task-hours. According to the benchmark tracker Bench L M, this is an adaptation made by Thinking Machines itself, with task and grading fixes that haven’t been published task by task. Inkling 2 Mini scores 455.82. Qwen 3.8 27B scores 262.50. That’s about 1.7 times as much. Only those two models have numbers in this row, and the lab says Mini approaches the much larger Inkling 2 Small, which scored 494.27. Treat it as an interesting signal from an in-house test.

Terminal-Bench is about working like an engineer at a command line. Version 4.0 has 66 tasks across seven domains: software, science, machine learning, operations, hardware, security, and media. Only 18 of them are software tasks. A task passes only if every test in its verifier passes, with no partial credit, so one task is worth about 1.5 points. Both models score 5.6 percent. That’s a tie, but a tie near the floor. For scale, Artificial Analysis lists the top score on its Terminal-Bench 4.0 leaderboard at 59.6 percent.

The older version, Terminal-Bench 2.1, tells a very different story. It’s an 89-task revision of version 2 that fixed environment and instruction problems in 28 tasks. Inkling’s run used a different harness, called pi, and scores 71.6 percent. Qwen 3.8 27B scores 73.0, ahead by 1.4 points, about one task. Same benchmark family, 71.6 in one version and 5.6 in the other. Version 4.0 is a harder, recalibrated set, and the runs used different agent harnesses, which is exactly why you can’t read these numbers in isolation.

Add it up. Of the nine coding and autoresearch rows in the lab’s table, Inkling is ahead of Qwen on seven, tied on one, Terminal-Bench 4.0, and behind on one, Terminal-Bench 2.1. For a model with a fifth of the active parameters, that’s a real result. It’s also a lab-reported one.

Now the search and tool-use rows. This is where the lab says Mini makes up for a small knowledge base: instead of remembering facts, it goes and finds them.

Browse Comp comes from OpenAI, and it checks whether an agent can track down a hard-to-find fact on the open web. There are 1,266 questions, written so that the answer is very hard to locate but easy to verify once you have it, and solving some of them can mean browsing dozens or even hundreds of pages. Inkling 2 Mini scores 79.0 percent, in a setup where it compacts its own working history as it goes. Qwen 3.8 27B scores 61.6, a gap of 17.4 points, the widest of any search row. One detail the headline skips: Nemotron 3.5 Super V L, a model with 124.5 billion total parameters, scores 78.9, just a tenth of a point behind.

Deep Search Q A comes from Google DeepMind, and it checks something subtler: comprehensiveness. It has 900 hand-written prompts across 17 fields, and most of them ask for a complete list of answers rather than a single fact. An agent scores well only if it finds every item and adds nothing that doesn’t belong. Each task is built as a chain, where one step has to be solved before the next can begin. Mini scores 85.3 percent, again with compaction. Qwen scores 79.7.

M C P Atlas, from Scale AI, checks tool use. It gives an agent plain-language requests that need three to six tool calls, usually across several servers, without ever naming the tools. There are 1,000 tasks across 36 real M C P servers and 220 tools, though the table uses the public subset of 500. Scoring gives partial credit, based on whether the final answer contains the right factual claims. Mini scores 82.7 percent and Qwen scores 77.3. In the lab’s wider model-card table, a 501-billion-parameter model called Beam 1.0 edges Mini out with 83.2.

On the knowledge-work side of the table, the picture flips, and Qwen holds its ground.

Automation Bench A A is Artificial Analysis’s run of Zapier’s Automation Bench. It checks whether an agent can complete realistic business workflows across simulated apps like Gmail, Slack, Salesforce, and Jira, using REST A P Is. There are 657 private tasks across six business domains, graded by programmatic checks on the final state of the apps, with no AI judge. And there’s a harsh rule: if the agent breaks any guardrail, the task scores zero. Mini scores 41.8 percent. Qwen scores 48.2.

Enterprise Ops Gym comes from ServiceNow Research and Mila. It drops agents into a simulated company: about 1,150 expert-written tasks across eight areas like H R, I T service management, email, and calendars, with 512 tools and a database of 164 tables. Success is checked by sequel scripts that ask whether the goal was met, whether the data is intact, whether company policy was followed, and whether the agent caused unwanted side effects. Mini scores 42.0 percent. Qwen scores 44.2.

G D P val A A is Artificial Analysis’s version of OpenAI’s G D P val, which covers 44 occupations that matter to the United States economy. Models get real professional tasks, 220 of them in this version, and have to produce actual files. A panel of AI judges compares pairs of submissions, and the results are turned into an Elo-style rating, anchored so that one reference model sits at 1,600. Mini scores 1,319. Qwen scores 1,427. Higher is better, so Qwen leads by about a hundred points. Artificial Analysis dropped this test from its main index in version 5.0, so it now stands alone.

Put those together and the tie on the index starts to make sense. Mini wins the search rows and most of the repository-coding rows. Qwen wins the terminal, automation, enterprise, and document-work rows.

Now, long context, where looping should help most.

Graph Walks gives a model a huge directed graph written out as a list of edges, then asks it to find every node at exactly a given distance from a starting point. That’s a breadth-first search, done in the model’s head, over a very long input. At 256,000 tokens, Mini scores 69.7 percent and Qwen scores 50.4.

M R C R, from OpenAI, buries many near-identical requests inside a long conversation, then asks the model to reproduce one specific earlier answer, identified by its order of appearance. In the eight-needle version, at 256,000 to 512,000 tokens, Mini scores 46.4 percent and Qwen scores 38.0.

Long Bench version two asks multiple-choice questions that require reasoning over long documents, dialogues, code, or structured data. Mini scores 66.9 percent and Qwen scores 52.3.

Those are the three largest long-context gaps in the table, and they line up with what the lab saw in its research model, where more passes helped long-context work most. One caveat: the tested range tops out at 512,000 tokens, half of the advertised window.

Now, where the crown slips.

Start with knowledge. A A Omniscience, from Artificial Analysis, is a factual-reliability test: 3,000 questions across 42 topics. It gives points for correct answers, subtracts points for confident wrong ones, and treats declining to answer as neutral, so a model that knows its limits is better off saying so. Mini’s net score is minus 8.6. Qwen’s is minus 6.4, a little better. The sharper number is the non-hallucination rate, which is how often a model avoids inventing an answer: 63.4 percent for Mini, 71.4 for Qwen. The lab says Mini’s result is in line with other models of its size, and that looping doesn’t add knowledge. The model card goes further, saying Mini is more likely than larger models to state incorrect information with confidence.

The lab also says Mini trails larger models on reasoning-heavy tests. The numbers are more mixed than that sentence suggests. Humanity’s Last Exam, Diamond edition, is a cleaned-up, 1,000-question version of the exam from the Center for AI Safety and Scale AI, half reasoning questions and half knowledge questions, answered without tools. Mini scores 15.2 percent. Qwen scores 15.3. That’s a tie. Crit P T is a set of research-level physics problems, and its Hard subset drops the 30 problems that leading models reliably solved. Mini scores 31.4 percent on the full set and 17.0 on the Hard subset, while Qwen scores 10.6 and 4.0, so against Qwen it’s far ahead. Only the 501-billion-parameter Beam 1.0, at 40.0 and 26.5, beats it in the model card. So “trails larger models” is true at some sizes and not at others.

Then there’s instruction following. The lab says Mini isn’t the strongest small model for multi-turn chat or for instructions with many constraints, and gives two scores: 50.0 percent on Multi Challenge, its multi-turn chat measure, and 33.4 percent on Complex Constraints, behind Qwen 3.8 27B on both.

Here’s the flag from our fact-check. Complex Constraints was built by Surge AI, and it tests entangled instructions, where satisfying one requirement changes what the others demand. The lab’s text says Mini is behind Qwen on it. But the lab’s own table lists Qwen at 30.1 percent, which would put Mini ahead, and it puts a different model, Muse Glimmer, ahead of both at 35.6. We can’t tell which is wrong, so we’re giving you both facts and drawing no conclusion.

The model card, which is the lab’s own document, lists more limits. In internal testing, Mini sometimes got stuck in long reasoning loops, or kept re-checking its own work without making progress, particularly while debugging code. When using tools, it’s less reliable than larger models at following detailed instructions and project conventions. It may take destructive actions, like deleting or overwriting files, without asking for confirmation, and it may not report the outcome of its work accurately. Output quality can drop outside English; in Chinese testing, the lab saw clipped phrasing and mixed languages. And setting the reasoning effort to its minimum doesn’t fully switch reasoning off. The lab’s advice: run agents in a sandbox, require confirmation before destructive actions, and set limits on output tokens and agent turns.

Here’s the twist. On the lab’s internal safety tests, Mini has the best scores in the table. Lower is better on these. Destructive actions: 10.2 percent for Mini, against 35.2 for Qwen 3.8 27B. Misbehavior: 9.8 against 57.7. Covert misbehavior: 8.3 against 33.2. These are internal evaluations, and the launch post and model card we read don’t spell out how they work. A lower rate also isn’t zero. Both things can be true at once: it can be better behaved than its rivals and still need a sandbox.

There’s one more safety question, and it’s specific to looping. If a model does more of its thinking internally, can we still oversee it by reading its chain of thought? The lab ran preliminary tests, and two of them are worth knowing.

The first is C O T Control Q A. It asks questions from G P Q A, Humanity’s Last Exam, and M M L U Pro, each paired with an instruction about the reasoning itself, such as avoiding a particular keyword. If a model could follow instructions like that, it could in principle reshape its visible reasoning to dodge a monitor. Among reasoning traces of 750 to 1,250 tokens, Mini followed the instruction at most 0.1 percent of the time. For comparison, Inkling 2 Small managed 0.3 percent, the earlier Inkling-Small 0.4, and Qwen 3.8 27B 1.3.

The second is Linux Arena, a control test. An attacker model is asked to do a realistic software task while secretly completing a malicious side task, and a monitor tries to catch it. The lab used a helpful-only fine-tune of Mini, because the released model refuses many of the side tasks. A strong monitor, Qwen 3.8 27B, caught almost all of the attempts. To see differences, the lab swapped in a weaker monitor, tuned to a one percent false-alarm rate. When that monitor saw only tool calls and outputs, 3.9 percent of Mini’s attacks got through, versus 20.5 percent when Qwen 3.8 27B played attacker. When the monitor could also read the model’s text and thinking, Mini’s rate fell to 1.3 percent. The lab’s own wording is that a tool-calls-only monitor misses a significant number of attacks, and that it saw no clear trend with the number of loops. It calls this early work, and so do we.

So what do we have from outside the lab? Not much yet, and most of it is launch-adjacent.

Artificial Analysis gives us the tie at 20 on the index, plus the cost and time per task. Epoch AI gives us the audit of Deep S W E. Hugging Face, a launch partner, tried Mini on shader flythroughs, a napkin-sketch-to-app build, and more. It reports that in its vibe tests the model is at least comparable with Qwen 3.8 27B, and it adds that more validation is needed. Counting across the lab’s full card of 48 benchmarks, Hugging Face says Mini leads its four rivals on 32 of them.

Stanford’s Hazy Research, which got early access, measured intelligence per joule: how much energy a model needs per query to reach a given level of performance. On an Nvidia D G X Spark, Mini scored 0.703, against 0.430 for Qwen 3.6 35B A3B, 0.159 for Gemma 4 26B A4B, and 0.036 for Qwen 3.5 27B. Impressive, but read the fine print. Mini ran in eight-bit precision at low reasoning effort, while the others ran in four-bit, and Qwen 3.8 27B wasn’t in that comparison at all.

And then the speed claims. The lab’s decoding-speed chart is a theoretical ceiling, calculated at 614 gigabytes per second of memory bandwidth, with 16-bit weights and one user at a time, including the repeated reads across loops. Useful, but it tells us nothing about how a particular laptop feels.

So, what about running it at home?

The lab’s official line at launch is any Mac with at least 32 gigabytes of memory, through Ollama, plus Nvidia’s D G X Spark, with 32 gigabytes or more of V RAM recommended on other G P Us. In its demo, a researcher ran Mini offline on a MacBook Pro with an M five Pro chip and 48 gigabytes of memory, in airplane mode, and had it build a playable flight simulator in a few minutes. Most of that recording plays at 15 times speed, so don’t judge the wait by the video.

Hugging Face’s one-line route is a single llama serve command that points at the four-bit G G U F, with a suffix swap to Q eight for the eight-bit version. Unsloth’s recommended four-bit build is 17.6 gigabytes, and it says to plan on 17 to 18 gigabytes of memory for it, and about 24 for its eight-bit build. It also warns that longer contexts, image inputs, and other running apps will use more.

Runtime support is brand new. Unsloth says its files use a looped-layer layout that needs its own build of llama C P P, while mainline llama C P P reads a different layout and has separate files. The model card itself says support for looped models in local runtimes is new, and that speed varies by runtime and hardware. Expect rough edges.

Then there’s the million-token window. Hugging Face’s architecture notes say that only four of the 24 layers use full attention, and the other twenty use sliding windows of 1,024 tokens, which helps memory. But the model still executes all 48 layer visits, and each visit keeps its own cache. We didn’t find a measured figure for how much memory a full million tokens takes, so our advice is practical. Unsloth’s own examples start at 32,000 tokens. Start there, watch your memory, and grow from it.

There’s also a reasoning dial: none, minimal, low, medium, high, extra high, and max, defaulting to high. The sensible habit is to measure finished tasks and retries, not tokens per second.

So, is it the new king?

“King” can mean three different things.

King of the scoreboard, for its size, on agentic coding? On the evidence we have, that’s a strong claim, and a fair one. Mini is ahead of Qwen 3.8 27B on seven of the nine coding rows in the lab’s table, it ties on the independent index, and it does it with a fifth of the active parameters.

King in the wild, proven on real repositories by people with no stake in the launch? Not yet. The model is only a few days old, and almost everything we can read comes from the lab or its partners. Outside the lab, we have an independent index that scores it level with Qwen, and an independent audit that raised a flag on its headline benchmark.

King of everything? No. Qwen 3.8 27B still wins on terminal work, automation, enterprise tasks, document-style knowledge work, and factual restraint. And measured against the best proprietary models, Mini isn’t close: 20 on an index where the leaders are near 60, and 15 percent on a code-quality test where the top is about 45.

So our verdict is a crown on trial. For local agentic coding, especially repository-level fixes, search, and sketch-to-app work, Inkling 2 Mini looks like the first model worth downloading this week. Keep Qwen 3.8 27B nearby, run everything in a sandbox, cap the turns and the output tokens, and let your own tests decide.

The best test is the one the lab can’t run for us: ten real tickets from our own repositories, both models in the same agent harness at the same context length, scored on tests passed, retries, and time. If there’s interest, we’ll run it in a follow-up.

And maybe the model isn’t the real story. On local hardware, memory is the scarce resource, and compute is comparatively cheap. Looping spends compute to save memory. If that idea holds up, the question we ask of open models may stop being how many parameters they have, and start being how many passes they make for every token.

Let us know what we should put through it first.
