import React from "react";
import {C, FONT_DISPLAY} from "../theme";
import {at, prog} from "../timing";
import {
  Arrow,
  Label,
  SketchArc,
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
import {Browser, CheckBadge, DocPage, CrossBadge, Spark} from "../components/Art";
import {SceneProps, useClock} from "./types";

const Fade: React.FC<{t: number; start: number; dur?: number; children: React.ReactNode; dim?: number}> = ({
  t,
  start,
  dur = 0.45,
  children,
  dim = 1,
}) => <g opacity={prog(t, start, dur) * dim}>{children}</g>;

/* ================================================================== */
/* 55 — SWE-bench Pro scores                                          */
/* ================================================================== */

export const S55_ProScore: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const mini = b(at("Inkling 2 Mini scores 77.9"));
  const qwen = b(at("against 73.8 for Qwen"));
  const lead = b(at("a 4.1 point lead"));
  const two = b(at("about two tasks"));
  const whole = b(at("isn't a whole number of tasks"));
  const pool = b(at("still a small pool"));

  return (
    <>
      <BenchTitle
        name="SWE-bench Pro v2 · Hard"
        check="51 of the hardest tasks"
        startName={mini - 0.5}
        meta={[
          {text: "77.9% of 51", at: whole, color: C.yellow},
          {text: "averaged runs", at: whole + 0.4, color: C.cyan},
          {text: "small pool", at: pool, color: C.orange},
        ]}
      />
      <BenchBars mini={77.9} qwen={73.8} startMini={mini} startQwen={qwen} gap="+4.1 pts" startGap={lead} y={480} />
      <g opacity={prog(t, two, 0.45)}>
        <Label text="≈ 2 tasks" x={900} y={790} size={36} color={C.green} start={two} />
      </g>
      <g opacity={prog(t, whole, 0.45)}>
        <SketchRect x={1080} y={710} w={540} h={120} start={whole} dur={0.4} stroke={C.yellow} fill={C.panel} radius={12} seed={8900} strokeWidth={2.6} />
        <Label text="39.7 of 51" x={1350} y={750} size={42} color={C.yellow} start={whole + 0.1} />
        <Label text="not a whole number" x={1350} y={798} size={36} color={C.soft} start={whole + 0.25} />
      </g>
      <Label text="small pool, repeated runs" x={630} y={870} size={36} color={C.soft} start={pool} />
    </>
  );
};

/* ================================================================== */
/* 56 — shared harness                                                */
/* ================================================================== */

export const S56_Harness: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const shared = b(at("one shared harness"));
  const name = b(at("mini S W E agent"));
  const same = b(at("the same as for Deep S W E"));
  const like = b(at("most like for like comparisons"));

  return (
    <>
      <g>
        <Card x={460} y={380} name="DeepSWE" color={C.green} at={same} />
        <Card x={960} y={380} name="SWE-bench Pro" color={C.cyan} at={shared} />
        <Card x={1460} y={380} name="Terminal-Bench 4.0" color={C.pink} at={same + 0.2} />
        <Arrow x1={460} y1={450} x2={960} y2={620} start={shared + 0.2} dur={0.4} stroke={C.line} strokeWidth={2.6} seed={9000} head={12} opacity={0.7} />
        <Arrow x1={1460} y1={450} x2={960} y2={620} start={shared + 0.3} dur={0.4} stroke={C.line} strokeWidth={2.6} seed={9001} head={12} opacity={0.7} />
        <Arrow x1={960} y1={450} x2={960} y2={620} start={shared + 0.1} dur={0.3} stroke={C.cyan} strokeWidth={3.2} seed={9002} head={14} />
        <SketchRect x={730} y={630} w={460} h={120} start={name} dur={0.45} stroke={C.yellow} fill={C.panel} radius={14} seed={9010} strokeWidth={3.2} />
        <Label text="mini-SWE-agent" x={960} y={682} size={44} color={C.yellow} start={name + 0.1} />
        <Label text="one harness" x={960} y={728} size={36} color={C.soft} start={name + 0.2} />
      </g>
      <g opacity={prog(t, like, 0.45)}>
        <Callout x={960} y={850} text="the most like-for-like rows in the table" color={C.green} start={like} size={40} w={760} icon={<Icon name="scale" color={C.green} start={like} />} />
      </g>
    </>
  );
};

const Card: React.FC<{x: number; y: number; name: string; color: string; at: number}> = ({x, y, name, color, at}) => (
  <g>
    <SketchRect x={x - 180} y={y - 80} w={360} h={130} start={at} dur={0.4} stroke={color} fill={C.panel} radius={14} seed={9020 + x} strokeWidth={2.8} />
    <Label text={name} x={x} y={y} size={38} color={color} start={at + 0.1} />
    <Label text="shared" x={x} y={y + 44} size={36} color={C.soft} start={at + 0.2} />
  </g>
);

/* ================================================================== */
/* 57 — SWE-bench Verified                                            */
/* ================================================================== */

export const S57_Verified: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const verified = b(at("S W E bench Verified is the old standard"));
  const issues = b(at("a set of 500 real GitHub issues"));
  const human = b(at("human reviewers confirmed"));
  const mini = b(at("Inkling 2 Mini scores 79.2"));
  const qwen = b(at("and Qwen scores 77.8"));
  const bash = b(at("Run in a bash only setup"));

  return (
    <>
      <BenchTitle
        name="SWE-bench Verified"
        check="500 real GitHub issues"
        startName={verified}
        startCheck={human}
        meta={[
          {text: "500 issues", at: issues, color: C.cyan},
          {text: "bash only", at: bash, color: C.yellow},
        ]}
      />
      <g>
        <DotField x={300} y={440} cols={25} rows={8} gap={22} d={10} start={issues} color={C.line} fill={C.well} stagger={0.004} seed={9100} />
        <Label text="500" x={600} y={760} size={80} color={C.cyan} start={issues + 0.2} font={FONT_DISPLAY} />
        <Label text="real issues" x={600} y={810} size={36} color={C.soft} start={issues + 0.3} />
      </g>
      <g>
        <BenchTicker x={1040} y={520} to={79.2} start={mini} decimals={1} suffix="%" size={110} color={C.green} align="left" />
        <Label text="Inkling 2 Mini" x={1040} y={570} size={36} color={C.green} align="left" start={mini + 0.2} />
        <BenchTicker x={1040} y={670} to={77.8} start={qwen} decimals={1} suffix="%" size={110} color={C.purple} align="left" />
        <Label text="Qwen 3.8 27B" x={1040} y={720} size={36} color={C.purple} align="left" start={qwen + 0.2} />
      </g>
      <Label text="the old standard" x={1440} y={860} size={38} color={C.soft} start={verified + 0.3} />
    </>
  );
};

/* ================================================================== */
/* 58 — a saturated test                                              */
/* ================================================================== */

export const S58_Saturated: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const gently = b(at("Treat this one gently"));
  const oneTwo = b(at("161 of those 500 tasks"));
  const line = b(at("one or two line change"));
  const top = b(at("top agents had passed 70 percent long ago"));
  const gap = b(at("A 1.4 point gap"));
  const tie = b(at("a tiebreaker, not a verdict"));

  return (
    <>
      <g>
        <Label text="of 500 tasks" x={580} y={300} size={38} color={C.soft} start={oneTwo} />
        <SketchCircle x={580} y={540} d={280} start={oneTwo} dur={0.5} stroke={C.line} fill={C.well} seed={9200} strokeWidth={3} />
        <SketchArc x={580} y={540} w={280} h={280} startAngle={0} stopAngle={Math.PI * 2 * (161 / 500)} start={oneTwo + 0.2} dur={0.8} stroke={C.orange} strokeWidth={16} seed={9201} />
        <Label text="161" x={580} y={520} size={96} color={C.orange} start={oneTwo + 0.4} font={FONT_DISPLAY} />
        <Label text="one- or two-line fixes" x={580} y={580} size={36} color={C.soft} start={line} />
      </g>
      <g>
        <Label text="top agents" x={1380} y={360} size={38} color={C.soft} start={top} />
        <Label text="70%+" x={1380} y={450} size={96} color={C.green} start={top + 0.2} font={FONT_DISPLAY} />
        <Label text="long ago" x={1380} y={510} size={36} color={C.soft} start={top + 0.35} />
        <g opacity={prog(t, gap, 0.45)}>
          <Chip x={1380} y={650} text="1.4-point gap" color={C.yellow} textColor={C.yellow} start={gap} size={40} w={380} />
          <Label text="a tiebreaker, not a verdict" x={1380} y={730} size={38} color={C.soft} start={tie} />
        </g>
      </g>
      <Rule y={840} x1={300} x2={1620} start={gently} opacity={0.25} />
    </>
  );
};

/* ================================================================== */
/* 59 — SWE-bench Multilingual                                        */
/* ================================================================== */

export const S59_Multilingual: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const multi = b(at("S W E bench Multilingual"));
  const tasks = b(at("across 300 tasks"));
  const languages = b(at("nine programming languages"));
  const mini = b(at("Inkling 2 Mini scores 73.7"));
  const qwen = b(at("and Qwen scores 70.0"));
  const bash = b(at("Inkling's run used bash only"));

  return (
    <>
      <BenchTitle
        name="SWE-bench Multilingual"
        check="the same question, nine languages"
        startName={multi}
        meta={[
          {text: "300 tasks", at: tasks, color: C.cyan},
          {text: "9 languages", at: languages, color: C.green},
          {text: "bash only", at: bash, color: C.yellow},
        ]}
      />
      <g>
        <Icon name="globe" x={310} y={520} s={1.5} color={C.cyan} start={languages} />
        <Label text="9" x={310} y={660} size={90} color={C.cyan} start={languages + 0.2} font={FONT_DISPLAY} />
        <Label text="languages" x={310} y={710} size={36} color={C.soft} start={languages + 0.3} />
        {["TypeScript", "Go", "Python", "JavaScript", "Rust", "Java", "C++", "Ruby", "PHP"].map((s, i) => (
          <Chip key={s} x={560 + (i % 3) * 230} y={430 + Math.floor(i / 3) * 62} text={s} color={C.line} textColor={C.fg} start={languages + 0.1 + i * 0.05} size={36} w={210} h={46} />
        ))}
      </g>
      <g>
        <BenchTicker x={1250} y={580} to={73.7} start={mini} decimals={1} suffix="%" size={100} color={C.green} align="left" />
        <Label text="Mini" x={1250} y={625} size={36} color={C.green} align="left" start={mini + 0.2} />
        <BenchTicker x={1250} y={730} to={70.0} start={qwen} decimals={1} suffix="%" size={100} color={C.purple} align="left" />
        <Label text="Qwen" x={1250} y={775} size={36} color={C.purple} align="left" start={qwen + 0.2} />
      </g>
      <Label text="a 3.7-point lead" x={1250} y={860} size={38} color={C.green} align="left" start={qwen + 0.4} />
    </>
  );
};

/* ================================================================== */
/* 60 — Vibe Code Bench: from nothing                                 */
/* ================================================================== */

export const S60_Vibe: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const vibe = b(at("Vibe Code Bench is about building"));
  const spec = b(at("gives a model only a written specification"));
  const app = b(at("complete, working web application"));
  const agent = b(at("automated browser agent clicks"));
  const workflows = b(at("nearly a thousand browser workflows"));
  const specs = b(at("100 app specifications"));

  return (
    <>
      <g>
        <DocPage x={260} y={330} w={250} h={320} start={spec} label="" color={C.yellow} lines={6} />
        <Label text="a written spec" x={385} y={720} size={38} color={C.yellow} start={spec + 0.2} />
        <Arrow x1={530} y1={470} x2={690} y2={470} start={app} dur={0.4} stroke={C.green} strokeWidth={3.4} seed={9300} head={14} />
        <Browser x={710} y={300} w={560} h={360} start={app} color={C.green} url="the finished app">
          <SketchRect x={760} y={390} w={460} h={70} start={app + 0.2} dur={0.35} stroke={C.green} fill={C.green} radius={8} seed={9301} strokeWidth={2} opacity={0.35} />
          <SketchRect x={760} y={490} w={200} h={130} start={app + 0.3} dur={0.35} stroke={C.line} fill={C.well} radius={8} seed={9302} strokeWidth={2} />
          <SketchRect x={990} y={490} w={230} h={130} start={app + 0.4} dur={0.35} stroke={C.line} fill={C.well} radius={8} seed={9303} strokeWidth={2} />
          <Label text="working app" x={990} y={720} size={38} color={C.green} start={app + 0.5} />
        </Browser>
        <g opacity={prog(t, agent, 0.45)}>
          <Arrow x1={1280} y1={470} x2={1400} y2={470} start={agent} dur={0.35} stroke={C.cyan} strokeWidth={3.2} seed={9310} head={12} />
          <Icon name="search" x={1470} y={470} s={0.9} color={C.cyan} start={agent + 0.1} />
          <Label text="browser agent" x={1470} y={560} size={38} color={C.cyan} start={agent + 0.2} />
        </g>
      </g>
      <g>
        <g opacity={prog(t, specs, 0.45)}>
          <Chip x={560} y={850} text="100 specs" color={C.soft} textColor={C.fg} start={specs} size={38} w={250} />
        </g>
        <g opacity={prog(t, workflows, 0.45)}>
          <Chip x={920} y={850} text="~1,000 workflows" color={C.soft} textColor={C.fg} start={workflows} size={38} w={360} />
        </g>
      </g>
    </>
  );
};

/* ================================================================== */
/* 61 — the widest coding gap                                         */
/* ================================================================== */

export const S61_VibeScore: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const mini = b(at("scores 77.9 percent and Qwen 3.8 27B scores 64.9"));
  const gap = b(at("a 13 point gap"));
  const widest = b(at("the widest of any coding row"));
  const top = b(at("a top score of about 94 percent"));

  return (
    <>
      <BenchTitle name="Vibe Code Bench" check="spec → working app" startName={mini - 0.5} />
      <BenchBars mini={77.9} qwen={64.9} startMini={mini} startQwen={mini + 0.3} gap="+13 pts" startGap={gap} y={480} />
      <g opacity={prog(t, top, 0.45)}>
        <SketchLine x1={540 + 800 * 0.94} y1={400} x2={540 + 800 * 0.94} y2={760} start={top} dur={0.35} stroke={C.yellow} strokeWidth={2.6} seed={9400} dash />
        <Label text="top ≈ 94" x={540 + 800 * 0.94 - 10} y={382} size={36} color={C.yellow} align="right" start={top + 0.15} />
      </g>
      <g opacity={prog(t, widest, 0.45)}>
        <Stamp x={960} y={900} text="WIDEST CODING GAP" color={C.green} size={38} rotate={-4} start={widest} w={540} />
      </g>
    </>
  );
};

/* ================================================================== */
/* 62 — the harness caveat                                            */
/* ================================================================== */

export const S62_VibeHarness: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const harness = b(at("harness is listed as OpenHands"));
  const good = b(at("which is a good sign"));
  const lab = b(at("but the score is still the lab's"));

  return (
    <>
      <g>
        <Chip x={680} y={430} text="OpenHands" color={C.cyan} textColor={C.cyan} start={harness} size={46} w={380} />
        <Arrow x1={890} y1={430} x2={1010} y2={430} start={good} dur={0.3} stroke={C.cyan} strokeWidth={3} seed={9500} head={12} />
        <Chip x={1200} y={430} text="via Vals" color={C.cyan} textColor={C.cyan} start={harness + 0.3} size={44} w={300} />
        <g opacity={prog(t, good, 0.45)}>
          <CheckBadge x={1470} y={430} s={0.9} start={good} />
        </g>
        <g opacity={prog(t, lab, 0.45)}>
          <Label text="the score is still the lab's" x={960} y={620} size={48} color={C.yellow} start={lab} />
          <Stamp x={960} y={740} text="LAB-REPORTED" color={C.red} size={52} rotate={-5} start={lab + 0.2} w={480} />
        </g>
      </g>
      <Label text="a listed harness is a good sign" x={960} y={860} size={38} color={C.soft} start={good + 0.2} />
    </>
  );
};

/* ================================================================== */
/* 63 — Frontier Code: would a maintainer merge this?                 */
/* ================================================================== */

export const S63_Frontier: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const frontier = b(at("Frontier Code 2.0 asks a different question"));
  const merge = b(at("would a maintainer merge this"));
  const cognition = b(at("private benchmark from Cognition"));
  const devin = b(at("the company behind Devin"));
  const tasks = b(at("132 tasks"));
  const maintainers = b(at("more than twenty open source maintainers"));
  const forty = b(at("spent over forty hours"));

  return (
    <>
      <g>
        <SketchRect x={620} y={300} w={680} h={330} start={frontier} dur={0.5} stroke={C.line} fill={C.panel} radius={16} seed={9600} strokeWidth={3} />
        <Label text="Pull request" x={960} y={370} size={42} color={C.soft} start={frontier + 0.1} />
        <Label text="would a maintainer merge this?" x={960} y={480} size={54} color={C.fg} start={merge} font={FONT_DISPLAY} />
        <SketchRect x={810} y={530} w={300} h={62} start={merge + 0.2} dur={0.3} stroke={C.line} fill={C.well} radius={8} seed={9601} strokeWidth={2.2} />
        <Label text="+ code changes" x={960} y={570} size={36} color={C.soft} start={merge + 0.35} />
      </g>
      <g>
        <Label text="Cognition" x={390} y={690} size={44} color={C.pink} align="left" start={cognition} />
        <Label text="the company behind Devin" x={390} y={740} size={36} color={C.soft} align="left" start={devin} />
        <Chip x={1450} y={690} text="132 tasks" color={C.cyan} textColor={C.cyan} start={tasks} size={40} w={300} />
        <Chip x={1450} y={770} text="20+ maintainers" color={C.cyan} textColor={C.cyan} start={maintainers} size={38} w={380} />
        <Chip x={1450} y={850} text="40+ hours each" color={C.cyan} textColor={C.cyan} start={forty} size={38} w={340} />
        {[0, 1, 2, 3, 4].map((i) => (
          <SketchCircle key={i} x={340 + i * 54} y={820} d={34} start={maintainers + i * 0.08} dur={0.2} stroke={C.soft} fill={C.line} seed={9610 + i} strokeWidth={2} />
        ))}
      </g>
    </>
  );
};

/* ================================================================== */
/* 64 — Frontier Code scores                                          */
/* ================================================================== */

export const S64_FrontierScore: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const informal = b(at("prompts are deliberately informal"));
  const rubric = b(at("hidden tests plus a rubric"));
  const blocking = b(at("fails any blocking check scores zero"));
  const mini = b(at("Inkling 2 Mini scores 15.1"));
  const qwen = b(at("Qwen 3.8 27B scores 14.9"));
  const tie = b(at("so call it a tie"));

  return (
    <>
      <BenchTitle
        name="Frontier Code 2.0"
        check="informal prompts, hidden tests"
        startName={informal - 0.4}
        startCheck={rubric}
        meta={[
          {text: "blocking = 0", at: blocking, color: C.red},
          {text: "132 tasks", at: informal + 0.2, color: C.cyan},
        ]}
      />
      <BenchBars mini={15.1} qwen={14.9} startMini={mini} startQwen={qwen} domain={50} gap="0.2 ≈ tie" startGap={tie} y={480} />
      <Label text="would a maintainer merge it?" x={960} y={850} size={38} color={C.soft} start={tie + 0.2} />
    </>
  );
};

/* ================================================================== */
/* 65 — the ceiling                                                   */
/* ================================================================== */

export const S65_Ceiling: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const notClose = b(at("A 0.2 point difference"));
  const tie = b(at("so call it a tie"));
  const ceiling = b(at("look at the ceiling"));
  const top = b(at("top model scores only about 45"));
  const share = b(at("Frontier Code also makes up fifteen percent"));

  return (
    <>
      <g>
        <Label text="0.2 points on 132 tasks" x={960} y={300} size={40} color={C.soft} start={notClose} />
        <Label text="a rounding error" x={960} y={380} size={54} color={C.yellow} start={tie} font={FONT_DISPLAY} />
        <SketchLine x1={520} y1={720} x2={1400} y2={720} start={ceiling} dur={0.6} stroke={C.soft} strokeWidth={3} seed={9700} />
        {[0, 15, 30, 45].map((v) => (
          <g key={v}>
            <SketchLine x1={520 + (v / 45) * 880} y1={720} x2={520 + (v / 45) * 880} y2={748} start={ceiling + 0.1} dur={0.2} stroke={C.soft} strokeWidth={2.4} seed={9701 + v} />
            <Label text={`${v}`} x={520 + (v / 45) * 880} y={790} size={36} color={C.soft} start={ceiling + 0.2} />
          </g>
        ))}
        <SketchCircle x={520 + (15.1 / 45) * 880} y={690} d={28} start={tie + 0.2} dur={0.25} stroke={C.green} fill={C.green} seed={9710} strokeWidth={2} />
        <Label text="Mini 15.1" x={520 + (15.1 / 45) * 880} y={650} size={38} color={C.green} start={tie + 0.3} />
        <g opacity={prog(t, ceiling, 0.45)}>
          <SketchLine x1={1400} y1={600} x2={1400} y2={722} start={ceiling} dur={0.3} stroke={C.red} strokeWidth={3} seed={9720} />
          <Label text="best ≈ 45" x={1390} y={570} size={38} color={C.red} align="right" start={top} />
        </g>
      </g>
      <g opacity={prog(t, share, 0.45)}>
        <SketchCircle x={330} y={860} d={90} start={share} dur={0.4} stroke={C.yellow} fill="none" seed={9730} strokeWidth={3} />
        <SketchPath d="M 330 860 L 330 815 A 45 45 0 0 1 372 848 Z" start={share + 0.2} dur={0.4} stroke={C.yellow} fill={C.yellow} fillStart={share + 0.4} seed={9731} strokeWidth={2} />
        <Label text="15% of the AA index" x={400} y={860} size={38} color={C.yellow} align="left" start={share + 0.2} />
      </g>
    </>
  );
};

/* ================================================================== */
/* 66 — PMPP Hard intro                                               */
/* ================================================================== */

export const S66_PMPP: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const odd = b(at("P M P P Hard is the oddest row"));
  const gpu = b(at("G P U kernel optimization benchmark"));
  const tasks = b(at("69 hard tasks"));
  const attempts = b(at("four independent attempts"));
  const budget = b(at("ten hour budget"));
  const auc = b(at("area under the curve"));
  const taskHours = b(at("maximum of 690 task hours"));

  return (
    <>
      <g>
        <Icon name="chip" x={340} y={400} s={1.5} color={C.cyan} start={gpu} />
        <Label text="GPU kernels" x={340} y={530} size={42} color={C.cyan} start={gpu + 0.2} />
        <Chip x={340} y={640} text="69 tasks" color={C.yellow} textColor={C.yellow} start={tasks} size={38} w={260} />
        <Chip x={340} y={720} text="4 × 10 hours" color={C.yellow} textColor={C.yellow} start={attempts} size={38} w={320} />
      </g>
      <g>
        <Label text="area under the curve" x={1260} y={300} size={40} color={C.soft} start={auc} />
        <MiniLineChart
          x={890}
          y={340}
          w={670}
          h={360}
          start={attempts}
          color={C.green}
          showArea
          xLabels={["0", "2h", "4h", "6h", "8h", "10h"]}
          yLabels={["690", "0"]}
          points={[
            {x: 0, y: 0.02},
            {x: 0.18, y: 0.18},
            {x: 0.4, y: 0.42},
            {x: 0.62, y: 0.6},
            {x: 0.8, y: 0.7},
            {x: 1, y: 0.76},
          ]}
        />
        <Label text="out of 690 task-hours" x={1260} y={790} size={38} color={C.soft} start={taskHours} />
      </g>
    </>
  );
};

/* ================================================================== */
/* 67 — PMPP scores                                                   */
/* ================================================================== */

export const S67_PMPPScore: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const adaptations = b(at("benchmark tracker Bench L M"));
  const unpublished = b(at("haven't been published task by task"));
  const mini = b(at("Inkling 2 Mini scores 455.82"));
  const qwen = b(at("Qwen 3.8 27B scores 262.50"));
  const ratio = b(at("about 1.7 times as much"));
  const small = b(at("much larger Inkling 2 Small"));
  const signal = b(at("interesting signal from an in house test"));

  return (
    <>
      <BenchTitle name="PMPP Hard" check="task-hours solved" startName={mini - 0.4} />
      <g>
        <SketchLine x1={300} y1={760} x2={1660} y2={760} start={mini} dur={0.6} stroke={C.soft} strokeWidth={3} seed={9800} />
        <Row x={300} y={410} name="Inkling 2 Small" value={494.27} max={690} at={small} color={C.soft} dim />
        <Row x={300} y={530} name="Inkling 2 Mini" value={455.82} max={690} at={mini} color={C.green} />
        <Row x={300} y={650} name="Qwen 3.8 27B" value={262.5} max={690} at={qwen} color={C.purple} />
        <g opacity={prog(t, ratio, 0.45)}>
          <Label text="1.7×" x={1510} y={610} size={100} color={C.green} start={ratio} font={FONT_DISPLAY} />
          <Label text="the Qwen score" x={1510} y={670} size={36} color={C.soft} start={ratio + 0.2} />
        </g>
      </g>
      <g opacity={prog(t, adaptations, 0.45)}>
        <Chip x={640} y={270} text="TML adaptation" color={C.orange} textColor={C.orange} start={adaptations} size={36} w={360} />
        <Label text="fixes unpublished" x={1050} y={270} size={36} color={C.soft} start={unpublished} />
      </g>
      <g opacity={prog(t, signal, 0.45)}>
        <Label text="an in-house signal" x={960} y={880} size={38} color={C.yellow} start={signal} />
      </g>
    </>
  );
};

const Row: React.FC<{x: number; y: number; name: string; value: number; max: number; at: number; color: string; dim?: boolean}> = ({x, y, name, value, max, at, color, dim}) => (
  <g opacity={dim ? 0.55 : 1}>
    <Label text={name} x={x} y={y} size={38} color={color} align="left" start={at} />
    <SketchRect x={x} y={y + 30} w={1000} h={46} start={at} dur={0.4} stroke={C.line} fill={C.well} radius={23} seed={9810 + value} strokeWidth={2.2} />
    <SketchRect x={x + 4} y={y + 34} w={Math.max(10, (992 * value) / max)} h={38} start={at + 0.2} dur={0.8} stroke={color} fill={color} radius={19} seed={9820 + value} strokeWidth={2} opacity={0.8} />
    <Label text={value.toFixed(2)} x={x + 1010} y={y + 70} size={44} color={color} align="left" start={at + 0.3} font={FONT_DISPLAY} />
  </g>
);

/* ================================================================== */
/* 68 — Terminal-Bench 4.0                                            */
/* ================================================================== */

export const S68_TB4: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const tb = b(at("Terminal Bench is about working"));
  const version = b(at("Version 4.0 has 66 tasks"));
  const domains = b(at("across seven domains"));
  const software = b(at("Only 18 of them are software tasks"));
  const verifier = b(at("every test in its verifier passes"));
  const both = b(at("Both models score 5.6"));
  const tie = b(at("a tie near the floor"));
  const top = b(at("top score on its Terminal Bench 4.0"));

  return (
    <>
      <BenchTitle
        name="Terminal-Bench 4.0"
        check="66 tasks · 7 domains"
        startName={tb}
        startCheck={domains}
        meta={[
          {text: "18 software", at: software, color: C.green},
          {text: "no partial credit", at: verifier, color: C.red},
        ]}
      />
      <g>
        <DotField x={300} y={450} cols={11} rows={6} gap={34} d={20} start={tb} color={C.line} fill={C.well} highlight={Array.from({length: 18}, (_, i) => i)} highlightColor={C.green} highlightFill={C.green} stagger={0.01} seed={9900} />
        <Label text="18 / 66" x={640} y={760} size={44} color={C.green} start={software + 0.2} />
        <Label text="software" x={640} y={810} size={36} color={C.soft} start={software + 0.3} />
      </g>
      <g>
        <Stat x={1150} y={500} value="5.6%" color={C.green} size={120} start={both} />
        <Stat x={1500} y={500} value="5.6%" color={C.purple} size={120} start={both + 0.2} />
        <Chip x={1320} y={620} text="a tie near the floor" color={C.yellow} textColor={C.yellow} start={tie} size={38} w={430} />
        <g opacity={prog(t, top, 0.45)}>
          <Label text="top: 59.6%" x={1320} y={740} size={40} color={C.soft} start={top} />
        </g>
      </g>
      <Label text="all tests pass, or zero" x={960} y={880} size={38} color={C.soft} start={verifier + 0.2} />
    </>
  );
};

/* ================================================================== */
/* 69 — Terminal-Bench 2.1                                            */
/* ================================================================== */

export const S69_TB21: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const older = b(at("The older version, Terminal Bench 2.1"));
  const revision = b(at("89 task revision"));
  const fixed = b(at("fixed environment and instruction problems"));
  const harness = b(at("different harness, called pi"));
  const mini = b(at("and scores 71.6"));
  const qwen = b(at("Qwen 3.8 27B scores 73.0"));
  const ahead = b(at("ahead by 1.4 points"));

  return (
    <>
      <BenchTitle
        name="Terminal-Bench 2.1"
        check="the older revision"
        startName={older}
        startCheck={revision}
        meta={[
          {text: "89 tasks", at: revision, color: C.cyan},
          {text: "28 fixed", at: fixed, color: C.green},
          {text: "harness: pi", at: harness, color: C.yellow},
        ]}
      />
      <BenchBars mini={71.6} qwen={73.0} startMini={mini} startQwen={qwen} gap="−1.4 pts" gapColor={C.red} startGap={ahead} y={480} />
      <g opacity={prog(t, ahead, 0.45)}>
        <Chip x={1450} y={700} text="≈ 1 task" color={C.red} textColor={C.red} start={ahead + 0.2} size={40} w={260} />
      </g>
      <Label text="a different harness from 4.0" x={960} y={850} size={38} color={C.soft} start={harness + 0.2} />
    </>
  );
};

/* ================================================================== */
/* 70 — the same family, a different story                            */
/* ================================================================== */

export const S70_SameFamily: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const same = b(at("Same benchmark family"));
  const numbers = b(at("71.6 in one version and 5.6 in the other"));
  const harder = b(at("harder recalibrated set"));
  const harnesses = b(at("different agent harnesses"));
  const isolation = b(at("can't read these numbers in isolation"));

  return (
    <>
      <g>
        <VersionCard x={550} y={430} version="4.0" score="5.6" color={C.red} at={numbers} sub="recalibrated" />
        <VersionCard x={1370} y={430} version="2.1" score="71.6" color={C.green} at={numbers + 0.4} sub="older revision" />
        <Label text="≠" x={960} y={470} size={110} color={C.yellow} start={same + 0.2} font={FONT_DISPLAY} />
        <g opacity={prog(t, harder, 0.45)}>
          <Chip x={550} y={720} text="harder set" color={C.red} textColor={C.red} start={harder} size={38} w={280} />
        </g>
        <g opacity={prog(t, harnesses, 0.45)}>
          <Chip x={1370} y={720} text="harness: pi" color={C.green} textColor={C.green} start={harnesses} size={38} w={300} />
        </g>
      </g>
      <g opacity={prog(t, isolation, 0.45)}>
        <Callout x={960} y={850} text="you can't read these numbers in isolation" color={C.yellow} start={isolation} size={40} w={900} icon={<Icon name="gauge" color={C.yellow} start={isolation} />} />
      </g>
    </>
  );
};

const VersionCard: React.FC<{x: number; y: number; version: string; score: string; color: string; at: number; sub: string}> = ({x, y, version, score, color, at, sub}) => (
  <g>
    <SketchRect x={x - 250} y={y - 150} w={500} h={300} start={at} dur={0.45} stroke={color} fill={C.panel} radius={18} seed={10000 + x} strokeWidth={3.2} />
    <Label text={`v${version}`} x={x} y={y - 70} size={56} color={C.soft} start={at + 0.1} />
    <Label text={score} x={x} y={y + 30} size={130} color={color} start={at + 0.2} font={FONT_DISPLAY} />
    <Label text={sub} x={x} y={y + 105} size={38} color={C.soft} start={at + 0.3} />
  </g>
);

/* ================================================================== */
/* 71 — the tally                                                     */
/* ================================================================== */

export const S71_Tally: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const add = b(at("Add it up"));
  const nine = b(at("Of the nine coding and autoresearch rows"));
  const ahead = b(at("ahead of Qwen on seven"));
  const tied = b(at("tied on one"));
  const behind = b(at("behind on one"));
  const fifth = b(at("a fifth of the active parameters", 1));
  const reported = b(at("also a lab reported one"));

  const cells = Array.from({length: 9}, (_, i) => i);
  return (
    <>
      <g>
        <Label text="9 coding rows" x={960} y={280} size={40} color={C.soft} start={nine} />
        {cells.map((i) => {
          const filled = i < 7;
          const tiedCell = i === 7;
          const color = filled ? C.green : tiedCell ? C.soft : C.red;
          return (
            <g key={i}>
              <SketchRect x={600 + (i % 5) * 160} y={360 + Math.floor(i / 5) * 130} w={130} h={100} start={ahead + i * 0.08} dur={0.3} stroke={color} fill={C.panel} radius={10} seed={10100 + i} strokeWidth={2.6} />
              {filled ? <CheckBadge x={665 + (i % 5) * 160} y={400 + Math.floor(i / 5) * 130} s={0.45} start={ahead + i * 0.08 + 0.2} /> : null}
              {tiedCell ? <Label text="=" x={665 + (i % 5) * 160} y={420 + Math.floor(i / 5) * 130} size={50} color={C.soft} start={tied + 0.1} /> : null}
              {i === 8 ? <CrossBadge x={665 + (i % 5) * 160} y={400 + Math.floor(i / 5) * 130} s={0.45} start={behind + 0.1} /> : null}
            </g>
          );
        })}
        <Label text="7" x={700} y={700} size={100} color={C.green} start={ahead} font={FONT_DISPLAY} />
        <Label text="1" x={960} y={700} size={100} color={C.soft} start={tied} font={FONT_DISPLAY} />
        <Label text="1" x={1220} y={700} size={100} color={C.red} start={behind} font={FONT_DISPLAY} />
        <Label text="ahead" x={700} y={760} size={36} color={C.green} start={ahead + 0.2} />
        <Label text="tied" x={960} y={760} size={36} color={C.soft} start={tied + 0.2} />
        <Label text="behind" x={1220} y={760} size={36} color={C.red} start={behind + 0.2} />
      </g>
      <g opacity={prog(t, fifth, 0.45)}>
        <Chip x={960} y={850} text="with 1/5 of the active parameters" color={C.green} textColor={C.green} start={fifth} size={38} w={700} />
      </g>
      <g opacity={prog(t, reported, 0.45)}>
        <Stamp x={1520} y={300} text="LAB-REPORTED" color={C.yellow} size={38} rotate={-6} start={reported} w={440} />
      </g>
    </>
  );
};
