import moxios from "moxios";
import HookActions from "./HookActions";

describe("moxios tests", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test("calls the getSecretWord callback on axios response ", async () => {
    const secretWord = "party";

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: secretWord });
    });

    // create mock for callback arg
    const mockSetSecretWord = jest.fn();
    await HookActions.getSecretWord(mockSetSecretWord);

    // see whether mock was run with the correct argument
    expect(mockSetSecretWord).toHaveBeenCalledWith(secretWord);
  });
});
