const removals = [
  {
    group: "Attack Modifiers",
    label: "Desperate Attack (2)",
  },
  {
    group: "Attack Modifiers",
    label: "Desperate Attack (4)",
  },
  {
    group: "Damage Modifiers",
    label: "Desperate Attack (2)",
  },
  {
    group: "Damage Modifiers",
    label: "Desperate Attack (4)",
  },
];

function removeSWADERollModifier(modifier) {
  const internalModifiers = CONFIG.SWADE.prototypeRollGroups.find(
    (i) => i.name === modifier.group
  ).modifiers;
  internalModifiers.splice(
    internalModifiers.findIndex((i) => i.label === modifier.label),
    1
  );
}

Hooks.on("setup", () => {
  removals.forEach((modifier) => removeSWADERollModifier(modifier));
});
