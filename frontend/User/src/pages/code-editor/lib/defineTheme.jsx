// import { loader } from "@monaco-editor/react";

// const monacoThemes = {
//   active4d: "Active4D",
//   "all-hallows-eve": "All Hallows Eve",
//   amy: "Amy",
//   "birds-of-paradise": "Birds of Paradise",
//   blackboard: "Blackboard",
//   "brilliance-black": "Brilliance Black",
//   "brilliance-dull": "Brilliance Dull",
//   "chrome-devtools": "Chrome DevTools",
//   "clouds-midnight": "Clouds Midnight",
//   clouds: "Clouds",
//   cobalt: "Cobalt",
//   dawn: "Dawn",
//   dreamweaver: "Dreamweaver",
//   eiffel: "Eiffel",
//   "espresso-libre": "Espresso Libre",
//   github: "GitHub",
//   idle: "IDLE",
//   katzenmilch: "Katzenmilch",
//   "kuroir-theme": "Kuroir Theme",
//   lazy: "LAZY",
//   "magicwb--amiga-": "MagicWB (Amiga)",
//   "merbivore-soft": "Merbivore Soft",
//   merbivore: "Merbivore",
//   "monokai-bright": "Monokai Bright",
//   monokai: "Monokai",
//   "night-owl": "Night Owl",
//   "oceanic-next": "Oceanic Next",
//   "pastels-on-dark": "Pastels on Dark",
//   "slush-and-poppies": "Slush and Poppies",
//   "solarized-dark": "Solarized-dark",
//   "solarized-light": "Solarized-light",
//   spacecadet: "SpaceCadet",
//   sunburst: "Sunburst",
//   "textmate--mac-classic-": "Textmate (Mac Classic)",
//   "tomorrow-night-blue": "Tomorrow-Night-Blue",
//   "tomorrow-night-bright": "Tomorrow-Night-Bright",
//   "tomorrow-night-eighties": "Tomorrow-Night-Eighties",
//   "tomorrow-night": "Tomorrow-Night",
//   tomorrow: "Tomorrow",
//   twilight: "Twilight",
//   "upstream-sunburst": "Upstream Sunburst",
//   "vibrant-ink": "Vibrant Ink",
//   "xcode-default": "Xcode_default",
//   zenburnesque: "Zenburnesque",
//   iplastic: "iPlastic",
//   idlefingers: "idleFingers",
//   krtheme: "krTheme",
//   monoindustrial: "monoindustrial",
// };

// const defineTheme = (theme) => {
//   return new Promise((res) => {
//     Promise.all([
//       loader.init(),
//       import(`monaco-themes/themes/${monacoThemes[theme]}json`),
//     ]).then(([monaco, themeData]) => {
//       monaco.editor.defineTheme(theme, themeData);
//       res();
//     });
//   });
// };

// export { defineTheme };


// import { loader } from "@monaco-editor/react";

// const monacoThemes = {

// };

// const defineTheme = (theme) => {
//   return new Promise((res) => {
//     Promise.all([
//       loader.init(),
//       import(monaco-themes/themes/${monacoThemes[theme]}json),
//     ]).then(([monaco, themeData]) => {
//       monaco.editor.defineTheme(theme, themeData);
//       res();
//     });
//   });
// };

// export { defineTheme };

import { loader } from "@monaco-editor/react";
// Import statements for all themes
import active4d from "monaco-themes/themes/Active4D.json";
import allHallowsEve from "monaco-themes/themes/All Hallows Eve.json";
import amy from "monaco-themes/themes/Amy.json";
import birdsOfParadise from "monaco-themes/themes/Birds of Paradise.json";
import blackboard from "monaco-themes/themes/Blackboard.json";
import brillianceBlack from "monaco-themes/themes/Brilliance Black.json";
import brillianceDull from "monaco-themes/themes/Brilliance Dull.json";
import chromeDevTools from "monaco-themes/themes/Chrome DevTools.json";
import cloudsMidnight from "monaco-themes/themes/Clouds Midnight.json";
import clouds from "monaco-themes/themes/Clouds.json";
import cobalt from "monaco-themes/themes/Cobalt.json";
import dawn from "monaco-themes/themes/Dawn.json";
import dreamweaver from "monaco-themes/themes/Dreamweaver.json";
import eiffel from "monaco-themes/themes/Eiffel.json";
import espressoLibre from "monaco-themes/themes/Espresso Libre.json";
import github from "monaco-themes/themes/GitHub.json";
import githubDark from "monaco-themes/themes/GitHub Dark.json";
import githubLight from "monaco-themes/themes/GitHub Light.json";
import idle from "monaco-themes/themes/IDLE.json";
import katzenmilch from "monaco-themes/themes/Katzenmilch.json";
import kuroirTheme from "monaco-themes/themes/Kuroir Theme.json";
import lazy from "monaco-themes/themes/LAZY.json";
import magicWBAmiga from "monaco-themes/themes/MagicWB (Amiga).json";
import merbivoreSoft from "monaco-themes/themes/Merbivore Soft.json";
import merbivore from "monaco-themes/themes/Merbivore.json";
import monokaiBright from "monaco-themes/themes/Monokai Bright.json";
import monokai from "monaco-themes/themes/Monokai.json";
import nightOwl from "monaco-themes/themes/Night Owl.json";
import oceanicNext from "monaco-themes/themes/Oceanic Next.json";
import pastelsOnDark from "monaco-themes/themes/Pastels on Dark.json";
import slushAndPoppies from "monaco-themes/themes/Slush and Poppies.json";
import solarizedDark from "monaco-themes/themes/Solarized-dark.json";
import solarizedLight from "monaco-themes/themes/Solarized-light.json";
import spaceCadet from "monaco-themes/themes/SpaceCadet.json";
import sunburst from "monaco-themes/themes/Sunburst.json";
import textmateMacClassic from "monaco-themes/themes/Textmate (Mac Classic).json";
import tomorrowNightBlue from "monaco-themes/themes/Tomorrow-Night-Blue.json";
import tomorrowNightBright from "monaco-themes/themes/Tomorrow-Night-Bright.json";
import tomorrowNightEighties from "monaco-themes/themes/Tomorrow-Night-Eighties.json";
import tomorrowNight from "monaco-themes/themes/Tomorrow-Night.json";
import tomorrow from "monaco-themes/themes/Tomorrow.json";
import twilight from "monaco-themes/themes/Twilight.json";
import upstreamSunburst from "monaco-themes/themes/Upstream Sunburst.json";
import vibrantInk from "monaco-themes/themes/Vibrant Ink.json";
import xcodeDefault from "monaco-themes/themes/Xcode_default.json";
import zenburnesque from "monaco-themes/themes/Zenburnesque.json";
import iplastic from "monaco-themes/themes/iPlastic.json";
import idlefingers from "monaco-themes/themes/idleFingers.json";
import krtheme from "monaco-themes/themes/krTheme.json";
import monoindustrial from "monaco-themes/themes/monoindustrial.json";

const monacoThemes = {
  active4d,
  "all-hallows-eve": allHallowsEve,
  amy,
  "birds-of-paradise": birdsOfParadise,
  blackboard,
  "brilliance-black": brillianceBlack,
  "brilliance-dull": brillianceDull,
  "chrome-devtools": chromeDevTools,
  "clouds-midnight": cloudsMidnight,
  clouds,
  cobalt,
  dawn,
  dreamweaver,
  eiffel,
  "espresso-libre": espressoLibre,
  github,
  "github-dark":githubDark,
  "github-light":githubLight,
  idle,
  katzenmilch,
  "kuroir-theme": kuroirTheme,
  lazy,
  "magicwb--amiga-": magicWBAmiga,
  "merbivore-soft": merbivoreSoft,
  merbivore,
  "monokai-bright": monokaiBright,
  monokai,
  "night-owl": nightOwl,
  "oceanic-next": oceanicNext,
  "pastels-on-dark": pastelsOnDark,
  "slush-and-poppies": slushAndPoppies,
  "solarized-dark": solarizedDark,
  "solarized-light": solarizedLight,
  spacecadet: spaceCadet,
  sunburst: sunburst,
  "textmate--mac-classic-": textmateMacClassic,
  "tomorrow-night-blue": tomorrowNightBlue,
  "tomorrow-night-bright": tomorrowNightBright,
  "tomorrow-night-eighties": tomorrowNightEighties,
  "tomorrow-night": tomorrowNight,
  tomorrow,
  twilight,
  "upstream-sunburst": upstreamSunburst,
  "vibrant-ink": vibrantInk,
  "xcode-default": xcodeDefault,
  zenburnesque,
  iplastic,
  idlefingers,
  krtheme,
  monoindustrial,
};
const defineTheme = (theme) => {
  return new Promise((res) => {
    Promise.all([
      loader.init(),
      Promise.resolve(monacoThemes[theme] || null),
    ]).then(([monaco, themeData]) => {
      if (themeData) {
        monaco.editor.defineTheme(theme, themeData);
      }
      res();
    });
  });
};

export { defineTheme };