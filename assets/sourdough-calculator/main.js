window.onload = (e) => {
  init();
};

const init = () => {
  calculateOnChange("breadWeight");
  calculateOnChange("breadHydration");
  calculateOnChange("starterMix");
  calculateOnChange("starterHydration");
  calculateOnChange("salt");

  calculate();
};

const calculateOnChange = (elementId) => {
  document
    .getElementById(elementId)
    .addEventListener("keyup", () => calculate());
};

const getValue = (elementId) => {
  return parseInt(document.getElementById(elementId).value);
};

const setValue = (elementId, value) => {
  document.getElementById(elementId).value = value;
};

const calculate = () => {
  const breadWeight = getValue("breadWeight");
  const breadHydration = getValue("breadHydration") / 100;
  const starterMix = getValue("starterMix") / 100;
  const starterHydration = getValue("starterHydration") / 100;
  const salt = getValue("salt") / 1000;

  const starterWeight = breadWeight * starterMix;
  setValue("resultStarter", starterWeight.toFixed(0));

  const totalWater = (breadHydration * breadWeight) / (1 + breadHydration);
  const starterWater =
    (starterHydration * starterWeight) / (1 + starterHydration);
  const resultWater = totalWater - starterWater;
  setValue("resultWater", resultWater.toFixed(0));

  const resultSalt = breadWeight * salt;
  setValue("resultSalt", resultSalt.toFixed(1));

  const resultFlour = breadWeight - totalWater - (starterWeight - starterWater);
  setValue("resultFlour", resultFlour.toFixed(0));
};
