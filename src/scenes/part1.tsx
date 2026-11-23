import React from "react";
import {C, FONT_BODY, FONT_DISPLAY} from "../theme";
import {at, clamp, easeInOut, easeOut, prog} from "../timing";
import {
  Arrow,
  Label,
  Pop,
  Scribble,
  SketchCircle,
  SketchEllipse,
  SketchLine,
  SketchPath,
  SketchPolygon,
  SketchRect,
} from "../components/Sketch";
import {
  Callout,
  Caption,
  Chip,
  DotField,
  Heading,
  Icon,
  Legend,
  MiniNote,
  Rule,
  ScoreCards,
  Stamp,
  Stat,
} from "../components/Kit";
import {InkMark, LabMark, ModelCard, QwenMark, TinyModelTag} from "../components/Brand";
import {CheckBadge, CrossBadge, DocPage, Lock, OpenLock, Spark} from "../components/Art";
import {SceneProps, useClock} from "./types";

const Fade: React.FC<{t: number; start: number; dur?: number; children: React.ReactNode; dim?: number}> = ({
  t,
  start,
  dur = 0.45,
  children,
  dim = 1,
}) => <g opacity={prog(t, start, dur) * dim}>{children}</g>;

/* ================================================================== */
/* 01 — 26B in 20 GB ties 27B                                         */
/* ================================================================== */

export const S01_Tie: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const ink = b(at("26 billion parameter model"));
  const gb = b(at("20 gigabytes"));
  const qwen = b(at("Alibaba's"));
  const tie = b(at("tied"));
  const index = b(at("Artificial Analysis index"));
  const fifth = b(at("fifth"));
  const active = b(at("active parameters"));

  return (
    <>
      <Fade t={t} start={ink - 0.15}>
        <ModelCard x={400} y={420} w={440} h={164} name="Inkling 2 Mini" sub="26B total" start={0.1} outlineAt={-1} color={C.green} mark="ink" nameSize={52} subSize={38} dim={1 - 0.75 * prog(t, qwen, 0.5) - 0.15 * prog(t, index, 0.5)} />
        <g opacity={prog(t, gb, 0.4) * (1 - 0.65 * prog(t, qwen, 0.5))}>
          <Chip x={400} y={540} text="fits in 20 GB" color={C.green} textColor={C.green} start={gb} size={38} icon={<Icon name="chip" color={C.green} start={gb} />} />
        </g>
      </Fade>

      <Fade t={t} start={qwen - 0.1}>
        <ModelCard x={1520} y={420} w={440} h={164} name="Qwen 3.8 27B" sub="27B dense" start={qwen} color={C.purple} mark="qwen" nameSize={50} subSize={38} dim={1 - 0.45 * prog(t, index, 0.5)} />
      </Fade>

      {/* centre comparison */}
      <g>
        <Label text="Artificial Analysis" x={960} y={296} size={40} color={C.soft} start={index} />
        <Label text="Intelligence Index" x={960} y={340} size={36} color={C.soft} start={index + 0.2} opacity={0.8} />
        <Stat x={770} y={470} value="20.1" color={C.green} size={104} start={index + 0.15} />
        <Stat x={1150} y={470} value="20.1" color={C.purple} size={104} start={index + 0.25} />
        <Label text="=" x={960} y={462} size={86} color={C.fg} start={tie} font={FONT_DISPLAY} />
        <Fade t={t} start={tie + 0.2}>
          <Label text="a dead heat" x={960} y={552} size={44} color={C.yellow} start={tie + 0.2} />
        </Fade>
      </g>

      {/* active parameter fifth */}
      <g opacity={prog(t, fifth, 0.5)}>
        <g>
          {[0, 1, 2, 3, 4].map((i) => (
            <SketchCircle
              key={i}
              x={776 + i * 78}
              y={700}
              d={36}
              start={fifth + i * 0.08}
              dur={0.2}
              stroke={i === 0 ? C.green : C.line}
              fill={i === 0 ? C.green : C.well}
              seed={2110 + i}
              strokeWidth={i === 0 ? 2.6 : 2}
            />
          ))}
        </g>
        <Label text="1/5" x={690} y={710} size={64} color={C.green} start={fifth + 0.1} font={FONT_DISPLAY} />
        <Label text="the active parameters" x={960} y={790} size={42} color={C.soft} start={active} />
        <SketchLine x1={760} y1={744} x2={1160} y2={744} start={active + 0.1} dur={0.3} stroke={C.green} strokeWidth={2.4} seed={2120} opacity={0.6} />
      </g>

      <Rule y={880} x1={300} x2={1620} start={-1} opacity={0.35} />
    </>
  );
};

/* ================================================================== */
/* 02 — the middle, three times                                       */
/* ================================================================== */

export const S02_LoopHook: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const trick = b(at("And the trick"));
  const cheating = b(at("sounds like cheating"));
  const token = b(at("every single token"));
  const middle = b(at("middle of its own network"));
  const three = b(at("three times"));
  const row = b(at("in a row"));

  const bands = 10;
  const top = 238;
  const bh = 46;
  const gap = 10;
  const stackX = 680;
  const stackW = 300;
  const midStart = 3;
  const midEnd = 6;

  return (
    <>
      <Callout x={420} y={262} text="sounds like cheating" color={C.yellow} start={cheating} rotate={0} size={42} w={430} icon={<Icon name="flag" color={C.yellow} start={cheating} />} />

      {/* stack */}
      <g>
        {Array.from({length: bands}).map((_, i) => {
          const inMiddle = i >= midStart && i <= midEnd;
          const y = top + i * (bh + gap);
          return (
            <SketchRect
              key={i}
              x={stackX}
              y={y}
              w={stackW}
              h={bh}
              start={trick + i * 0.055}
              dur={0.3}
              stroke={inMiddle ? C.green : C.line}
              fill={inMiddle ? C.panel : C.well}
              radius={7}
              seed={2200 + i}
              strokeWidth={inMiddle ? 3 : 2.2}
              opacity={inMiddle ? 1 : 0.8}
            />
          );
        })}
        <Label text="the network" x={stackX + stackW / 2} y={top - 42} size={40} color={C.soft} start={trick + 0.1} />
        <Label text="middle" x={stackX + stackW + 140} y={top + 5 * (bh + gap) + 10} size={46} color={C.green} start={middle + 0.1} align="left" />
        <SketchLine x1={stackX + stackW + 12} y1={top + 3 * (bh + gap) + bh / 2} x2={stackX + stackW + 118} y2={top + 3 * (bh + gap) + bh / 2} start={middle + 0.1} dur={0.25} stroke={C.green} strokeWidth={2.6} seed={2211} />
      </g>

      {/* token enters */}
      <Pop start={token - 0.1} x={stackX + stackW / 2} y={top - 74}>
        <SketchRect x={stackX + 104} y={top - 108} w={92} h={50} start={token - 0.05} dur={0.3} stroke={C.cyan} fill={C.panel} radius={8} seed={2212} strokeWidth={2.8} />
        <Label text="token" x={stackX + 150} y={top - 83} size={36} color={C.cyan} start={token + 0.05} />
        <Arrow x1={stackX + 150} y1={top - 52} x2={stackX + 150} y2={top - 8} start={token + 0.15} dur={0.3} stroke={C.cyan} strokeWidth={3.4} seed={2213} head={12} />
      </Pop>

      {/* three loop passes */}
      <g>
        {[0, 1, 2].map((i) => {
          const y0 = top + (midStart + midEnd + 1) * (bh + gap) / 2 + 16;
          const y1 = top + midStart * (bh + gap) - 16;
          const x1 = stackX - 40;
          const x2 = stackX - 120;
          return (
            <g key={i} opacity={prog(t, three + i * 0.34, 0.3)}>
              <SketchPath
                d={`M ${stackX - 18} ${y0 - i * 10} C ${stackX - 150 - i * 20} ${y0}, ${stackX - 150 - i * 20} ${y1}, ${stackX - 18} ${y1 + 10 + i * 6}`}
                start={three + i * 0.34}
                dur={0.45}
                stroke={i === 2 ? C.green : C.cyan}
                strokeWidth={3.2}
                seed={2220 + i}
              />
              <SketchLine x1={stackX - 18} y1={y1 + 10 + i * 6} x2={stackX - 38} y2={y1 + 0 + i * 6} start={three + i * 0.34 + 0.42} dur={0.16} stroke={i === 2 ? C.green : C.cyan} strokeWidth={3.2} seed={2224 + i} />
              <SketchLine x1={stackX - 18} y1={y1 + 10 + i * 6} x2={stackX - 28} y2={y1 + 28 + i * 6} start={three + i * 0.34 + 0.45} dur={0.16} stroke={i === 2 ? C.green : C.cyan} strokeWidth={3.2} seed={2227 + i} />
            </g>
          );
        })}
      </g>

      {/* x3 */}
      <g opacity={prog(t, three + 0.4, 0.3)}>
        <Label text="×3" x={1290} y={520} size={190} color={C.green} start={three + 0.4} font={FONT_DISPLAY} />
        <Label text="same weights" x={1290} y={610} size={40} color={C.soft} start={row + 0.1} />
        <Label text="each pass" x={1290} y={658} size={36} color={C.soft} start={row + 0.2} opacity={0.8} />
      </g>

      <Rule y={920} x1={300} x2={1620} start={trick} opacity={0.35} />
    </>
  );
};

/* ================================================================== */
/* 03 — the name + the question                                       */
/* ================================================================== */

export const S03_Name: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const name = b(at("It's called Inkling 2 Mini"));
  const local = b(at("If you run a local coding model"));
  const upgrade = b(at("real upgrade"));
  const week = b(at("very good week"));

  return (
    <>
      <g>
        <g opacity={prog(t, name, 0.5)}>
          <InkMark x={530} y={430} s={2.0} color={C.green} bg={C.well} start={name + 0.05} strokeWidth={5} />
        </g>
        <Heading text="Inkling 2 Mini" x={720} y={420} size={132} color={C.fg} start={name + 0.12} align="left" />
        <Caption text="26B total · 3.4B active" x={724} y={515} size={44} color={C.soft} start={name + 0.35} align="left" />
        <SketchLine x1={724} y1={548} x2={1290} y2={548} start={name + 0.45} dur={0.35} stroke={C.green} strokeWidth={3} seed={2301} opacity={0.8} />
      </g>

      <Fade t={t} start={local}>
        <Chip x={960} y={625} text="local coding model" color={C.cyan} textColor={C.cyan} start={local} size={40} />
      </Fade>

      <Fade t={t} start={upgrade - 0.3}>
        <g>
          <SketchRect x={550} y={690} w={320} h={112} start={upgrade - 0.25} dur={0.4} stroke={C.green} fill={C.panel} radius={14} seed={2310} strokeWidth={3} />
          <Label text="real upgrade?" x={710} y={724} size={50} color={C.green} start={upgrade - 0.1} font={FONT_DISPLAY} />
          <Label text="worth switching" x={710} y={776} size={36} color={C.soft} start={upgrade + 0.15} />
        </g>
      </Fade>
      <Fade t={t} start={week - 0.2}>
        <g>
          <Label text="or just" x={960} y={750} size={40} color={C.soft} start={week - 0.2} />
          <SketchRect x={1050} y={690} w={320} h={112} start={week} dur={0.4} stroke={C.yellow} fill={C.panel} radius={14} seed={2315} strokeWidth={3} />
          <Label text="one good week" x={1210} y={724} size={48} color={C.yellow} start={week + 0.08} font={FONT_DISPLAY} />
          <Label text="one benchmark table" x={1210} y={776} size={36} color={C.soft} start={week + 0.2} />
        </g>
      </Fade>

      <Rule y={900} x1={420} x2={1540} start={name + 0.2} opacity={0.35} />
    </>
  );
};

/* ================================================================== */
/* 04 — the receipts                                                  */
/* ================================================================== */

export const S04_Receipts: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const launch = b(at("We went through"));
  const modelCard = b(at("the model card"));
  const hf = b(at("Hugging Face and Unsloth guides"));
  const evals = b(at("independent evals"));
  const oneByOne = b(at("one by one"));
  const checked = b(at("checked the numbers"));

  const docs = [
    {x: 320, label: "launch post", at: launch, rot: -4, color: C.cyan},
    {x: 640, label: "model card", at: modelCard, rot: -2, color: C.green},
    {x: 960, label: "Hugging Face", at: hf, rot: 0, color: C.yellow},
    {x: 1280, label: "Unsloth", at: hf + 1.1, rot: 2, color: C.orange},
    {x: 1600, label: "evals", at: evals, rot: 4, color: C.pink},
  ];

  return (
    <>
      <Heading text="we checked the receipts" x={960} y={195} size={76} color={C.fg} start={launch} />
      <g>
        {docs.map((d, i) => (
          <g key={i}>
            <g transform={`rotate(${d.rot} ${d.x} 460)`}>
              <DocPage x={d.x - 108} y={330} w={216} h={250} start={d.at} label="" color={d.color} lines={4} />
            </g>
            <Label text={d.label} x={d.x} y={640} size={36} color={d.color} start={d.at + 0.2} />
            <g opacity={prog(t, oneByOne + i * 0.1, 0.25)}>
              <CheckBadge x={d.x + 70} y={368} s={0.6} start={oneByOne + i * 0.1} color={C.green} />
            </g>
          </g>
        ))}
      </g>
      <g opacity={prog(t, checked, 0.4)}>
        <Label text="numbers" x={840} y={790} size={38} color={C.soft} align="right" start={checked} />
        <Label text="one by one" x={880} y={790} size={44} color={C.green} align="left" start={oneByOne + 0.2} />
        <SketchLine x1={820} y1={826} x2={1100} y2={826} start={oneByOne + 0.3} dur={0.3} stroke={C.green} strokeWidth={2.4} seed={2420} opacity={0.7} />
      </g>
    </>
  );
};

/* ================================================================== */
/* 05 — four things                                                   */
/* ================================================================== */

export const S05_Roadmap: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const four = b(at("you'll know four things"));
  const loop = b(at("How the looping trick"));
  const trust = b(at("Which of the lab's benchmark"));
  const hardware = b(at("What hardware it needs"));
  const tickets = b(at("ten ticket test"));

  const cards = [
    {x: 620, y: 405, num: "1", title: "the loop", sub: "how it works + cost", at: loop, color: C.green, icon: "loop" as const},
    {x: 1300, y: 405, num: "2", title: "the scores", sub: "what to trust", at: trust, color: C.cyan, icon: "gauge" as const},
    {x: 620, y: 705, num: "3", title: "your machine", sub: "hardware + breakage", at: hardware, color: C.orange, icon: "laptop" as const},
    {x: 1300, y: 705, num: "4", title: "the real test", sub: "ten of your tickets", at: tickets, color: C.pink, icon: "ticket" as const},
  ];

  return (
    <>
      <Heading text="four things" x={960} y={190} size={82} color={C.fg} start={four} />
      <g>
        {cards.map((c, i) => (
          <g key={i}>
            <SketchRect x={c.x - 270} y={c.y - 96} w={540} h={192} start={c.at - 0.2} dur={0.45} stroke={c.color} fill={C.panel} radius={16} seed={2400 + i} strokeWidth={3} />
            <Label text={c.num} x={c.x - 225} y={c.y - 34} size={62} color={c.color} start={c.at - 0.05} font={FONT_DISPLAY} />
            <Icon name={c.icon} x={c.x - 160} y={c.y + 8} s={0.82} color={c.color} start={c.at + 0.02} />
            <Label text={c.title} x={c.x - 95} y={c.y - 26} size={50} color={C.fg} align="left" start={c.at + 0.08} font={FONT_DISPLAY} />
            <Label text={c.sub} x={c.x - 95} y={c.y + 36} size={36} color={C.soft} align="left" start={c.at + 0.18} />
          </g>
        ))}
      </g>
      <g opacity={prog(t, tickets + 0.5, 0.4)}>
        <Label text="before you switch" x={1300} y={900} size={36} color={C.soft} start={tickets + 0.5} />
      </g>
    </>
  );
};

/* ================================================================== */
/* 06 — the teaser                                                    */
/* ================================================================== */

export const S06_Teaser: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const stay = b(at("And stay for the middle"));
  const flawed = b(at("flagged as flawed"));
  const row = b(at("in one row"));
  const contradicts = b(at("contradicts"));

  return (
    <>
      <Callout x={960} y={205} text="stay for the middle" color={C.yellow} start={stay} size={52} w={560} icon={<Icon name="flag" color={C.yellow} start={stay} />} />

      <g>
        <SketchRect x={205} y={300} w={680} h={440} start={-1} dur={0.5} stroke={C.line} fill={C.panel} radius={14} seed={2500} strokeWidth={2.6} />
        <Label text="the headline benchmark" x={545} y={366} size={40} color={C.soft} start={stay + 0.05} />
        <Label text="DeepSWE 1.1" x={545} y={452} size={72} color={C.fg} start={stay + 0.15} />
        <SketchLine x1={275} y1={492} x2={815} y2={492} start={stay + 0.2} dur={0.3} stroke={C.line} strokeWidth={2} seed={2501} opacity={0.7} />
        <Label text="48.2%" x={545} y={590} size={120} color={C.green} start={flawed + 0.1} font={FONT_DISPLAY} />
        <Label text="best open model" x={430} y={658} size={38} color={C.soft} start={flawed + 0.25} />
        <g opacity={prog(t, flawed + 0.45, 0.4)}>
          <Stamp x={760} y={660} text="FLAWED" color={C.red} size={54} rotate={-8} start={flawed + 0.45} w={300} />
        </g>
      </g>

      <g>
        <SketchRect x={970} y={330} w={710} h={380} start={row - 0.35} dur={0.5} stroke={C.line} fill={C.panel} radius={14} seed={2510} strokeWidth={2.6} />
        <Label text="the lab's own documents" x={1325} y={392} size={42} color={C.soft} start={row - 0.25} />
        <SketchLine x1={1040} y1={452} x2={1610} y2={452} start={row - 0.1} dur={0.35} stroke={C.line} strokeWidth={2} seed={2511} opacity={0.6} />
        <Label text="text says" x={1080} y={500} size={36} color={C.soft} start={row} />
        <Label text="Mini is behind" x={1210} y={500} size={44} color={C.fg} align="left" start={row + 0.1} />
        <Label text="table says" x={1080} y={566} size={36} color={C.soft} start={row + 0.2} />
        <Label text="Mini is ahead" x={1210} y={566} size={44} color={C.fg} align="left" start={row + 0.3} />
        <g opacity={prog(t, contradicts, 0.4)}>
          <SketchLine x1={1540} y1={486} x2={1540} y2={580} start={contradicts} dur={0.3} stroke={C.red} strokeWidth={3} seed={2512} />
          <Label text="?" x={1585} y={548} size={84} color={C.red} start={contradicts + 0.1} font={FONT_DISPLAY} />
          <Label text="no conclusion" x={1325} y={660} size={40} color={C.red} start={contradicts + 0.2} />
        </g>
      </g>

      <Rule y={850} x1={300} x2={1620} start={stay} opacity={0.35} />
    </>
  );
};

/* ================================================================== */
/* 07 — chapter 01 + Thinking Machines                                */
/* ================================================================== */

export const S07_Shipped: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const first = b(at("First, what actually shipped"));
  const tml = b(at("comes from Thinking Machines Lab"));
  const mira = b(at("Mira Murati"));
  const cto = b(at("former chief technology officer"));

  const out = 1 - easeInOut(prog(t, tml - 0.5, 0.7));
  return (
    <>
      <g opacity={out}>
        <Label text="01" x={470} y={480} size={260} color={C.green} start={first} font={FONT_DISPLAY} />
        <Heading text="what shipped" x={760} y={430} size={104} color={C.fg} start={first + 0.15} align="left" />
        <Label text="the model, the family, the claim" x={764} y={515} size={42} color={C.soft} start={first + 0.35} align="left" />
        <g transform="translate(1470 470)">
          <InkMark x={0} y={0} s={1.55} color={C.green} bg={C.well} start={first + 0.2} strokeWidth={5} />
        </g>
        <Rule y={790} x1={420} x2={1500} start={first + 0.2} opacity={0.35} />
      </g>

      <g opacity={prog(t, tml - 0.35, 0.6)}>
        <LabMark x={960} y={340} s={1.5} color={C.cyan} start={tml - 0.3} />
        <Heading text="Thinking Machines Lab" x={960} y={540} size={92} color={C.fg} start={tml} />
        <Label text="Mira Murati" x={960} y={662} size={62} color={C.green} start={mira} font={FONT_DISPLAY} />
        <Label text="former CTO of OpenAI" x={960} y={728} size={40} color={C.soft} start={cto} />
        <SketchLine x1={820} y1={770} x2={1100} y2={770} start={cto + 0.2} dur={0.3} stroke={C.cyan} strokeWidth={2.6} seed={2601} opacity={0.7} />
      </g>
    </>
  );
};

/* ================================================================== */
/* 08 — the family timeline                                           */
/* ================================================================== */

export const S08_Family: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const follows = b(at("It follows Inkling 2 Small"));
  const big = b(at("594 billion"));
  const debuted = b(at("November 5th"));
  const closed = b(at("closed weights"));
  const publicAt = b(at("November 12th"));
  const eight = b(at("Eight days after that"));
  const mini = b(at("Mini arrived"));
  const apache = b(at("Apache 2.0"));

  return (
    <>
      <SketchLine x1={250} y1={700} x2={1670} y2={700} start={follows} dur={0.7} stroke={C.line} strokeWidth={4} seed={2700} opacity={0.8} />
      <Arrow x1={250} y1={700} x2={1670} y2={700} start={follows} dur={0.8} stroke={C.line} strokeWidth={3} seed={2701} head={14} opacity={0.6} />

      {/* small */}
      <g>
        <ModelCard x={430} y={480} w={360} h={144} name="Inkling 2 Small" sub="much larger" start={follows + 0.15} color={C.soft} mark="ink" nameSize={44} subSize={36} dim={0.95} />
        <Label text="594B" x={430} y={350} size={76} color={C.cyan} start={big} font={FONT_DISPLAY} />
        <Label text="parameters" x={430} y={398} size={36} color={C.soft} start={big + 0.1} />
        <SketchLine x1={430} y1={690} x2={430} y2={648} start={follows + 0.3} dur={0.25} stroke={C.soft} strokeWidth={2.4} seed={2702} />
        <Chip x={430} y={608} text="Nov 5" color={C.cyan} textColor={C.cyan} start={debuted} size={36} w={140} />
        <g opacity={prog(t, closed, 0.35)}>
          <Lock x={650} y={478} s={0.6} start={closed} color={C.yellow} />
        </g>
        <Label text="closed weights" x={430} y={770} size={36} color={C.yellow} start={closed + 0.1} />
      </g>

      {/* open */}
      <g>
        <Chip x={905} y={608} text="Nov 12" color={C.green} textColor={C.green} start={publicAt} size={36} w={150} />
        <SketchLine x1={905} y1={690} x2={905} y2={648} start={publicAt + 0.1} dur={0.25} stroke={C.green} strokeWidth={2.4} seed={2710} />
        <g opacity={prog(t, publicAt + 0.2, 0.35)}>
          <OpenLock x={905} y={470} s={0.72} start={publicAt + 0.15} color={C.green} />
        </g>
        <Label text="weights public" x={905} y={552} size={38} color={C.green} start={publicAt + 0.3} />
        <Label text="8 days" x={1140} y={390} size={54} color={C.yellow} start={eight} font={FONT_DISPLAY} />
        <Label text="later" x={1140} y={434} size={36} color={C.soft} start={eight + 0.1} />
        <SketchLine x1={980} y1={456} x2={1300} y2={456} start={eight + 0.15} dur={0.3} stroke={C.yellow} strokeWidth={2.4} seed={2712} opacity={0.7} />
      </g>

      {/* mini */}
      <g>
        <ModelCard x={1430} y={480} w={380} h={154} name="Inkling 2 Mini" sub="26B · open weights" start={mini} color={C.green} mark="ink" nameSize={48} subSize={36} strokeWidth={3.4} />
        <Chip x={1430} y={608} text="Apache 2.0" color={C.green} textColor={C.green} start={apache} size={36} w={240} />
        <g opacity={prog(t, mini + 0.25, 0.4)}>
          <Spark x={1655} y={392} s={0.9} start={mini + 0.3} color={C.yellow} />
        </g>
      </g>

      <Label text="the model in this video" x={1430} y={770} size={36} color={C.soft} start={apache + 0.3} />
    </>
  );
};

/* ================================================================== */
/* 09 — 26.4B total, 3.4B active                                      */
/* ================================================================== */

export const S09_TotalActive: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const total = b(at("26.4 billion parameters in total"));
  const active = b(at("only 3.4 billion are active"));
  const perToken = b(at("for any given token"));
  const moe = b(at("mixture of experts"));

  return (
    <>
      <g opacity={prog(t, total, 0.4)}>
        <InkMark x={820} y={220} s={0.5} color={C.green} bg={C.bg} start={total} />
        <Label text="Inkling 2 Mini" x={870} y={220} size={40} color={C.fg} align="left" start={total + 0.1} />
      </g>
      <g>
        <Label text="total parameters" x={400} y={330} size={40} color={C.soft} align="left" start={total} />
        <Label text="26.4B" x={1300} y={338} size={74} color={C.purple} align="right" start={total + 0.15} font={FONT_DISPLAY} />
        <SketchRect x={400} y={368} w={900} h={66} start={total} dur={0.5} stroke={C.purple} fill={C.well} radius={12} seed={2800} strokeWidth={3.4} />
        <g opacity={prog(t, total + 0.3, 0.6)}>
          <SketchRect x={406} y={374} w={888} h={54} start={total + 0.3} dur={0.6} stroke={C.purple} fill={C.purple} radius={9} seed={2801} strokeWidth={2} opacity={0.82} />
        </g>
      </g>

      <g>
        <Label text="active per token" x={400} y={540} size={40} color={C.soft} align="left" start={active - 0.1} />
        <Label text="3.4B" x={1300} y={548} size={74} color={C.green} align="right" start={active + 0.15} font={FONT_DISPLAY} />
        <SketchRect x={400} y={578} w={900} h={66} start={active - 0.1} dur={0.45} stroke={C.green} fill={C.well} radius={12} seed={2810} strokeWidth={3.4} />
        <g opacity={prog(t, active + 0.2, 0.6)}>
          <SketchRect x={406} y={584} w={116} h={54} start={active + 0.2} dur={0.55} stroke={C.green} fill={C.green} radius={9} seed={2811} strokeWidth={2} opacity={0.9} />
        </g>
        <Label text="thirteen percent of the weights" x={400} y={686} size={36} color={C.soft} align="left" start={active + 0.5} />
      </g>

      <g opacity={prog(t, moe, 0.45)}>
        <SketchRect x={480} y={750} w={960} h={104} start={moe} dur={0.4} stroke={C.yellow} fill={C.panel} radius={16} seed={2820} strokeWidth={3} />
        <Label text="mixture of experts" x={960} y={790} size={52} color={C.yellow} start={moe + 0.08} font={FONT_DISPLAY} />
        <Label text="only a slice runs per token" x={960} y={832} size={36} color={C.soft} start={moe + 0.2} />
      </g>
    </>
  );
};

/* ================================================================== */
/* 10 — router: 8 of 128                                              */
/* ================================================================== */

export const S10_Router: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const layer = b(at("In every layer"));
  const router = b(at("a router picks"));
  const eight = b(at("eight experts"));
  const pool = b(at("pool of 128"));
  const only = b(at("only those eight"));
  const work = b(at("do the work"));

  // expert grid 16 x 8
  const cols = 16;
  const rows = 8;
  const gap = 38;
  const gx = 900;
  const gy = 300;
  const chosen = [1, 18, 35, 52, 69, 86, 103, 120];

  return (
    <>
      <Label text="one layer" x={300} y={220} size={40} color={C.soft} align="left" start={layer} />

      {/* token + router */}
      <g>
        <Chip x={330} y={430} text="token" color={C.cyan} textColor={C.cyan} start={layer + 0.2} size={38} w={180} />
        <Arrow x1={430} y1={430} x2={570} y2={430} start={layer + 0.35} dur={0.35} stroke={C.cyan} strokeWidth={3.4} seed={2900} head={14} />
        <SketchRect x={580} y={368} w={200} h={124} start={router} dur={0.45} stroke={C.yellow} fill={C.panel} radius={14} seed={2901} strokeWidth={3.2} />
        <Icon name="router" x={680} y={416} s={0.7} color={C.yellow} start={router + 0.1} />
        <Label text="router" x={680} y={540} size={36} color={C.yellow} start={router + 0.2} />
        <Arrow x1={790} y1={430} x2={865} y2={430} start={router + 0.4} dur={0.3} stroke={C.yellow} strokeWidth={3.2} seed={2902} head={12} />
      </g>

      {/* expert pool */}
      <g>
        <Label text="128 experts" x={gx - 20} y={gy - 50} size={38} color={C.soft} align="left" start={pool} />
        {Array.from({length: rows}).map((_, r) =>
          Array.from({length: cols}).map((_, c) => {
            const i = r * cols + c;
            const on = chosen.includes(i);
            const appear = only + (on ? 0.05 * chosen.indexOf(i) : 0);
            return (
              <g key={i} opacity={on ? 1 : prog(t, only + 0.55, 0.5) * 0.32 + 0.12}>
                <SketchRect
                  x={gx + c * gap}
                  y={gy + r * gap}
                  w={28}
                  h={28}
                  start={pool + i * 0.004}
                  dur={0.16}
                  stroke={on ? C.green : C.line}
                  fill={on ? C.green : C.well}
                  radius={4}
                  seed={2910 + i}
                  strokeWidth={on ? 2 : 1.5}
                />
                {on && t >= appear ? <SketchCircle x={gx + c * gap + 14} y={gy + r * gap + 14} d={8} start={appear} dur={0.15} stroke={C.bg} fill={C.bg} seed={2980 + i} strokeWidth={1} /> : null}
              </g>
            );
          }),
        )}
      </g>

      <g opacity={prog(t, eight + 0.1, 0.4)}>
        <Label text="8" x={1320} y={712} size={180} color={C.green} start={eight + 0.1} font={FONT_DISPLAY} />
        <Label text="of 128" x={1440} y={700} size={56} color={C.soft} align="left" start={pool} />
      </g>

      <g opacity={prog(t, work, 0.4)}>
        <Label text="only those eight run" x={1100} y={820} size={44} color={C.fg} start={only + 0.4} />
        <Label text="the rest sit out this token" x={1100} y={872} size={36} color={C.soft} start={work} />
      </g>

      <Rule y={950} x1={250} x2={1660} start={layer} opacity={0.3} />
    </>
  );
};

/* ================================================================== */
/* 11 — modalities + 1M context                                       */
/* ================================================================== */

export const S11_Modalities: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const reads = b(at("It reads text and images"));
  const writes = b(at("writes text"));
  const context = b(at("context window"));
  const million = b(at("up to a million tokens"));

  return (
    <>
      <g>
        <Chip x={560} y={350} text="text" color={C.cyan} textColor={C.cyan} start={reads} size={40} w={190} icon={<Icon name="doc" color={C.cyan} start={reads} />} />
        <Chip x={560} y={450} text="images" color={C.cyan} textColor={C.cyan} start={reads + 0.35} size={40} w={210} icon={<Icon name="grid" color={C.cyan} start={reads + 0.3} />} />
        <Arrow x1={680} y1={400} x2={800} y2={430} start={reads + 0.5} dur={0.35} stroke={C.cyan} strokeWidth={3} seed={3000} head={12} />
        <Arrow x1={680} y1={452} x2={800} y2={438} start={reads + 0.7} dur={0.35} stroke={C.cyan} strokeWidth={3} seed={3001} head={12} />
        <InkMark x={900} y={438} s={1.15} color={C.green} bg={C.well} start={reads + 0.35} />
        <Arrow x1={1000} y1={438} x2={1110} y2={438} start={writes} dur={0.35} stroke={C.green} strokeWidth={3.2} seed={3002} head={13} />
        <Chip x={1230} y={438} text="text" color={C.green} textColor={C.green} start={writes + 0.2} size={40} w={190} icon={<Icon name="doc" color={C.green} start={writes + 0.15} />} />
      </g>

      <g>
        <Label text="context window" x={300} y={650} size={44} color={C.soft} align="left" start={context - 0.1} />
        <SketchRect x={300} y={680} w={1140} h={70} start={context} dur={0.5} stroke={C.line} fill={C.well} radius={12} seed={3010} strokeWidth={3} />
        {Array.from({length: 38}).map((_, i) => (
          <SketchLine key={i} x1={312 + i * 29} y1={696} x2={312 + i * 29} y2={734} start={context + 0.2 + i * 0.012} dur={0.14} stroke={i > 32 ? C.green : C.soft} strokeWidth={2} seed={3011 + i} opacity={i > 32 ? 1 : 0.35} />
        ))}
        <g opacity={prog(t, million, 0.4)}>
          <Label text="1M" x={1450} y={730} size={150} color={C.green} start={million} font={FONT_DISPLAY} />
          <Label text="tokens" x={1570} y={746} size={42} color={C.green} align="left" start={million + 0.1} />
          <Label text="advertised window" x={300} y={812} size={36} color={C.soft} align="left" start={million + 0.2} />
        </g>
      </g>

      <Rule y={900} x1={300} x2={1620} start={context} opacity={0.3} />
    </>
  );
};

/* ================================================================== */
/* 12 — the headline claim                                            */
/* ================================================================== */

export const S12_Claim: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const claim = b(at("Now the headline claim"));
  const lab = b(at("and it comes from the lab itself"));
  const leads = b(at("leads every open weights model"));
  const under = b(at("under 100 billion"));
  const deep = b(at("Deep S W E"));
  const deepScore = b(at("at 48.2 percent"));
  const vals = b(at("Vals Index"));
  const valsScore = b(at("at 46.5 percent"));

  return (
    <>
      <Heading text="the headline claim" x={960} y={182} size={72} color={C.fg} start={claim} />
      <g opacity={prog(t, lab, 0.4)}>
        <Chip x={1415} y={182} text="from the lab" color={C.yellow} textColor={C.yellow} start={lab} size={36} w={250} />
      </g>

      {/* gate under 100B */}
      <g>
        <Label text="open weights" x={300} y={310} size={40} color={C.soft} align="left" start={leads} />
        <SketchRect x={300} y={340} w={1000} h={58} start={leads} dur={0.5} stroke={C.line} fill={C.well} radius={10} seed={3100} strokeWidth={2.8} />
        <SketchRect x={306} y={346} w={252} h={46} start={leads + 0.2} dur={0.5} stroke={C.green} fill={C.green} radius={7} seed={3101} strokeWidth={2} opacity={0.85} />
        <Label text="Mini · 26B" x={432} y={375} size={36} color={C.bg} start={leads + 0.35} />
        <SketchLine x1={1300} y1={300} x2={1300} y2={440} start={under} dur={0.35} stroke={C.red} strokeWidth={4} seed={3102} />
        <Label text="100B" x={1300} y={478} size={42} color={C.red} start={under + 0.1} />
        <Label text="0" x={310} y={478} size={36} color={C.soft} start={under + 0.2} />
        <Label text="50B" x={800} y={478} size={36} color={C.soft} start={under + 0.25} />
      </g>

      {/* two score cards */}
      <g>
        <SketchRect x={280} y={560} w={600} h={270} start={deep - 0.25} dur={0.5} stroke={C.green} fill={C.panel} radius={18} seed={3110} strokeWidth={3.2} />
        <Label text="DeepSWE 1.1" x={580} y={624} size={46} color={C.soft} start={deep} />
        <Label text="48.2" x={580} y={738} size={136} color={C.green} start={deepScore - 0.1} font={FONT_DISPLAY} />
        <Label text="percent" x={720} y={748} size={38} color={C.soft} align="left" start={deepScore + 0.1} />
        <g opacity={prog(t, deepScore + 0.4, 0.4)}>
          <CheckBadge x={832} y={596} s={0.6} start={deepScore + 0.4} />
        </g>
      </g>
      <g>
        <SketchRect x={1040} y={560} w={600} h={270} start={vals - 0.25} dur={0.5} stroke={C.green} fill={C.panel} radius={18} seed={3120} strokeWidth={3.2} />
        <Label text="Vals Index" x={1340} y={624} size={46} color={C.soft} start={vals} />
        <Label text="46.5" x={1340} y={738} size={136} color={C.green} start={valsScore - 0.1} font={FONT_DISPLAY} />
        <Label text="percent" x={1480} y={748} size={38} color={C.soft} align="left" start={valsScore + 0.1} />
        <g opacity={prog(t, valsScore + 0.4, 0.4)}>
          <CheckBadge x={1592} y={596} s={0.6} start={valsScore + 0.4} />
        </g>
      </g>

      <g opacity={prog(t, under + 0.2, 0.5)}>
        <Label text="the lab's own table" x={960} y={882} size={38} color={C.yellow} start={valsScore + 0.4} />
      </g>
      <Rule y={940} x1={300} x2={1620} start={leads} opacity={0.3} />
    </>
  );
};

/* ================================================================== */
/* 13 — hold on to "from the lab itself"                              */
/* ================================================================== */

export const S13_LabStamp: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const hold = b(at("Hold on to the phrase"));
  const back = b(at("keep coming back to it"));

  return (
    <>
      <g transform="rotate(-3 960 520)">
        <SketchRect x={430} y={330} w={1060} h={380} start={hold - 0.3} dur={0.5} stroke={C.yellow} fill={C.panel} radius={8} seed={3200} strokeWidth={3.2} />
        <SketchRect x={420} y={318} w={180} h={48} start={hold - 0.1} dur={0.3} stroke={C.soft} fill={C.line} radius={4} seed={3201} strokeWidth={2} opacity={0.85} />
        <SketchRect x={1320} y={700} w={180} h={48} start={hold + 0.05} dur={0.3} stroke={C.soft} fill={C.line} radius={4} seed={3202} strokeWidth={2} opacity={0.85} />
        <Label text="remember this phrase" x={960} y={410} size={40} color={C.soft} start={hold + 0.1} />
        <Label text="from the lab itself" x={960} y={540} size={96} color={C.yellow} start={hold + 0.2} font={FONT_DISPLAY} />
        <SketchLine x1={720} y1={592} x2={1200} y2={592} start={hold + 0.4} dur={0.35} stroke={C.yellow} strokeWidth={3} seed={3203} opacity={0.7} />
        <Label text="we will come back to it" x={960} y={652} size={40} color={C.soft} start={back - 0.3} />
      </g>

      <g opacity={prog(t, back, 0.5)}>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <SketchCircle x={1430 + i * 46} y={290} d={12} start={back + i * 0.1} dur={0.2} stroke={C.yellow} fill={C.yellow} seed={3210 + i} strokeWidth={1.4} />
          </g>
        ))}
        <Arrow x1={1640} y1={330} x2={1640} y2={430} start={back + 0.35} dur={0.3} stroke={C.yellow} strokeWidth={3} seed={3215} head={12} />
        <Label text="later" x={1640} y={470} size={38} color={C.yellow} start={back + 0.45} />
      </g>
    </>
  );
};

/* ================================================================== */
/* 14 — the rival: Qwen 3.8 27B                                       */
/* ================================================================== */

export const S14_Rival: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const measured = b(at("The model it's measured against most"));
  const comparable = b(at("It's the one comparable model"));
  const beats = b(at("still beats Mini"));
  const released = b(at("was released on August 14th"));
  const apache = b(at("also under Apache 2.0"));
  const dense = b(at("It's a dense model"));
  const all = b(at("all 27 billion parameters"));
  const token = b(at("every single token"));

  return (
    <>
      {/* small context card */}
      <g opacity={0.75}>
        <ModelCard x={420} y={390} w={360} h={132} name="Inkling 2 Mini" sub="26B · 3.4B active" start={measured} color={C.soft} mark="ink" nameSize={40} subSize={34} />
      </g>
      <g opacity={prog(t, measured + 0.2, 0.4)}>
        <Label text="measured" x={700} y={368} size={36} color={C.soft} start={measured + 0.2} />
        <Arrow x1={620} y1={390} x2={800} y2={390} start={measured + 0.3} dur={0.35} stroke={C.soft} strokeWidth={2.6} seed={3290} head={12} opacity={0.7} />
      </g>

      <g>
        <ModelCard x={1060} y={390} w={500} h={174} name="Qwen 3.8 27B" sub="Alibaba · Aug 14" start={measured + 0.1} color={C.purple} mark="qwen" nameSize={56} subSize={38} strokeWidth={3.6} />
        <g opacity={prog(t, apache, 0.35)}>
          <Chip x={1060} y={512} text="Apache 2.0" color={C.purple} textColor={C.purple} start={apache} size={36} w={240} />
        </g>
      </g>

      <g opacity={prog(t, comparable, 0.4)}>
        <Label text="the one comparable model" x={960} y={280} size={40} color={C.soft} start={comparable + 0.1} />
        <Label text="still beats Mini sometimes" x={1060} y={575} size={40} color={C.yellow} start={beats} />
        <SketchLine x1={870} y1={606} x2={1250} y2={606} start={beats + 0.1} dur={0.35} stroke={C.yellow} strokeWidth={2.4} seed={3301} opacity={0.7} />
      </g>

      {/* dense: 27 dots all active */}
      <g>
        <Label text="dense" x={300} y={600} size={52} color={C.purple} align="left" start={dense} font={FONT_DISPLAY} />
        <DotField x={300} y={650} cols={9} rows={3} gap={38} d={22} start={all} color={C.purple} fill={C.purple} stagger={0.035} seed={3310} />
        <Label text="all 27B work" x={690} y={680} size={44} color={C.fg} align="left" start={all + 0.2} />
        <Label text="every token" x={690} y={734} size={38} color={C.soft} align="left" start={token} />
      </g>

      <g opacity={prog(t, all + 0.4, 0.4)}>
        <Label text="27B dense" x={1400} y={700} size={82} color={C.purple} start={all + 0.4} font={FONT_DISPLAY} />
        <Label text="vs 3.4B active" x={1400} y={760} size={38} color={C.soft} start={token + 0.2} />
      </g>

      <Rule y={900} x1={300} x2={1620} start={measured} opacity={0.3} />
    </>
  );
};

/* ================================================================== */
/* 15 — Qwen's window + the rest of the field                         */
/* ================================================================== */

export const S15_Field: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const images = b(at("It handles images and video"));
  const native = b(at("native context window"));
  const native256 = b(at("262,000 tokens"));
  const stretch = b(at("stretchable to a million"));
  const rivals = b(at("three other rivals"));
  const gemma = b(at("Gemma 4 31B"));
  const muse = b(at("Muse Glimmer"));
  const nemotron = b(at("Nemotron 3.5 Super V L"));
  const watch = b(at("Qwen is the one to watch"));

  return (
    <>
      <g opacity={0.95}>
        <ModelCard x={960} y={300} w={420} h={128} name="Qwen 3.8 27B" start={-1} color={C.purple} mark="qwen" nameSize={48} subSize={36} />
        <LeftChips t={t} start={images} />
        <g opacity={prog(t, images, 0.4)}>
          <Arrow x1={600} y1={290} x2={740} y2={300} start={images + 0.2} dur={0.3} stroke={C.purple} strokeWidth={2.6} seed={3405} head={10} />
          <Arrow x1={600} y1={370} x2={740} y2={316} start={images + 0.3} dur={0.3} stroke={C.purple} strokeWidth={2.6} seed={3406} head={10} />
        </g>
      </g>

      <g>
        <Label text="context" x={520} y={470} size={38} color={C.soft} align="left" start={native} />
        <SketchRect x={520} y={500} w={820} h={54} start={-1} dur={0.4} stroke={C.line} fill={C.well} radius={9} seed={3400} strokeWidth={2.6} />
        <g opacity={prog(t, native256, 0.5)}>
          <SketchRect x={526} y={506} w={290} h={42} start={native256} dur={0.6} stroke={C.purple} fill={C.purple} radius={6} seed={3401} strokeWidth={2} opacity={0.8} />
          <Label text="262K" x={670} y={532} size={36} color={C.bg} start={native256 + 0.2} />
        </g>
        <g opacity={prog(t, stretch, 0.5)}>
          <SketchLine x1={840} y1={527} x2={1290} y2={527} start={stretch} dur={0.5} stroke={C.purple} strokeWidth={3} seed={3402} opacity={0.65} />
          <Arrow x1={1290} y1={527} x2={1350} y2={527} start={stretch + 0.4} dur={0.25} stroke={C.purple} strokeWidth={3} seed={3403} head={12} />
          <Label text="1M" x={1410} y={540} size={54} color={C.purple} align="left" start={stretch + 0.1} font={FONT_DISPLAY} />
        </g>
      </g>

      <g>
        <Label text="the rest of the field" x={300} y={660} size={38} color={C.soft} align="left" start={rivals} />
        <RivalCard x={500} y={820} name="Gemma 4 31B" color={C.orange} start={gemma} />
        <RivalCard x={960} y={820} name="Muse Glimmer" color={C.pink} start={muse} />
        <RivalCard x={1420} y={820} name="Nemotron 3.5" sub="Super V L · 124.5B" color={C.cyan} start={nemotron} />
      </g>

      <g opacity={prog(t, watch, 0.4)}>
        <Label text="the one to watch" x={1340} y={276} size={42} color={C.green} start={watch + 0.15} />
        <Arrow x1={1260} y1={286} x2={1190} y2={296} start={watch + 0.3} dur={0.25} stroke={C.green} strokeWidth={2.8} seed={3410} head={10} />
      </g>

      <Rule y={960} x1={300} x2={1620} start={rivals} opacity={0.25} />
    </>
  );
};

const LeftChips: React.FC<{t: number; start: number}> = ({t, start}) => (
  <g opacity={prog(t, start, 0.4)}>
    <Chip x={480} y={300} text="images" color={C.purple} textColor={C.purple} start={start} size={36} w={190} icon={<Icon name="grid" color={C.purple} start={start} />} />
    <Chip x={480} y={372} text="video" color={C.purple} textColor={C.purple} start={start + 0.2} size={36} w={190} icon={<Icon name="browser" color={C.purple} start={start + 0.15} />} />
  </g>
);

const RivalCard: React.FC<{x: number; y: number; name: string; sub?: string; color: string; start: number}> = ({x, y, name, sub, color, start}) => (
  <g>
    <SketchRect x={x - 205} y={y - 66} w={410} h={132} start={start} dur={0.4} stroke={color} fill={C.panel} radius={14} seed={3450 + x} strokeWidth={2.6} />
    <Label text={name} x={x} y={sub ? y - 12 : y} size={40} color={C.fg} start={start + 0.08} />
    {sub ? <Label text={sub} x={x} y={y + 36} size={36} color={C.soft} start={start + 0.16} /> : null}
  </g>
);
