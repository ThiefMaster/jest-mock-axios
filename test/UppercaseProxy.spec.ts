import mockAxios from "../lib/index";
import UppercaseProxy from "./UppercaseProxy";

afterEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset();
});

it("UppercaseProxy should get data from the server and convert it to UPPERCASE", () => {
    const catchFn = jest.fn();
    const thenFn = jest.fn();

    // using the component, which should make a server response
    const clientMessage = "client is saying hello!";

    UppercaseProxy(clientMessage)
        .then(thenFn)
        .catch(catchFn);

    // since `post` method is a spy, we can check if the server request was correct
    // a) the correct method was used (post)
    // b) went to the correct web service URL ('/web-service-url/')
    // c) if the payload was correct ('client is saying hello!')
    expect(mockAxios.post).toHaveBeenCalledWith("/web-service-url/", {
        data: clientMessage,
    });

    // simulating a server response
    const responseObj = { data: "server says hello!" };
    mockAxios.mockResponse(responseObj);

    // catch should not have been called
    expect(catchFn).not.toHaveBeenCalled();

    // checking the `then` spy has been called and if the
    // response from the server was converted to upper case
    expect(thenFn).toHaveBeenCalledWith("SERVER SAYS HELLO!");
});
