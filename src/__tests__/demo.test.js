// describe permet de regrouper les tests dans des scénarios
describe("Scénario démo 1", () => {
  // it et test sont identiques
  it("Test somme 1", () => {
    const a = 2 + 1;
    expect(a).toBe(3);
  });

  it("Test somme 2", () => {
    const a = 5 + 3;
    expect(a).toBe(8);
  });
});

describe("Scénario démo 2", () => {
  // it et test sont identiques
  it("Test somme 3", () => {
    const a = 2 + 6;
    expect(a).toBe(8);
  });
});
