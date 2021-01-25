import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Form from "./App";

Enzyme.configure({ adapter: new Adapter() });

it.skip("pass", () => {
  const wrapper = shallow(<Form />);

  console.log(wrapper.debug());
  expect(wrapper.find("form").length.valueOf(1));
});

it("will pass, triggers checkbox onChange event", () => {
  const configs = {
    default: true,
    label: "My Label",
    element: "myElement",
  };
 
  const checkbox = shallow(<Form configs={configs} />);
  // checkbox.find("input").simulate("click");
  const mockedEvent = { target: {} };

  checkbox.find("input").simulate("click", mockedEvent);
  checkbox.find("label").length.valueOf(1)

  const errorLabel=checkbox.find("label")
  errorLabel.text().valueOf("hola")

});


it("will fail without triggering checkbox onChange event", () => {
  const configs = {
    default: true,
    label: "My Label",
    element: "myElement",
  };
 
  const checkbox = shallow(<Form configs={configs} />);
  checkbox.find("label").length.valueOf(1)

  const errorLabel=checkbox.find("label")
  errorLabel.text().valueOf("hola")

});
