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
import {InkMark, ModelCard, QwenMark} from "../components/Brand";
import {SceneProps, useClock} from "./types";

const Fade: React.FC<{t: number; start: number; dur?: number; children: React.ReactNode; dim?: number}> = ({
  t,
  start,
  dur = 0.45,
  children,
  dim = 1,
}) => <g opacity={prog(t, start, dur) * dim}>{children}</g>;

/* ================================================================== */
/* 111 — three meanings of king                                       */
/* ================================================================== */

export const S111_ThreeKings: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const king = b(at("So, is it the new king"));
  const three = b(at("three different things"));

  return (
    <>
      <g>
        <InkMark x={960} y={300} s={0.9} color={C.green} bg={C.well} start={king} />
        <Label text="is it the new king?" x={960} y={470} size={80} color={C.fg} start={king + 0.1} font={FONT_DISPLAY} />
        <g opacity={prog(t, three, 0.45)}>
          <Label text="three different meanings" x={960} y={545} size={40} color={C.soft} start={three} />
        </g>
      </g>
      <g opacity={prog(t, three + 0.2, 0.5)}>
        {[
          {x: 450, title: "the scoreboard", sub: "for its size", color: C.cyan},
          {x: 960, title: "in the wild", sub: "on real repos", color: C.yellow},
          {x: 1470, title: "of everything", sub: "against the frontier", color: C.pink},
        ].map((c, i) => (
          <g key={i}>
            <SketchRect x={c.x - 220} y={640} w={440} h={180} start={three + 0.2 + i * 0.12} dur={0.4} stroke={c.color} fill={C.panel} radius={16} seed={15100 + i} strokeWidth={2.8} />
            <Icon name="crown" x={c.x - 160} y={730} s={0.62} color={c.color} start={three + 0.3 + i * 0.12} />
            <Label text={c.title} x={c.x - 110} y={715} size={38} color={c.color} align="left" start={three + 0.3 + i * 0.12} />
            <Label text={c.sub} x={c.x - 110} y={765} size={36} color={C.soft} align="left" start={three + 0.4 + i * 0.12} />
          </g>
        ))}
      </g>
      <Rule y={900} x1={300} x2={1620} start={king} opacity={0.25} />
    </>
  );
};

/* ================================================================== */
/* 112 — king of the scoreboard                                       */
/* ================================================================== */

export const S112_KingScoreboard: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const king = b(at("King of the scoreboard"));
  const claim = b(at("a strong claim, and a fair one"));
  const seven = b(at("seven of the nine coding rows"));
  const tie = b(at("ties on the independent index"));
  const fifth = b(at("with a fifth of the active parameters", 1));

  const cells = Array.from({length: 9}, (_, i) => i);
  return (
    <>
      <g>
        <g opacity={1 - 0.85 * prog(t, seven, 0.7)}>
          <Icon name="crown" x={960} y={290} s={1.0} color={C.yellow} start={king} />
          <Label text="a strong claim, and a fair one" x={960} y={390} size={48} color={C.green} start={claim} font={FONT_DISPLAY} />
        </g>
        <g>
          {cells.map((i) => {
            const on = i < 7;
            const tied = i === 7;
            return (
              <g key={i}>
                <SketchRect x={550 + (i % 5) * 150} y={470 + Math.floor(i / 5) * 120} w={120} h={90} start={seven + i * 0.07} dur={0.3} stroke={on ? C.green : tied ? C.soft : C.red} fill={C.panel} radius={10} seed={15200 + i} strokeWidth={2.4} />
                {on ? <CheckBadge x={610 + (i % 5) * 150} y={515 + Math.floor(i / 5) * 120} s={0.42} start={seven + i * 0.07 + 0.15} /> : null}
                {tied ? <Label text="=" x={610 + (i % 5) * 150} y={530} size={42} color={C.soft} start={tie} /> : null}
                {i === 8 ? <CrossBadge x={610 + (i % 5) * 150} y={515 + Math.floor(i / 5) * 120} s={0.42} start={seven + 0.7} /> : null}
              </g>
            );
          })}
        </g>
        <Label text="7 of 9 coding rows" x={960} y={760} size={44} color={C.green} start={seven + 0.2} />
        <Label text="a tie on the independent index" x={960} y={820} size={38} color={C.soft} start={tie + 0.2} />
        <g opacity={prog(t, fifth, 0.45)}>
          <Chip x={960} y={900} text="with 1/5 of the active parameters" color={C.yellow} textColor={C.yellow} start={fifth} size={38} w={660} />
        </g>
      </g>
    </>
  );
};

/* ================================================================== */
/* 113 — king in the wild                                             */
/* ================================================================== */

export const S113_Wild: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const wild = b(at("King in the wild"));
  const notYet = b(at("Not yet"));
  const days = b(at("only a few days old"));
  const outside = b(at("Outside the lab", 1));
  const audit = b(at("an independent audit that raised a flag"));

  return (
    <>
      <g>
        <Label text="proven on real repositories" x={960} y={300} size={40} color={C.soft} start={wild} />
        <g opacity={prog(t, notYet, 0.45)}>
          <Stamp x={960} y={450} text="NOT YET" color={C.red} size={82} rotate={-5} start={notYet} w={520} />
          <Label text="only a few days old" x={960} y={600} size={44} color={C.fg} start={days} />
        </g>
      </g>
      <g>
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <SketchRect x={300 + i * 200} y={720} w={170} h={110} start={outside + i * 0.08} dur={0.3} stroke={C.line} fill={C.panel} radius={10} seed={15300 + i} strokeWidth={2.2} />
            <Label text="repo" x={385 + i * 200} y={780} size={36} color={C.soft} start={outside + 0.1 + i * 0.08} />
          </g>
        ))}
        <g opacity={prog(t, outside, 0.45)}>
          <Label text="mostly lab + partners" x={960} y={880} size={36} color={C.soft} start={outside + 0.3} />
        </g>
        <g opacity={prog(t, audit, 0.45)}>
          <Arrow x1={1540} y1={700} x2={1540} y2={560} start={audit} dur={0.3} stroke={C.red} strokeWidth={3} seed={15310} head={12} />
          <Icon name="flag" x={1540} y={520} s={0.7} color={C.red} start={audit + 0.1} />
          <Label text="an audit raised a flag" x={1540} y={920} size={36} color={C.red} start={audit + 0.2} />
        </g>
      </g>
    </>
  );
};

/* ================================================================== */
/* 114 — king of everything? No                                       */
/* ================================================================== */

export const S114_Everything: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const everything = b(at("King of everything"));
  const qwen = b(at("still wins on terminal work"));
  const close = b(at("Mini isn't close"));
  const twenty = b(at("20 on an index where the leaders are near 60"));
  const fifteen = b(at("15 percent on a code quality test"));

  return (
    <>
      <g>
        <Label text="No." x={960} y={360} size={150} color={C.red} start={everything} font={FONT_DISPLAY} />
        <g opacity={prog(t, qwen, 0.45)}>
          <Label text="Qwen still wins" x={520} y={490} size={40} color={C.purple} start={qwen} />
          {["terminal work", "automation", "enterprise", "documents", "factual restraint"].map((s, i) => (
            <g key={s}>
              <CheckBadge x={360} y={550 + i * 62} s={0.36} start={qwen + 0.2 + i * 0.1} color={C.purple} />
              <Label text={s} x={400} y={550 + i * 62} size={36} color={C.fg} align="left" start={qwen + 0.2 + i * 0.1} />
            </g>
          ))}
        </g>
      </g>
      <g opacity={prog(t, close, 0.45)}>
        <SketchRect x={950} y={470} w={600} h={380} start={close} dur={0.45} stroke={C.line} fill={C.panel} radius={16} seed={15400} strokeWidth={2.8} />
        <Label text="against the frontier" x={1250} y={530} size={38} color={C.soft} start={close + 0.1} />
        <Label text="Mini" x={1060} y={620} size={36} color={C.green} start={close + 0.2} />
        <SketchLine x1={1050} y1={660} x2={1050 + (480 * 20) / 60} y2={660} start={close + 0.3} dur={0.5} stroke={C.green} strokeWidth={24} seed={15401} />
        <Label text="20" x={1050 + (480 * 20) / 60 + 20} y={668} size={36} color={C.green} align="left" start={twenty} />
        <Label text="leaders" x={1060} y={730} size={36} color={C.soft} start={close + 0.4} />
        <SketchLine x1={1050} y1={770} x2={1530} y2={770} start={close + 0.5} dur={0.5} stroke={C.yellow} strokeWidth={24} seed={15402} />
        <Label text="≈60" x={1550} y={778} size={36} color={C.yellow} align="left" start={twenty + 0.2} />
        <g opacity={prog(t, fifteen, 0.45)}>
          <Label text="code quality: 15 vs 45" x={1250} y={830} size={36} color={C.red} start={fifteen} />
        </g>
      </g>
    </>
  );
};

/* ================================================================== */
/* 115 — a crown on trial                                             */
/* ================================================================== */

export const S115_CrownOnTrial: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const verdict = b(at("So our verdict is a crown on trial"));
  const goodFor = b(at("For local agentic coding"));
  const worth = b(at("first model worth downloading"));

  return (
    <>
      <g>
        <Icon name="crown" x={960} y={330} s={1.6} color={C.yellow} start={verdict} />
        <Label text="a crown on trial" x={960} y={500} size={96} color={C.yellow} start={verdict} font={FONT_DISPLAY} />
        <Label text="not settled by one launch" x={960} y={570} size={38} color={C.soft} start={verdict + 0.2} />
      </g>
      <g opacity={prog(t, goodFor, 0.45)}>
        <Label text="best for" x={960} y={660} size={38} color={C.soft} start={goodFor} />
        {["local agentic coding", "repository fixes", "search", "sketch → app"].map((s, i) => (
          <Chip key={s} x={560 + (i % 2) * 800} y={740 + Math.floor(i / 2) * 78} text={s} color={C.green} textColor={C.green} start={goodFor + 0.1 + i * 0.1} size={36} w={i === 0 ? 360 : i === 1 ? 330 : i === 2 ? 220 : 300} />
        ))}
      </g>
      <g opacity={prog(t, worth, 0.45)}>
        <Callout x={960} y={940} text="the first model worth downloading this week" color={C.yellow} start={worth} size={36} w={900} icon={<Icon name="crown" color={C.yellow} start={worth} />} />
      </g>
    </>
  );
};

/* ================================================================== */
/* 116 — keep, sandbox, cap, test                                     */
/* ================================================================== */

export const S116_Habits: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const keep = b(at("Keep Qwen 3.8 27B nearby"));
  const sandbox = b(at("run everything in a sandbox"));
  const cap = b(at("cap the turns"));
  const tests = b(at("let your own tests decide"));

  return (
    <>
      {[
        {x: 330, title: "keep Qwen", sub: "nearby", at: keep, icon: "qwen" as const, color: C.purple},
        {x: 760, title: "sandbox", sub: "contain the agent", at: sandbox, icon: "shield" as const, color: C.green},
        {x: 1190, title: "cap it", sub: "turns + tokens", at: cap, icon: "gauge" as const, color: C.yellow},
      ].map((c, i) => (
        <g key={c.title}>
          <SketchRect x={c.x} y={380} w={390} h={330} start={c.at - 0.2} dur={0.45} stroke={c.color} fill={C.panel} radius={18} seed={15500 + i} strokeWidth={3} />
          {c.icon === "qwen" ? <QwenMark x={c.x + 195} y={480} s={0.8} color={c.color} bg={C.panel} start={c.at + 0.1} /> : <Icon name={c.icon as "shield" | "gauge"} x={c.x + 195} y={480} s={1.0} color={c.color} start={c.at + 0.1} />}
          <Label text={c.title} x={c.x + 195} y={590} size={48} color={c.color} start={c.at + 0.12} font={FONT_DISPLAY} />
          <Label text={c.sub} x={c.x + 195} y={650} size={36} color={C.soft} start={c.at + 0.22} />
        </g>
      ))}
      <g opacity={prog(t, tests, 0.45)}>
        <Label text="then let your own tests decide" x={960} y={830} size={42} color={C.green} start={tests} />
      </g>
      <Rule y={910} x1={300} x2={1620} start={keep} opacity={0.25} />
    </>
  );
};

/* ================================================================== */
/* 117 — the ten-ticket test                                          */
/* ================================================================== */

export const S117_TenTickets: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const best = b(at("The best test is the one the lab can't run"));
  const ten = b(at("ten real tickets"));
  const harness = b(at("both models in the same agent harness"));
  const same = b(at("at the same context length"));
  const scored = b(at("scored on tests passed"));
  const follow = b(at("we'll run it in a follow up"));

  return (
    <>
      <g>
        <Label text="10 real tickets" x={560} y={300} size={54} color={C.fg} start={ten} font={FONT_DISPLAY} />
        {Array.from({length: 10}).map((_, i) => (
          <g key={i}>
            <SketchRect x={300 + (i % 5) * 108} y={350 + Math.floor(i / 5) * 92} w={88} h={72} start={ten + i * 0.08} dur={0.25} stroke={i % 2 ? C.yellow : C.green} fill={C.panel} radius={6} seed={15600 + i} strokeWidth={2.2} />
            <Label text={`${i + 1}`} x={344 + (i % 5) * 108} y={394 + Math.floor(i / 5) * 92} size={36} color={i % 2 ? C.yellow : C.green} start={ten + i * 0.08 + 0.1} />
          </g>
        ))}
        <Label text="from your own repositories" x={560} y={600} size={36} color={C.soft} start={ten + 0.5} />
      </g>
      <g>
        <SketchRect x={940} y={320} w={620} h={330} start={harness} dur={0.45} stroke={C.cyan} fill={C.panel} radius={16} seed={15620} strokeWidth={2.8} />
        <Label text="same harness" x={1250} y={380} size={40} color={C.cyan} start={harness} />
        <ModelCard x={1150} y={480} w={290} h={100} name="Mini" start={harness + 0.1} color={C.green} mark="ink" nameSize={40} subSize={30} />
        <ModelCard x={1150} y={600} w={290} h={100} name="Qwen" start={harness + 0.2} color={C.purple} mark="qwen" nameSize={40} subSize={30} />
        <Label text="same context length" x={1250} y={680} size={36} color={C.soft} start={same} />
      </g>
      <g opacity={prog(t, scored, 0.45)}>
        <Label text="score tests passed · retries · time" x={960} y={800} size={38} color={C.yellow} start={scored} />
        <Label text="the lab can't run this one" x={960} y={855} size={36} color={C.soft} start={best + 0.4} />
      </g>
      <g opacity={prog(t, follow, 0.45)}>
        <Chip x={960} y={930} text="follow-up, if there's interest" color={C.green} textColor={C.green} start={follow} size={36} w={620} />
      </g>
    </>
  );
};

/* ================================================================== */
/* 118 — closing                                                      */
/* ================================================================== */

export const S118_Close: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const notStory = b(at("And maybe the model isn't the real story"));
  const memory = b(at("memory is the scarce resource"));
  const compute = b(at("compute is comparatively cheap"));
  const spends = b(at("Looping spends compute to save memory"));
  const shift = b(at("the question we ask of open models"));
  const passes = b(at("how many passes they make for every token"));
  const ask = b(at("Let us know what we should put through it first"));

  return (
    <>
      <g>
        <Label text="maybe the model isn't the story" x={960} y={280} size={50} color={C.soft} start={notStory} font={FONT_DISPLAY} />
        <g opacity={prog(t, memory, 0.45)}>
          <SketchRect x={300} y={360} w={560} h={300} start={memory} dur={0.45} stroke={C.cyan} fill={C.panel} radius={18} seed={15700} strokeWidth={3} />
          <Icon name="chip" x={440} y={470} s={1.0} color={C.cyan} start={memory + 0.1} />
          <Label text="memory" x={640} y={470} size={44} color={C.cyan} align="left" start={memory + 0.15} />
          <Label text="the scarce resource" x={640} y={530} size={36} color={C.soft} align="left" start={memory + 0.3} />
        </g>
        <g opacity={prog(t, compute, 0.45)}>
          <SketchRect x={1060} y={360} w={560} h={300} start={compute} dur={0.45} stroke={C.green} fill={C.panel} radius={18} seed={15710} strokeWidth={3} />
          <Icon name="loop" x={1200} y={470} s={1.0} color={C.green} start={compute + 0.1} />
          <Label text="compute" x={1400} y={470} size={44} color={C.green} align="left" start={compute + 0.15} />
          <Label text="comparatively cheap" x={1400} y={530} size={36} color={C.soft} align="left" start={compute + 0.3} />
        </g>
        <g opacity={prog(t, spends, 0.45)}>
          <Arrow x1={880} y1={510} x2={1040} y2={510} start={spends} dur={0.35} stroke={C.yellow} strokeWidth={3.4} seed={15720} head={12} />
          <Label text="looping spends compute to save memory" x={960} y={740} size={42} color={C.yellow} start={spends + 0.2} />
        </g>
      </g>
      <g opacity={prog(t, shift, 0.5)}>
        <Label text="how many parameters?" x={780} y={850} size={40} color={C.soft} start={shift} />
        <Label text="→" x={960} y={850} size={48} color={C.yellow} start={shift + 0.2} />
        <Label text="how many passes per token?" x={1230} y={850} size={40} color={C.green} start={passes - 0.2} />
      </g>
      <g opacity={prog(t, ask, 0.6)}>
        <InkMark x={960} y={180} s={0.7} color={C.green} bg={C.bg} start={ask} />
        <Label text="let us know what to test first" x={960} y={960} size={38} color={C.soft} start={ask + 0.2} />
      </g>
    </>
  );
};
