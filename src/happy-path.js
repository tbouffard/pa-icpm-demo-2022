import { BpmnVisualization } from "bpmn-visualization";
import { isActivity, isEvent, isGateway } from "./bpmnElements";

/*start event --> SRM subprocess
  --> vendor creates order item --> create purchase order item
  --> Record goods receipt --> record invoice receipt --> clear invoice
  --> end event */
const happyPath = [
  "Event_1vogvxc",
  "Flow_0i9hf3x",
  "Gateway_0xh0plz",
  "Flow_06ca3ya",
  "Activity_0ec8azh",
  "Flow_1y1kscn",
  "Flow_1ojqrz1",
  "Activity_1t65hvk",
  "Flow_1a9zw3d",
  "Flow_169iupn",
  "Event_0e43ncy",
  "Flow_0hpz0ab",
  "Flow_1448s6h",
  "Activity_00vbm9s",
  "Flow_14tr1q9",
  "Flow_19cdedl",
  "Flow_06uo70h",
  "Gateway_0domayw",
  "Flow_06uo70h",
  "Activity_1u4jwkv",
  "Flow_0lrixjg",
  "Flow_0lrixjg",
  "Gateway_0a68dfj",
  "Flow_1lkft1n",
  "Gateway_1ezcj46",
  "Flow_1kkicvr",
  "Activity_0yabbur",
  "Flow_12q12yb",
  "Event_07598zy",
];

const happyPathElementWithOverlays = "Event_1vogvxc";

/**
 * @param {BpmnVisualization} bpmnVisualization
 */
export function showHappyPath(bpmnVisualization) {
  const headElt = document.getElementsByTagName("head")[0];

  /* iterate over the elements in the happyPath
   apply css and add a delay so that we see the css applied in a sequential manner */
  happyPath.forEach((elementId, index) => {
    const style = document.createElement("style");
    style.id = elementId;
    style.type = "text/css";

    let classToAdd;

    if (isActivity(elementId)) {
      style.innerHTML = `.animate-${elementId} > rect { animation-delay: ${
        index * 1.5
      }s; }`;
      classToAdd = "pulse-happy";
    } else if (isEvent(elementId)) {
      style.innerHTML = `.animate-${elementId} > ellipse { animation-delay: ${
        index * 1.5
      }s; }`;
      classToAdd = "pulse-happy";
    } else if (isGateway(elementId)) {
      style.innerHTML = `.animate-${elementId} > path { animation-delay: ${
        index * 1.5
      }s; }`;
      classToAdd = "gateway-happy";
    } else {
      // flow
      style.innerHTML =
        `.animate-${elementId} > path:nth-child(2) { animation-delay: ${
          index * 1.5
        }s; animation-duration: 2s; } \n` +
        `.animate-${elementId} > path:nth-child(3) { animation-delay: ${
          index * 2
        }s; animation-duration: 0.5s; }`;
      classToAdd = "growing-happy";
    }
    headElt.appendChild(style);

    bpmnVisualization.bpmnElementsRegistry.addCssClasses(elementId, [
      classToAdd,
      `animate-${elementId}`,
    ]);
  });

  bpmnVisualization.bpmnElementsRegistry.addOverlays(
    happyPathElementWithOverlays,
    [
      {
        position: "top-left",
        label: "45 traces \n (7.36%) \n ⏳ 2.08 months",
        style: {
          font: { color: "green", size: 14 },
          fill: { color: "White", opacity: 40 },
          stroke: { color: "black", width: 0 },
        },
      },
    ]
  );
}

/**
 * @param {BpmnVisualization} bpmnVisualization
 */
export function hideHappyPath(bpmnVisualization) {
  bpmnVisualization.bpmnElementsRegistry.removeCssClasses(happyPath, [
    "highlight-happy-path",
    "pulse-happy",
    "gateway-happy",
    "growing-happy",
    ...happyPath.map((elementId) => {
      let styleOfElement = document.getElementById(elementId);
      styleOfElement.parentNode.removeChild(styleOfElement);
      return `animate-${elementId}`;
    }),
  ]);

  bpmnVisualization.bpmnElementsRegistry.removeAllOverlays(
    happyPathElementWithOverlays
  );
}
