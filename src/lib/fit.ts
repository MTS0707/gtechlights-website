/**
 * Fit-to-screen section layout (from 1280px wide).
 * The section is exactly one screen tall below the 5rem header; `fitBody` fills
 * it and `fitFill` marks the flexible part (images, card grids) that absorbs the
 * remaining height. Below 1280px sections flow naturally.
 */
export const fitSection = "xl:flex xl:flex-col xl:h-[max(calc(100svh-5rem),38rem)] xl:py-[clamp(1.75rem,5vh,4.5rem)]";

/** Same, for pages with the 3.5rem (+1px border) sticky category bar under the header (Lighting Solutions, Products). */
export const fitSectionSubnav =
  "xl:flex xl:flex-col xl:h-[max(calc(100svh-8.5rem-1px),34rem)] xl:py-[clamp(1.25rem,4vh,3.5rem)] xl:scroll-mt-12";

export const fitBody = "xl:flex xl:min-h-0 xl:flex-1 xl:flex-col";
/** For sections without a flexible element: centre the content vertically in the screen. */
export const fitCenter = "xl:justify-center";
export const fitFill = "xl:min-h-0 xl:flex-1";
/** Gap between a section heading row and the content below it. */
export const fitGap = "mt-16 xl:mt-[clamp(1.25rem,4vh,3.5rem)]";
/** An image box that keeps its aspect ratio below 1280px and stretches to fill its cell above. */
export const fitImage = "xl:aspect-auto xl:h-full xl:min-h-40";
