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
import {CheckBadge, CrossBadge, DocPage, Spark} from "../components/Art";
import {SceneProps, useClock} from "./types";

const Fade: React.FC<{t: number; start: number; dur?: number; children: React.ReactNode; dim?: number}> = ({
  t,
  start,
  dur = 0.45,
  children,
  dim = 1,
}) => <g opacity={prog(t, start, dur) * dim}>{children}</g>;

const PairRow: React.FC<{
  label: string;
  mini: number;
  qwen: number;
  max: number;
  at: number;
  miniAt: number;
  qwenAt: number;
  y: number;
  lowerBetter?: boolean;
  unit?: string;
}> = ({label, mini, qwen, max, at, miniAt, qwenAt, y, lowerBetter, unit = "%"}) => (
  <g>
    <Label text={label} x={300} y={y} size={40} color={C.fg} align="left" start={at} />
    <SketchRect x={620} y={y - 30} w={800} h={26} start={at} dur={0.35} stroke={C.line} fill={C.well} radius={13} seed={12500 + y} strokeWidth={2} />
    <SketchRect x={624} y={y - 26} w={Math.max(8, (792 * mini) / max)} h={18} start={miniAt} dur={0.7} stroke={C.green} fill={C.green} radius={9} seed={12510 + y} strokeWidth={1.6} opacity={0.85} />
    <SketchRect x={620} y={y + 12} w={800} h={22} start={at + 0.1} dur={0.35} stroke={C.line} fill={C.well} radius={11} seed={12520 + y} strokeWidth={1.8} />
    <SketchRect x={624} y={y + 15} w={Math.max(8, (792 * qwen) / max)} h={16} start={qwenAt} dur={0.7} stroke={C.purple} fill={C.purple} radius={8} seed={12530 + y} strokeWidth={1.4} opacity={0.8} />
    <Label text={`${mini.toFixed(1)}${unit}`} x={1440} y={y - 2} size={36} color={C.green} align="left" start={miniAt + 0.4} />
    <Label text={`${qwen.toFixed(1)}${unit}`} x={1440} y={y + 34} size={36} color={C.purple} align="left" start={qwenAt + 0.4} />
  </g>
);

/* ================================================================== */
/* 85 — AA Omniscience                                                */
/* ================================================================== */

export const S85_Omniscience: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const name = b(at("A A Omniscience"));
  const questions = b(at("3,000 questions across 42 topics"));
  const points = b(at("It gives points for correct answers"));
  const confident = b(at("subtracts points for confident wrong ones"));
  const neutral = b(at("treats declining to answer as neutral"));
  const mini = b(at("Mini's net score is minus 8.6"));
  const qwen = b(at("Qwen's is minus 6.4"));

  const outcomes = [
    {label: "correct", sign: "+1", color: C.green, at: points, icon: "check"},
    {label: "confident wrong", sign: "−1", color: C.red, at: confident, icon: "cross"},
    {label: "abstain", sign: "0", color: C.soft, at: neutral, icon: "neutral"},
  ];
  return (
    <>
      <g opacity={1 - prog(t, points, 0.5)}>
        <DotField x={620} y={390} cols={20} rows={5} gap={28} d={12} start={-1} color={C.cyan} fill={C.well} stagger={0.006} seed={12640} />
      </g>
      <g>
        <Label text="3,000 questions · 42 topics" x={960} y={275} size={42} color={C.soft} start={-1} />
        {outcomes.map((o, i) => (
          <g key={o.label}>
            <SketchRect x={280 + i * 460} y={340} w={400} h={180} start={o.at - 0.2} dur={0.45} stroke={o.color} fill={C.panel} radius={16} seed={12600 + i} strokeWidth={2.8} />
            <Label text={o.sign} x={400 + i * 460} y={420} size={84} color={o.color} start={o.at} font={FONT_DISPLAY} />
            <Label text={o.label} x={540 + i * 460} y={430} size={36} color={C.fg} align="left" start={o.at + 0.1} />
            <Label text={i === 2 ? "no penalty" : i === 1 ? "loses a point" : "earns a point"} x={540 + i * 460} y={480} size={36} color={C.soft} align="left" start={o.at + 0.2} />
          </g>
        ))}
      </g>
      <g>
        <Label text="net score" x={960} y={620} size={40} color={C.soft} start={mini - 0.2} />
        <Stat x={730} y={740} value="−8.6" color={C.red} size={120} start={mini} />
        <Label text="Inkling 2 Mini" x={730} y={800} size={36} color={C.red} start={mini + 0.2} />
        <Stat x={1190} y={740} value="−6.4" color={C.orange} size={120} start={qwen} />
        <Label text="Qwen 3.8 27B" x={1190} y={800} size={36} color={C.orange} start={qwen + 0.2} />
      </g>
      <Label text="Qwen is a little better" x={960} y={900} size={38} color={C.soft} start={qwen + 0.4} />
    </>
  );
};

/* ================================================================== */
/* 86 — non-hallucination rate                                        */
/* ================================================================== */

export const S86_Hallucination: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const sharper = b(at("The sharper number is the non hallucination rate"));
  const avoids = b(at("how often a model avoids inventing"));
  const mini = b(at("63.4 percent for Mini"));
  const qwen = b(at("71.4 for Qwen"));
  const inLine = b(at("Mini's result is in line with other models"));
  const noKnow = b(at("looping doesn't add knowledge"));
  const confident = b(at("more likely than larger models to state incorrect"));

  return (
    <>
      <g>
        <Label text="avoids inventing an answer" x={960} y={285} size={40} color={C.soft} start={avoids} />
        <BenchBars mini={63.4} qwen={71.4} startMini={mini} startQwen={qwen} gap="Qwen +8.0" gapColor={C.orange} startGap={qwen + 0.3} y={390} />
      </g>
      <g opacity={prog(t, inLine, 0.45)}>
        <Chip x={610} y={760} text="in line with its size" color={C.cyan} textColor={C.cyan} start={inLine} size={38} w={480} />
      </g>
      <g opacity={prog(t, noKnow, 0.45)}>
        <Chip x={1200} y={760} text="looping adds no knowledge" color={C.cyan} textColor={C.cyan} start={noKnow} size={38} w={580} />
      </g>
      <g opacity={prog(t, confident, 0.45)}>
        <SketchRect x={400} y={840} w={1120} h={84} start={confident} dur={0.4} stroke={C.red} fill={C.panel} radius={12} seed={12700} strokeWidth={2.8} />
        <Label text="confident wrong facts" x={960} y={890} size={38} color={C.red} start={confident + 0.1} />
      </g>
    </>
  );
};

/* ================================================================== */
/* 87 — “trails larger models”                                        */
/* ================================================================== */

export const S87_Trails: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const trails = b(at("trails larger models on reasoning"));
  const mixed = b(at("The numbers are more mixed"));

  return (
    <>
      <g>
        <Label text="“trails larger models”" x={960} y={390} size={84} color={C.fg} start={-1} font={FONT_DISPLAY} />
        <Label text="on reasoning-heavy tests" x={960} y={480} size={38} color={C.soft} start={trails + 0.2} />
        <g opacity={prog(t, mixed, 0.45)}>
          <Stamp x={960} y={650} text="MIXED" color={C.yellow} size={86} rotate={-6} start={mixed} w={520} />
          <Label text="true at some sizes, not others" x={960} y={790} size={40} color={C.soft} start={mixed + 0.2} />
        </g>
      </g>
    </>
  );
};

/* ================================================================== */
/* 88 — Humanity's Last Exam                                          */
/* ================================================================== */

export const S88_HLE: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const name = b(at("Humanity's Last Exam, Diamond edition"));
  const thousand = b(at("1,000 question version"));
  const half = b(at("half reasoning questions"));
  const noTools = b(at("answered without tools"));
  const mini = b(at("Mini scores 15.2"));
  const qwen = b(at("Qwen scores 15.3"));
  const tie = b(at("That's a tie", 1));

  return (
    <>
      <g>
        <SketchRect x={280} y={320} w={560} h={440} start={name} dur={0.5} stroke={C.line} fill={C.panel} radius={16} seed={12800} strokeWidth={2.8} />
        <Label text="1,000 questions" x={560} y={380} size={40} color={C.cyan} start={thousand} />
        <DotField x={330} y={430} cols={20} rows={10} gap={24} d={10} start={thousand} color={C.purple} fill={C.purple} highlight={Array.from({length: 100}, (_, i) => i)} highlightColor={C.cyan} highlightFill={C.cyan} stagger={0.003} seed={12810} />
        <Label text="half reasoning" x={560} y={710} size={36} color={C.cyan} start={half} />
        <g opacity={prog(t, noTools, 0.4)}>
          <Chip x={730} y={790} text="no tools" color={C.red} textColor={C.red} start={noTools} size={36} w={230} />
        </g>
      </g>
      <g>
        <BenchTicker x={980} y={480} to={15.2} start={mini} decimals={1} suffix="%" size={120} color={C.green} align="left" />
        <Label text="Mini" x={980} y={530} size={38} color={C.green} align="left" start={mini + 0.2} />
        <BenchTicker x={980} y={660} to={15.3} start={qwen} decimals={1} suffix="%" size={120} color={C.purple} align="left" />
        <Label text="Qwen" x={980} y={710} size={38} color={C.purple} align="left" start={qwen + 0.2} />
        <g opacity={prog(t, tie, 0.45)}>
          <Chip x={1400} y={570} text="a tie" color={C.yellow} textColor={C.yellow} start={tie} size={50} w={230} />
        </g>
      </g>
      <Label text="a cleaned-up version of the exam" x={960} y={890} size={38} color={C.soft} start={name + 0.4} />
    </>
  );
};

/* ================================================================== */
/* 89 — CritPT                                                        */
/* ================================================================== */

export const S89_CritPT: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const name = b(at("Crit P T is a set of research level physics"));
  const hard = b(at("drops the 30 problems"));
  const mini = b(at("Mini scores 31.4 percent"));
  const qwen = b(at("while Qwen scores 10.6"));
  const beam = b(at("Only the 501 billion parameter Beam 1.0"));
  const mixed = b(at("trails larger models is true at some sizes"));

  return (
    <>
      <g opacity={1 - prog(t, hard, 0.5)}>
        <DotField x={700} y={430} cols={10} rows={3} gap={38} d={18} start={-1} color={C.red} fill={C.red} highlight={Array.from({length: 30}, (_, i) => i)} highlightColor={C.red} highlightFill={C.red} stagger={0.012} seed={12950} />
        <Label text="30 problems removed" x={960} y={640} size={38} color={C.red} start={-1} />
      </g>
      <g>
        <Label text="full set" x={540} y={340} size={38} color={C.soft} start={-1} />
        <Label text="hard subset" x={1100} y={340} size={38} color={C.soft} start={-1} />
        <SketchLine x1={300} y1={760} x2={1620} y2={760} start={name} dur={0.6} stroke={C.soft} strokeWidth={3} seed={12900} />
        <CritBar x={480} mini={31.4} qwen={10.6} startMini={mini} startQwen={qwen} max={45} title="full" />
        <CritBar x={1000} mini={17.0} qwen={4.0} startMini={mini + 0.4} startQwen={qwen + 0.4} max={45} title="hard" />
        <g opacity={prog(t, hard, 0.45)}>
          <Chip x={960} y={405} text="30 problems removed" color={C.yellow} textColor={C.yellow} start={hard} size={36} w={500} />
        </g>
      </g>
      <g opacity={prog(t, beam, 0.45)}>
        <SketchRect x={940} y={800} w={640} h={110} start={beam} dur={0.4} stroke={C.cyan} fill={C.panel} radius={12} seed={12910} strokeWidth={2.6} />
        <Label text="Beam 1.0 · 501B" x={1260} y={840} size={38} color={C.cyan} start={beam + 0.1} />
        <Label text="40.0 / 26.5 · still ahead" x={1260} y={885} size={36} color={C.soft} start={beam + 0.25} />
      </g>
      <Label text="“trails larger” depends on which test" x={300} y={850} size={36} color={C.soft} align="left" start={mixed} />
    </>
  );
};

const CritBar: React.FC<{x: number; mini: number; qwen: number; startMini: number; startQwen: number; max: number; title: string}> = ({x, mini, qwen, startMini, startQwen, max}) => {
  const h = 300;
  const miniH = (h * mini) / max;
  const qwenH = (h * qwen) / max;
  return (
    <g>
      <SketchRect x={x - 90} y={460} w={240} h={300} start={-1} dur={0.35} stroke={C.line} fill={C.well} radius={10} seed={12900 + x} strokeWidth={1.8} opacity={0.35} />
      <SketchRect x={x - 90} y={760 - miniH} w={110} h={miniH} start={startMini} dur={0.8} stroke={C.green} fill={C.green} radius={8} seed={12920 + x} strokeWidth={2} opacity={0.85} />
      <SketchRect x={x + 40} y={760 - qwenH} w={110} h={qwenH} start={startQwen} dur={0.8} stroke={C.purple} fill={C.purple} radius={8} seed={12940 + x} strokeWidth={2} opacity={0.85} />
      <Label text={mini.toFixed(1)} x={x - 35} y={760 - miniH - 36} size={38} color={C.green} start={startMini + 0.4} font={FONT_DISPLAY} />
      <Label text={qwen.toFixed(1)} x={x + 95} y={760 - qwenH - 36} size={38} color={C.purple} start={startQwen + 0.4} font={FONT_DISPLAY} />
    </g>
  );
};

/* ================================================================== */
/* 90 — instruction following                                         */
/* ================================================================== */

export const S90_Instructions: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const following = b(at("Then there's instruction following"));
  const multiTurn = b(at("multi turn chat"));
  const constraints = b(at("instructions with many constraints"));
  const multi = b(at("50.0 percent on Multi Challenge"));
  const complex = b(at("33.4 percent on Complex Constraints"));
  const behind = b(at("behind Qwen 3.8 27B on both"));

  return (
    <>
      <g>
        <SketchRect x={280} y={340} w={620} h={420} start={-1} dur={0.5} stroke={C.cyan} fill={C.panel} radius={18} seed={13000} strokeWidth={3} />
        <Label text="multi-turn chat" x={590} y={410} size={40} color={C.cyan} start={multiTurn + 0.1} />
        <BenchTicker x={590} y={570} to={50.0} start={multi} decimals={1} suffix="%" size={130} color={C.fg} />
        <Label text="MultiChallenge" x={590} y={630} size={36} color={C.soft} start={multi + 0.2} />
      </g>
      <g>
        <SketchRect x={1020} y={340} w={620} h={420} start={-1} dur={0.5} stroke={C.orange} fill={C.panel} radius={18} seed={13010} strokeWidth={3} />
        <Label text="many constraints" x={1330} y={410} size={40} color={C.orange} start={constraints + 0.1} />
        <BenchTicker x={1330} y={570} to={33.4} start={complex} decimals={1} suffix="%" size={130} color={C.fg} />
        <Label text="Complex Constraints" x={1330} y={630} size={36} color={C.soft} start={complex + 0.2} />
      </g>
      <g opacity={prog(t, behind, 0.45)}>
        <Chip x={590} y={830} text="behind Qwen" color={C.red} textColor={C.red} start={behind} size={38} w={340} />
        <Chip x={1330} y={830} text="behind Qwen" color={C.red} textColor={C.red} start={behind + 0.2} size={38} w={340} />
      </g>
    </>
  );
};

/* ================================================================== */
/* 91 — the fact-check flag                                           */
/* ================================================================== */

export const S91_FactFlag: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const flag = b(at("Here's the flag from our fact check"));
  const surge = b(at("Complex Constraints was built by Surge AI"));
  const entangled = b(at("tests entangled instructions"));
  const textSays = b(at("The lab's text says Mini is behind"));
  const table = b(at("the lab's own table lists Qwen at 30.1"));
  const ahead = b(at("which would put Mini ahead"));
  const muse = b(at("Muse Glimmer, ahead of both at 35.6"));
  const noConclusion = b(at("drawing no conclusion"));

  return (
    <>
      <g>
        <SketchRect x={260} y={320} w={1400} h={420} start={flag} dur={0.5} stroke={C.yellow} fill={C.panel} radius={16} seed={13100} strokeWidth={3} />
        <Label text="Complex Constraints" x={960} y={380} size={44} color={C.yellow} start={surge} />
        <Label text="entangled instructions" x={960} y={432} size={36} color={C.soft} start={entangled} />
        <SketchLine x1={320} y1={470} x2={1600} y2={470} start={surge + 0.2} dur={0.4} stroke={C.line} strokeWidth={2} seed={13101} opacity={0.6} />
        <g opacity={prog(t, textSays, 0.45)}>
          <Label text="lab text" x={380} y={540} size={36} color={C.soft} align="left" start={textSays} />
          <Label text="Mini behind Qwen" x={620} y={540} size={44} color={C.fg} align="left" start={textSays + 0.1} />
        </g>
        <g opacity={prog(t, table, 0.45)}>
          <Label text="lab table" x={380} y={620} size={36} color={C.soft} align="left" start={table} />
          <Label text="Qwen 30.1 → Mini ahead" x={620} y={620} size={44} color={C.green} align="left" start={table + 0.1} />
        </g>
        <g opacity={prog(t, ahead, 0.45)}>
          <Label text="direct contradiction" x={380} y={700} size={36} color={C.red} align="left" start={ahead} />
        </g>
      </g>
      <g opacity={prog(t, muse, 0.45)}>
        <SketchRect x={1180} y={760} w={560} h={110} start={muse} dur={0.4} stroke={C.pink} fill={C.panel} radius={12} seed={13110} strokeWidth={2.8} />
        <Label text="Muse Glimmer 35.6" x={1460} y={805} size={38} color={C.pink} start={muse + 0.1} />
        <Label text="ahead of both" x={1460} y={850} size={36} color={C.soft} start={muse + 0.25} />
      </g>
      <g opacity={prog(t, noConclusion, 0.45)}>
        <Stamp x={600} y={830} text="NO CONCLUSION" color={C.red} size={44} rotate={-5} start={noConclusion} w={500} />
      </g>
    </>
  );
};

/* ================================================================== */
/* 92 — the model card's own limits                                   */
/* ================================================================== */

export const S92_Limits: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const card = b(at("The model card, which is the lab's own document"));
  const loops = b(at("stuck in long reasoning loops"));
  const tools = b(at("less reliable than larger models at following detailed instructions"));
  const destructive = b(at("take destructive actions"));
  const inaccurate = b(at("may not report the outcome"));
  const language = b(at("Output quality can drop outside English"));
  const effort = b(at("setting the reasoning effort to its minimum"));

  const items = [
    {title: "reasoning loops", sub: "re-checks, no progress", at: loops, icon: "loop" as const, color: C.orange},
    {title: "tool instructions", sub: "misses conventions", at: tools, icon: "wrench" as const, color: C.yellow},
    {title: "destructive actions", sub: "may delete files", at: destructive, icon: "flag" as const, color: C.red},
    {title: "unclear outcomes", sub: "may misreport work", at: inaccurate, icon: "doc" as const, color: C.red},
    {title: "outside English", sub: "clipped phrasing", at: language, icon: "globe" as const, color: C.orange},
    {title: "minimum effort", sub: "reasoning stays on", at: effort, icon: "gauge" as const, color: C.purple},
  ];
  return (
    <>
      {items.map((it, i) => {
        const x = 330 + (i % 3) * 440;
        const y = 360 + Math.floor(i / 3) * 250;
        return (
          <g key={it.title}>
            <SketchRect x={x} y={y} w={390} h={200} start={-1} dur={0.4} stroke={it.color} fill={C.panel} radius={14} seed={13200 + i} strokeWidth={2.6} />
            <Icon name={it.icon} x={x + 70} y={y + 70} s={0.66} color={it.color} start={it.at + 0.05} />
            <Label text={it.title} x={x + 125} y={y + 58} size={38} color={it.color} align="left" start={it.at + 0.1} />
            <Label text={it.sub} x={x + 20} y={y + 150} size={36} color={C.soft} align="left" start={it.at + 0.2} />
          </g>
        );
      })}
      <Rule y={880} x1={300} x2={1620} start={card} opacity={0.25} />
    </>
  );
};

/* ================================================================== */
/* 93 — the lab's advice                                              */
/* ================================================================== */

export const S93_Advice: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const advice = b(at("The lab's advice"));
  const sandbox = b(at("run agents in a sandbox"));
  const confirm = b(at("require confirmation before destructive actions"));
  const limits = b(at("set limits on output tokens"));

  return (
    <>
      {[
        {x: 330, title: "sandbox", sub: "run agents contained", at: sandbox, icon: "shield" as const, color: C.green},
        {x: 760, title: "confirm", sub: "before destructive actions", at: confirm, icon: "lock" as const, color: C.yellow},
        {x: 1190, title: "cap it", sub: "tokens and turns", at: limits, icon: "gauge" as const, color: C.cyan},
      ].map((c, i) => (
        <g key={c.title}>
          <SketchRect x={c.x} y={380} w={390} h={330} start={c.at - 0.2} dur={0.45} stroke={c.color} fill={C.panel} radius={18} seed={13300 + i} strokeWidth={3} />
          <Icon name={c.icon} x={c.x + 195} y={480} s={1.0} color={c.color} start={c.at + 0.05} />
          <Label text={c.title} x={c.x + 195} y={590} size={52} color={c.color} start={c.at + 0.12} font={FONT_DISPLAY} />
          <Label text={c.sub} x={c.x + 195} y={650} size={36} color={C.soft} start={c.at + 0.22} />
        </g>
      ))}
      <Label text="the model card says the same" x={960} y={820} size={38} color={C.soft} start={advice + 0.4} />
      <Rule y={900} x1={300} x2={1620} start={advice} opacity={0.25} />
    </>
  );
};

/* ================================================================== */
/* 94 — the safety twist                                              */
/* ================================================================== */

export const S94_Safety: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const lower = b(at("Lower is better on these"));
  const destructive = b(at("Destructive actions 10.2"));
  const misbehavior = b(at("Misbehavior 9.8"));
  const covert = b(at("Covert misbehavior 8.3"));
  const internal = b(at("These are internal evaluations"));
  const notZero = b(at("A lower rate also isn't zero"));
  const sandbox = b(at("still need a sandbox"));

  return (
    <>
      <g>
        <g opacity={0.65}>
          <Chip x={1460} y={290} text="lower is better" color={C.green} textColor={C.green} start={lower} size={38} w={380} />
        </g>
        <PairRow label="destructive actions" mini={10.2} qwen={35.2} max={60} at={destructive} miniAt={destructive + 0.1} qwenAt={destructive + 0.3} y={430} lowerBetter />
        <PairRow label="misbehavior" mini={9.8} qwen={57.7} max={60} at={misbehavior} miniAt={misbehavior + 0.1} qwenAt={misbehavior + 0.3} y={570} lowerBetter />
        <PairRow label="covert misbehavior" mini={8.3} qwen={33.2} max={60} at={covert} miniAt={covert + 0.1} qwenAt={covert + 0.3} y={710} lowerBetter />
      </g>
      <g opacity={prog(t, internal, 0.45)}>
        <Label text="internal evals · method hidden" x={960} y={830} size={36} color={C.soft} start={internal} />
      </g>
      <g opacity={prog(t, notZero, 0.45)}>
        <Callout x={700} y={910} text="a lower rate isn't zero" color={C.yellow} start={notZero} size={36} w={560} icon={<Icon name="shield" color={C.yellow} start={notZero} />} />
      </g>
      <g opacity={prog(t, sandbox, 0.45)}>
        <Chip x={1380} y={910} text="still use a sandbox" color={C.green} textColor={C.green} start={sandbox} size={36} w={460} />
      </g>
    </>
  );
};

/* ================================================================== */
/* 95 — can we still read its thoughts?                               */
/* ================================================================== */

export const S95_CoTSetup: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const question = b(at("If a model does more of its thinking internally"));
  const oversee = b(at("can we still oversee it"));
  const cot = b(at("The first is C O T Control Q A"));
  const benchmarks = b(at("It asks questions from G P Q A"));
  const instruction = b(at("each paired with an instruction about the reasoning"));
  const dodge = b(at("reshape its visible reasoning"));
  const traces = b(at("Among reasoning traces of 750 to 1,250 tokens"));

  return (
    <>
      <g>
        <SketchPath d="M 380 470 C 380 320 620 300 720 390 C 830 280 1080 320 1050 470 C 1130 560 1010 660 880 620 C 780 720 560 700 520 590 C 430 620 370 560 380 470 Z" start={question} dur={0.6} stroke={C.cyan} strokeWidth={3.4} seed={13400} fill={C.panel} fillStart={question + 0.3} />
        <Label text="reasoning" x={720} y={470} size={44} color={C.cyan} start={question + 0.3} />
        <g opacity={prog(t, oversee, 0.45)}>
          <Icon name="search" x={1000} y={560} s={0.9} color={C.yellow} start={oversee} />
          <Label text="a monitor" x={1000} y={650} size={36} color={C.yellow} start={oversee + 0.2} />
        </g>
      </g>
      <g>
        <Chip x={1320} y={370} text="COT-Control QA" color={C.yellow} textColor={C.yellow} start={cot} size={40} w={430} />
        <Label text="GPQA · HLE · MMLU-Pro" x={1320} y={450} size={36} color={C.soft} start={benchmarks} />
        <Label text="instruction about the reasoning" x={1320} y={510} size={36} color={C.soft} start={instruction} />
        <g opacity={prog(t, dodge, 0.45)}>
          <Label text="could reshape visible reasoning" x={1320} y={590} size={38} color={C.red} start={dodge} />
          <Arrow x1={1250} y1={590} x2={1110} y2={540} start={dodge + 0.2} dur={0.3} stroke={C.red} strokeWidth={2.8} seed={13410} head={10} />
        </g>
      </g>
      <g opacity={prog(t, traces, 0.45)}>
        <SketchRect x={430} y={820} w={1060} h={50} start={traces} dur={0.4} stroke={C.line} fill={C.well} radius={8} seed={13420} strokeWidth={2.2} />
        <Label text="750 tokens" x={440} y={800} size={36} color={C.soft} align="left" start={traces + 0.1} />
        <Label text="1,250 tokens" x={1480} y={800} size={36} color={C.soft} align="right" start={traces + 0.2} />
      </g>
      <Label text="early tests, not a proof" x={960} y={930} size={36} color={C.soft} start={traces + 0.4} />
    </>
  );
};

/* ================================================================== */
/* 96 — COT-Control QA results                                        */
/* ================================================================== */

export const S96_CoTResults: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const mini = b(at("Mini followed the instruction at most 0.1"));
  const small = b(at("Inkling 2 Small managed 0.3"));
  const earlier = b(at("the earlier Inkling Small 0.4"));
  const qwen = b(at("Qwen 3.8 27B 1.3"));

  const bars = [
    {name: "Mini", v: 0.1, at: mini, color: C.green, y: 740},
    {name: "Inkling 2 Small", v: 0.3, at: small, color: C.cyan, y: 590},
    {name: "earlier Small", v: 0.4, at: earlier, color: C.soft, y: 440},
    {name: "Qwen 3.8 27B", v: 1.3, at: qwen, color: C.purple, y: 290},
  ];
  const max = 1.5;
  return (
    <>
      <g>
        <SketchLine x1={400} y1={800} x2={1700} y2={800} start={mini} dur={0.5} stroke={C.soft} strokeWidth={3} seed={13500} />
        {bars.map((bar, i) => {
          const w = (bar.v / max) * 1100;
          return (
            <g key={bar.name}>
              <Label text={bar.name} x={400} y={bar.y - 36} size={38} color={bar.color} align="left" start={bar.at} />
              <SketchRect x={400} y={bar.y} w={1100} h={38} start={bar.at} dur={0.4} stroke={C.line} fill={C.well} radius={19} seed={13510 + i} strokeWidth={2} />
              <SketchRect x={404} y={bar.y + 4} w={Math.max(8, w)} h={30} start={bar.at + 0.2} dur={0.7} stroke={bar.color} fill={bar.color} radius={15} seed={13520 + i} strokeWidth={1.8} opacity={0.85} />
              <Label text={`${bar.v.toFixed(1)}%`} x={1540} y={bar.y + 32} size={42} color={bar.color} align="left" start={bar.at + 0.5} font={FONT_DISPLAY} />
            </g>
          );
        })}
        <g opacity={prog(t, mini + 0.3, 0.4)}>
          <Label text="less is better" x={960} y={870} size={38} color={C.soft} start={mini + 0.3} />
          <Label text="Mini barely follows reasoning instructions" x={960} y={925} size={36} color={C.green} start={mini + 0.5} />
        </g>
      </g>
    </>
  );
};

/* ================================================================== */
/* 97 — Linux Arena: attacker and monitor                             */
/* ================================================================== */

export const S97_Arena: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const arena = b(at("The second is Linux Arena"));
  const attacker = b(at("An attacker model is asked"));
  const sideTask = b(at("secretly completing a malicious side task"));
  const monitor = b(at("a monitor tries to catch it"));
  const helpful = b(at("helpful only fine tune"));
  const strong = b(at("A strong monitor"));
  const weak = b(at("weaker monitor, tuned to a one percent"));

  return (
    <>
      <g>
        <SketchRect x={280} y={330} w={480} h={330} start={-1} dur={0.5} stroke={C.red} fill={C.panel} radius={18} seed={13600} strokeWidth={3} />
        <Icon name="terminal" x={400} y={470} s={1.0} color={C.red} start={-1} />
        <Label text="attacker model" x={400} y={570} size={38} color={C.red} start={attacker + 0.2} />
        <Label text="a real software task" x={400} y={620} size={36} color={C.soft} start={attacker + 0.3} />
        <g opacity={prog(t, sideTask, 0.45)}>
          <SketchRect x={830} y={470} w={260} h={80} start={sideTask} dur={0.4} stroke={C.red} fill={C.well} radius={10} seed={13610} strokeWidth={2.8} />
          <Label text="+ secret side task" x={960} y={516} size={36} color={C.red} start={sideTask + 0.1} />
        </g>
        <Arrow x1={580} y1={500} x2={830} y2={500} start={sideTask - 0.2} dur={0.35} stroke={C.red} strokeWidth={3} seed={13620} head={12} />
      </g>
      <g>
        <SketchCircle x={1380} y={490} d={180} start={monitor} dur={0.5} stroke={C.yellow} fill={C.panel} seed={13630} strokeWidth={3.4} />
        <Icon name="search" x={1380} y={490} s={1.4} color={C.yellow} start={monitor + 0.1} />
        <Label text="monitor" x={1380} y={620} size={38} color={C.yellow} start={monitor + 0.2} />
        <Arrow x1={1110} y1={500} x2={1280} y2={500} start={monitor + 0.2} dur={0.3} stroke={C.yellow} strokeWidth={3} seed={13640} head={12} />
      </g>
      <g>
        <g opacity={prog(t, strong, 0.45)}>
          <Chip x={620} y={760} text="strong monitor: Qwen 27B" color={C.green} textColor={C.green} start={strong} size={36} w={560} />
          <Label text="catches almost all" x={620} y={825} size={36} color={C.soft} start={strong + 0.2} />
        </g>
        <g opacity={prog(t, weak, 0.45)}>
          <Chip x={1340} y={760} text="weak monitor: 1% false alarm" color={C.yellow} textColor={C.yellow} start={weak} size={36} w={620} />
          <Label text="so differences show" x={1340} y={825} size={36} color={C.soft} start={weak + 0.2} />
        </g>
        <g opacity={prog(t, helpful, 0.45)}>
          <Label text="helpful-only fine-tune of Mini" x={960} y={900} size={36} color={C.soft} start={helpful} />
        </g>
      </g>
    </>
  );
};

/* ================================================================== */
/* 98 — Linux Arena results                                           */
/* ================================================================== */

export const S98_ArenaResults: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const toolOnly = b(at("When that monitor saw only tool calls"));
  const mini = b(at("3.9 percent of Mini's attacks"));
  const versus = b(at("versus 20.5 percent"));
  const text = b(at("could also read the model's text"));
  const fell = b(at("rate fell to 1.3 percent"));
  const misses = b(at("tool calls only monitor misses"));
  const trend = b(at("no clear trend with the number of loops"));
  const early = b(at("It calls this early work"));

  return (
    <>
      <g>
        <Label text="tool calls only" x={380} y={330} size={40} color={C.soft} align="left" start={toolOnly} />
        <SketchRect x={380} y={380} w={1000} h={54} start={toolOnly} dur={0.4} stroke={C.line} fill={C.well} radius={27} seed={13700} strokeWidth={2.4} />
        <SketchRect x={384} y={384} w={(992 * 3.9) / 25} h={46} start={mini} dur={0.7} stroke={C.green} fill={C.green} radius={23} seed={13701} strokeWidth={2} opacity={0.85} />
        <Label text="Mini 3.9%" x={430} y={480} size={36} color={C.green} align="left" start={mini + 0.3} />
        <SketchRect x={380} y={530} w={1000} h={54} start={versus - 0.2} dur={0.4} stroke={C.line} fill={C.well} radius={27} seed={13710} strokeWidth={2.4} />
        <SketchRect x={384} y={534} w={(992 * 20.5) / 25} h={46} start={versus} dur={0.7} stroke={C.purple} fill={C.purple} radius={23} seed={13711} strokeWidth={2} opacity={0.8} />
        <Label text="Qwen attacker 20.5%" x={430} y={630} size={36} color={C.purple} align="left" start={versus + 0.3} />
      </g>
      <g opacity={prog(t, text, 0.45)}>
        <SketchRect x={380} y={700} w={1000} h={54} start={text} dur={0.4} stroke={C.line} fill={C.well} radius={27} seed={13720} strokeWidth={2.4} />
        <SketchRect x={384} y={704} w={Math.max(8, (992 * 1.3) / 25)} h={46} start={fell} dur={0.7} stroke={C.cyan} fill={C.cyan} radius={23} seed={13721} strokeWidth={2} opacity={0.85} />
        <Label text="with text + thinking" x={380} y={790} size={38} color={C.cyan} align="left" start={text + 0.1} />
        <Label text="Mini 1.3%" x={1440} y={736} size={38} color={C.cyan} align="right" start={fell + 0.4} />
      </g>
      <g opacity={prog(t, misses, 0.45)}>
        <Label text="tool-only monitors miss a lot" x={960} y={860} size={38} color={C.yellow} start={misses} />
        <Label text="no clear trend with more loops" x={960} y={910} size={36} color={C.soft} start={trend} />
      </g>
      <g opacity={prog(t, early, 0.45)}>
        <Stamp x={1600} y={320} text="EARLY WORK" color={C.orange} size={38} rotate={-7} start={early} w={380} />
      </g>
    </>
  );
};
