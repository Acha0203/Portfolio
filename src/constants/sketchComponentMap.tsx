import type { ComponentType } from 'react';
import SketchAinuFantasy01 from '#/components/sketch-components/SketchAinuFantasy01';
import SketchAinuFantasy02 from '#/components/sketch-components/SketchAinuFantasy02';
import SketchBezier08 from '#/components/sketch-components/SketchBezier08';
import SketchBezierDance01 from '#/components/sketch-components/SketchBezierDance01';
import SketchBezierDance02 from '#/components/sketch-components/SketchBezierDance02';
import SketchCircleInCircle03 from '#/components/sketch-components/SketchCircleInCircle03';
import SketchCircleMotion01 from '#/components/sketch-components/SketchCircleMotion01';
import SketchCircleMotion02 from '#/components/sketch-components/SketchCircleMotion02';
import SketchCliffordAttractor03 from '#/components/sketch-components/SketchCliffordAttractor03';
import SketchComposition02 from '#/components/sketch-components/SketchComposition02';
import SketchConcentricCircle04 from '#/components/sketch-components/SketchConcentricCircle04';
import SketchConcentricCircle05 from '#/components/sketch-components/SketchConcentricCircle05';
import SketchCuriousCat from '#/components/sketch-components/SketchCuriousCat';
import SketchFireworks01 from '#/components/sketch-components/SketchFireworks01';
import SketchFireworks02 from '#/components/sketch-components/SketchFireworks02';
import SketchFlowField03 from '#/components/sketch-components/SketchFlowField03';
import SketchHappyNewYear2023 from '#/components/sketch-components/SketchHappyNewYear2023';
import SketchIllusion from '#/components/sketch-components/SketchIllusion';
import SketchLuminousSpiral01 from '#/components/sketch-components/SketchLuminousSpiral01';
import SketchLuminousSpiral02 from '#/components/sketch-components/SketchLuminousSpiral02';
import SketchLuminousSpiral03 from '#/components/sketch-components/SketchLuminousSpiral03';
import SketchMinacoding2023 from '#/components/sketch-components/SketchMinacoding2023';
import SketchMultipleFans from '#/components/sketch-components/SketchMultipleFans';
import SketchMultipleParticleSystems02 from '#/components/sketch-components/SketchMultipleParticleSystems02';
import SketchMultipleParticleSystems03 from '#/components/sketch-components/SketchMultipleParticleSystems03';
import SketchPerlinNoise04 from '#/components/sketch-components/SketchPerlinNoise04';
import SketchPsychedelicCurve from '#/components/sketch-components/SketchPsychedelicCurve';
import SketchRain from '#/components/sketch-components/SketchRain';
import SketchRandomHearts from '#/components/sketch-components/SketchRandomHearts';
import SketchRandomSquares from '#/components/sketch-components/SketchRandomSquares';
import SketchRandomWalk02 from '#/components/sketch-components/SketchRandomWalk02';
import SketchRoseCurve01 from '#/components/sketch-components/SketchRoseCurve01';
import SketchRotation02 from '#/components/sketch-components/SketchRotation02';
import SketchRotation03 from '#/components/sketch-components/SketchRotation03';
import SketchRotation04 from '#/components/sketch-components/SketchRotation04';
import SketchRotation05 from '#/components/sketch-components/SketchRotation05';
import SketchRotation06 from '#/components/sketch-components/SketchRotation06';
import SketchScreensaver from '#/components/sketch-components/SketchScreensaver';
import SketchSymmetricalRuler02 from '#/components/sketch-components/SketchSymmetricalRuler02';
import SketchSymmetricalRuler03 from '#/components/sketch-components/SketchSymmetricalRuler03';
import SketchTentacles from '#/components/sketch-components/SketchTentacles';
import SketchTrigonometricWave from '#/components/sketch-components/SketchTrigonometricWave';
import SketchVerdure from '#/components/sketch-components/SketchVerdure';
import SketchSymmetricalRuler04 from '#/components/sketch-components/SketchSymmetricalRuler04';
import SketchSombrero from '#/components/sketch-components/SketchSombrero';
import SketchStringSextet01 from '#/components/sketch-components/SketchStringSextet01';
import SketchSnowyQuartet from '#/components/sketch-components/SketchSnowyQuartet';
import SketchCastleWithTwelveRamparts from '#/components/sketch-components/SketchCastleWithTwelveRamparts';
import SketchOceanCurrent from '#/components/sketch-components/SketchOceanCurrent';

export const sketchComponentMap: Record<string, ComponentType> = {
  'ainu-fantasy-01': SketchAinuFantasy01,
  'ainu-fantasy-02': SketchAinuFantasy02,
  'bezier-08': SketchBezier08,
  'bezier-dance-01': SketchBezierDance01,
  'bezier-dance-02': SketchBezierDance02,
  'castle-with-twelve-ramparts': SketchCastleWithTwelveRamparts,
  'circle-in-circle-03': SketchCircleInCircle03,
  'circle-motion-01': SketchCircleMotion01,
  'circle-motion-02': SketchCircleMotion02,
  'clifford-attractor-03': SketchCliffordAttractor03,
  'composition-02': SketchComposition02,
  'concentric-circle-04': SketchConcentricCircle04,
  'concentric-circle-05': SketchConcentricCircle05,
  'curious-cat': SketchCuriousCat,
  'fireworks-01': SketchFireworks01,
  'fireworks-02': SketchFireworks02,
  'flow-field-03': SketchFlowField03,
  'happy-new-year-2023': SketchHappyNewYear2023,
  illusion: SketchIllusion,
  'luminous-spiral-01': SketchLuminousSpiral01,
  'luminous-spiral-02': SketchLuminousSpiral02,
  'luminous-spiral-03': SketchLuminousSpiral03,
  'minacoding-2023': SketchMinacoding2023,
  'multiple-fans': SketchMultipleFans,
  'multiple-particle-systems-02': SketchMultipleParticleSystems02,
  'multiple-particle-systems-03': SketchMultipleParticleSystems03,
  'ocean-current': SketchOceanCurrent,
  'perlin-noise-04': SketchPerlinNoise04,
  'psychedelic-curve': SketchPsychedelicCurve,
  rain: SketchRain,
  'random-hearts': SketchRandomHearts,
  'random-squares': SketchRandomSquares,
  'random-walk-02': SketchRandomWalk02,
  'rose-curve-01': SketchRoseCurve01,
  'rotation-02': SketchRotation02,
  'rotation-03': SketchRotation03,
  'rotation-04': SketchRotation04,
  'rotation-05': SketchRotation05,
  'rotation-06': SketchRotation06,
  screensaver: SketchScreensaver,
  'snowy-quartet': SketchSnowyQuartet,
  sombrero: SketchSombrero,
  'string-sextet-01': SketchStringSextet01,
  'symmetrical-ruler-02': SketchSymmetricalRuler02,
  'symmetrical-ruler-03': SketchSymmetricalRuler03,
  'symmetrical-ruler-04': SketchSymmetricalRuler04,
  tentacles: SketchTentacles,
  'trigonometric-wave': SketchTrigonometricWave,
  verdure: SketchVerdure,
};
