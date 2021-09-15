import * as LocalStorageUtils from "../LocalStorageUtils";

class LocalStorageMock {
  store: Record<string, string> = {};

  readonly length: number = 0;

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = value;
  }

  removeItem(key: string) {
    delete this.store[key];
  }
}

const mockStorage = new LocalStorageMock();

describe("LocalStorageUtils", () => {
  beforeAll(() => {
    Object.defineProperty(global, "localStorage", {
      value: mockStorage,
    });
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("getLocalStorageObj should retrieve obj by key", () => {
    localStorage.setItem("hello", JSON.stringify({ value: "world" }));
    expect(LocalStorageUtils.getLocalStorageObj("hello")).toEqual({
      value: "world",
    });
  });

  it("getLocalStorageObjProperty should retrieve obj property by key and property", () => {
    localStorage.setItem("hello", JSON.stringify({ value: "world" }));
    expect(
      LocalStorageUtils.getLocalStorageObjProperty("hello", "value"),
    ).toEqual("world");
  });

  it("setLocalStorageObjproperty should set obj property by key, property and value", () => {
    localStorage.setItem("club", JSON.stringify({}));
    LocalStorageUtils.setLocalStorageObjProperty("club", "name", "Blueprint");
    expect(LocalStorageUtils.getLocalStorageObj("club")).toEqual({
      name: "Blueprint",
    });
  });
});
