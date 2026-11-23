import React from "react";
import {C, FONT_DISPLAY} from "../theme";
import {at, prog} from "../timing";
import {
  Arrow,
  Label,
  SketchCircle,
  SketchLine,
  SketchPath,
  SketchPolygon,
  SketchRect,
} from "../components/Sketch";
import {
  Callout,
  Chip,
  DotField,
  Icon,
  MiniLineChart,
  MiniNote,
  Rule,
  Stat,
  Stamp,
} from "../components/Kit";
import {BenchBars, BenchFoot, BenchNote, BenchTitle, BenchTicker} from "../components/Bench";
import {Browser, CheckBadge, CrossBadge, DocPage, Spark} from "../components/Art";
import {SceneProps, useClock} from "./types";

const Fade: React.FC<{t: number; start: number; dur?: number; children: React.ReactNode; dim?: number}> = ({
  t,
  start,
  dur = 0.45,
  children,
  dim = 1,
}) => <g opacity={prog(t, start, dur) * dim}>{children}</g>;

/* ================================================================== */
/* 72 — search, not memory                                            */
/* ================================================================== */

export const S72_Search: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const search = b(at("Now the search and tool use rows"));
  const smallKnowledge = b(at("Mini makes up for a small knowledge base"));
  const instead = b(at("instead of remembering facts"));
  const find = b(at("it goes and finds them"));

  return (
    <>
      <g>
        <Icon name="brain" x={480} y={480} s={2.0} color={C.cyan} start={smallKnowledge} />
        <Label text="a small knowledge base" x={480} y={700} size={38} color={C.cyan} start={smallKnowledge + 0.1} />
        <g opacity={prog(t, instead, 0.4)}>
          <Label text="doesn't remember" x={480} y={760} size={36} color={C.soft} start={instead} />
        </g>
      </g>
      <Arrow x1={800} y1={480} x2={1080} y2={480} start={find - 0.2} dur={0.5} stroke={C.green} strokeWidth={4} seed={11000} head={18} />
      <g>
        <Icon name="globe" x={1380} y={480} s={2.0} color={C.green} start={find - 0.2} />
        <Icon name="search" x={1520} y={600} s={0.9} color={C.yellow} start={find} />
        <Label text="goes and finds them" x={1380} y={700} size={38} color={C.green} start={find + 0.1} />
      </g>
      <Label text="search and tools fill the gap" x={960} y={870} size={38} color={C.soft} start={find + 0.4} />
      <Rule y={920} x1={300} x2={1620} start={search} opacity={0.25} />
    </>
  );
};

/* ================================================================== */
/* 73 — BrowseComp                                                    */
/* ================================================================== */

export const S73_Browse: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const name = b(at("Browse Comp comes from OpenAI"));
  const questions = b(at("There are 1,266 questions"));
  const hard = b(at("very hard to locate but easy to verify"));
  const pages = b(at("browsing dozens or even hundreds of pages"));
  const compaction = b(at("compacts its own working history"));

  return (
    <>
      <g>
        <Label text="1,266 questions" x={930} y={310} size={76} color={C.cyan} start={questions} font={FONT_DISPLAY} />
        <Label text="hard to find" x={830} y={380} size={40} color={C.yellow} start={hard} />
        <Label text="easy to verify" x={830} y={434} size={36} color={C.soft} start={hard + 0.2} />
      </g>
      <g>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <SketchRect x={280 + i * 34} y={470 + i * 26} w={240} h={150} start={questions + i * 0.1} dur={0.35} stroke={C.line} fill={C.panel} radius={8} seed={11100 + i} strokeWidth={2.2} />
            <SketchLine x1={310 + i * 34} y1={520 + i * 26} x2={480 + i * 34} y2={520 + i * 26} start={questions + 0.2 + i * 0.1} dur={0.3} stroke={C.soft} strokeWidth={3} seed={11110 + i} opacity={0.7} />
            <SketchLine x1={310 + i * 34} y1={560 + i * 26} x2={450 + i * 34} y2={560 + i * 26} start={questions + 0.25 + i * 0.1} dur={0.3} stroke={C.soft} strokeWidth={3} seed={11120 + i} opacity={0.5} />
          </g>
        ))}
      </g>
      <g>
        <Browser x={760} y={420} w={680} h={400} start={-1} color={C.cyan} url="the open web">
          <SketchRect x={810} y={510} w={580} h={60} start={pages + 0.2} dur={0.3} stroke={C.line} fill={C.well} radius={10} seed={11130} strokeWidth={2.2} />
          <Label text="page 214 of 380" x={1100} y={548} size={36} color={C.soft} start={pages + 0.35} />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <SketchRect x={810 + i * 200} y={600} w={180} h={130} start={pages + 0.3 + i * 0.1} dur={0.3} stroke={C.line} fill={C.well} radius={8} seed={11140 + i} strokeWidth={2} />
              <SketchLine x1={835 + i * 200} y1={640} x2={960 + i * 200} y2={640} start={pages + 0.4 + i * 0.1} dur={0.2} stroke={C.cyan} strokeWidth={3} seed={11150 + i} opacity={0.6} />
            </g>
          ))}
        </Browser>
      </g>
      <g opacity={prog(t, compaction, 0.45)}>
        <Chip x={1480} y={700} text="compacts its notes" color={C.green} textColor={C.green} start={compaction} size={36} w={380} />
      </g>
    </>
  );
};

/* ================================================================== */
/* 74 — BrowseComp scores                                             */
/* ================================================================== */

export const S74_BrowseScore: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const mini = b(at("Inkling 2 Mini scores 79.0"));
  const qwen = b(at("Qwen 3.8 27B scores 61.6"));
  const gap = b(at("a gap of 17.4 points"));
  const widest = b(at("widest of any search row"));
  const nem = b(at("Nemotron 3.5 Super V L", 2));
  const behind = b(at("just a tenth of a point behind"));

  return (
    <>
      <BenchTitle name="BrowseComp" check="find a hard fact on the open web" startName={mini - 0.5} />
      <BenchBars mini={79.0} qwen={61.6} startMini={mini} startQwen={qwen} gap="+17.4 pts" startGap={gap} y={460} />
      <g opacity={prog(t, nem, 0.45)}>
        <SketchRect x={1120} y={740} w={520} h={120} start={nem} dur={0.4} stroke={C.cyan} fill={C.panel} radius={12} seed={11200} strokeWidth={2.6} />
        <Label text="Nemotron 3.5 Super VL" x={1380} y={785} size={38} color={C.cyan} start={nem + 0.1} />
        <Label text="78.9 · just 0.1 behind" x={1380} y={832} size={36} color={C.soft} start={behind} />
      </g>
      <g opacity={prog(t, widest, 0.4)}>
        <Label text="the widest search gap" x={600} y={820} size={38} color={C.green} start={widest} />
      </g>
    </>
  );
};

/* ================================================================== */
/* 75 — DeepSearchQA                                                  */
/* ================================================================== */

export const S75_DeepSearch: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const name = b(at("Deep Search Q A comes from Google DeepMind"));
  const comprehensive = b(at("checks something subtler"));
  const prompts = b(at("900 hand written prompts"));
  const every = b(at("finds every item"));
  const chain = b(at("each task is built as a chain"));
  const mini = b(at("Mini scores 85.3"));
  const qwen = b(at("Qwen scores 79.7"));

  return (
    <>
      <g>
        <Label text="comprehensiveness" x={960} y={300} size={46} color={C.cyan} start={comprehensive} />
        <SketchRect x={300} y={360} w={560} h={400} start={-1} dur={0.5} stroke={C.line} fill={C.panel} radius={16} seed={11300} strokeWidth={2.8} />
        <Label text="900 prompts · 17 fields" x={580} y={420} size={38} color={C.soft} start={prompts + 0.1} />
        {["item one", "item two", "item three", "item four", "item five", "item six"].map((s, i) => (
          <g key={i}>
            <CheckBadge x={360} y={480 + i * 46} s={0.32} start={every + i * 0.1} />
            <Label text={s} x={390} y={480 + i * 46} size={36} color={i === 5 ? C.red : C.soft} align="left" start={every + i * 0.1} />
          </g>
        ))}
        <Label text="every item, nothing extra" x={580} y={790} size={36} color={C.green} start={every + 0.6} />
      </g>
      <g>
        <SketchRect x={960} y={380} w={600} h={340} start={chain} dur={0.5} stroke={C.purple} fill={C.panel} radius={16} seed={11310} strokeWidth={2.8} />
        <Label text="a chain of steps" x={1260} y={440} size={40} color={C.purple} start={chain + 0.1} />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <SketchCircle x={1090 + i * 160} y={560} d={80} start={chain + 0.2 + i * 0.1} dur={0.3} stroke={C.purple} fill={C.well} seed={11320 + i} strokeWidth={2.6} />
            <Label text={`${i + 1}`} x={1090 + i * 160} y={560} size={36} color={C.purple} start={chain + 0.3 + i * 0.1} />
            {i < 2 ? <Arrow x1={1140 + i * 160} y1={560} x2={1190 + i * 160} y2={560} start={chain + 0.35 + i * 0.1} dur={0.2} stroke={C.purple} strokeWidth={2.6} seed={11330 + i} head={10} /> : null}
          </g>
        ))}
        <BenchTicker x={1080} y={700} to={85.3} start={mini} decimals={1} suffix="%" size={82} color={C.green} align="left" />
        <BenchTicker x={1420} y={700} to={79.7} start={qwen} decimals={1} suffix="%" size={82} color={C.purple} align="left" />
      </g>
    </>
  );
};

/* ================================================================== */
/* 76 — MCP Atlas: tools without names                                */
/* ================================================================== */

export const S76_MCP: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const name = b(at("M C P Atlas, from Scale AI"));
  const plain = b(at("plain language requests"));
  const calls = b(at("three to six tool calls"));
  const servers = b(at("across several servers"));
  const naming = b(at("without ever naming the tools"));
  const tasks = b(at("There are 1,000 tasks"));
  const publicSet = b(at("public subset of 500"));
  const partial = b(at("Scoring gives partial credit"));

  return (
    <>
      <g>
        <SketchRect x={260} y={330} w={430} h={190} start={-1} dur={0.45} stroke={C.yellow} fill={C.panel} radius={14} seed={11400} strokeWidth={2.8} />
        <Label text="“book me a table" x={475} y={390} size={38} color={C.fg} start={plain + 0.1} />
        <Label text="near the station”" x={475} y={445} size={38} color={C.fg} start={plain + 0.2} />
        <Label text="no tool names" x={475} y={495} size={36} color={C.soft} start={naming} />
      </g>
      <Arrow x1={700} y1={425} x2={820} y2={425} start={calls} dur={0.35} stroke={C.cyan} strokeWidth={3} seed={11410} head={12} />
      <g>
        <SketchRect x={830} y={360} w={220} h={130} start={calls} dur={0.45} stroke={C.cyan} fill={C.panel} radius={14} seed={11411} strokeWidth={2.8} />
        <Label text="3–6 calls" x={940} y={410} size={40} color={C.cyan} start={calls + 0.1} />
        <Label text="several servers" x={940} y={458} size={36} color={C.soft} start={servers} />
      </g>
      <g>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <Arrow x1={1050} y1={395 + i * 20} x2={1160} y2={330 + i * 90} start={calls + 0.2 + i * 0.1} dur={0.25} stroke={C.line} strokeWidth={2.4} seed={11420 + i} head={10} />
            <SketchRect x={1160} y={290 + i * 90} w={220} h={72} start={calls + 0.3 + i * 0.1} dur={0.3} stroke={C.cyan} fill={C.well} radius={8} seed={11430 + i} strokeWidth={2.4} />
            <Label text={`server ${i + 1}`} x={1270} y={330 + i * 90} size={36} color={C.cyan} start={calls + 0.4 + i * 0.1} />
          </g>
        ))}
      </g>
      <g>
        <Chip x={1450} y={620} text="1,000 tasks" color={C.soft} textColor={C.fg} start={tasks} size={38} w={300} />
        <Chip x={1450} y={700} text="36 servers · 220 tools" color={C.soft} textColor={C.fg} start={tasks + 0.3} size={36} w={460} />
        <Chip x={1450} y={780} text="public 500" color={C.yellow} textColor={C.yellow} start={publicSet} size={36} w={280} />
      </g>
      <g opacity={prog(t, partial, 0.45)}>
        <Label text="partial credit for factual claims" x={960} y={900} size={36} color={C.soft} start={partial} />
      </g>
    </>
  );
};

/* ================================================================== */
/* 77 — MCP Atlas scores                                              */
/* ================================================================== */

export const S77_MCPScore: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const mini = b(at("Mini scores 82.7"));
  const qwen = b(at("Qwen scores 77.3"));
  const beam = b(at("a 501 billion parameter model called Beam 1.0"));
  const edges = b(at("edges Mini out with 83.2"));

  return (
    <>
      <BenchTitle name="MCP Atlas" check="tool use across servers" startName={mini - 0.5} />
      <BenchBars mini={82.7} qwen={77.3} startMini={mini} startQwen={qwen} gap="+5.4 pts" startGap={qwen + 0.3} y={460} />
      <g opacity={prog(t, beam, 0.45)}>
        <SketchRect x={1060} y={730} w={580} h={120} start={beam} dur={0.4} stroke={C.yellow} fill={C.panel} radius={12} seed={11500} strokeWidth={2.8} />
        <Label text="Beam 1.0 · 501B" x={1350} y={775} size={40} color={C.yellow} start={beam + 0.1} />
        <Label text="83.2 · edges Mini out" x={1350} y={825} size={36} color={C.soft} start={edges} />
      </g>
    </>
  );
};

/* ================================================================== */
/* 78 — Automation Bench: business workflows                          */
/* ================================================================== */

export const S78_Automation: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const name = b(at("Automation Bench A A"));
  const flows = b(at("realistic business workflows"));
  const apps = b(at("simulated apps like Gmail"));
  const tasks = b(at("657 private tasks"));
  const programmatic = b(at("graded by programmatic checks"));
  const guardrail = b(at("if the agent breaks any guardrail"));
  const mini = b(at("Mini scores 41.8"));
  const qwen = b(at("Qwen scores 48.2"));

  return (
    <>
      <BenchTitle
        name="Automation Bench AA"
        check="realistic business workflows"
        startName={name}
        startCheck={flows}
        meta={[
          {text: "657 tasks", at: tasks, color: C.cyan},
          {text: "6 domains", at: tasks + 0.3, color: C.cyan},
          {text: "guardrail = 0", at: guardrail, color: C.red},
        ]}
      />
      <g>
        {["Gmail", "Slack", "Salesforce", "Jira"].map((s, i) => (
          <Chip key={s} x={370 + i * 190} y={500} text={s} color={C.line} textColor={C.fg} start={apps + i * 0.12} size={36} w={170} h={48} />
        ))}
        <Arrow x1={1010} y1={500} x2={1120} y2={500} start={apps + 0.5} dur={0.3} stroke={C.line} strokeWidth={2.6} seed={11600} head={10} />
        <SketchRect x={1140} y={450} w={420} h={100} start={programmatic} dur={0.4} stroke={C.green} fill={C.panel} radius={10} seed={11601} strokeWidth={2.6} />
        <Label text="programmatic checks" x={1350} y={505} size={36} color={C.green} start={programmatic + 0.1} />
      </g>
      <g>
        <BenchTicker x={500} y={690} to={41.8} start={mini} decimals={1} suffix="%" size={100} color={C.green} align="left" />
        <Label text="Mini" x={500} y={735} size={36} color={C.green} align="left" start={mini + 0.2} />
        <BenchTicker x={900} y={690} to={48.2} start={qwen} decimals={1} suffix="%" size={100} color={C.purple} align="left" />
        <Label text="Qwen" x={900} y={735} size={36} color={C.purple} align="left" start={qwen + 0.2} />
        <g opacity={prog(t, guardrail + 0.2, 0.4)}>
          <Stamp x={1420} y={700} text="GUARDRAIL = 0" color={C.red} size={38} rotate={-5} start={guardrail + 0.2} w={440} />
        </g>
      </g>
      <Label text="Qwen holds the knowledge-work rows" x={960} y={860} size={38} color={C.soft} start={qwen + 0.4} />
    </>
  );
};

/* ================================================================== */
/* 79 — Enterprise Ops Gym                                            */
/* ================================================================== */

export const S79_Enterprise: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const name = b(at("Enterprise Ops Gym"));
  const company = b(at("drops agents into a simulated company"));
  const tasks = b(at("about 1,150 expert written tasks"));
  const areas = b(at("across eight areas"));
  const tools = b(at("512 tools and a database"));
  const checks = b(at("Success is checked by sequel scripts"));
  const mini = b(at("Mini scores 42.0"));
  const qwen = b(at("Qwen scores 44.2"));

  return (
    <>
      <g>
        <Icon name="server" x={340} y={420} s={1.4} color={C.cyan} start={-1} />
        <Label text="a simulated company" x={340} y={560} size={38} color={C.cyan} start={company + 0.1} />
        <Chip x={340} y={650} text="1,150 tasks" color={C.soft} textColor={C.fg} start={tasks} size={36} w={300} />
        <Chip x={340} y={730} text="8 areas" color={C.soft} textColor={C.fg} start={areas} size={36} w={220} />
        <Chip x={340} y={810} text="512 tools · 164 tables" color={C.soft} textColor={C.fg} start={tools} size={36} w={470} />
      </g>
      <g>
        <SketchRect x={680} y={330} w={580} h={400} start={checks} dur={0.5} stroke={C.yellow} fill={C.panel} radius={16} seed={11700} strokeWidth={2.8} />
        <Label text="SQL checks" x={970} y={390} size={40} color={C.yellow} start={checks + 0.1} />
        {["goal met?", "data intact?", "policy followed?", "side effects?"].map((s, i) => (
          <g key={s}>
            <CheckBadge x={730} y={460 + i * 62} s={0.4} start={checks + 0.2 + i * 0.12} />
            <Label text={s} x={770} y={460 + i * 62} size={38} color={C.fg} align="left" start={checks + 0.2 + i * 0.12} />
          </g>
        ))}
      </g>
      <g>
        <BenchTicker x={1350} y={500} to={42.0} start={mini} decimals={1} suffix="%" size={90} color={C.green} align="left" />
        <Label text="Mini" x={1350} y={545} size={36} color={C.green} align="left" start={mini + 0.2} />
        <BenchTicker x={1350} y={660} to={44.2} start={qwen} decimals={1} suffix="%" size={90} color={C.purple} align="left" />
        <Label text="Qwen" x={1350} y={705} size={36} color={C.purple} align="left" start={qwen + 0.2} />
      </g>
      <Label text="Qwen still leads here" x={960} y={880} size={38} color={C.soft} start={qwen + 0.4} />
    </>
  );
};

/* ================================================================== */
/* 80 — GDPval AA: Elo ladder                                         */
/* ================================================================== */

export const S80_GDPval: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const name = b(at("G D P val A A"));
  const occupations = b(at("covers 44 occupations"));
  const tasks = b(at("220 of them in this version"));
  const files = b(at("produce actual files"));
  const judges = b(at("panel of AI judges"));
  const elo = b(at("Elo style rating"));
  const anchor = b(at("one reference model sits at 1,600"));
  const mini = b(at("Mini scores 1,319"));
  const qwen = b(at("Qwen scores 1,427"));
  const leads = b(at("Qwen leads by about a hundred points"));
  const dropped = b(at("dropped this test from its main index"));

  const yOf = (v: number) => 820 - ((v - 1200) / 400) * 420;
  return (
    <>
      <SketchRect x={900} y={350} w={680} h={520} start={-1} dur={0.3} stroke={C.line} fill={C.well} radius={12} seed={11820} strokeWidth={2} opacity={0.3} />
      <g>
        <Label text="44 occupations" x={340} y={330} size={40} color={C.cyan} align="left" start={occupations} />
        <Label text="220 tasks" x={340} y={390} size={36} color={C.soft} align="left" start={tasks} />
        <Label text="real files" x={340} y={450} size={36} color={C.soft} align="left" start={files} />
        <Label text="AI judges · pairwise" x={340} y={540} size={38} color={C.cyan} align="left" start={judges} />
        <Label text="Elo-style rating" x={340} y={600} size={38} color={C.cyan} align="left" start={elo} />
        <Label text="anchor 1,600" x={340} y={660} size={36} color={C.soft} align="left" start={anchor} />
      </g>
      <g>
        <SketchLine x1={980} y1={380} x2={980} y2={850} start={elo} dur={0.5} stroke={C.soft} strokeWidth={3} seed={11800} />
        {[1200, 1300, 1400, 1500, 1600].map((v) => (
          <g key={v}>
            <SketchLine x1={950} y1={yOf(v)} x2={980} y2={yOf(v)} start={elo + 0.1} dur={0.2} stroke={C.soft} strokeWidth={2} seed={11801 + v} />
            <Label text={`${v}`} x={930} y={yOf(v)} size={36} color={C.soft} align="right" start={elo + 0.15} />
          </g>
        ))}
        <g opacity={prog(t, mini, 0.4)}>
          <SketchCircle x={1120} y={yOf(1319)} d={30} start={mini} dur={0.25} stroke={C.green} fill={C.green} seed={11810} strokeWidth={2} />
          <Label text="Mini 1,319" x={1150} y={yOf(1319)} size={42} color={C.green} align="left" start={mini + 0.1} />
        </g>
        <g opacity={prog(t, qwen, 0.4)}>
          <SketchCircle x={1120} y={yOf(1427)} d={30} start={qwen} dur={0.25} stroke={C.purple} fill={C.purple} seed={11811} strokeWidth={2} />
          <Label text="Qwen 1,427" x={1150} y={yOf(1427)} size={42} color={C.purple} align="left" start={qwen + 0.1} />
        </g>
        <g opacity={prog(t, anchor, 0.4)}>
          <SketchCircle x={1120} y={yOf(1600)} d={20} start={anchor} dur={0.2} stroke={C.yellow} fill={C.yellow} seed={11812} strokeWidth={1.6} />
          <Label text="reference 1,600" x={1150} y={yOf(1600)} size={36} color={C.yellow} align="left" start={anchor + 0.1} />
        </g>
        <g opacity={prog(t, leads, 0.4)}>
          <Label text="+100 Qwen" x={1480} y={yOf(1370)} size={50} color={C.purple} start={leads} font={FONT_DISPLAY} />
        </g>
      </g>
      <g opacity={prog(t, dropped, 0.4)}>
        <Label text="dropped from the index in v5.0" x={960} y={930} size={36} color={C.soft} start={dropped} />
      </g>
    </>
  );
};

/* ================================================================== */
/* 81 — the split                                                     */
/* ================================================================== */

export const S81_Split: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const together = b(at("Put those together"));
  const miniWins = b(at("Mini wins the search rows"));
  const qwenWins = b(at("Qwen wins the terminal"));

  return (
    <>
      <g>
        <SketchRect x={250} y={330} w={670} h={500} start={-1} dur={0.5} stroke={C.green} fill={C.panel} radius={18} seed={11900} strokeWidth={3.2} />
        <Label text="Mini wins" x={585} y={410} size={54} color={C.green} start={miniWins} font={FONT_DISPLAY} />
        {["search rows", "repository coding", "long context"].map((s, i) => (
          <g key={s}>
            <CheckBadge x={330} y={510 + i * 76} s={0.5} start={miniWins + 0.2 + i * 0.15} />
            <Label text={s} x={380} y={510 + i * 76} size={42} color={C.fg} align="left" start={miniWins + 0.2 + i * 0.15} />
          </g>
        ))}
      </g>
      <g>
        <SketchRect x={1000} y={330} w={670} h={500} start={-1} dur={0.5} stroke={C.purple} fill={C.panel} radius={18} seed={11910} strokeWidth={3.2} />
        <Label text="Qwen wins" x={1335} y={410} size={54} color={C.purple} start={qwenWins} font={FONT_DISPLAY} />
        {["terminal", "automation", "enterprise", "documents"].map((s, i) => (
          <g key={s}>
            <CheckBadge x={1080} y={500 + i * 72} s={0.44} start={qwenWins + 0.2 + i * 0.15} color={C.purple} />
            <Label text={s} x={1125} y={500 + i * 72} size={40} color={C.fg} align="left" start={qwenWins + 0.2 + i * 0.15} />
          </g>
        ))}
      </g>
      <Label text="the tie starts to make sense" x={960} y={900} size={38} color={C.soft} start={qwenWins + 0.7} />
    </>
  );
};

/* ================================================================== */
/* 82 — GraphWalks                                                    */
/* ================================================================== */

export const S82_GraphWalks: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const longContext = b(at("Now, long context"));
  const graph = b(at("Graph Walks gives a model"));
  const edges = b(at("huge directed graph"));
  const bfs = b(at("That's a breadth first search"));
  const tokens = b(at("At 256,000 tokens"));
  const mini = b(at("Mini scores 69.7"));
  const qwen = b(at("Qwen scores 50.4"));

  const nodes = [
    [480, 380], [620, 330], [760, 390], [880, 330],
    [520, 500], [660, 460], [800, 520], [920, 470],
    [440, 620], [600, 590], [740, 640], [880, 600],
    [560, 720], [700, 730], [840, 710],
  ];
  const edgesIdx = [[0, 1], [1, 2], [2, 3], [0, 4], [1, 5], [2, 6], [3, 7], [4, 5], [5, 6], [6, 7], [4, 8], [5, 9], [6, 10], [7, 11], [8, 9], [9, 10], [10, 11], [8, 12], [9, 13], [10, 14], [12, 13], [13, 14]];
  const start = 0;
  return (
    <>
      <g>
        <SketchRect x={300} y={300} w={720} h={520} start={-1} dur={0.3} stroke={C.line} fill={C.well} radius={14} seed={12040} strokeWidth={1.8} opacity={0.3} />
        {edgesIdx.map(([a, c], i) => {
          const rad = i * 0.7;
          return <SketchLine key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[c][0]} y2={nodes[c][1]} start={graph + i * 0.03} dur={0.25} stroke={C.line} strokeWidth={2} seed={12000 + i} opacity={0.6} />;
        })}
        {nodes.map(([x, y], i) => {
          const dist = i === start ? 0 : i < 8 ? 1 : 2;
          const color = dist === 0 ? C.yellow : dist === 1 ? C.green : C.cyan;
          return (
            <g key={i}>
              <SketchCircle x={x} y={y} d={i === start ? 34 : 24} start={edges + i * 0.04} dur={0.2} stroke={color} fill={color} seed={12030 + i} strokeWidth={2} />
              {dist === 1 ? <SketchCircle x={x} y={y} d={54} start={bfs + 0.1} dur={0.3} stroke={C.green} fill="none" seed={12050 + i} strokeWidth={1.6} opacity={0.5} /> : null}
            </g>
          );
        })}
        <Label text="start" x={480} y={330} size={36} color={C.yellow} start={bfs} />
        <Label text="distance 1" x={690} y={300} size={36} color={C.green} start={bfs + 0.2} />
        <Label text="distance 2" x={900} y={640} size={36} color={C.cyan} start={bfs + 0.3} />
      </g>
      <g>
        <Label text="256,000 tokens" x={1320} y={350} size={42} color={C.soft} start={tokens} />
        <BenchTicker x={1320} y={470} to={69.7} start={mini} decimals={1} suffix="%" size={100} color={C.green} align="left" />
        <Label text="Mini" x={1320} y={515} size={36} color={C.green} align="left" start={mini + 0.2} />
        <BenchTicker x={1320} y={620} to={50.4} start={qwen} decimals={1} suffix="%" size={100} color={C.purple} align="left" />
        <Label text="Qwen" x={1320} y={665} size={36} color={C.purple} align="left" start={qwen + 0.2} />
      </g>
      <Rule y={900} x1={300} x2={1620} start={longContext} opacity={0.25} />
    </>
  );
};

/* ================================================================== */
/* 83 — MRCR                                                          */
/* ================================================================== */

export const S83_MRCR: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const name = b(at("M R C R, from OpenAI"));
  const near = b(at("buries many near identical requests"));
  const reproduce = b(at("reproduce one specific earlier answer"));
  const order = b(at("identified by its order of appearance"));
  const needles = b(at("eight needle version"));
  const mini = b(at("Mini scores 46.4"));
  const qwen = b(at("Qwen scores 38.0"));

  return (
    <>
      <g>
        <SketchRect x={260} y={320} w={460} h={540} start={name} dur={0.5} stroke={C.line} fill={C.well} radius={16} seed={12100} strokeWidth={2.8} />
        <Label text="one long conversation" x={490} y={370} size={36} color={C.soft} start={near} />
        {Array.from({length: 10}).map((_, i) => (
          <g key={i}>
            <SketchRect x={310} y={410 + i * 40} w={360} h={26} start={near + i * 0.05} dur={0.2} stroke={C.line} fill={C.panel} radius={5} seed={12110 + i} strokeWidth={1.4} opacity={i === 6 ? 1 : 0.5} />
            {i < 8 ? <SketchCircle x={690} y={423 + i * 40} d={14} start={needles + i * 0.06} dur={0.15} stroke={i === 5 ? C.yellow : C.cyan} fill={i === 5 ? C.yellow : C.cyan} seed={12130 + i} strokeWidth={1.4} /> : null}
          </g>
        ))}
        <g opacity={prog(t, needles, 0.4)}>
          <Label text="8 needles" x={490} y={820} size={40} color={C.yellow} start={needles} />
          <Label text="one earlier answer" x={490} y={870} size={36} color={C.soft} start={order} />
        </g>
      </g>
      <g>
        <Label text="256K–512K tokens" x={1280} y={370} size={42} color={C.soft} start={needles} />
        <BenchTicker x={1280} y={480} to={46.4} start={mini} decimals={1} suffix="%" size={100} color={C.green} align="left" />
        <Label text="Mini" x={1280} y={525} size={36} color={C.green} align="left" start={mini + 0.2} />
        <BenchTicker x={1280} y={630} to={38.0} start={qwen} decimals={1} suffix="%" size={100} color={C.purple} align="left" />
        <Label text="Qwen" x={1280} y={675} size={36} color={C.purple} align="left" start={qwen + 0.2} />
        <Label text="the 8-needle version" x={1280} y={780} size={36} color={C.soft} align="left" start={needles + 0.3} />
      </g>
      <Rule y={920} x1={300} x2={1620} start={name} opacity={0.25} />
    </>
  );
};

/* ================================================================== */
/* 84 — LongBench + the caveat                                        */
/* ================================================================== */

export const S84_LongBench: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const name = b(at("Long Bench version two"));
  const reasoning = b(at("multiple choice questions that require reasoning"));
  const mini = b(at("Mini scores 66.9"));
  const qwen = b(at("Qwen scores 52.3"));
  const gaps = b(at("the three largest long context gaps"));
  const caveat = b(at("the tested range tops out"));
  const half = b(at("half of the advertised window"));

  const rows = [
    {label: "GraphWalks", m: 69.7, q: 50.4, at: gaps},
    {label: "MRCR", m: 46.4, q: 38.0, at: gaps + 0.15},
    {label: "LongBench", m: 66.9, q: 52.3, at: gaps + 0.3},
  ];
  return (
    <>
      <g>
        <Label text="reasoning over long inputs" x={960} y={290} size={40} color={C.soft} start={reasoning} />
        {rows.map((r, i) => (
          <g key={r.label}>
            <Label text={r.label} x={330} y={390 + i * 106} size={38} color={C.fg} align="left" start={r.at} />
            <SketchRect x={560} y={365 + i * 106} w={640} h={30} start={-1} dur={0.4} stroke={C.line} fill={C.well} radius={15} seed={12200 + i} strokeWidth={2} />
            <SketchRect x={564} y={369 + i * 106} w={(632 * r.m) / 100} h={22} start={r.at + 0.15} dur={0.6} stroke={C.green} fill={C.green} radius={11} seed={12210 + i} strokeWidth={1.6} opacity={0.85} />
            <SketchRect x={564} y={405 + i * 106} w={(632 * r.q) / 100} h={22} start={r.at + 0.25} dur={0.6} stroke={C.purple} fill={C.purple} radius={11} seed={12220 + i} strokeWidth={1.6} opacity={0.8} />
            <Label text={r.m.toFixed(1)} x={1230} y={390 + i * 106} size={36} color={C.green} align="left" start={r.at + 0.5} />
            <Label text={r.q.toFixed(1)} x={1320} y={390 + i * 106} size={36} color={C.purple} align="left" start={r.at + 0.6} />
          </g>
        ))}
      </g>
      <g opacity={prog(t, caveat, 0.45)}>
        <SketchRect x={400} y={740} w={1120} h={46} start={caveat} dur={0.4} stroke={C.line} fill={C.well} radius={8} seed={12230} strokeWidth={2.2} />
        {Array.from({length: 20}).map((_, i) => (
          <SketchLine key={i} x1={430 + i * 54} y1={750} x2={430 + i * 54} y2={776} start={caveat + 0.2 + i * 0.02} dur={0.15} stroke={i < 10 ? C.green : C.soft} strokeWidth={2} seed={12240 + i} opacity={i < 10 ? 0.9 : 0.3} />
        ))}
        <Label text="tested to 512K" x={960} y={830} size={36} color={C.green} start={caveat + 0.4} />
        <Label text="half of the advertised 1M" x={960} y={882} size={36} color={C.soft} start={half} />
      </g>
    </>
  );
};
