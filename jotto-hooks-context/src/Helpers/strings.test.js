import stringModule from "./strings";

const { getStringByLanguage } = stringModule;

const strings = {
  en: { submit: "Submit" },
  emoji: { submit: "🚀" },
  es: { submit: "Enviar" },
  fr: {},
};

describe("language string testing", () => {
  const mockWarn = jest.fn();
  let originalWarn;
  beforeEach(() => {
    originalWarn = console.warn;
    console.warn = mockWarn;
  });

  afterEach(() => {
    console.warn = originalWarn;
  });

  test("should returns the correct submit string for english", () => {
    const string = getStringByLanguage("en", "submit", strings);
    expect(string).toBe("Submit");
    expect(mockWarn).not.toHaveBeenCalled();
  });

  test("should returns the correct submit string for spanish", () => {
    const string = getStringByLanguage("es", "submit", strings);
    expect(string).toBe("Enviar");
    expect(mockWarn).not.toHaveBeenCalled();
  });

  test("should returns the correct submit string for emoji", () => {
    const string = getStringByLanguage("emoji", "submit", strings);
    expect(string).toBe("🚀");
    expect(mockWarn).not.toHaveBeenCalled();
  });

  test("should returns english submit string when language does not exist", () => {
    const string = getStringByLanguage("notALanguage", "submit", strings);
    expect(string).toBe("Submit");
    expect(mockWarn).toHaveBeenCalledWith(
      "Could not get string [submit] for [notALanguage]"
    );
  });

  test("should returns english submit string when submit key does not exist for language", () => {
    const string = getStringByLanguage("fr", "submit", strings);
    expect(string).toBe("Submit");
    expect(mockWarn).toHaveBeenCalledWith(
      "Could not get string [submit] for [fr]"
    );
  });
});
