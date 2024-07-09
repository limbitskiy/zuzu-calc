import App from "./App";
import { render, screen, fireEvent } from "@testing-library/react";
import { MockInstance } from "vitest";

declare const global: {
  fetch: () => void;
};

describe("fetch data", () => {
  let fetchSpy: MockInstance;

  beforeAll(() => {
    fetchSpy = vi.spyOn(global, "fetch");

    const mockResolveValue = {
      json: () =>
        new Promise((resolve) =>
          resolve({
            prices: {
              recommended: 3260,
              minimal: 2824,
              bad: 2606,
              critical: 1972,
            },
            quantityConstant: 652,
            materialLengthMap: [
              {
                maxLength: 500,
                serialityPercent: 20,
              },
              {
                maxLength: 1000,
                serialityPercent: 10,
              },
              {
                maxLength: 1500,
                serialityPercent: 0,
              },
            ],
            materialGroups: {
              wood: {
                cutSpeed: 4000,
                maxDeepeningForSinglePass: 6,
                materials: ["dsp", "fanera", "osb", "xdf", "mdf", "dvp", "furnitureBoard", "tamburat", "slicedVeneer", "lamel", "corrugatedCardboard", "slab", "getinax"],
                thicknessToPasses: [
                  { startThickness: 0.1, passes: 1 },
                  { startThickness: 7, passes: 2 },
                  { startThickness: 13, passes: 3 },
                  { startThickness: 19, passes: 4 },
                  { startThickness: 25, passes: 5 },
                  { startThickness: 31, passes: 6 },
                  { startThickness: 37, passes: 7 },
                  { startThickness: 43, passes: 8 },
                  { startThickness: 49, passes: 9 },
                  { startThickness: 55, passes: 10 },
                ],
              },
              hardPlastic: {
                cutSpeed: 3000,
                maxDeepeningForSinglePass: 4,
                materials: ["polistirol", "akril", "policarb", "bsp"],
                thicknessToPasses: [
                  { startThickness: 0.1, passes: 1 },
                  { startThickness: 5, passes: 2 },
                  { startThickness: 9, passes: 3 },
                ],
              },
              composite: {
                cutSpeed: 2500,
                maxDeepeningForSinglePass: 4,
                materials: ["aluminumComposite", "tecstolite"],
                thicknessToPasses: [
                  { startThickness: 0.1, passes: 1 },
                  { startThickness: 5, passes: 2 },
                  { startThickness: 9, passes: 3 },
                ],
              },
              softPlastic: {
                cutSpeed: 5000,
                maxDeepeningForSinglePass: 6,
                materials: ["teflon", "ftoroplast", "pvh", "pnd", "pet", "abs", "pvd", "paronite", "ebonite", "gipsokarton", "kaprolon"],
                thicknessToPasses: [
                  { startThickness: 0.1, passes: 1 },
                  { startThickness: 7, passes: 2 },
                  { startThickness: 13, passes: 3 },
                  { startThickness: 19, passes: 4 },
                ],
              },
              metal: {
                cutSpeed: 1500,
                maxDeepeningForSinglePass: 1,
                materials: ["aluminum", "brass"],
                thicknessToPasses: [
                  { startThickness: 0.1, passes: 1 },
                  { startThickness: 2, passes: 2 },
                  { startThickness: 3, passes: 3 },
                  { startThickness: 4, passes: 4 },
                  { startThickness: 5, passes: 5 },
                  { startThickness: 6, passes: 6 },
                  { startThickness: 7, passes: 7 },
                  { startThickness: 8, passes: 8 },
                  { startThickness: 9, passes: 9 },
                  { startThickness: 10, passes: 10 },
                  { startThickness: 11, passes: 11 },
                  { startThickness: 12, passes: 12 },
                  { startThickness: 13, passes: 13 },
                  { startThickness: 14, passes: 14 },
                  { startThickness: 15, passes: 15 },
                  { startThickness: 16, passes: 16 },
                  { startThickness: 17, passes: 17 },
                  { startThickness: 18, passes: 18 },
                  { startThickness: 19, passes: 19 },
                  { startThickness: 20, passes: 20 },
                ],
              },
            },
            materialNames: {
              wood: "Дерево и производные",
              hardPlastic: "Пластики твердые",
              composite: "Композиты",
              softPlastic: "Пластики мягкие",
              metal: "Металлы",
              dsp: "ДСП",
              fanera: "Фанера",
              osb: "ОСБ",
              xdf: "ХДФ",
              mdf: "МДФ",
              dvp: "ДВП",
              furnitureBoard: "Мебельный щит",
              tamburat: "Тамбурат",
              slicedVeneer: "Шпон строганный",
              lamel: "Ламели (пиленный шпон)",
              corrugatedCardboard: "Гофракартон",
              slab: "Слэб",
              getinax: "Гетинакс",
              polistirol: "Полистирол",
              akril: "Оргстекло (Акрил)",
              policarb: "Поликарбонат",
              bsp: "БСП (HPL CPL)",
              aluminumComposite: "Алюминиевый композит",
              tecstolite: "Текстолит",
              teflon: "Тефлон",
              ftoroplast: "Фторопласт",
              pvh: "ПВХ",
              pnd: "ПНД",
              pet: "ПЭТ",
              abs: "АБС",
              pvd: "ПВД",
              paronite: "Паронит",
              ebonite: "Эбонит",
              gipsokarton: "Гипсокартон",
              kaprolon: "Капролон (полимиад)",
              aluminum: "Алюминий",
              brass: "Латунь",
            },
          })
        ),
    };

    fetchSpy.mockResolvedValue(mockResolveValue);
  });

  it("call fetch", () => {
    render(<App />);

    expect(fetchSpy).toBeCalledTimes(1);
  });

  afterAll(() => {
    fetchSpy.mockRestore();
  });
});

describe("add/remove material", () => {
  let fetchSpy: MockInstance;

  beforeAll(() => {
    fetchSpy = vi.spyOn(global, "fetch");

    const mockResolveValue = {
      json: () =>
        new Promise((resolve) =>
          resolve({
            prices: {
              recommended: 3260,
              minimal: 2824,
              bad: 2606,
              critical: 1972,
            },
            quantityConstant: 652,
            materialLengthMap: [
              {
                maxLength: 500,
                serialityPercent: 20,
              },
              {
                maxLength: 1000,
                serialityPercent: 10,
              },
              {
                maxLength: 1500,
                serialityPercent: 0,
              },
            ],
            materialGroups: {
              wood: {
                cutSpeed: 4000,
                maxDeepeningForSinglePass: 6,
                materials: ["dsp", "fanera", "osb", "xdf", "mdf", "dvp", "furnitureBoard", "tamburat", "slicedVeneer", "lamel", "corrugatedCardboard", "slab", "getinax"],
                thicknessToPasses: [
                  { startThickness: 0.1, passes: 1 },
                  { startThickness: 7, passes: 2 },
                  { startThickness: 13, passes: 3 },
                  { startThickness: 19, passes: 4 },
                  { startThickness: 25, passes: 5 },
                  { startThickness: 31, passes: 6 },
                  { startThickness: 37, passes: 7 },
                  { startThickness: 43, passes: 8 },
                  { startThickness: 49, passes: 9 },
                  { startThickness: 55, passes: 10 },
                ],
              },
              hardPlastic: {
                cutSpeed: 3000,
                maxDeepeningForSinglePass: 4,
                materials: ["polistirol", "akril", "policarb", "bsp"],
                thicknessToPasses: [
                  { startThickness: 0.1, passes: 1 },
                  { startThickness: 5, passes: 2 },
                  { startThickness: 9, passes: 3 },
                ],
              },
              composite: {
                cutSpeed: 2500,
                maxDeepeningForSinglePass: 4,
                materials: ["aluminumComposite", "tecstolite"],
                thicknessToPasses: [
                  { startThickness: 0.1, passes: 1 },
                  { startThickness: 5, passes: 2 },
                  { startThickness: 9, passes: 3 },
                ],
              },
              softPlastic: {
                cutSpeed: 5000,
                maxDeepeningForSinglePass: 6,
                materials: ["teflon", "ftoroplast", "pvh", "pnd", "pet", "abs", "pvd", "paronite", "ebonite", "gipsokarton", "kaprolon"],
                thicknessToPasses: [
                  { startThickness: 0.1, passes: 1 },
                  { startThickness: 7, passes: 2 },
                  { startThickness: 13, passes: 3 },
                  { startThickness: 19, passes: 4 },
                ],
              },
              metal: {
                cutSpeed: 1500,
                maxDeepeningForSinglePass: 1,
                materials: ["aluminum", "brass"],
                thicknessToPasses: [
                  { startThickness: 0.1, passes: 1 },
                  { startThickness: 2, passes: 2 },
                  { startThickness: 3, passes: 3 },
                  { startThickness: 4, passes: 4 },
                  { startThickness: 5, passes: 5 },
                  { startThickness: 6, passes: 6 },
                  { startThickness: 7, passes: 7 },
                  { startThickness: 8, passes: 8 },
                  { startThickness: 9, passes: 9 },
                  { startThickness: 10, passes: 10 },
                  { startThickness: 11, passes: 11 },
                  { startThickness: 12, passes: 12 },
                  { startThickness: 13, passes: 13 },
                  { startThickness: 14, passes: 14 },
                  { startThickness: 15, passes: 15 },
                  { startThickness: 16, passes: 16 },
                  { startThickness: 17, passes: 17 },
                  { startThickness: 18, passes: 18 },
                  { startThickness: 19, passes: 19 },
                  { startThickness: 20, passes: 20 },
                ],
              },
            },
            materialNames: {
              wood: "Дерево и производные",
              hardPlastic: "Пластики твердые",
              composite: "Композиты",
              softPlastic: "Пластики мягкие",
              metal: "Металлы",
              dsp: "ДСП",
              fanera: "Фанера",
              osb: "ОСБ",
              xdf: "ХДФ",
              mdf: "МДФ",
              dvp: "ДВП",
              furnitureBoard: "Мебельный щит",
              tamburat: "Тамбурат",
              slicedVeneer: "Шпон строганный",
              lamel: "Ламели (пиленный шпон)",
              corrugatedCardboard: "Гофракартон",
              slab: "Слэб",
              getinax: "Гетинакс",
              polistirol: "Полистирол",
              akril: "Оргстекло (Акрил)",
              policarb: "Поликарбонат",
              bsp: "БСП (HPL CPL)",
              aluminumComposite: "Алюминиевый композит",
              tecstolite: "Текстолит",
              teflon: "Тефлон",
              ftoroplast: "Фторопласт",
              pvh: "ПВХ",
              pnd: "ПНД",
              pet: "ПЭТ",
              abs: "АБС",
              pvd: "ПВД",
              paronite: "Паронит",
              ebonite: "Эбонит",
              gipsokarton: "Гипсокартон",
              kaprolon: "Капролон (полимиад)",
              aluminum: "Алюминий",
              brass: "Латунь",
            },
          })
        ),
    };

    fetchSpy.mockResolvedValue(mockResolveValue);
  });

  // it.todo("recieve data");

  it("add material", async () => {
    const { container } = render(<App />);

    await screen.findByText("Калькулятор");

    const accordion = container.querySelector(".accordion");
    fireEvent.click(screen.getByTestId("add-material-btn"));
    expect(accordion?.children.length).toBe(2);
  });

  it("remove material", async () => {
    const { container } = render(<App />);

    await screen.findByText("Калькулятор");

    const accordion = container.querySelector(".accordion");
    fireEvent.click(screen.getByTestId("add-material-btn"));
    fireEvent.click(screen.getAllByTestId("remove-material-btn")[0]);
    expect(accordion?.children.length).toBe(1);
  });

  it("remove last material", async () => {
    const { container } = render(<App />);

    await screen.findByText("Калькулятор");

    const accordion = container.querySelector(".accordion");
    fireEvent.click(screen.getAllByTestId("remove-material-btn")[0]);
    expect(accordion).not.toBeInTheDocument();
  });

  afterAll(() => {
    fetchSpy.mockRestore();
  });
});

describe("data calculation", () => {
  let fetchSpy: MockInstance;

  beforeAll(() => {
    fetchSpy = vi.spyOn(global, "fetch");

    const mockResolveValue = {
      json: () =>
        new Promise((resolve) =>
          resolve({
            prices: {
              recommended: 3260,
              minimal: 2824,
              bad: 2606,
              critical: 1972,
            },
            quantityConstant: 652,
            materialLengthMap: [
              {
                maxLength: 500,
                serialityPercent: 20,
              },
              {
                maxLength: 1000,
                serialityPercent: 10,
              },
              {
                maxLength: 1500,
                serialityPercent: 0,
              },
            ],
            materialGroups: {
              wood: {
                cutSpeed: 4000,
                maxDeepeningForSinglePass: 6,
                materials: ["dsp", "fanera", "osb", "xdf", "mdf", "dvp", "furnitureBoard", "tamburat", "slicedVeneer", "lamel", "corrugatedCardboard", "slab", "getinax"],
                thicknessToPasses: [
                  { startThickness: 0.1, passes: 1 },
                  { startThickness: 7, passes: 2 },
                  { startThickness: 13, passes: 3 },
                  { startThickness: 19, passes: 4 },
                  { startThickness: 25, passes: 5 },
                  { startThickness: 31, passes: 6 },
                  { startThickness: 37, passes: 7 },
                  { startThickness: 43, passes: 8 },
                  { startThickness: 49, passes: 9 },
                  { startThickness: 55, passes: 10 },
                ],
              },
              hardPlastic: {
                cutSpeed: 3000,
                maxDeepeningForSinglePass: 4,
                materials: ["polistirol", "akril", "policarb", "bsp"],
                thicknessToPasses: [
                  { startThickness: 0.1, passes: 1 },
                  { startThickness: 5, passes: 2 },
                  { startThickness: 9, passes: 3 },
                ],
              },
              composite: {
                cutSpeed: 2500,
                maxDeepeningForSinglePass: 4,
                materials: ["aluminumComposite", "tecstolite"],
                thicknessToPasses: [
                  { startThickness: 0.1, passes: 1 },
                  { startThickness: 5, passes: 2 },
                  { startThickness: 9, passes: 3 },
                ],
              },
              softPlastic: {
                cutSpeed: 5000,
                maxDeepeningForSinglePass: 6,
                materials: ["teflon", "ftoroplast", "pvh", "pnd", "pet", "abs", "pvd", "paronite", "ebonite", "gipsokarton", "kaprolon"],
                thicknessToPasses: [
                  { startThickness: 0.1, passes: 1 },
                  { startThickness: 7, passes: 2 },
                  { startThickness: 13, passes: 3 },
                  { startThickness: 19, passes: 4 },
                ],
              },
              metal: {
                cutSpeed: 1500,
                maxDeepeningForSinglePass: 1,
                materials: ["aluminum", "brass"],
                thicknessToPasses: [
                  { startThickness: 0.1, passes: 1 },
                  { startThickness: 2, passes: 2 },
                  { startThickness: 3, passes: 3 },
                  { startThickness: 4, passes: 4 },
                  { startThickness: 5, passes: 5 },
                  { startThickness: 6, passes: 6 },
                  { startThickness: 7, passes: 7 },
                  { startThickness: 8, passes: 8 },
                  { startThickness: 9, passes: 9 },
                  { startThickness: 10, passes: 10 },
                  { startThickness: 11, passes: 11 },
                  { startThickness: 12, passes: 12 },
                  { startThickness: 13, passes: 13 },
                  { startThickness: 14, passes: 14 },
                  { startThickness: 15, passes: 15 },
                  { startThickness: 16, passes: 16 },
                  { startThickness: 17, passes: 17 },
                  { startThickness: 18, passes: 18 },
                  { startThickness: 19, passes: 19 },
                  { startThickness: 20, passes: 20 },
                ],
              },
            },
            materialNames: {
              wood: "Дерево и производные",
              hardPlastic: "Пластики твердые",
              composite: "Композиты",
              softPlastic: "Пластики мягкие",
              metal: "Металлы",
              dsp: "ДСП",
              fanera: "Фанера",
              osb: "ОСБ",
              xdf: "ХДФ",
              mdf: "МДФ",
              dvp: "ДВП",
              furnitureBoard: "Мебельный щит",
              tamburat: "Тамбурат",
              slicedVeneer: "Шпон строганный",
              lamel: "Ламели (пиленный шпон)",
              corrugatedCardboard: "Гофракартон",
              slab: "Слэб",
              getinax: "Гетинакс",
              polistirol: "Полистирол",
              akril: "Оргстекло (Акрил)",
              policarb: "Поликарбонат",
              bsp: "БСП (HPL CPL)",
              aluminumComposite: "Алюминиевый композит",
              tecstolite: "Текстолит",
              teflon: "Тефлон",
              ftoroplast: "Фторопласт",
              pvh: "ПВХ",
              pnd: "ПНД",
              pet: "ПЭТ",
              abs: "АБС",
              pvd: "ПВД",
              paronite: "Паронит",
              ebonite: "Эбонит",
              gipsokarton: "Гипсокартон",
              kaprolon: "Капролон (полимиад)",
              aluminum: "Алюминий",
              brass: "Латунь",
            },
          })
        ),
    };

    fetchSpy.mockResolvedValue(mockResolveValue);
  });

  it("calculate meter price", async () => {
    const { container } = render(<App />);

    await screen.findByText("Калькулятор");

    fireEvent.change(container.querySelector(".material-select")!, { target: { value: "dsp" } });
    fireEvent.change(container.querySelector(".thickness-input")!, { target: { value: "1" } });

    const price = container.querySelector(".meter-price");
    expect(price?.textContent).toContain("16₽");
  });

  it("calculate material price", async () => {
    const { container } = render(<App />);

    await screen.findByText("Калькулятор");

    fireEvent.change(container.querySelector(".material-select")!, { target: { value: "dsp" } });
    fireEvent.change(container.querySelector(".thickness-input")!, { target: { value: "1" } });
    fireEvent.change(container.querySelector(".length-input")!, { target: { value: "100" } });
    fireEvent.change(container.querySelector(".quantity-input")!, { target: { value: "5" } });

    const price = container.querySelector(".material-price");
    expect(price?.textContent).toContain("4890₽");
  });

  it("calculate total price of several materials", async () => {
    const { container } = render(<App />);

    await screen.findByText("Калькулятор");

    const accordion = container.querySelector(".accordion");
    fireEvent.click(screen.getByTestId("add-material-btn"));

    const material1 = accordion!.children[0];
    const material2 = accordion!.children[1];

    fireEvent.change(material1.querySelector(".material-select")!, { target: { value: "dsp" } });
    fireEvent.change(material1.querySelector(".thickness-input")!, { target: { value: "1" } });
    fireEvent.change(material1.querySelector(".length-input")!, { target: { value: "100" } });
    fireEvent.change(material1.querySelector(".quantity-input")!, { target: { value: "5" } });

    fireEvent.change(material2.querySelector(".material-select")!, { target: { value: "teflon" } });
    fireEvent.change(material2.querySelector(".thickness-input")!, { target: { value: "3" } });
    fireEvent.change(material2.querySelector(".length-input")!, { target: { value: "300" } });
    fireEvent.change(material2.querySelector(".quantity-input")!, { target: { value: "15" } });

    const price = container.querySelector(".total-price");
    expect(price?.textContent).toContain("18582₽");
  });

  afterAll(() => {
    fetchSpy.mockRestore();
  });
});

describe("sending info to manager", () => {
  let fetchSpy: MockInstance;

  beforeAll(() => {
    fetchSpy = vi.spyOn(global, "fetch");

    const mockResolveValue = {
      json: () =>
        new Promise((resolve) =>
          resolve({
            prices: {
              recommended: 3260,
              minimal: 2824,
              bad: 2606,
              critical: 1972,
            },
            quantityConstant: 652,
            materialLengthMap: [
              {
                maxLength: 500,
                serialityPercent: 20,
              },
              {
                maxLength: 1000,
                serialityPercent: 10,
              },
              {
                maxLength: 1500,
                serialityPercent: 0,
              },
            ],
            materialGroups: {
              wood: {
                cutSpeed: 4000,
                maxDeepeningForSinglePass: 6,
                materials: ["dsp", "fanera", "osb", "xdf", "mdf", "dvp", "furnitureBoard", "tamburat", "slicedVeneer", "lamel", "corrugatedCardboard", "slab", "getinax"],
                thicknessToPasses: [
                  { startThickness: 0.1, passes: 1 },
                  { startThickness: 7, passes: 2 },
                  { startThickness: 13, passes: 3 },
                  { startThickness: 19, passes: 4 },
                  { startThickness: 25, passes: 5 },
                  { startThickness: 31, passes: 6 },
                  { startThickness: 37, passes: 7 },
                  { startThickness: 43, passes: 8 },
                  { startThickness: 49, passes: 9 },
                  { startThickness: 55, passes: 10 },
                ],
              },
              hardPlastic: {
                cutSpeed: 3000,
                maxDeepeningForSinglePass: 4,
                materials: ["polistirol", "akril", "policarb", "bsp"],
                thicknessToPasses: [
                  { startThickness: 0.1, passes: 1 },
                  { startThickness: 5, passes: 2 },
                  { startThickness: 9, passes: 3 },
                ],
              },
              composite: {
                cutSpeed: 2500,
                maxDeepeningForSinglePass: 4,
                materials: ["aluminumComposite", "tecstolite"],
                thicknessToPasses: [
                  { startThickness: 0.1, passes: 1 },
                  { startThickness: 5, passes: 2 },
                  { startThickness: 9, passes: 3 },
                ],
              },
              softPlastic: {
                cutSpeed: 5000,
                maxDeepeningForSinglePass: 6,
                materials: ["teflon", "ftoroplast", "pvh", "pnd", "pet", "abs", "pvd", "paronite", "ebonite", "gipsokarton", "kaprolon"],
                thicknessToPasses: [
                  { startThickness: 0.1, passes: 1 },
                  { startThickness: 7, passes: 2 },
                  { startThickness: 13, passes: 3 },
                  { startThickness: 19, passes: 4 },
                ],
              },
              metal: {
                cutSpeed: 1500,
                maxDeepeningForSinglePass: 1,
                materials: ["aluminum", "brass"],
                thicknessToPasses: [
                  { startThickness: 0.1, passes: 1 },
                  { startThickness: 2, passes: 2 },
                  { startThickness: 3, passes: 3 },
                  { startThickness: 4, passes: 4 },
                  { startThickness: 5, passes: 5 },
                  { startThickness: 6, passes: 6 },
                  { startThickness: 7, passes: 7 },
                  { startThickness: 8, passes: 8 },
                  { startThickness: 9, passes: 9 },
                  { startThickness: 10, passes: 10 },
                  { startThickness: 11, passes: 11 },
                  { startThickness: 12, passes: 12 },
                  { startThickness: 13, passes: 13 },
                  { startThickness: 14, passes: 14 },
                  { startThickness: 15, passes: 15 },
                  { startThickness: 16, passes: 16 },
                  { startThickness: 17, passes: 17 },
                  { startThickness: 18, passes: 18 },
                  { startThickness: 19, passes: 19 },
                  { startThickness: 20, passes: 20 },
                ],
              },
            },
            materialNames: {
              wood: "Дерево и производные",
              hardPlastic: "Пластики твердые",
              composite: "Композиты",
              softPlastic: "Пластики мягкие",
              metal: "Металлы",
              dsp: "ДСП",
              fanera: "Фанера",
              osb: "ОСБ",
              xdf: "ХДФ",
              mdf: "МДФ",
              dvp: "ДВП",
              furnitureBoard: "Мебельный щит",
              tamburat: "Тамбурат",
              slicedVeneer: "Шпон строганный",
              lamel: "Ламели (пиленный шпон)",
              corrugatedCardboard: "Гофракартон",
              slab: "Слэб",
              getinax: "Гетинакс",
              polistirol: "Полистирол",
              akril: "Оргстекло (Акрил)",
              policarb: "Поликарбонат",
              bsp: "БСП (HPL CPL)",
              aluminumComposite: "Алюминиевый композит",
              tecstolite: "Текстолит",
              teflon: "Тефлон",
              ftoroplast: "Фторопласт",
              pvh: "ПВХ",
              pnd: "ПНД",
              pet: "ПЭТ",
              abs: "АБС",
              pvd: "ПВД",
              paronite: "Паронит",
              ebonite: "Эбонит",
              gipsokarton: "Гипсокартон",
              kaprolon: "Капролон (полимиад)",
              aluminum: "Алюминий",
              brass: "Латунь",
            },
          })
        ),
    };

    fetchSpy.mockResolvedValue(mockResolveValue);
  });

  it("get an error window if some of fields are empty", async () => {
    const { container } = render(<App />);

    await screen.findByText("Калькулятор");

    const sendBtn = container.querySelector(".send-to-manager-btn")!;
    fireEvent.click(sendBtn);

    expect(document.querySelector(".send-to-manager-btn")).toBeInTheDocument();
  });

  it("open send-to-manager window", async () => {
    const { container } = render(<App />);

    await screen.findByText("Калькулятор");

    fireEvent.change(container.querySelector(".material-select")!, { target: { value: "dsp" } });
    fireEvent.change(container.querySelector(".thickness-input")!, { target: { value: "1" } });
    fireEvent.change(container.querySelector(".length-input")!, { target: { value: "100" } });

    const sendBtn = container.querySelector(".send-to-manager-btn")!;
    fireEvent.click(sendBtn);

    expect(document.querySelector(".details-modal")).toBeInTheDocument();
  });

  afterAll(() => {
    fetchSpy.mockRestore();
  });
});
