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
  Caption,
  Chip,
  DotField,
  Heading,
  Icon,
  MiniNote,
  Rule,
  Stat,
  Stamp,
} from "../components/Kit";
import {BenchBars, BenchFoot, BenchNote, BenchTitle} from "../components/Bench";
import {DocPage} from "../components/Art";
import {SceneProps, useClock} from "./types";

const Fade: React.FC<{t: number; start: number; dur?: number; children: React.ReactNode; dim?: number}> = ({
  t,
  start,
  dur = 0.45,
  children,
  dim = 1,
}) => <g opacity={prog(t, start, dur) * dim}>{children}</g>;

/* ================================================================== */
/* 38 — the scoreboard warning                                        */
/* ================================================================== */

export const S38_Warning: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const warning = b(at("A warning first"));
  const lab = b(at("The big table we're about to walk through"));
  const rows = b(at("Several rows were run by the lab"));
  const harness = b(at("harnesses the lab chose"));
  const caption = b(at("evaluation setups vary by model"));
  const method = b(at("So for every benchmark"));
  const exists = b(at("where independent evidence exists"));

  return (
    <>
      <g>
        <SketchRect x={280} y={240} w={620} h={520} start={-1} dur={0.5} stroke={C.line} fill={C.panel} radius={14} seed={7200} strokeWidth={2.8} />
        <Label text="the lab's table" x={590} y={300} size={38} color={C.soft} start={lab} />
        {Array.from({length: 6}).map((_, r) => (
          <g key={r}>
            <SketchLine x1={320} y1={350 + r * 62} x2={860} y2={350 + r * 62} start={lab + 0.1 + r * 0.06} dur={0.25} stroke={C.line} strokeWidth={1.6} seed={7201 + r} opacity={0.5} />
            <SketchRect x={350} y={370 + r * 62} w={140} h={18} start={lab + 0.2 + r * 0.06} dur={0.2} stroke={C.line} fill={C.well} radius={4} seed={7210 + r} strokeWidth={1.2} opacity={0.7} />
            <SketchRect x={520} y={370 + r * 62} w={90} h={18} start={lab + 0.25 + r * 0.06} dur={0.2} stroke={C.line} fill={C.well} radius={4} seed={7220 + r} strokeWidth={1.2} opacity={0.7} />
            <SketchRect x={640} y={370 + r * 62} w={180} h={18} start={lab + 0.3 + r * 0.06} dur={0.2} stroke={C.line} fill={C.well} radius={4} seed={7230 + r} strokeWidth={1.2} opacity={0.7} />
          </g>
        ))}
        <g opacity={prog(t, rows, 0.4)}>
          <Chip x={980} y={360} text="lab-run" color={C.yellow} textColor={C.yellow} start={rows} size={38} w={220} />
        </g>
        <g opacity={prog(t, harness, 0.4)}>
          <Chip x={980} y={450} text="lab-chosen harness" color={C.yellow} textColor={C.yellow} start={harness} size={38} w={380} />
        </g>
        <g opacity={prog(t, caption, 0.4)}>
          <Chip x={980} y={540} text="setups vary" color={C.red} textColor={C.red} start={caption} size={38} w={280} />
        </g>
        <Stamp x={980} y={680} text="CHECK THE FOOTNOTES" color={C.red} size={42} rotate={-6} start={caption + 0.3} w={520} />
      </g>

      <g opacity={prog(t, method, 0.45)}>
        <SketchLine x1={300} y1={840} x2={1620} y2={840} start={method} dur={0.5} stroke={C.line} strokeWidth={2.4} seed={7240} opacity={0.55} />
        <Label text="what it checks" x={450} y={900} size={38} color={C.cyan} start={method + 0.2} />
        <Label text="the score" x={960} y={900} size={38} color={C.green} start={method + 0.4} />
        <Label text="independent evidence?" x={1450} y={900} size={38} color={C.yellow} start={exists} />
      </g>
    </>
  );
};

/* ================================================================== */
/* 39 — two neutral referees                                          */
/* ================================================================== */

export const S39_Referees: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const two = b(at("the two third party indexes"));
  const neutral = b(at("closest thing to a neutral referee"));

  return (
    <>
      <g>
        <SketchRect x={260} y={380} w={650} h={300} start={two} dur={0.5} stroke={C.cyan} fill={C.panel} radius={18} seed={7300} strokeWidth={3.2} />
        <Icon name="gauge" x={370} y={530} s={1.2} color={C.cyan} start={two + 0.1} />
        <Label text="Artificial Analysis" x={650} y={500} size={52} color={C.cyan} start={two + 0.2} />
        <Label text="Intelligence Index" x={650} y={560} size={38} color={C.soft} start={two + 0.3} />
      </g>
      <g>
        <SketchRect x={1010} y={380} w={650} h={300} start={two + 0.25} dur={0.5} stroke={C.pink} fill={C.panel} radius={18} seed={7310} strokeWidth={3.2} />
        <Icon name="scale" x={1120} y={530} s={1.2} color={C.pink} start={two + 0.35} />
        <Label text="Vals AI" x={1400} y={500} size={52} color={C.pink} start={two + 0.45} />
        <Label text="Vals Index" x={1400} y={560} size={38} color={C.soft} start={two + 0.55} />
      </g>
      <g opacity={prog(t, neutral, 0.45)}>
        <Callout x={960} y={800} text="the closest thing to a neutral referee" color={C.yellow} start={neutral} size={40} w={820} icon={<Icon name="scale" color={C.yellow} start={neutral} />} />
      </g>
      <Label text="both run their own evaluations" x={960} y={900} size={38} color={C.soft} start={neutral + 0.3} />
    </>
  );
};

/* ================================================================== */
/* 40 — AA Intelligence Index v5.0                                    */
/* ================================================================== */

export const S40_AAIndex: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const aa = b(at("The first is the Artificial Analysis"));
  const independent = b(at("runs the same evaluations"));
  const launch = b(at("Version 5.0 launched on October 27th"));
  const nine = b(at("blends nine evaluations"));
  const four = b(at("four equally weighted categories"));
  const knowledge = b(at("categories knowledge work"));
  const coding = b(at("coding, science"));
  const science = b(at("science, and general knowledge"));
  const general = b(at("general knowledge"));
  const privateData = b(at("built on private datasets"));

  const cats = [
    {label: "knowledge work", angle: -100, at: knowledge, color: C.cyan},
    {label: "coding", angle: -10, at: coding, color: C.green},
    {label: "science", angle: 80, at: science, color: C.purple},
    {label: "general", angle: 170, at: general, color: C.orange},
  ];
  return (
    <>
      <g>
        <SketchCircle x={720} y={560} d={360} start={aa} dur={0.7} stroke={C.line} fill={C.well} seed={7400} strokeWidth={3} />
        <SketchCircle x={720} y={560} d={220} start={aa + 0.2} dur={0.5} stroke={C.cyan} fill={C.panel} seed={7401} strokeWidth={2.6} />
        <Label text="9 evals" x={720} y={548} size={54} color={C.cyan} start={nine} font={FONT_DISPLAY} />
        <Label text="4 categories" x={720} y={600} size={36} color={C.soft} start={four} />
        {cats.map((c, i) => {
          const rad = (c.angle * Math.PI) / 180;
          const x = 720 + Math.cos(rad) * 240;
          const y = 560 + Math.sin(rad) * 240;
          return (
            <g key={i}>
              <SketchCircle x={x} y={y} d={18} start={c.at} dur={0.2} stroke={c.color} fill={c.color} seed={7410 + i} strokeWidth={1.6} />
              <Label text={c.label} x={x} y={y + (Math.sin(rad) > 0 ? 44 : -40)} size={36} color={c.color} start={c.at + 0.1} />
            </g>
          );
        })}
      </g>
      <g>
        <Label text="independent" x={1330} y={330} size={44} color={C.cyan} start={independent} />
        <Label text="same evals for every model" x={1330} y={386} size={36} color={C.soft} start={independent + 0.2} />
        <Label text="launched Oct 27" x={1330} y={470} size={40} color={C.fg} start={launch} />
        <g opacity={prog(t, privateData, 0.45)}>
          <Chip x={1330} y={580} text="private datasets" color={C.yellow} textColor={C.yellow} start={privateData} size={38} w={340} />
          <Label text="harder to train against" x={1330} y={642} size={36} color={C.soft} start={privateData + 0.2} />
        </g>
      </g>
      <Rule y={870} x1={300} x2={1620} start={aa} opacity={0.25} />
    </>
  );
};

/* ================================================================== */
/* 41 — the two overlap rows                                          */
/* ================================================================== */

export const S41_Overlap: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const two = b(at("Two of those nine"));
  const tb = b(at("Terminal Bench 4.0"));
  const frontier = b(at("Frontier Code 2.0"));
  const own = b(at("also appear as their own rows"));
  const get = b(at("we'll get to them"));

  return (
    <>
      <g opacity={0.55}>
        <SketchCircle x={960} y={420} d={260} start={two - 0.3} dur={0.5} stroke={C.line} fill={C.well} seed={7500} strokeWidth={2.4} />
        <Label text="AA index" x={960} y={420} size={38} color={C.soft} start={two - 0.2} />
      </g>
      <g>
        <SketchRect x={330} y={560} w={560} h={180} start={tb - 0.2} dur={0.45} stroke={C.cyan} fill={C.panel} radius={16} seed={7510} strokeWidth={3} />
        <Label text="Terminal-Bench 4.0" x={610} y={625} size={46} color={C.cyan} start={tb} />
        <Label text="also a lab row" x={610} y={685} size={36} color={C.soft} start={own} />
      </g>
      <g>
        <SketchRect x={1030} y={560} w={560} h={180} start={frontier - 0.2} dur={0.45} stroke={C.pink} fill={C.panel} radius={16} seed={7520} strokeWidth={3} />
        <Label text="Frontier Code 2.0" x={1310} y={625} size={46} color={C.pink} start={frontier} />
        <Label text="also a lab row" x={1310} y={685} size={36} color={C.soft} start={own + 0.3} />
      </g>
      <Arrow x1={610} y1={540} x2={610} y2={420} start={tb + 0.2} dur={0.35} stroke={C.cyan} strokeWidth={3} seed={7530} head={12} />
      <Arrow x1={1310} y1={540} x2={1310} y2={420} start={frontier + 0.2} dur={0.35} stroke={C.pink} strokeWidth={3} seed={7531} head={12} />
      <g opacity={prog(t, get, 0.4)}>
        <Label text="more on both later" x={960} y={860} size={40} color={C.soft} start={get} />
      </g>
      <Rule y={920} x1={300} x2={1620} start={two} opacity={0.25} />
    </>
  );
};

/* ================================================================== */
/* 42 — 20.1 = 20.1, leaders near 60                                  */
/* ================================================================== */

export const S42_DeadHeat: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const mini = b(at("Inkling 2 Mini scores 20.1"));
  const qwen = b(at("Qwen 3.8 27B scores exactly the same"));
  const scale = b(at("the best models on this index"));
  const frontier = b(at("nowhere near the frontier"));
  const heat = b(at("dead heat"));

  const xOf = (v: number) => 300 + (v / 60) * 1320;
  return (
    <>
      <g>
        <SketchLine x1={300} y1={620} x2={1620} y2={620} start={mini} dur={0.6} stroke={C.soft} strokeWidth={4} seed={7600} />
        {[0, 10, 20, 30, 40, 50, 60].map((v) => (
          <g key={v}>
            <SketchLine x1={xOf(v)} y1={620} x2={xOf(v)} y2={646} start={mini + 0.1} dur={0.2} stroke={C.soft} strokeWidth={2.4} seed={7601 + v} />
            <Label text={`${v}`} x={xOf(v)} y={686} size={36} color={C.soft} start={mini + 0.15} />
          </g>
        ))}
        <Label text="Intelligence Index score" x={960} y={750} size={38} color={C.soft} start={mini + 0.3} />
      </g>

      <g>
        <SketchCircle x={xOf(20.1)} y={586} d={30} start={mini} dur={0.25} stroke={C.green} fill={C.green} seed={7610} strokeWidth={2} />
        <Label text="Mini 20.1" x={xOf(20.1) - 26} y={530} size={44} color={C.green} align="right" start={mini + 0.1} />
        <SketchCircle x={xOf(20.1) + 22} y={586} d={30} start={qwen} dur={0.25} stroke={C.purple} fill={C.purple} seed={7611} strokeWidth={2} />
        <Label text="Qwen 20.1" x={xOf(20.1) + 44} y={470} size={44} color={C.purple} align="left" start={qwen + 0.1} />
      </g>

      <g opacity={prog(t, scale, 0.45)}>
        <SketchCircle x={xOf(60)} y={586} d={26} start={scale} dur={0.25} stroke={C.yellow} fill={C.yellow} seed={7620} strokeWidth={2} />
        <Label text="leaders ≈ 60" x={xOf(60) - 10} y={530} size={44} color={C.yellow} align="right" start={scale + 0.1} />
      </g>
      <g opacity={prog(t, frontier, 0.45)}>
        <Label text="a local model at 20" x={xOf(20.1)} y={810} size={38} color={C.green} start={frontier} />
        <Label text="is nowhere near the frontier" x={xOf(20.1)} y={862} size={36} color={C.soft} start={frontier + 0.2} />
      </g>

      <g opacity={prog(t, heat, 0.45)}>
        <SketchLine x1={xOf(20.1) - 70} y1={930} x2={xOf(20.1) + 170} y2={930} start={heat} dur={0.3} stroke={C.yellow} strokeWidth={3} seed={7630} />
        <Label text="dead heat with its closest rival" x={xOf(20.1) + 50} y={980} size={36} color={C.yellow} start={heat + 0.15} />
      </g>
    </>
  );
};

/* ================================================================== */
/* 43 — cost and time per task                                        */
/* ================================================================== */

export const S43_Cost: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const cost = b(at("one index task cost Mini"));
  const versus = b(at("versus 3 dollars"));
  const cheap = b(at("six times cheaper"));
  const fast = b(at("four times faster"));

  return (
    <>
      <g>
        <SketchRect x={280} y={320} w={680} h={330} start={cost - 0.2} dur={0.5} stroke={C.green} fill={C.panel} radius={18} seed={7700} strokeWidth={3} />
        <Label text="one index task" x={620} y={380} size={38} color={C.soft} start={cost + 0.1} />
        <Stat x={500} y={510} value="59¢" color={C.green} size={130} start={cost + 0.2} />
        <Stat x={750} y={510} value="9 min" color={C.green} size={80} start={cost + 0.35} />
        <Label text="Inkling 2 Mini" x={620} y={590} size={36} color={C.green} start={cost + 0.45} />
      </g>
      <g>
        <SketchRect x={1010} y={320} w={680} h={330} start={versus - 0.2} dur={0.5} stroke={C.purple} fill={C.panel} radius={18} seed={7710} strokeWidth={3} />
        <Label text="one index task" x={1350} y={380} size={38} color={C.soft} start={versus + 0.1} />
        <Stat x={1220} y={510} value="$3.53" color={C.purple} size={100} start={versus + 0.2} />
        <Stat x={1470} y={510} value="38.2 min" color={C.purple} size={64} start={versus + 0.35} />
        <Label text="Qwen 3.8 27B" x={1350} y={590} size={36} color={C.purple} start={versus + 0.45} />
      </g>
      <g>
        <g opacity={prog(t, cheap, 0.45)}>
          <Chip x={580} y={760} text="6× cheaper" color={C.green} textColor={C.green} start={cheap} size={50} w={360} />
        </g>
        <g opacity={prog(t, fast, 0.45)}>
          <Chip x={1340} y={760} text="4× faster" color={C.green} textColor={C.green} start={fast} size={50} w={340} />
        </g>
      </g>
      <Label text="on Artificial Analysis's own runs" x={960} y={870} size={38} color={C.soft} start={cost + 0.6} />
      <Rule y={930} x1={300} x2={1620} start={cost} opacity={0.25} />
    </>
  );
};

/* ================================================================== */
/* 44 — the cost caveats                                              */
/* ================================================================== */

export const S44_CostCaveats: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const caveats = b(at("Two caveats"));
  const pricing = b(at("the cost uses the lab's own first party pricing"));
  const input = b(at("15 cents per million input tokens"));
  const output = b(at("50 cents per million output tokens"));
  const hosted = b(at("it measures a hosted A P I"));
  const laptop = b(at("not your laptop"));

  return (
    <>
      <g>
        <SketchRect x={260} y={330} w={700} h={380} start={pricing - 0.2} dur={0.5} stroke={C.yellow} fill={C.panel} radius={18} seed={7800} strokeWidth={3} />
        <Label text="first-party pricing" x={610} y={395} size={42} color={C.yellow} start={pricing} />
        <Label text="input" x={390} y={500} size={36} color={C.soft} start={input} />
        <Label text="$0.15" x={390} y={560} size={64} color={C.fg} start={input + 0.1} font={FONT_DISPLAY} />
        <Label text="/ 1M tokens" x={390} y={606} size={36} color={C.soft} start={input + 0.2} />
        <Label text="output" x={720} y={500} size={36} color={C.soft} start={output} />
        <Label text="$0.50" x={720} y={560} size={64} color={C.fg} start={output + 0.1} font={FONT_DISPLAY} />
        <Label text="/ 1M tokens" x={720} y={606} size={36} color={C.soft} start={output + 0.2} />
        <Label text="the lab's own prices" x={610} y={680} size={36} color={C.yellow} start={output + 0.3} />
      </g>
      <g>
        <SketchRect x={1040} y={330} w={620} h={380} start={hosted - 0.2} dur={0.5} stroke={C.red} fill={C.panel} radius={18} seed={7810} strokeWidth={3} />
        <Icon name="cloud" x={1160} y={470} s={1.1} color={C.cyan} start={hosted} />
        <Label text="hosted API" x={1370} y={450} size={42} color={C.cyan} start={hosted} />
        <Label text="not your laptop" x={1370} y={510} size={38} color={C.red} start={laptop} />
        <Icon name="laptop" x={1200} y={650} s={0.8} color={C.soft} start={laptop + 0.2} />
        <SketchLine x1={1130} y1={600} x2={1260} y2={700} start={laptop + 0.3} dur={0.25} stroke={C.red} strokeWidth={5} seed={7820} />
        <SketchLine x1={1260} y1={600} x2={1130} y2={700} start={laptop + 0.4} dur={0.25} stroke={C.red} strokeWidth={5} seed={7821} />
      </g>
      <Label text="hosted API ≠ local" x={960} y={840} size={38} color={C.soft} start={laptop + 0.4} />
      <Rule y={910} x1={300} x2={1620} start={caveats} opacity={0.25} />
    </>
  );
};

/* ================================================================== */
/* 45 — the Vals Index                                                */
/* ================================================================== */

export const S45_Vals: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const vals = b(at("The second index is the Vals Index"));
  const independent = b(at("Vals AI is another independent evaluator"));
  const eight = b(at("blends eight benchmarks"));
  const finance = b(at("across finance"));
  const coding = b(at("finance, coding"));
  const legal = b(at("coding, legal"));
  const tax = b(at("legal, and tax"));
  const economy = b(at("share of the United States economy"));
  const slice = b(at("The coding slice"));

  const segs = [
    {label: "finance", w: 420, at: finance, color: C.cyan},
    {label: "coding", w: 300, at: coding, color: C.green},
    {label: "legal", w: 190, at: legal, color: C.purple},
    {label: "tax", w: 150, at: tax, color: C.orange},
  ];
  return (
    <>
      <g>
        <Label text="8 benchmarks" x={300} y={360} size={40} color={C.soft} align="left" start={eight} />
        <SketchRect x={300} y={400} w={1060} h={80} start={vals} dur={0.5} stroke={C.line} fill={C.well} radius={12} seed={7900} strokeWidth={2.6} />
        {segs.map((s, i) => {
          const x = 300 + segs.slice(0, i).reduce((a, b0) => a + b0.w, 0);
          return (
            <g key={i}>
              <SketchRect x={x + 4} y={406} w={s.w - 8} h={68} start={s.at} dur={0.45} stroke={s.color} fill={s.color} radius={8} seed={7901 + i} strokeWidth={2} opacity={0.72} />
              <Label text={s.label} x={x + s.w / 2} y={448} size={36} color={C.bg} start={s.at + 0.15} />
            </g>
          );
        })}
        <Label text="weighted by share of the US economy" x={300} y={520} size={36} color={C.soft} align="left" start={economy} />
        <Label text="finance most · coding next" x={300} y={574} size={36} color={C.soft} align="left" start={coding + 0.2} />
      </g>
      <g>
        <SketchRect x={1380} y={330} w={280} h={270} start={independent} dur={0.45} stroke={C.pink} fill={C.panel} radius={16} seed={7910} strokeWidth={3} />
        <Label text="independent" x={1520} y={390} size={38} color={C.pink} start={independent + 0.1} />
        <Label text="evaluator" x={1520} y={445} size={38} color={C.soft} start={independent + 0.2} />
        <Label text="Vals AI" x={1520} y={530} size={44} color={C.pink} start={independent + 0.3} font={FONT_DISPLAY} />
      </g>
      <g opacity={prog(t, slice, 0.45)}>
        <Label text="coding slice" x={300} y={680} size={38} color={C.green} align="left" start={slice} />
        <Chip x={450} y={750} text="Terminal-Bench 4.0" color={C.green} textColor={C.green} start={slice + 0.1} size={36} w={330} />
        <Chip x={810} y={750} text="Vibe Code" color={C.green} textColor={C.green} start={slice + 0.3} size={36} w={250} />
        <Chip x={1130} y={750} text="code migration" color={C.green} textColor={C.green} start={slice + 0.45} size={36} w={310} />
      </g>
      <Rule y={860} x1={300} x2={1620} start={vals} opacity={0.25} />
    </>
  );
};

/* ================================================================== */
/* 46 — Mini's 46.5, with no Vals entry                                */
/* ================================================================== */

export const S46_ValsScore: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const mini = b(at("Inkling 2 Mini scores 46.5"));
  const table = b(at("That figure comes from the lab's table"));
  const noEntry = b(at("We didn't find a Vals published entry"));
  const small = b(at("the bigger Inkling 2 Small 56.1"));
  const top = b(at("top of the board is just above 71"));

  const rows = [
    {name: "top of board", value: "71+", at: top, color: C.yellow, y: 360},
    {name: "Inkling 2 Small", value: "56.1", at: small, color: C.cyan, y: 470},
    {name: "Inkling 2 Mini", value: "46.5", at: mini, color: C.green, y: 580},
  ];
  return (
    <>
      <g>
        {rows.map((r, i) => (
          <g key={i}>
            <SketchRect x={300} y={r.y - 42} w={860} h={84} start={r.at - 0.2} dur={0.4} stroke={r.color} fill={C.panel} radius={10} seed={8000 + i} strokeWidth={r.name === "Inkling 2 Mini" ? 3.2 : 2.2} opacity={r.name === "Inkling 2 Mini" ? 1 : 0.75} />
            <Label text={r.name} x={350} y={r.y} size={40} color={r.color} align="left" start={r.at} />
            <Label text={r.value} x={1080} y={r.y} size={64} color={r.color} align="right" start={r.at + 0.1} font={FONT_DISPLAY} />
          </g>
        ))}
        <g opacity={prog(t, table, 0.4)}>
          <Chip x={1370} y={580} text="from the lab's table" color={C.yellow} textColor={C.yellow} start={table} size={36} w={380} />
        </g>
        <g opacity={prog(t, noEntry, 0.4)}>
          <Stamp x={730} y={720} text="NO VALS ENTRY" color={C.red} size={46} rotate={-5} start={noEntry} w={520} />
        </g>
      </g>
      <Label text="small field, lab-reported" x={960} y={850} size={38} color={C.soft} start={noEntry + 0.3} />
    </>
  );
};

/* ================================================================== */
/* 47 — one other model, a thin field                                 */
/* ================================================================== */

export const S47_ThinField: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const only = b(at("only other model with a Vals score"));
  const nem = b(at("Nemotron 3.5 Super V L, at 29.8"));
  const thin = b(at("a very thin field"));

  return (
    <>
      <g>
        <SketchLine x1={300} y1={780} x2={1620} y2={780} start={only} dur={0.6} stroke={C.soft} strokeWidth={3} seed={8100} />
        <g opacity={prog(t, nem, 0.4)}>
          <SketchRect x={560} y={470} w={260} h={310} start={nem} dur={0.45} stroke={C.cyan} fill={C.panel} radius={12} seed={8101} strokeWidth={3} />
          <Label text="Nemotron" x={690} y={550} size={42} color={C.cyan} start={nem + 0.1} />
          <Label text="3.5 Super VL" x={690} y={610} size={36} color={C.soft} start={nem + 0.2} />
          <Label text="29.8" x={690} y={700} size={70} color={C.cyan} start={nem + 0.3} font={FONT_DISPLAY} />
          <Label text="the only other" x={690} y={740} size={36} color={C.soft} start={only + 0.2} />
        </g>
        <g opacity={prog(t, only + 0.3, 0.4)}>
          <SketchRect x={1000} y={470} w={260} h={310} start={only + 0.3} dur={0.4} stroke={C.line} fill={C.well} radius={12} seed={8110} strokeWidth={2.2} opacity={0.5} />
          <Label text="?" x={1130} y={660} size={120} color={C.line} start={only + 0.5} font={FONT_DISPLAY} />
        </g>
        <g opacity={prog(t, thin, 0.45)}>
          <Chip x={960} y={280} text="a very thin field" color={C.red} textColor={C.red} start={thin} size={44} w={420} />
        </g>
      </g>
      <Label text="the claim rests on this row" x={960} y={870} size={38} color={C.soft} start={thin + 0.2} />
      <Rule y={930} x1={300} x2={1620} start={only} opacity={0.25} />
    </>
  );
};

/* ================================================================== */
/* 48 — coding rows: DeepSWE 1.1                                      */
/* ================================================================== */

export const S48_DeepSWE: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const coding = b(at("Now the coding rows"));
  const deep = b(at("The benchmark the lab leads with"));
  const datacurve = b(at("It comes from a company called Datacurve"));
  const longWork = b(at("long, realistic engineering work"));

  return (
    <>
      <g opacity={1 - prog(t, deep - 0.15, 0.2)}>
        <Label text="now" x={360} y={310} size={40} color={C.soft} align="left" start={coding} />
        <Label text="the coding rows" x={360} y={420} size={92} color={C.fg} align="left" start={coding + 0.15} font={FONT_DISPLAY} />
      </g>
      <g opacity={prog(t, deep + 0.05, 0.3)}>
        <Label text="benchmark one" x={360} y={310} size={38} color={C.soft} align="left" start={deep - 0.1} />
        <Label text="DeepSWE 1.1" x={360} y={420} size={100} color={C.green} align="left" start={deep} font={FONT_DISPLAY} />
        <Label text="Datacurve" x={360} y={495} size={44} color={C.soft} align="left" start={datacurve} />
        <Label text="long, realistic engineering work" x={360} y={570} size={40} color={C.fg} align="left" start={longWork} />
      </g>
      <g opacity={prog(t, datacurve, 0.5)}>
        <SketchRect x={1120} y={350} w={480} h={260} start={datacurve} dur={0.5} stroke={C.line} fill={C.panel} radius={14} seed={8200} strokeWidth={2.6} />
        <Icon name="repo" x={1220} y={470} s={1.1} color={C.green} start={datacurve + 0.1} />
        <Label text="a real repo" x={1400} y={450} size={40} color={C.green} start={datacurve + 0.2} />
        <Label text="not a puzzle" x={1400} y={505} size={36} color={C.soft} start={longWork + 0.2} />
      </g>
      <Rule y={760} x1={300} x2={1620} start={coding} opacity={0.25} />
    </>
  );
};

/* ================================================================== */
/* 49 — 113 tasks, 91 repos, 5 languages                              */
/* ================================================================== */

export const S49_Tasks: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const tasks = b(at("There are 113 tasks"));
  const repos = b(at("91 open source repositories"));
  const languages = b(at("five languages"));
  const typescript = b(at("TypeScript"));
  const scratch = b(at("written from scratch"));
  const grader = b(at("graded by a hand written program"));
  const behavior = b(at("checks behavior"));

  return (
    <>
      <BenchTitle
        name="113 tasks"
        check="behaviour, not one implementation"
        startName={tasks}
        startCheck={grader}
        meta={[
          {text: "91 repos", at: repos, color: C.cyan},
          {text: "5 languages", at: languages, color: C.green},
          {text: "from scratch", at: scratch, color: C.yellow},
        ]}
      />
      <g>
        <DotField x={300} y={460} cols={15} rows={8} gap={30} d={18} start={tasks} color={C.line} fill={C.well} stagger={0.008} seed={8300} />
        <Label text="113" x={740} y={790} size={92} color={C.green} start={tasks + 0.2} font={FONT_DISPLAY} />
        <Label text="real tasks" x={740} y={840} size={36} color={C.soft} start={tasks + 0.3} />
      </g>
      <g>
        <Label text="TypeScript" x={1240} y={470} size={40} color={C.cyan} start={typescript} />
        <Label text="Go · Python" x={1240} y={530} size={40} color={C.cyan} start={typescript + 0.2} />
        <Label text="JavaScript · Rust" x={1240} y={590} size={40} color={C.cyan} start={typescript + 0.35} />
        <g opacity={prog(t, grader, 0.45)}>
          <SketchRect x={1120} y={650} w={520} h={140} start={grader} dur={0.45} stroke={C.green} fill={C.panel} radius={12} seed={8310} strokeWidth={2.8} />
          <Label text="hand-written grader" x={1380} y={700} size={38} color={C.green} start={grader + 0.1} />
          <Label text="checks behaviour" x={1380} y={750} size={36} color={C.soft} start={behavior} />
        </g>
      </g>
      <Label text="not pulled from old pull requests" x={960} y={920} size={36} color={C.soft} start={scratch + 0.3} />
    </>
  );
};

/* ================================================================== */
/* 50 — 48.2 vs 42.2                                                  */
/* ================================================================== */

export const S50_DeepScore: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const mini = b(at("Inkling 2 Mini scores 48.2"));
  const qwen = b(at("Qwen 3.8 27B scores 42.2"));
  const top = b(at("top entries on Deep S W E's leaderboard"));
  const frontier = b(at("not a frontier one"));

  return (
    <>
      <BenchTitle name="DeepSWE 1.1" check="agentic engineering work" startName={mini - 0.4} />
      <BenchBars mini={48.2} qwen={42.2} startMini={mini} startQwen={qwen} gap="+6.0 pts" startGap={qwen + 0.3} y={480} />
      <g opacity={prog(t, top, 0.45)}>
        <SketchLine x1={540 + 800 * 0.74} y1={400} x2={540 + 800 * 0.74} y2={760} start={top} dur={0.35} stroke={C.yellow} strokeWidth={2.6} seed={8400} dash />
        <Label text="frontier ≈ 74" x={540 + 800 * 0.74} y={382} size={36} color={C.yellow} start={top + 0.15} />
      </g>
      <g opacity={prog(t, frontier, 0.45)}>
        <Chip x={960} y={850} text="strong local, not frontier" color={C.yellow} textColor={C.yellow} start={frontier} size={40} w={560} />
      </g>
    </>
  );
};

/* ================================================================== */
/* 51 — two cautions: error bars and Epoch                            */
/* ================================================================== */

export const S51_Cautions: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const cautions = b(at("Two cautions"));
  const margin = b(at("margin of error is about three to four points"));
  const lead = b(at("a six point lead is suggestive"));
  const epoch = b(at("research group Epoch AI audited"));
  const flawed = b(at("and rated it Flawed"));

  return (
    <>
      <BenchTitle name="DeepSWE 1.1" check="113 tasks · small sample" startName={cautions - 0.3} />
      <BenchBars mini={48.2} qwen={42.2} startMini={-1} startQwen={-1} gap="+6.0 pts" startGap={-1} y={450} />
      <g opacity={prog(t, margin, 0.45)}>
        <SketchLine x1={540 + 800 * 0.482} y1={430} x2={540 + 800 * 0.482} y2={530} start={margin} dur={0.3} stroke={C.yellow} strokeWidth={2.6} seed={8500} />
        <SketchLine x1={540 + 800 * 0.442} y1={430} x2={540 + 800 * 0.522} y2={430} start={margin + 0.1} dur={0.25} stroke={C.yellow} strokeWidth={3.4} seed={8501} />
        <SketchLine x1={540 + 800 * 0.442} y1={530} x2={540 + 800 * 0.522} y2={530} start={margin + 0.2} dur={0.25} stroke={C.yellow} strokeWidth={3.4} seed={8502} />
        <Label text="±3–4 pts" x={540 + 800 * 0.482} y={590} size={36} color={C.yellow} start={margin + 0.3} />
      </g>
      <g opacity={prog(t, lead, 0.45)}>
        <Label text="a six-point lead is suggestive" x={960} y={700} size={38} color={C.soft} start={lead} />
      </g>
      <g opacity={prog(t, epoch, 0.45)}>
        <Callout x={960} y={820} text="Epoch AI audited it" color={C.red} start={epoch} size={40} w={600} icon={<Icon name="flag" color={C.red} start={epoch} />} />
      </g>
      <g opacity={prog(t, flawed, 0.45)}>
        <Stamp x={1480} y={330} text="FLAWED" color={C.red} size={62} rotate={-8} start={flawed} w={380} />
      </g>
    </>
  );
};

/* ================================================================== */
/* 52 — 23 of 113 tasks broke the grader                              */
/* ================================================================== */

export const S52_Flawed: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const problems = b(at("problems in at least 23 of the 113 tasks"));
  const twenty = b(at("a little over 20 percent"));
  const grader = b(at("where the grader could mark correct work as failing"));
  const edited = b(at("edited existing test files"));
  const broke = b(at("broke the grader"));
  const partial = b(at("Epoch called its review partial"));

  const hi = Array.from({length: 23}, (_, i) => i);
  return (
    <>
      <BenchTitle name="23 of 113" check="tasks the grader could fail" startName={problems - 0.3} />
      <g>
        <DotField x={330} y={470} cols={15} rows={8} gap={30} d={18} start={problems} color={C.line} fill={C.well} highlight={hi} highlightColor={C.red} highlightFill={C.red} stagger={0.006} seed={8600} />
        <Label text="20%+" x={740} y={800} size={82} color={C.red} start={twenty} font={FONT_DISPLAY} />
        <Label text="of tasks" x={740} y={850} size={36} color={C.soft} start={twenty + 0.2} />
      </g>
      <g opacity={prog(t, edited, 0.45)}>
        <SketchRect x={1120} y={450} w={540} h={260} start={edited} dur={0.45} stroke={C.red} fill={C.panel} radius={14} seed={8610} strokeWidth={2.8} />
        <Label text="test files edited" x={1390} y={505} size={40} color={C.red} start={edited + 0.1} />
        <Label text="grader breaks" x={1390} y={570} size={38} color={C.soft} start={broke} />
        <SketchLine x1={1180} y1={610} x2={1580} y2={610} start={broke + 0.15} dur={0.3} stroke={C.red} strokeWidth={4} seed={8620} />
      </g>
      <g opacity={prog(t, partial, 0.45)}>
        <Chip x={1390} y={780} text="review was partial" color={C.yellow} textColor={C.yellow} start={partial} size={38} w={420} />
      </g>
      <Label text="a documented scoring problem" x={960} y={930} size={38} color={C.soft} start={partial + 0.3} />
    </>
  );
};

/* ================================================================== */
/* 53 — touched many models, unknown for Inkling                      */
/* ================================================================== */

export const S53_Touched: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const center = b(at("benchmark at the center of Inkling's headline"));
  const touched = b(at("touched many different models"));
  const unknown = b(at("whether it helps or hurts Inkling"));

  return (
    <>
      <g>
        <SketchRect x={560} y={330} w={800} h={280} start={center} dur={0.5} stroke={C.red} fill={C.panel} radius={18} seed={8700} strokeWidth={3.4} />
        <Label text="DeepSWE 1.1" x={960} y={420} size={64} color={C.fg} start={center + 0.1} font={FONT_DISPLAY} />
        <Label text="documented scoring problem" x={960} y={495} size={40} color={C.red} start={touched - 0.3} />
        <Label text="touched many models" x={960} y={552} size={38} color={C.soft} start={touched} />
        <g opacity={prog(t, unknown, 0.45)}>
          <Label text="?" x={1480} y={430} size={160} color={C.yellow} start={unknown} font={FONT_DISPLAY} />
          <Label text="helps or hurts Inkling?" x={1480} y={520} size={36} color={C.yellow} start={unknown + 0.2} />
        </g>
      </g>
      <g opacity={prog(t, center + 0.4, 0.4)}>
        <Label text="no measurement either way" x={960} y={760} size={38} color={C.soft} start={unknown + 0.4} />
      </g>
      <Rule y={860} x1={300} x2={1620} start={center} opacity={0.25} />
    </>
  );
};

/* ================================================================== */
/* 54 — SWE-bench Pro v2 Hard intro                                   */
/* ================================================================== */

export const S54_SWEPro: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const next = b(at("Next, S W E bench Pro"));
  const harder = b(at("Scale AI's harder successor"));
  const maintained = b(at("actively maintained repositories"));
  const longHorizon = b(at("long horizon professional software work"));
  const files = b(at("patches that often span multiple files"));
  const hard = b(at("51 most difficult tasks"));

  return (
    <>
      <BenchTitle
        name="SWE-bench Pro v2 · Hard"
        check="long-horizon software work"
        startName={next}
        startCheck={longHorizon}
        meta={[
          {text: "Scale AI", at: harder, color: C.cyan},
          {text: "51 tasks", at: hard, color: C.yellow},
          {text: "multi-file", at: files, color: C.green},
        ]}
      />
      <g>
        <SketchRect x={300} y={470} w={560} h={310} start={maintained} dur={0.5} stroke={C.line} fill={C.panel} radius={16} seed={8800} strokeWidth={2.8} />
        <Label text="maintained repos" x={580} y={530} size={38} color={C.cyan} start={maintained + 0.1} />
        {[0, 1, 2].map((i) => (
          <DocPage key={i} x={360 + i * 150} y={580} w={130} h={150} start={maintained + 0.2 + i * 0.1} color={C.cyan} lines={3} />
        ))}
        <Arrow x1={620} y1={600} x2={760} y2={600} start={files} dur={0.35} stroke={C.green} strokeWidth={3} seed={8810} head={12} />
        <SketchRect x={800} y={500} w={520} h={250} start={files} dur={0.5} stroke={C.green} fill={C.panel} radius={14} seed={8820} strokeWidth={2.8} />
        <Label text="one patch" x={1060} y={550} size={38} color={C.green} start={files + 0.1} />
        <Label text="several files" x={1060} y={602} size={36} color={C.soft} start={files + 0.25} />
        <ScribblePatch at={files + 0.35} />
      </g>
      <Label text="51 hardest tasks" x={960} y={870} size={38} color={C.soft} start={hard + 0.2} />
    </>
  );
};

const ScribblePatch: React.FC<{at: number}> = ({at}) => (
  <g>
    {[0, 1, 2, 3].map((i) => (
      <SketchLine key={i} x1={840} y1={640 + i * 22} x2={1240} y2={640 + i * 22} start={at + i * 0.06} dur={0.25} stroke={i === 1 ? C.green : C.soft} strokeWidth={i === 1 ? 5 : 2.6} seed={8830 + i} opacity={0.7} />
    ))}
  </g>
);
