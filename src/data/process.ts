export type ProcessStep = { title: string; text: string };

/** Customized Lighting page — the customization process */
export const customizationProcess: ProcessStep[] = [
  { title: "Understand Requirement", text: "We study the space, drawings, design intent, budget and timelines with you and your design team." },
  { title: "Concept Development", text: "Forms, sizes, mounting and lighting effects are explored and aligned with the architecture." },
  { title: "Lighting Design", text: "Fixture layout, light distribution, colour temperature and control intent are defined." },
  { title: "Engineering & Customization", text: "The concept is engineered for fabrication — profiles, joints, drivers, access and serviceability." },
  { title: "Prototype / Sample", text: "Where required, a sample or prototype is made for review before production." },
  { title: "Manufacturing", text: "Fabrication, assembly and testing at our Bengaluru workshop." },
  { title: "Installation / Support", text: "Coordination on site during installation, and support after handover." },
];

/** R&D / Engineering page — development process */
export const developmentProcess: ProcessStep[] = [
  { title: "Requirement Analysis", text: "Application, space, mounting conditions and design intent." },
  { title: "Concept", text: "Form studies and lighting effect options." },
  { title: "Design", text: "Dimensions, layout and detailing." },
  { title: "Engineering", text: "Construction, electrical integration and serviceability." },
  { title: "Prototype", text: "Sample builds for review where required." },
  { title: "Testing", text: "Functional checks in our dedicated testing area." },
  { title: "Manufacturing", text: "Fabrication and assembly in-house." },
  { title: "Installation / Support", text: "Site coordination and after-installation support." },
];
