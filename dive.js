"use strict";
const screens = [
  [
    "01  /  BRIEFING",
    "The Quiet Shelf",
    "SECTOR 04   /   CHART 19",
    "Reach the last buoy and log one specimen.",
    "DEPTH LIMIT",
    "40 m",
    "ENERGY COST",
    "3 of 8",
    "Check loadout"
  ],
  [
    "02  /  LOADOUT",
    "Light the way",
    "EQUIPMENT   /   SLOT 01",
    "A warm beam reveals life along the shelf.",
    "DIVE LAMP",
    "Equipped",
    "ENERGY AFTER DIVE",
    "5 of 8",
    "Start dive"
  ],
  [
    "03  /  FIELD LOG",
    "Glass ray",
    "SPECIMEN 019   /   FIRST SIGHTING",
    "Its fins fold like tracing paper in the current.",
    "FOUND AT",
    "32 m",
    "FIELD NOTES",
    "+120 XP",
    "Save to journal"
  ]
];
const pictures = ["route", "lantern", "glass-ray"];
const description = ["A chain of buoys on a depth chart", "Brass dive lantern", "Pale glass ray with folded fins"];
const initial = () => ({page: 0, energy: 8, entries: 0});
function next(s, action) {
  if (action === "back" && s.page === 1) return {...s, page: 0};
  if (action !== "go") return s;
  if (s.page === 0 && s.energy >= 3) return {...s, page: 1};
  if (s.page === 1 && s.energy >= 3) return {...s, page: 2, energy: s.energy - 3};
  if (s.page === 2) return {...s, page: 3, entries: s.entries + 1};
  if (s.page === 3) return {...s, page: 0};
  return s;
}
if (typeof module !== "undefined") module.exports = {next, initial};
if (typeof document !== "undefined") {
  let state = initial();
  const el = id => document.getElementById(id);
  function render() {
    const {page, energy, entries} = state;
    const d = page === 3 ? ["JOURNAL  /  SAVED","Entry saved","EXPEDITION ARCHIVE","The sighting is now in your field journal.","SIGHTINGS",entries,"ENERGY",energy+" of 8","Return to chart"] : [...screens[page]];
    if (page === 0) {d[7] = "3 of "+energy; if (energy < 3) {d[3]="This dive costs 3 energy. Refresh to start a new session.";d[8]="Not enough energy";}}
    if (page === 1) d[7] = (energy - 3) + " of 8";
    if (page === 2 && entries) d[2] = "SPECIMEN 019   /   REPEAT SIGHTING";
    ["step","title","caption","brief","k1","v1","k2","v2","go"].forEach((id,i)=>{el(id).textContent=d[i];});
    const idx=Math.min(page, 2); el("art").src="art/"+pictures[idx]+".svg"; el("art").alt=description[idx];
    el("back").hidden=page!==1; el("go").disabled=page===0 && energy<3;
  }
  for (const action of ["go","back"]) el(action).addEventListener("click",()=>{state=next(state, action);render();el("title").focus();});
  render();
}
