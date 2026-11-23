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
import {Browser, CheckBadge, CrossBadge, DocPage, GpuCard, Mac, Terminal, Spark} from "../components/Art";
import {SceneProps, useClock} from "./types";

const Fade: React.FC<{t: number; start: number; dur?: number; children: React.ReactNode; dim?: number}> = ({
  t,
  start,
  dur = 0.45,
  children,
  dim = 1,
}) => <g opacity={prog(t, start, dur) * dim}>{children}</g>;

/* ================================================================== */
/* 99 — outside the lab                                               */
/* ================================================================== */

export const S99_Outside: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const outside = b(at("So what do we have from outside the lab"));
  const notMuch = b(at("Not much yet"));
  const adjacent = b(at("most of it is launch adjacent"));
  const aa = b(at("Artificial Analysis gives us the tie at 20"));
  const epoch = b(at("Epoch AI gives us the audit"));

  return (
    <>
      <g opacity={prog(t, notMuch, 0.4)}>
        <Label text="not much yet" x={960} y={285} size={46} color={C.yellow} start={notMuch} font={FONT_DISPLAY} />
        <Label text="most of it is launch-adjacent" x={960} y={340} size={36} color={C.soft} start={adjacent} />
      </g>
      <g>
        <SketchRect x={270} y={420} w={600} h={300} start={-1} dur={0.45} stroke={C.cyan} fill={C.panel} radius={16} seed={14000} strokeWidth={3} />
        <Label text="Artificial Analysis" x={570} y={485} size={38} color={C.cyan} start={aa + 0.1} />
        <Label text="20.1 = 20.1" x={570} y={575} size={64} color={C.fg} start={aa + 0.2} font={FONT_DISPLAY} />
        <Label text="plus cost + time" x={570} y={650} size={36} color={C.soft} start={aa + 0.35} />
      </g>
      <g>
        <SketchRect x={1050} y={420} w={600} h={300} start={-1} dur={0.45} stroke={C.red} fill={C.panel} radius={16} seed={14010} strokeWidth={3} />
        <Label text="Epoch AI" x={1350} y={485} size={38} color={C.red} start={epoch + 0.1} />
        <Label text="audit of DeepSWE" x={1350} y={555} size={42} color={C.fg} start={epoch + 0.2} />
        <Stamp x={1350} y={640} text="FLAWED" color={C.red} size={40} rotate={-6} start={epoch + 0.35} w={280} />
      </g>
      <Label text="the rest is a launch partner's test" x={960} y={850} size={38} color={C.soft} start={adjacent + 0.3} />
      <Rule y={910} x1={300} x2={1620} start={outside} opacity={0.25} />
    </>
  );
};

/* ================================================================== */
/* 100 — Hugging Face's vibe tests                                    */
/* ================================================================== */

export const S100_HF: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const partner = b(at("Hugging Face, a launch partner"));
  const shader = b(at("shader flythroughs"));
  const napkin = b(at("a napkin sketch to app build"));
  const comparable = b(at("at least comparable with Qwen"));
  const validation = b(at("it adds that more validation is needed"));

  return (
    <>
      <g>
        <SketchRect x={270} y={330} w={560} h={340} start={shader - 0.2} dur={0.45} stroke={C.cyan} fill={C.panel} radius={16} seed={14100} strokeWidth={2.8} />
        <Label text="shader flythrough" x={550} y={390} size={38} color={C.cyan} start={shader} />
        <SketchRect x={330} y={430} w={440} h={190} start={shader + 0.1} dur={0.4} stroke={C.line} fill={C.well} radius={10} seed={14101} strokeWidth={2.2} />
        <SketchPath d="M 350 600 L 500 480 L 610 560 L 750 460" start={shader + 0.3} dur={0.5} stroke={C.cyan} strokeWidth={3} seed={14102} />
        <SketchCircle x={500} y={480} d={16} start={shader + 0.5} dur={0.2} stroke={C.yellow} fill={C.yellow} seed={14103} strokeWidth={1.4} />
      </g>
      <g>
        <SketchRect x={870} y={330} w={560} h={340} start={napkin - 0.2} dur={0.45} stroke={C.green} fill={C.panel} radius={16} seed={14110} strokeWidth={2.8} />
        <Label text="napkin sketch → app" x={1150} y={390} size={38} color={C.green} start={napkin} />
        <DocPage x={900} y={430} w={140} h={170} start={napkin + 0.1} color={C.soft} lines={3} />
        <Arrow x1={1050} y1={515} x2={1130} y2={515} start={napkin + 0.3} dur={0.3} stroke={C.green} strokeWidth={2.8} seed={14111} head={10} />
        <SketchRect x={1140} y={430} w={260} h={170} start={napkin + 0.35} dur={0.4} stroke={C.green} fill={C.well} radius={10} seed={14112} strokeWidth={2.4} />
        <Label text="working app" x={1270} y={520} size={36} color={C.green} start={napkin + 0.5} />
      </g>
      <g opacity={prog(t, comparable, 0.45)}>
        <Chip x={700} y={770} text="at least comparable" color={C.cyan} textColor={C.cyan} start={comparable} size={40} w={460} />
      </g>
      <g opacity={prog(t, validation, 0.45)}>
        <Chip x={1240} y={770} text="more validation needed" color={C.yellow} textColor={C.yellow} start={validation} size={38} w={520} />
      </g>
      <Label text="in its own vibe tests" x={960} y={860} size={36} color={C.soft} start={comparable + 0.3} />
    </>
  );
};

/* ================================================================== */
/* 101 — 32 of 48                                                     */
/* ================================================================== */

export const S101_32of48: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const full = b(at("Counting across the lab's full card"));
  const fortyEight = b(at("48 benchmarks"));
  const leads = b(at("Mini leads its four rivals on 32"));

  return (
    <>
      <g>
        <DotField x={340} y={380} cols={12} rows={4} gap={72} d={42} start={-1} color={C.line} fill={C.well} highlight={Array.from({length: 32}, (_, i) => i)} highlightColor={C.green} highlightFill={C.green} stagger={0.012} seed={14200} />
        <Label text="32" x={1380} y={560} size={160} color={C.green} start={leads} font={FONT_DISPLAY} />
        <Label text="of 48" x={1560} y={560} size={70} color={C.soft} align="left" start={fortyEight} font={FONT_DISPLAY} />
      </g>
      <Label text="Mini leads its four rivals" x={960} y={850} size={40} color={C.soft} start={leads + 0.2} />
      <Rule y={910} x1={300} x2={1620} start={full} opacity={0.25} />
    </>
  );
};

/* ================================================================== */
/* 102 — intelligence per joule                                       */
/* ================================================================== */

export const S102_Joule: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const hazy = b(at("Stanford's Hazy Research"));
  const perJoule = b(at("intelligence per joule"));
  const explanation = b(at("how much energy a model needs"));
  const spark = b(at("On an Nvidia D G X Spark"));
  const mini = b(at("Mini scored 0.703"));
  const q36 = b(at("against 0.430 for Qwen 3.6"));
  const gemma = b(at("0.159 for Gemma"));
  const q35 = b(at("0.036 for Qwen 3.5"));

  const bars = [
    {name: "Mini", v: 0.703, at: mini, color: C.green},
    {name: "Qwen 3.6 35B", v: 0.43, at: q36, color: C.purple},
    {name: "Gemma 4 26B", v: 0.159, at: gemma, color: C.orange},
    {name: "Qwen 3.5 27B", v: 0.036, at: q35, color: C.soft},
  ];
  return (
    <>
      <g>
        <Label text="how much energy per query" x={960} y={280} size={38} color={C.soft} start={explanation} />
        <Label text="on an Nvidia DGX Spark" x={960} y={340} size={36} color={C.cyan} start={spark} />
        {bars.map((bar, i) => (
          <g key={bar.name}>
            <Label text={bar.name} x={300} y={440 + i * 105} size={38} color={bar.color} align="left" start={bar.at} />
            <SketchRect x={620} y={410 + i * 105} w={850} h={34} start={-1} dur={0.4} stroke={C.line} fill={C.well} radius={17} seed={14300 + i} strokeWidth={2} />
            <SketchRect x={624} y={414 + i * 105} w={Math.max(8, (842 * bar.v) / 0.8)} h={26} start={bar.at + 0.2} dur={0.7} stroke={bar.color} fill={bar.color} radius={13} seed={14310 + i} strokeWidth={1.8} opacity={0.85} />
            <Label text={bar.v.toFixed(3)} x={1500} y={445 + i * 105} size={40} color={bar.color} align="left" start={bar.at + 0.5} font={FONT_DISPLAY} />
          </g>
        ))}
      </g>
      <Label text="higher is better" x={960} y={900} size={36} color={C.soft} start={mini + 0.4} />
    </>
  );
};

/* ================================================================== */
/* 103 — the fine print                                               */
/* ================================================================== */

export const S103_FinePrint: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const print = b(at("Impressive, but read the fine print"));
  const eight = b(at("Mini ran in eight bit precision"));
  const effort = b(at("low reasoning effort"));
  const four = b(at("while the others ran in four bit"));
  const absent = b(at("Qwen 3.8 27B wasn't in that comparison"));

  return (
    <>
      <g>
        <SketchRect x={260} y={330} w={620} h={330} start={-1} dur={0.45} stroke={C.yellow} fill={C.panel} radius={16} seed={14400} strokeWidth={2.8} />
        <Label text="Mini" x={570} y={390} size={40} color={C.green} start={eight} />
        <Chip x={445} y={470} text="8-bit" color={C.yellow} textColor={C.yellow} start={eight} size={38} w={200} />
        <Chip x={700} y={470} text="low effort" color={C.yellow} textColor={C.yellow} start={effort} size={38} w={270} />
        <Label text="not the same settings" x={570} y={590} size={38} color={C.soft} start={effort + 0.3} />
      </g>
      <g>
        <SketchRect x={980} y={330} w={620} h={330} start={-1} dur={0.45} stroke={C.orange} fill={C.panel} radius={16} seed={14410} strokeWidth={2.8} />
        <Label text="the others" x={1290} y={390} size={40} color={C.orange} start={four} />
        <Chip x={1290} y={480} text="4-bit" color={C.orange} textColor={C.orange} start={four + 0.1} size={38} w={220} />
        <Label text="different precision" x={1290} y={590} size={38} color={C.soft} start={four + 0.3} />
      </g>
      <g opacity={prog(t, absent, 0.45)}>
        <Callout x={960} y={790} text="Qwen 3.8 27B wasn't in the comparison" color={C.red} start={absent} size={38} w={900} icon={<Icon name="flag" color={C.red} start={absent} />} />
      </g>
      <Label text="a comparison with an asterisk" x={960} y={900} size={36} color={C.soft} start={absent + 0.3} />
    </>
  );
};

/* ================================================================== */
/* 104 — the speed ceiling                                            */
/* ================================================================== */

export const S104_Speed: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const speed = b(at("And then the speed claims"));
  const ceiling = b(at("theoretical ceiling"));
  const bandwidth = b(at("614 gigabytes per second"));
  const sixteen = b(at("with 16 bit weights"));
  const oneUser = b(at("one user at a time"));
  const loops = b(at("including the repeated reads"));
  const laptop = b(at("tells us nothing about how a particular laptop"));

  return (
    <>
      <g>
        <SketchArc x={600} y={600} w={420} h={420} startAngle={Math.PI} stopAngle={Math.PI * 2} start={-1} dur={0.8} stroke={C.line} strokeWidth={6} seed={14500} />
        {[0, 0.25, 0.5, 0.75, 1].map((v, i) => {
          const a = Math.PI + v * Math.PI;
          const x = 600 + Math.cos(a) * 210;
          const y = 600 + Math.sin(a) * 210;
          return <SketchLine key={i} x1={600 + Math.cos(a) * 190} y1={600 + Math.sin(a) * 190} x2={x} y2={y} start={ceiling + 0.1 + i * 0.05} dur={0.2} stroke={C.soft} strokeWidth={2.4} seed={14501 + i} />;
        })}
        <Label text="614 GB/s" x={600} y={520} size={72} color={C.cyan} start={bandwidth} font={FONT_DISPLAY} />
        <Label text="bandwidth ceiling" x={600} y={590} size={36} color={C.soft} start={bandwidth + 0.2} />
        <SketchLine x1={600} y1={600} x2={760} y2={440} start={ceiling + 0.4} dur={0.4} stroke={C.yellow} strokeWidth={4} seed={14510} />
        <SketchCircle x={600} y={600} d={18} start={ceiling + 0.5} dur={0.2} stroke={C.yellow} fill={C.yellow} seed={14511} strokeWidth={1.4} />
      </g>
      <g>
        <Chip x={1280} y={400} text="16-bit weights" color={C.soft} textColor={C.fg} start={sixteen} size={36} w={360} />
        <Chip x={1280} y={480} text="one user" color={C.soft} textColor={C.fg} start={oneUser} size={36} w={260} />
        <Chip x={1280} y={560} text="including loop reads" color={C.soft} textColor={C.fg} start={loops} size={36} w={430} />
        <g opacity={prog(t, ceiling, 0.45)}>
          <Stamp x={1280} y={690} text="THEORETICAL" color={C.yellow} size={40} rotate={-6} start={ceiling} w={420} />
        </g>
      </g>
      <g opacity={prog(t, laptop, 0.45)}>
        <Callout x={960} y={850} text="it says nothing about your laptop" color={C.orange} start={laptop} size={38} w={820} icon={<Icon name="laptop" color={C.orange} start={laptop} />} />
      </g>
    </>
  );
};

/* ================================================================== */
/* 105 — the official line                                            */
/* ================================================================== */

export const S105_Official: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const home = b(at("So what about running it at home"));
  const official = b(at("The lab's official line"));
  const mac = b(at("any Mac with at least 32 gigabytes"));
  const ollama = b(at("through Ollama"));
  const spark = b(at("plus Nvidia's D G X Spark"));
  const vram = b(at("32 gigabytes or more of V RAM"));

  return (
    <>
      <g opacity={0.2}>
        <Icon name="laptop" x={480} y={440} s={1.6} color={C.cyan} start={-1} />
        <Icon name="server" x={960} y={440} s={1.6} color={C.green} start={-1} />
        <Icon name="chip" x={1440} y={440} s={1.6} color={C.purple} start={-1} />
      </g>
      <g>
        <Mac x={480} y={440} start={mac} color={C.cyan} label="Mac · 32 GB+" size={1.1} />
        <Chip x={480} y={610} text="Ollama" color={C.cyan} textColor={C.cyan} start={ollama} size={38} w={250} />
      </g>
      <g>
        <Icon name="server" x={960} y={440} s={1.5} color={C.green} start={spark} />
        <Label text="DGX Spark" x={960} y={560} size={38} color={C.green} start={spark + 0.1} />
        <Chip x={960} y={630} text="32 GB+" color={C.green} textColor={C.green} start={spark + 0.2} size={36} w={220} />
      </g>
      <g>
        <GpuCard x={1440} y={440} start={vram} color={C.purple} label="other GPUs" vram="32 GB+ VRAM" />
      </g>
      <Label text="the launch-day recommendation" x={960} y={800} size={38} color={C.soft} start={official} />
      <Rule y={890} x1={300} x2={1620} start={home} opacity={0.25} />
    </>
  );
};

/* ================================================================== */
/* 106 — the MacBook demo                                             */
/* ================================================================== */

export const S106_Demo: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const demo = b(at("In its demo, a researcher ran Mini"));
  const chip = b(at("M five Pro chip and 48 gigabytes"));
  const airplane = b(at("in airplane mode"));
  const sim = b(at("build a playable flight simulator"));
  const minutes = b(at("in a few minutes"));
  const speed = b(at("15 times speed"));

  return (
    <>
      <g>
        <SketchRect x={440} y={330} w={700} h={430} start={demo} dur={0.5} stroke={C.cyan} fill={C.panel} radius={18} seed={14600} strokeWidth={3} />
        <SketchRect x={480} y={370} w={620} h={340} start={demo + 0.1} dur={0.4} stroke={C.line} fill={C.well} radius={8} seed={14601} strokeWidth={2.2} />
        {/* horizon + plane */}
        <SketchLine x1={500} y1={560} x2={1080} y2={560} start={demo + 0.3} dur={0.5} stroke={C.cyan} strokeWidth={3} seed={14602} />
        <SketchLine x1={500} y1={650} x2={1080} y2={650} start={demo + 0.4} dur={0.5} stroke={C.line} strokeWidth={2} seed={14603} opacity={0.6} />
        <SketchPolygon points={[[740, 510], [830, 540], [740, 570], [770, 540]]} start={sim} dur={0.4} stroke={C.yellow} fill={C.yellow} fillStart={sim + 0.2} seed={14604} strokeWidth={2.4} />
        <Label text="flight sim" x={790} y={700} size={38} color={C.yellow} start={sim + 0.3} />
        <g opacity={prog(t, chip, 0.45)}>
          <Chip x={790} y={420} text="M5 Pro · 48 GB" color={C.cyan} textColor={C.cyan} start={chip} size={36} w={420} />
        </g>
        <g opacity={prog(t, airplane, 0.45)}>
          <Label text="airplane mode" x={790} y={480} size={36} color={C.green} start={airplane} />
        </g>
      </g>
      <g>
        <Chip x={1400} y={500} text="a few minutes" color={C.soft} textColor={C.fg} start={minutes} size={38} w={400} />
        <g opacity={prog(t, speed, 0.45)}>
          <Stamp x={1400} y={660} text="VIDEO: 15× SPEED" color={C.red} size={36} rotate={-5} start={speed} w={460} />
        </g>
      </g>
      <Label text="offline, on battery, no network" x={960} y={850} size={38} color={C.soft} start={airplane + 0.3} />
    </>
  );
};

/* ================================================================== */
/* 107 — llama-server and the memory numbers                          */
/* ================================================================== */

export const S107_Command: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const route = b(at("Hugging Face's one line route"));
  const command = b(at("a single llama serve command"));
  const fourbit = b(at("points at the four bit G G U F"));
  const q8 = b(at("suffix swap to Q eight"));
  const build = b(at("Unsloth's recommended four bit build"));
  const memory = b(at("plan on 17 to 18 gigabytes"));
  const eightbit = b(at("about 24 for its eight bit build"));
  const warns = b(at("longer contexts, image inputs, and other running apps"));

  return (
    <>
      <g opacity={1 - 0.4 * prog(t, build, 0.6)}>
        <Terminal
          x={300}
          y={330}
          w={900}
          h={330}
          start={route}
          title="one command"
          lines={[
            {text: "llama-server -hf .../Inkling-2-Mini", color: C.fg, at: command},
            {text: "  --mmproj ... -c 32768", color: C.soft, at: command + 0.3},
            {text: "4-bit GGUF  ·  swap suffix → Q8", color: C.green, at: fourbit},
          ]}
        />
        <g opacity={prog(t, q8, 0.45)}>
          <Chip x={750} y={730} text="Q8 for 8-bit" color={C.cyan} textColor={C.cyan} start={q8} size={36} w={380} />
        </g>
      </g>
      <g>
        <SketchRect x={1260} y={330} w={420} h={180} start={build} dur={0.45} stroke={C.green} fill={C.panel} radius={14} seed={14700} strokeWidth={3} />
        <Label text="4-bit" x={1470} y={390} size={38} color={C.green} start={build} />
        <Label text="17.6 GB file" x={1470} y={460} size={40} color={C.fg} start={build + 0.1} font={FONT_DISPLAY} />
        <g opacity={prog(t, memory, 0.45)}>
          <Chip x={1470} y={600} text="plan 17–18 GB RAM" color={C.green} textColor={C.green} start={memory} size={36} w={460} />
        </g>
        <g opacity={prog(t, eightbit, 0.45)}>
          <Chip x={1470} y={690} text="8-bit: about 24 GB" color={C.cyan} textColor={C.cyan} start={eightbit} size={36} w={460} />
        </g>
        <g opacity={prog(t, warns, 0.45)}>
          <Label text="context · images · apps" x={1470} y={790} size={36} color={C.orange} start={warns} />
        </g>
      </g>
    </>
  );
};

/* ================================================================== */
/* 108 — runtime rough edges                                          */
/* ================================================================== */

export const S108_Runtime: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const brandNew = b(at("Runtime support is brand new"));
  const looped = b(at("looped layer layout"));
  const ownBuild = b(at("needs its own build of llama C P P"));
  const mainline = b(at("mainline llama C P P reads a different layout"));
  const support = b(at("support for looped models in local runtimes is new"));
  const varies = b(at("speed varies by runtime and hardware"));
  const rough = b(at("Expect rough edges"));

  return (
    <>
      <g>
        <SketchRect x={270} y={340} w={620} h={360} start={-1} dur={0.45} stroke={C.green} fill={C.panel} radius={16} seed={14800} strokeWidth={3} />
        <Label text="Unsloth build" x={580} y={400} size={40} color={C.green} start={looped} />
        <Label text="looped layer layout" x={580} y={470} size={38} color={C.fg} start={looped + 0.1} />
        <SketchLine x1={360} y1={540} x2={800} y2={540} start={ownBuild} dur={0.4} stroke={C.green} strokeWidth={3} seed={14801} />
        <Label text="its own llama.cpp" x={580} y={620} size={36} color={C.green} start={ownBuild + 0.1} />
      </g>
      <g>
        <SketchRect x={1030} y={340} w={620} h={360} start={-1} dur={0.45} stroke={C.orange} fill={C.panel} radius={16} seed={14810} strokeWidth={3} />
        <Label text="mainline llama.cpp" x={1340} y={400} size={40} color={C.orange} start={mainline} />
        <Label text="a different layout" x={1340} y={470} size={38} color={C.fg} start={mainline + 0.1} />
        <SketchLine x1={1120} y1={540} x2={1560} y2={540} start={mainline + 0.2} dur={0.4} stroke={C.orange} strokeWidth={3} seed={14811} />
        <Label text="separate files" x={1340} y={620} size={36} color={C.orange} start={mainline + 0.3} />
      </g>
      <g opacity={prog(t, support, 0.45)}>
        <Label text="the model card says the same" x={960} y={770} size={38} color={C.soft} start={support} />
        <Label text="speed varies by runtime and hardware" x={960} y={830} size={36} color={C.soft} start={varies} />
      </g>
      <g opacity={prog(t, rough, 0.45)}>
        <Stamp x={960} y={910} text="EXPECT ROUGH EDGES" color={C.red} size={38} rotate={-4} start={rough} w={620} />
      </g>
    </>
  );
};

/* ================================================================== */
/* 109 — the million-token window                                     */
/* ================================================================== */

export const S109_Window: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const window = b(at("Then there's the million token window"));
  const four = b(at("only four of the 24 layers use full attention"));
  const sliding = b(at("sliding windows of 1,024 tokens"));
  const visits = b(at("the model still executes all 48 layer visits"));
  const cache = b(at("each visit keeps its own cache"));
  const measured = b(at("didn't find a measured figure"));
  const start = b(at("Unsloth's own examples start at 32,000"));
  const grow = b(at("watch your memory, and grow from it"));

  return (
    <>
      <g>
        <Label text="attention" x={300} y={330} size={40} color={C.soft} align="left" start={four} />
        {Array.from({length: 24}).map((_, i) => (
          <SketchRect key={i} x={300 + (i % 12) * 62} y={370 + Math.floor(i / 12) * 76} w={50} h={58} start={-1 + i * 0.02} dur={0.2} stroke={i < 4 ? C.purple : C.cyan} fill={i < 4 ? C.purple : C.well} radius={6} seed={14900 + i} strokeWidth={2} opacity={i < 4 ? 0.85 : 0.6} />
        ))}
        <Chip x={470} y={610} text="4 full attention" color={C.purple} textColor={C.purple} start={four + 0.2} size={36} w={340} />
        <Chip x={850} y={610} text="20 sliding · 1,024" color={C.cyan} textColor={C.cyan} start={sliding} size={36} w={400} />
      </g>
      <g>
        <Label text="48 visits, 48 caches" x={1330} y={380} size={40} color={C.yellow} start={visits} />
        {Array.from({length: 6}).map((_, i) => (
          <SketchRect key={i} x={1160 + i * 70} y={440} w={50} h={120} start={visits + 0.2 + i * 0.06} dur={0.3} stroke={C.yellow} fill={C.panel} radius={5} seed={14930 + i} strokeWidth={2} />
        ))}
        <Label text="one cache per visit" x={1330} y={610} size={36} color={C.soft} start={cache} />
      </g>
      <g opacity={prog(t, measured, 0.45)}>
        <Label text="no measured 1M-memory figure" x={960} y={710} size={38} color={C.orange} start={measured} />
      </g>
      <g>
        <Chip x={960} y={800} text="start at 32K" color={C.green} textColor={C.green} start={start} size={44} w={340} />
        <Label text="watch the memory, then grow" x={960} y={870} size={36} color={C.soft} start={grow} />
      </g>
    </>
  );
};

/* ================================================================== */
/* 110 — the reasoning dial                                           */
/* ================================================================== */

export const S110_Dial: React.FC<SceneProps> = ({t0}) => {
  const {t, b} = useClock(t0);
  const dial = b(at("There's also a reasoning dial"));
  const levels = b(at("none, minimal, low, medium, high"));
  const defaultHigh = b(at("defaulting to high"));
  const habit = b(at("measure finished tasks and retries"));

  const labels = ["none", "minimal", "low", "medium", "high", "extra high", "max"];
  return (
    <>
      <g opacity={1 - 0.35 * prog(t, habit, 0.6)}>
        <SketchArc x={960} y={560} w={640} h={640} startAngle={Math.PI} stopAngle={Math.PI * 2} start={dial} dur={0.8} stroke={C.line} strokeWidth={5} seed={15000} />
        {labels.map((l, i) => {
          const a = Math.PI + (i / 6) * Math.PI;
          const x = 960 + Math.cos(a) * 320;
          const y = 560 + Math.sin(a) * 320;
          const on = i === 4;
          return (
            <g key={l}>
              <SketchLine x1={960 + Math.cos(a) * 290} y1={560 + Math.sin(a) * 290} x2={960 + Math.cos(a) * 310} y2={560 + Math.sin(a) * 310} start={levels + i * 0.08} dur={0.2} stroke={on ? C.green : C.soft} strokeWidth={on ? 4 : 2.4} seed={15010 + i} />
              <Label text={l} x={x} y={y + (i < 3 ? 28 : -20)} size={36} color={on ? C.green : C.soft} start={levels + i * 0.08 + 0.1} />
            </g>
          );
        })}
        <SketchLine x1={960} y1={560} x2={1180} y2={330} start={defaultHigh} dur={0.5} stroke={C.green} strokeWidth={5} seed={15020} />
        <SketchCircle x={960} y={560} d={24} start={dial + 0.3} dur={0.2} stroke={C.green} fill={C.green} seed={15021} strokeWidth={1.6} />
        <Label text="default: high" x={960} y={700} size={38} color={C.green} start={defaultHigh + 0.2} />
      </g>
      <g opacity={prog(t, habit, 0.45)}>
        <Callout x={960} y={820} text="measure tasks + retries" color={C.yellow} start={habit} size={36} w={1000} icon={<Icon name="stopwatch" color={C.yellow} start={habit} />} />
      </g>
    </>
  );
};
